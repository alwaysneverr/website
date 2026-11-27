// Subgroups of Book 1: entries of the book that are a heading over their members, not a character. "Ancient Ones"
// holds Roy Nesis and Fleur De La Magika. The subgroup gets no page; each member gets a placeholder page.
// Used by book1-characters.11tydata.js and utils/check-data.js. book1.njk can't import this, so it lists the same
// ids itself; the data check makes sure the two lists match.
export const SUBGROUPS = ['ancient-ones'];

// A member's page id, from their name: "Fleur De La Magika" -> "fleur-de-la-magika" (the same as Eleventy's slugify
// for plain names, which book1.njk uses for the links)
export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
