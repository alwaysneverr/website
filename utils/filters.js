import { DateTime } from 'luxon'
import MarkdownIt from 'markdown-it'
import { isContentTag, tagSlug } from './taxonomy.js'
import { escapeHtml, wikipediaTitleHtml } from './japanese.js'
const mdCompiler = new MarkdownIt({
  html: true, // Guarantees your custom {% divider %} HTML fragments pass through un-shredded
  breaks: true,
  linkify: true
});

export default {
    // Writes every "Magika" in the text in Ancient Script (the user's cipher font). The text is escaped first, so the
    // result is safe to print with | safe. Screen readers get the plain word; hovering the script shows it.
    magika: function (text) {
        const escaped = String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return escaped.replace(/\bMagika\b/gi, (w) => `<span class="ancient-script cbook-ancient" aria-hidden="true" title="${w}">${w}</span><span class="cbook-sr">${w}</span>`);
    },
    // The items of a list whose id isn't one of ids
    withoutIds: function (list, ids) {
        return (list || []).filter((item) => !(ids || []).includes(item.id));
    },

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

    // True when a page with this URL is built. Draft pages only exist while serving, so links to them disappear in production.
    hasPage: function (collection, url) {
        return (collection || []).some((page) => page.url === url);
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

    /**
     * Field Notes sources: one row per card or board entry that names where its facts or image came from.
     * Reads `sources` (the note's sources; for a board entry, its moves) and `imageSource` on items and games.
     * Each source is a URL, or { url, label } when the site's name alone isn't clear enough.
     * Entries sharing a name (the same beer in several volumes) become one row, with their sources merged.
     */
    fieldNotesSources: function (notes) {
        const toLink = (source) => {
            const url = typeof source === "string" ? source : source.url;
            let host = url;
            try { host = new URL(url).hostname.replace(/^www\./, ""); } catch { /* Not a full URL: show it as written */ }
            // Friendlier names for the sites that come up most
            // Wikipedia links name their article, so two on one row can be told apart
            const wiki = host.match(/^([a-z]+)\.wikipedia\.org$/);
            let article = "";
            if (wiki) {
                try { article = decodeURIComponent(new URL(url).pathname.replace(/^\/wiki\//, "")).replace(/_/g, " "); } catch { /* Keep the bare site name */ }
            }
            const site = wiki ? (wiki[1] === "en" ? "Wikipedia" : wiki[1] === "ja" ? "Japanese Wikipedia" : `Wikipedia (${wiki[1]})`) : "";
            // Labels are HTML: a Japanese article title gets its readings and romaji (utils/japanese.js)
            const titleHtml = wiki && wiki[1] === "ja" ? wikipediaTitleHtml(article) : escapeHtml(article);
            const named = wiki ? (article ? `${site}: ${titleHtml}` : site)
                : { "commons.wikimedia.org": "Wikimedia Commons", "web.archive.org": "Internet Archive" }[host];
            const label = (typeof source === "object" && source.label) ? escapeHtml(source.label) : (named || escapeHtml(host));
            return { url, label };
        };
        const addUnique = (list, link) => { if (!list.some((l) => l.url === link.url)) list.push(link); };
        const rows = new Map();
        for (const vol of (notes && notes.volumes) || []) {
            const entries = [
                ...(vol.items || []).map((item) => ({ entry: item, name: item.name, kind: "item" })),
                ...(vol.games || []).map((game) => ({ entry: game, name: game.title || game.id, kind: "game" })),
            ];
            for (const { entry, name, kind } of entries) {
                const sources = [].concat(entry.sources || []);
                if (!sources.length && !entry.imageSource) continue;
                const key = `${kind}:${name}`;
                const row = rows.get(key) || { name, kind, volumes: [], sources: [], images: [] };
                if (!row.volumes.includes(vol.volume)) row.volumes.push(vol.volume);
                sources.forEach((s) => addUnique(row.sources, toLink(s)));
                if (entry.imageSource) addUnique(row.images, toLink(entry.imageSource));
                rows.set(key, row);
            }
        }
        return [...rows.values()];
    },

    randomItem: function (array) {
        if(!Array.isArray(array) || array.length === 0) {
            return null;
        }
        return array[Math.floor(Math.random() * array.length)];
    },

    // Field Notes quotes: wrap in quote marks, unless the quote already has its own at the edge, which would show
    // doubled as "“…”": it opens with one (“Dara.” “Huh?” …), or it's the end of a line split across moves
    // (… 8 Two Silver to checkmate.”). Same rule as quoted() in src/assets/js/modules/shogi/board.js.
    quoted: function (quote) {
        const text = String(quote ?? '');
        const plain = text.replace(/<[^>]+>/g, '');
        const count = (re) => (plain.match(re) || []).length;
        const ownMarks = /^[“"‘「『]/.test(plain) || count(/”/g) > count(/“/g);
        return ownMarks ? text : `"${text}"`;
    }
}
