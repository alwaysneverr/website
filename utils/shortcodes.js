// src/utils/shortcodes.js
import { gitEngine } from "../src/_data/gitDates.js";
import { DateTime } from "luxon";
import filters from "./filters.js";
import { isContentTag, tagSlug } from "./taxonomy.js";

function normalizeRepoPath(value) {
  if (!value) return "";
  return value.replace(/^\.\//, "").replace(/\\/g, "/").toLowerCase();
}

export default {
  reviewCard: function(itemData, viewIndex) {
    // 1. Centralized Global Fallback Assets Mapping
    const FALLBACK_IMAGE_PATH = "/assets/images/default-fallback.png";
    const title = itemData.data.title || `<code>${itemData.url}</code>`;
    const url = itemData.url || "#";
    const description = itemData.data.description || "";
    
    // Clean text truncation helper parameters
    const truncatedDesc = description.length > 120 ? description.slice(0, 120) + "…" : description;

    // 2. DYNAMIC COLOR MATRIX PROCESSING
    const scoreColor = filters.scoreColor(itemData.data.rating);

    // 3. MEDIA CATEGORIES TYPEFACE MAPPING
    const titleColor = filters.mediaColor(itemData.data.media);

    // 5. CATEGORY TAXONOMY BADGES LOOPS UTILITIES
    let tagsMarkup = "";
    if (itemData.data.tags) {
      const filteredTags = itemData.data.tags.filter(isContentTag);

      filteredTags.forEach(tag => {
        const tagUrl = `/tags/${tagSlug(tag)}/`;
        const tagText = tag.toLowerCase();

        let tagType = "default";
        if (tagText.includes("story") || tagText.includes("writing") || tagText.includes("creative")) {
          tagType = "fiction";
        } else if (tagText.includes("anime") || tagText.includes("movie") || tagText.includes("show") || tagText.includes("animation")) {
          tagType = "anime";
        } else if (tagText.includes("manga") || tagText.includes("book") || tagText.includes("novel")) {
          tagType = "manga";
        } else if (tagText.includes("gaming") || tagText.includes("dev") || tagText.includes("tech") || tagText.includes("game")) {
          tagType = "gaming";
        }

        tagsMarkup += `
          <object style="display: inline-block;">
            <a href="${tagUrl}" class="custom-menu__badge" data-tag-type="${tagType}" style="text-decoration: none;">
              ${tag}
            </a>
          </object>
        `;
      });
    }

    // 6. EXTRACT CONDITIONAL METADATA LABELS
    let subtitleMarkup = "";
    if (itemData.data.series || itemData.data.media) {
      const series = itemData.data.series || "";
      const media = itemData.data.media || "";
      subtitleMarkup = `<span class="custom-menu__series-subtitle">${series} ${media}</span>`;
    }

    const numericRating = itemData.data.rating ? parseInt(itemData.data.rating, 10) : 0;
    const scoreClassModifier = numericRating === 10 ? ' custom-menu__score--perfect' : '';

    const scoreMarkup = itemData.data.rating 
  ? `<span class="custom-menu__score${scoreClassModifier}">★ ${itemData.data.rating}/10</span>` 
  : "";
    const badgeLabel = itemData.data.rating ? "Review" : "Article";

    // 7. PROCESS NATIVE CALENDAR TIMESTAMPS
    let htmlDate = "";
    let readableDate = "";
    if (itemData.date) {
      try {
        const dateObj = new Date(itemData.date);
        htmlDate = dateObj.toISOString().split('T')[0];
        readableDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch(e) {
        console.warn("Date rendering bypassed for row item:", title);
      }
    }

    const imageSource = itemData.data.images ? itemData.data.images : FALLBACK_IMAGE_PATH;
    const imageClass = itemData.data.images ? "custom-menu__thumb" : "custom-menu__thumb custom-menu__thumb--fallback";
    const imageAlt = itemData.data.imagesalt || title;
    const archiveUrlTarget = itemData.data.rating ? "/reviews/" : "/posts/";

    const badgeLabelMarkup = `
      <object style="display: inline-block;">
        <a href="${archiveUrlTarget}" class="custom-menu__badge" data-tag-type="default" style="text-decoration: none;">
          ${badgeLabel}
        </a>
      </object>
    `;

    // 8. COMPILING COMPONENT STRING (FIXED VARIABLE ASSIGNMENTS)
    return `
      <li class="custom-menu__item" style="--score-color: ${scoreColor}; --title-color: ${titleColor}; height: auto;">
        <a href="${url}" class="custom-menu__link custom-menu__link--has-media" style="text-decoration: none; padding: 20px;">
          
          <div class="custom-menu__thumb-wrapper">
            <img class="${imageClass}" src="${imageSource}" alt="${imageAlt}">
          </div>
          
          <div class="custom-menu__meta">
            <h2 class="custom-menu__text" style="-webkit-line-clamp: 1; margin: 0 0 4px 0;">${title}</h2>
            ${subtitleMarkup}
            ${description ? `<p style="font-size: 0.9rem; color: var(--nav-color-muted) !important; margin: 0 0 12px 0; line-height: 1.4;">${truncatedDesc}</p>` : ""}
            
            <div class="custom-menu__row" style="flex-wrap: wrap; gap: 8px 16px;">
              <time class="custom-menu__date" datetime="${htmlDate}">${readableDate}</time>
              ${badgeLabelMarkup}
              ${scoreMarkup}
              <div class="review-tags-container" style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                ${tagsMarkup}
              </div>
            </div>
          </div>
          
          <span class="custom-menu__indicator"></span>
        </a>
      </li>
    `;
  },
  
  divider: function() {
    const activeContext = this.ctx || this.page?.data;
    const storyIcon = activeContext?.story_icon || "default-break";
    const title = activeContext?.title || "Story Section";

    return `
<div class="fiction-scene-separator" role="presentation">
  <img src="/assets/icons/${storyIcon}.svg" class="fiction-scene-separator__icon filter" alt="${title} concept divider" loading="lazy">
</div>
    `.trim();
  },

  gitinfo: function(pubDate) {
    const inputPath = this.page?.inputPath;
    if (!inputPath) return "";

    const gitData = gitEngine.getLog(normalizeRepoPath(inputPath));

    // Ensure we have a valid tracked Git history block timestamp to parse
    if (gitData && gitData.unixTimestamp) {
      const gitDateTime = DateTime.fromMillis(gitData.unixTimestamp * 1000);
      const pubDateTime = DateTime.fromJSDate(pubDate);

      // Clean fallback check: If the last update matches the publish date exactly, 
      // return empty so the template doesn't draw a duplicate timestamp on screen!
      if (gitDateTime.toFormat("d LLLL yyyy") === pubDateTime.toFormat("d LLLL yyyy")) {
        return "";
      }

      // Return a clean machine-readable ISO 8601 string: e.g. "2026-08-20T20:27:00.000Z"
      return gitDateTime.toISO();
    }

    return "";
  }
};
