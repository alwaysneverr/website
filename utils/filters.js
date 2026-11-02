import { DateTime } from 'luxon'
import MarkdownIt from 'markdown-it'
import { isContentTag, tagSlug } from './taxonomy.js'
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

    readableGitDate: function(dateStr, format){
        if (!dateStr) return "";
        // Uses fromISO instead of fromJSDate to parse string data layers natively!
        return DateTime.fromISO(dateStr).toFormat(format || "dd LLLL yyyy");
    },

    obfuscate: function (str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    },

    filterTagList (tags) {
        return (tags || []).filter(isContentTag);
    },

    tagSlug,

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

        // 1. Loop through all content items and tally occurrences
        collectionsAll.forEach(item => {
            if (item.data && item.data.tags) {
            item.data.tags.forEach(tag => {
                if (isContentTag(tag)) {
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
            slug: tagSlug(tag)
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

    scoreColor: function (rating) {
        if (!rating) return "var(--text-muted)";
        const numericRating = parseInt(rating, 10);
        if (numericRating === 10) return "var(--score-gold)";
        if (numericRating >= 9) return "var(--score-high)";
        if (numericRating >= 7) return "var(--score-mid)";
        if (numericRating >= 5) return "var(--score-low)";
        return "var(--score-bad)";
    },

    mediaColor: function (media) {
        const mediaText = (media || "").toLowerCase();
        // "visual novel" has to be checked before "novel"
        if (mediaText.includes("game") || mediaText.includes("visual novel")) return "var(--media-game)";
        if (mediaText.includes("novel")) return "var(--media-novel)";
        if (["anime", "donghua", "movie", "show"].some(type => mediaText.includes(type))) return "var(--media-anime)";
        if (["manga", "manhwa", "manhua", "comic"].some(type => mediaText.includes(type))) return "var(--media-manga)";
        return "var(--media-white)";
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
