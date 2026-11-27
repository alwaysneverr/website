// Data for the Book 1 character pages (book1-characters.njk): every entry of book1.json that has something
// to show, in book order, with its chapter and its previous/next neighbours. Entries that are only a name
// (Healers, Trapmakers...) get no page; the index lists them as plain names.
import fs from 'node:fs';
import { findImage } from './images.js';

const { book1 } = JSON.parse(fs.readFileSync(new URL('./book1.json', import.meta.url), 'utf8'));

// The Ancient ones' pages show their name in Ancient Script (the user's cipher font), with the meaning in brackets under it.
// The name is written without the brackets the book puts round deleted entries: "(Ancient Ohm)" -> "Ancient Ohm".
const isAncient = (id) => id.startsWith('ancient-');
const scriptName = (name) => name.replace(/[()]/g, '').trim();

// Entries whose members get placeholder pages of their own (just the name, until they're written), placed right
// after the entry. The members' names come from the book; nothing else is added to them.
const MEMBER_PAGES = new Set(['ancient-ones']);
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const characters = [];
book1.sections.forEach((section, i) => {
  const chapter = { id: section.id, title: section.title, number: i + 1 };
  const lists = [{ group: null, entries: section.entries }, ...section.groups.map((g) => ({ group: g.title, entries: g.entries }))];
  for (const { group, entries } of lists) {
    for (const entry of entries) {
      if (entry.bare) continue;
      // image: public/assets/images/myproject/book1/<id>.<ext> when one has been added (see images.js)
      const shownName = entry.edit ? entry.edit.name : entry.name;
      const members = MEMBER_PAGES.has(entry.id) ? entry.children.map((name) => ({ name, id: slug(name) })) : null;
      characters.push({
        ...entry, chapter, group, shownName, members,
        image: findImage('book1', entry.id),
        script: isAncient(entry.id) ? scriptName(shownName) : null,
      });
      for (const m of members || []) {
        characters.push({
          id: m.id, name: m.name, shownName: m.name, chapter, group,
          info: [], quote: [], attribution: null, skills: [], hidden: [], children: [],
          memberOf: { id: entry.id, name: shownName },
          image: findImage('book1', m.id),
          script: null,
        });
      }
    }
  }
});

// Neighbours for the page's previous/next links
const link = (c) => (c ? { id: c.id, name: c.shownName } : null);
characters.forEach((c, i) => { c.prev = link(characters[i - 1]); c.next = link(characters[i + 1]); });

// Two pages may not share an address
const ids = new Set();
for (const c of characters) { if (ids.has(c.id)) throw new Error(`Book 1: two pages with the id "${c.id}"`); ids.add(c.id); }

export default {
  book1Characters: characters,
  // The legend is shown above each character's skills
  book1Legend: book1.legend,
};
