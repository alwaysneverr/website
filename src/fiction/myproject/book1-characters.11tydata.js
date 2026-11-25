// Data for the Book 1 character pages (book1-characters.njk): every entry of book1.json that has something
// to show, in book order, with its chapter and its previous/next neighbours. Entries that are only a name
// (Healers, Trapmakers...) get no page; the index lists them as plain names.
import fs from 'node:fs';
import { findImage } from './images.js';

const { book1 } = JSON.parse(fs.readFileSync(new URL('./book1.json', import.meta.url), 'utf8'));

const characters = [];
book1.sections.forEach((section, i) => {
  const chapter = { id: section.id, title: section.title, number: i + 1 };
  const lists = [{ group: null, entries: section.entries }, ...section.groups.map((g) => ({ group: g.title, entries: g.entries }))];
  for (const { group, entries } of lists) {
    for (const entry of entries) {
      if (entry.bare) continue;
      // image: public/assets/images/myproject/book1/<id>.<ext> when one has been added (see images.js)
      characters.push({ ...entry, chapter, group, shownName: entry.edit ? entry.edit.name : entry.name, image: findImage('book1', entry.id) });
    }
  }
});

// Neighbours for the page's previous/next links
const link = (c) => (c ? { id: c.id, name: c.shownName } : null);
characters.forEach((c, i) => { c.prev = link(characters[i - 1]); c.next = link(characters[i + 1]); });

export default {
  book1Characters: characters,
  // The legend is shown above each character's skills
  book1Legend: book1.legend,
};
