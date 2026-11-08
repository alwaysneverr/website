import { execSync } from 'child_process';
import path from 'node:path';

const gitCache = new Map();

// Commits with this in their message (tag-only edits and the like) don't count as an update:
// their files keep the date of the commit before
const KEEP_DATES_MARKER = '[keep-dates]';

function bulkLoadGitData() {
	let stdout;
	try {
		// Disable SSH to prevent "Permission denied (publickey)" errors on Netlify
		stdout = execSync(`git log --format="%at|%H|%s" --name-only`, {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe'],
			cwd: process.cwd(),
			maxBuffer: 10 * 1024 * 1024,  // 10MB buffer for large repos
			env: { ...process.env, GIT_SSH: '/bin/false' }  // Disable SSH completely
		});
	} catch (e) {
		console.warn(`[gitDates] Skipping git metadata: ${e.message}`);
		return;
	}

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
				currentGitInfo = message.includes(KEEP_DATES_MARKER) ? null : {
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
