// Finds the picture for a MYPROJECT page, if one has been added.
// To add one, save it as public/assets/images/myproject/<book>/<page-id>.<ext>, where <page-id> is the last part of
// the page's address (/fiction/myproject/book1/gears/ -> book1/gears.png). Any of the extensions below works.
// The dev server reads this once at start-up, so restart it after adding a picture.
import fs from 'node:fs';

const EXTENSIONS = ['avif', 'webp', 'png', 'jpg', 'jpeg', 'gif', 'svg'];
const PUBLIC = new URL('../../../public/', import.meta.url);

export function findImage(book, id) {
  for (const ext of EXTENSIONS) {
    const rel = `assets/images/myproject/${book}/${id}.${ext}`;
    if (fs.existsSync(new URL(rel, PUBLIC))) return '/' + rel;
  }
  return null;
}
