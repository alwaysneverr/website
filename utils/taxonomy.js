// Tags that organise collections rather than describe content
const STRUCTURAL_TAGS = ["all", "nav", "post", "posts", "review", "reviews", "fiction"];

export const isContentTag = (tag) => !STRUCTURAL_TAGS.includes(tag);

// Every /tags/<slug>/ page and link has to agree on this
export const tagSlug = (tag) => tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
