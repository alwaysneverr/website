// Data for the Book 1 character pages (book1-characters.njk): every entry of book1.json that has something
// to show, in book order, with its chapter and its previous/next neighbours. Entries that are only a name
// (Healers, Trapmakers...) get no page; the index lists them as plain names.
import fs from 'node:fs';
import { findImage } from './images.js';

const { book1 } = JSON.parse(fs.readFileSync(new URL('./book1.json', import.meta.url), 'utf8'));

// Names written in Ancient Script (the user's cipher font): the Ancient ones (ids "ancient-...") and the members of the
// Ancient Ones. Their pages show the name in the script with the meaning in brackets under it. The script is written
// without the brackets the book puts round deleted entries: "(Ancient Ohm)" -> "Ancient Ohm".
const isAncient = (id) => id.startsWith('ancient-');
const scriptName = (name) => name.replace(/[()]/g, '').trim();

// Subgroups: entries of the book that are a heading over their members, not a character. "Ancient Ones" holds Roy Nesis
// and Fleur De La Magika. The subgroup gets no page; each member gets a placeholder page (just the name, until it's
// written) with the subgroup in its breadcrumb. book1.njk lists the same ids. The members' names come from the book.
const SUBGROUPS = ['ancient-ones'];
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const characters = [];
book1.sections.forEach((section, i) => {
  const chapter = { id: section.id, title: section.title, number: i + 1 };
  const lists = [{ group: null, entries: section.entries }, ...section.groups.map((g) => ({ group: g.title, entries: g.entries }))];
  for (const { group, entries } of lists) {
    for (const entry of entries) {
      if (SUBGROUPS.includes(entry.id)) {
        const subgroup = { id: entry.id, name: entry.name, script: isAncient(entry.id) ? scriptName(entry.name) : null };
        for (const name of entry.children) {
          const id = slug(name);
          characters.push({
            id, name, shownName: name, chapter, group, subgroup, placeholder: true,
            info: [], quote: [], attribution: null, skills: [], hidden: [], children: [],
            image: findImage('book1', id),
            script: subgroup.script ? scriptName(name) : null,
          });
        }
        continue;
      }
      if (entry.bare) continue;
      // image: public/assets/images/myproject/book1/<id>.<ext> when one has been added (see images.js)
      const shownName = entry.edit ? entry.edit.name : entry.name;
      characters.push({
        ...entry, chapter, group, shownName,
        image: findImage('book1', entry.id),
        script: isAncient(entry.id) ? scriptName(shownName) : null,
      });
    }
  }
});

// Neighbours for the page's previous/next links
const link = (c) => (c ? { id: c.id, name: c.shownName, script: c.script } : null);
characters.forEach((c, i) => { c.prev = link(characters[i - 1]); c.next = link(characters[i + 1]); });

// Two pages may not share an address
const ids = new Set();
for (const c of characters) { if (ids.has(c.id)) throw new Error(`Book 1: two pages with the id "${c.id}"`); ids.add(c.id); }

export default {
  book1Characters: characters,
  // The legend is shown above each character's skills
  book1Legend: book1.legend,
};
