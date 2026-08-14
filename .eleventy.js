import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

import EleventyPluginNavigation from '@11ty/eleventy-navigation';
import EleventyPluginRss from '@11ty/eleventy-plugin-rss'
import EleventyPluginSyntaxhighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'

import rollupPluginCritical from 'rollup-plugin-critical'


import filters from './utils/filters.js'
import transforms from './utils/transforms.js'
import shortcodes from './utils/shortcodes.js'

export default function (eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`;
		}

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});


	eleventyConfig.setServerPassthroughCopyBehavior('copy');
	eleventyConfig.addPassthroughCopy("public");
	
	// Plugins
	eleventyConfig.addPlugin(EleventyPluginNavigation)
	eleventyConfig.addPlugin(EleventyPluginRss)
	eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight)
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: '.11ty-vite', // Default name of the temp folder

		// Vite options (equal to vite.config.js inside project root)
		viteOptions: {
			publicDir: 'public',
			clearScreen: false,
			server: {
				mode: 'development',
				middlewareMode: true,
			},
			appType: 'custom',
			assetsInclude: ['**/*.xml', '**/*.txt'],
			build: {
				mode: 'production',
				sourcemap: true,
				manifest: true,
				// This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
				rolldownOptions: {
					output: {
						assetFileNames: 'assets/css/main.[hash].css',
						chunkFileNames: 'assets/js/[name].[hash].js',
						entryFileNames: 'assets/js/[name].[hash].js'
					},
					plugins: [rollupPluginCritical({
							criticalUrl: './_site/',
							criticalBase: './_site/',
							criticalPages: [
								{ uri: 'index.html', template: 'index' },
								{ uri: 'posts/index.html', template: 'posts/index' },
								{ uri: '404.html', template: '404' },
							],
							criticalConfig: {
								inline: true,
								dimensions: [
									{
									  height: 900,
									  width: 375,
									},
									{
									  height: 720,
									  width: 1280,
									},
									{
										height: 1080,
										width: 1920,
									}
								],
								penthouse: {
									forceInclude: ['.fonts-loaded-1 body', '.fonts-loaded-2 body'],
								  }
							}
						})
					]
				}
			}
		}
	})

	// Collection

	eleventyConfig.addCollection("recentReviews", function(collectionApi) {
	// Fetch all items tagged as "reviews" and sort them newest-first natively
	const sortedReviews = collectionApi.getFilteredByTag("reviews")
		.sort((a, b) => b.date - a.date);

	// Safe slice buffer: returns exactly your top 3 newest timeline posts
	return sortedReviews.slice(0, 3);
	});

	eleventyConfig.addCollection("paginatedTagsCollection", function(collectionApi) {
		const POSTS_PER_PAGE = 10;
		const excludedTags = ["all", "nav", "post", "posts", "review", "reviews", "fiction", "automatedReviewTransitions"];
		const chunksCollection = [];
		
		// Use collectionApi to fetch all items safely
		const allItems = collectionApi.getAll();
		const tagMap = {};

		// 1. Manually group posts by tags to avoid early-boot data null errors
		allItems.forEach(item => {
			if (item.data && item.data.tags) {
			item.data.tags.forEach(tag => {
				if (excludedTags.indexOf(tag) === -1) {
				if (!tagMap[tag]) tagMap[tag] = [];
				tagMap[tag].push(item);
				}
			});
			}
		});

		// 2. Chunk each tag's timeline array into individual pages
		Object.keys(tagMap).forEach(tag => {
			const fullItemsList = [...tagMap[tag]].reverse(); // Most recent first
			const totalPagesCount = Math.ceil(fullItemsList.length / POSTS_PER_PAGE);

			for (let pageIdx = 0; pageIdx < totalPagesCount; pageIdx++) {
			const startOffset = pageIdx * POSTS_PER_PAGE;
			const endOffset = startOffset + POSTS_PER_PAGE;
			const slicedPostsPage = fullItemsList.slice(startOffset, endOffset);
			const sluggedTagName = tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

			chunksCollection.push({
				tagName: tag,
				slug: sluggedTagName,
				posts: slicedPostsPage,
				pageNumber: pageIdx,
				totalPages: totalPagesCount
			});
			}
		});

		return chunksCollection;
	});


	// Filters
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName])
	})

	// Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

	// Customize Markdown library and settings:
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	}).use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			placement: 'after',
			class: 'direct-link',
			symbol: '#',
			level: [1, 2, 3, 4]
		}),
		slugify: eleventyConfig.getFilter('slug')
	})
	eleventyConfig.setLibrary('md', markdownLibrary)

	// Layouts
	eleventyConfig.addLayoutAlias('base', 'base.njk')
	eleventyConfig.addLayoutAlias('post', 'post.njk')
	eleventyConfig.addLayoutAlias('empty', 'empty.njk')
	eleventyConfig.addLayoutAlias('review', 'review.njk')
	eleventyConfig.addLayoutAlias('play', 'play.njk')
	eleventyConfig.addLayoutAlias('fiction', 'fiction.njk')

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy('src/assets/css')
	eleventyConfig.addPassthroughCopy('src/assets/js')

	// add css bundles
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

	return {
		templateFormats: ['md', 'njk', 'html', 'liquid'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			// better not use "public" as the name of the output folder (see above...)
			output: '_site',
			includes: '_includes',
			layouts: 'layouts',
			data: '_data'
		}
	}
}
