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

    // 21 -> "Twenty-One", for chapter headings written out the way the books print them
    numberToWords: function (value) {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 0 || n > 999) return String(value);
        const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
            "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const belowHundred = (x) => x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? `-${ones[x % 10]}` : "");
        if (n < 100) return belowHundred(n);
        const rest = n % 100;
        return `${ones[Math.floor(n / 100)]} Hundred${rest ? ` ${belowHundred(rest)}` : ""}`;
    },

    filterTagList (tags) {
        return (tags || []).filter(isContentTag);
    },

    tagSlug,

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

    // Tags ordered by their most recent post, newest first
    getAllTags: function (collection) {
        const newestPost = new Map();
        for(let item of collection) {
            (item.data.tags || []).forEach(tag => {
                if (!newestPost.has(tag) || item.date > newestPost.get(tag)) newestPost.set(tag, item.date);
            });
        }
        return Array.from(newestPost.keys()).sort((a, b) => newestPost.get(b) - newestPost.get(a));
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
