// Data for the Book 2 weapon pages (book2-weapons.njk): every weapon of book2.json in book order, with its danger
// level and availability spelled out from the legend, its previous/next neighbours and its picture if one exists.
import fs from 'node:fs';
import { findImage } from './images.js';

const { book2 } = JSON.parse(fs.readFileSync(new URL('./book2.json', import.meta.url), 'utf8'));
const danger = Object.fromEntries(book2.legend.danger.items.map((d) => [d.code, d]));
const availability = Object.fromEntries(book2.legend.availability.items.map((a) => [a.name, a]));

const weapons = [];
book2.sections.forEach((section, i) => {
  const chapter = { id: section.id, title: section.title, number: i + 1 };
  for (const entry of section.entries) {
    weapons.push({
      ...entry,
      chapter,
      dangerLevel: entry.danger ? danger[entry.danger] : null,
      availabilityLevel: entry.availability ? availability[entry.availability] : null,
      // public/assets/images/myproject/book2/<id>.<ext> when one has been added (see images.js)
      image: findImage('book2', entry.id),
    });
  }
});

const link = (w) => (w ? { id: w.id, name: w.name } : null);
weapons.forEach((w, i) => { w.prev = link(weapons[i - 1]); w.next = link(weapons[i + 1]); });

export default {
  book2Weapons: weapons,
  book2Legend: book2.legend,
};
