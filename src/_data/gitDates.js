import { execSync } from 'child_process';
import path from 'node:path';

export const gitCache = new Map();
let isGitBulkLoaded = false;

function bulkLoadGitData() {
	if (isGitBulkLoaded) return;
	try {
		console.log("🛠️ DEBUG: Starting native unix bulk timestamp lookup...");
		
		// First, verify we're in a valid git repository
		try {
			execSync("git rev-parse --git-dir", { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], cwd: process.cwd() });
		} catch (e) {
			console.log("⚠️ Not a valid git repository or git not available");
			isGitBulkLoaded = true;
			return;
		}
		
		// Try multiple approaches to get git log, falling back if one fails (Netlify robustness)
		let stdout = null;
		const commands = [
			`git log --format="%at|%H|%s" --name-only`,  // Current branch only (no remote access needed)
		];
		
		for (const cmd of commands) {
			try {
				// Disable SSH to prevent "Permission denied (publickey)" errors on Netlify
				stdout = execSync(cmd, { 
					encoding: 'utf8', 
					stdio: ['ignore', 'pipe', 'pipe'], 
					cwd: process.cwd(),
					maxBuffer: 10 * 1024 * 1024,  // 10MB buffer for large repos
					env: { ...process.env, GIT_SSH: '/bin/false' }  // Disable SSH completely
				});
				if (stdout) {
					console.log("✅ Git log loaded successfully");
					break;  // Success, use this output
				}
			} catch (e) {
				console.log(`⚠️ Git command failed: ${cmd}`);
				console.log(`   Error: ${e.message}`);
				// Continue to next command
			}
		}
		
		if (!stdout) {
			console.log("⚠️ All git log attempts failed; skipping git metadata");
			isGitBulkLoaded = true;
			return;
		}

		if (!stdout) return;

		const lines = stdout.split(/\r?\n/);
		let currentGitInfo = null;

		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed) continue;

			if (trimmed.includes('|')) {
				// FIX 2: Safe split via Regex that ONLY matches the first two pipes. 
				// This allows user commit messages to contain pipes safely!
				const match = trimmed.match(/^([^|]+)\|([^|]+)\|(.*)$/);
				if (match) {
					const [_, unixTimestamp, longHash, message] = match;
					currentGitInfo = { 
						unixTimestamp: parseInt(unixTimestamp, 10), 
						longHash,
						message: message || "Updated content"
					};
				}
			} else if (currentGitInfo) {
				// FIX 1: Save using the FULL repository-relative path normalized to lowercase
				// Strips leading/trailing slashes, matches: "content/blog/day1.md"
				const repoRelativePath = trimmed.replace(/\\/g, "/").toLowerCase();
				
				if (repoRelativePath && !gitCache.has(repoRelativePath)) {
					gitCache.set(repoRelativePath, currentGitInfo);
				}
			}
		}
		isGitBulkLoaded = true;
	} catch (e) {
		console.log("❌ DEBUG CRASH: Git execSync failed!");
		console.log(`   Error message: ${e.message}`);
		console.log(`   Error details: ${e.stderr || e.stdout || JSON.stringify(e)}`);
		isGitBulkLoaded = true; 
	}
}

bulkLoadGitData();

export const gitEngine = {
	getLog: function(fullPath) {
		if (!fullPath) return null;
		try {
			// Compute a repository-relative path reliably regardless of whether
			// Eleventy provides an absolute path or a relative one.
			const rel = path.relative(process.cwd(), fullPath).replace(/\\/g, "/").replace(/^\.\//, "").toLowerCase();
			return gitCache.get(rel) || null;
		} catch (e) {
			const fallback = fullPath.replace(/^\.\//, "").replace(/\\/g, "/").toLowerCase();
			return gitCache.get(fallback) || null;
		}
	}
};

export default function() { return {}; }
