export default {
    reviewCard: function(itemData, loopIndex = null) {
    // 1. Centralized Global Fallback Assets Mapping
    const FALLBACK_IMAGE_PATH = "/assets/images/default-fallback.png";
    
    const title = itemData.data.title || `<code>${itemData.url}</code>`;
    const url = itemData.url || "#";
    const description = itemData.data.description || "";
    
    // Clean text truncation helper parameters
    const truncatedDesc = description.length > 120 ? description.slice(0, 120) + "…" : description;

    // 2. DYNAMIC COLOR MATRIX PROCESSING
    let scoreColor = "#64748b";
    if (itemData.data.rating) {
      const numericRating = parseInt(itemData.data.rating, 10);
      if (numericRating >= 9) scoreColor = "#10b981";
      else if (numericRating >= 7) scoreColor = "#00f2fe";
      else if (numericRating >= 5) scoreColor = "#f59e0b";
      else scoreColor = "#ef4444";
    }

    let titleColor = "#f8fafc";
    if (itemData.data.media) {
      const mediaText = itemData.data.media.toLowerCase();
      if (mediaText.includes("light novel") || mediaText.includes("novel")) titleColor = "#c084fc";
      else if (mediaText.includes("anime") || mediaText.includes("movie") || mediaText.includes("show")) titleColor = "#38bdf8";
      else if (mediaText.includes("manga") || mediaText.includes("comic")) titleColor = "#fcd34d";
      else if (mediaText.includes("game") || mediaText.includes("visual novel")) titleColor = "#f43f5e";
    }

    // 3. NATIVE VIEW TRANSITIONS IDENTIFIERS
    const transitionThumb = loopIndex ? `style="view-transition-name: review-thumb-${loopIndex};"` : "";
    const transitionTitle = loopIndex ? `style="view-transition-name: review-title-${loopIndex};"` : "";

    // 4. CATEGORY TAXONOMY BADGES LOOPS UTILITIES
    let tagsMarkup = "";
    if (itemData.data.tags) {
      // Filter out structural collection core strings
      const filteredTags = itemData.data.tags.filter(tag => ["all", "nav", "post", "posts", "reviews", "fiction"].indexOf(tag) === -1);
      
      filteredTags.forEach(tag => {
        const sluggedTag = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const tagUrl = `/tags/${sluggedTag}/`;
        
        // Dynamic category color parameters
        let tagTheme = "rgba(255,255,255,0.05)";
        const tagText = tag.toLowerCase();
        if (tagText.includes("fiction") || tagText.includes("story")) tagTheme = "rgba(192, 132, 252, 0.15)";
        else if (tagText.includes("anime") || tagText.includes("movie")) tagTheme = "rgba(56, 189, 248, 0.15)";
        else if (tagText.includes("manga") || tagText.includes("novel")) tagTheme = "rgba(252, 211, 77, 0.15)";
        else if (tagText.includes("gaming") || tagText.includes("tech"))  tagTheme = "rgba(244, 63, 94, 0.15)";

        tagsMarkup += `
          <object style="display: inline-block;">
            <a href="${tagUrl}" class="custom-menu__badge" style="background: ${tagTheme} !important; color: #f8fafc !important; text-decoration: none; border-color: rgba(255,255,255,0.05) !important;">
              ${tag}
            </a>
          </object>
        `;
      });
    }

    // 5. EXTRACT CONDITIONAL METADATA LABELS
    let subtitleMarkup = "";
    if (itemData.data.series || itemData.data.media) {
      const series = itemData.data.series || "";
      const media = itemData.data.media || "";
      subtitleMarkup = `<span class="custom-menu__series-subtitle">${series} ${media}</span>`;
    }

    const scoreMarkup = itemData.data.rating ? `<span class="custom-menu__score">★ ${itemData.data.rating}/10</span>` : "";
    const badgeLabel = itemData.data.rating ? "Review" : "Article";

    // 6. PROCESS NATIVE CALENDAR TIMESTAMPS
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

    // 7. COMPILING COMPONENT STRING
    return `
      <li class="custom-menu__item" style="--score-color: ${scoreColor}; --title-color: ${titleColor}; height: auto;">
        <a href="${url}" class="custom-menu__link custom-menu__link--has-media" style="text-decoration: none; padding: 20px;">
          
          <div class="custom-menu__thumb-wrapper" ${transitionThumb}>
            <img class="${imageClass}" src="${imageSource}" alt="${imageAlt}">
          </div>

          <div class="custom-menu__meta" ${transitionTitle}>
            <h2 class="custom-menu__text" style="-webkit-line-clamp: 1; margin: 0 0 4px 0;">${title}</h2>
            ${subtitleMarkup}
            ${description ? `<p style="font-size: 0.9rem; color: var(--nav-color-muted); margin: 0 0 12px 0; line-height: 1.4;">${truncatedDesc}</p>` : ""}
            
            <div class="custom-menu__row" style="flex-wrap: wrap; gap: 8px 16px;">
              <time class="custom-menu__date" datetime="${htmlDate}">${readableDate}</time>
              <span class="custom-menu__badge" style="background: rgba(255,255,255,0.05); color: #f8fafc;">${badgeLabel}</span>
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
  }
}
