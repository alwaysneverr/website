import { DateTime } from 'luxon'
import MarkdownIt from 'markdown-it'
const mdCompiler = new MarkdownIt({
  html: true, // Guarantees your custom {% divider %} HTML fragments pass through un-shredded
  breaks: true,
  linkify: true
});

export default {
    dateToFormat: function (date, format) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    dateToISO: function (date) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    htmlDateString: function (dateObj) {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
    },

    readableDate: function (dateObj, format, zone) {
        return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	},

    obfuscate: function (str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    },

    filterTagList (tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts", "reviews", "fiction"].indexOf(tag) === -1);
    },

    min: function(...numbers) {
        return Math.min.apply(null, numbers);
    },

    head: function (array, n) {
        if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
    },

    limit: function (array, n) {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        return array.slice(0, n);
    },

    truncateChars: function (str, maxChars = 140) {
        if (!str || typeof str !== 'string') {
            return '';
        }
        if (str.length <= maxChars) {
            return str;
        }
        return str.slice(0, maxChars) + '...';
    },

    getPopularTags: function (collectionsAll) {
        const tagCounts = {};
        const excludedTags = ["all", "nav", "post", "posts", "review", "reviews", "fiction", "automatedReviewTransitions"];

        // 1. Loop through all content items and tally occurrences
        collectionsAll.forEach(item => {
            if (item.data && item.data.tags) {
            item.data.tags.forEach(tag => {
                if (excludedTags.indexOf(tag) === -1) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                }
            });
            }
        });

        // 2. Transform the tracking hash dictionary into a sortable array profile
        return Object.keys(tagCounts)
            .map(tag => ({
            name: tag,
            count: tagCounts[tag],
            slug: tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }))
            .sort((a, b) => b.count - a.count) // Sort highest count frequency first
            .slice(0, 15); // Ceiling cap at top 15 items to maintain high-density canvas balance
    },

    getAllTags: function (collection) {
        let tagSet = new Set();
        for(let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
	},

    markdown: function (rawContentString) {
        if (!rawContentString) return "";
        return mdCompiler.render(rawContentString);
    },

    randomItem: function (array) {
        if(!Array.isArray(array) || array.length === 0) {
            return null;
        }
        return array[Math.floor(Math.random() * array.length)];
    }
}
