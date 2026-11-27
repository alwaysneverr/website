// Checks the MYPROJECT book data (book1.json, book2.json) before every build and every dev-server rebuild, so a typo
// stops the build with a clear message instead of rendering a wrong or missing page. Run it alone with `npm run check`.
//
// What it checks:
//   - every field has the right shape (a missing or misspelt key, a list where text is expected, ...)
//   - ids are unique, and so are the anchors on the Book 1 list page (chapters, groups, plain names, subgroups)
//   - Book 1: "bare" (no page) is set exactly when an entry has nothing to show; usesHidden points at real hidden
//     passives; the counts match; the subgroups exist, and book1.njk lists the same ones as the data file
//   - Book 2: every weapon's danger level and availability are in the legend
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { SUBGROUPS, slug } from '../src/fiction/myproject/subgroups.js';

const DIR = new URL('../src/fiction/myproject/', import.meta.url);
const read = (name) => JSON.parse(fs.readFileSync(new URL(name, DIR), 'utf8'));

const text = z.string().min(1);
const lines = z.array(z.string());
const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be lowercase letters, digits and single hyphens');

/* ---- Book 1 ---- */

// A skill, or a label row between skills ("Paper Fruit Mode")
const skill = z.lazy(() => z.union([
  z.strictObject({ label: text }),
  z.strictObject({
    name: z.string(), // empty: a blank skill slot, as the book has them
    meta: lines,
    mark: z.enum(['*', '**']).nullable().optional(),
    text: lines,
    children: z.array(skill),
    code: z.literal(true).optional(),
  }),
]));

const hidden = z.strictObject({ label: text, name: text, meta: lines, text: z.string(), code: z.boolean().optional() });

const edit = z.strictObject({
  name: text,
  power: z.string().nullable(),
  bio: lines,
  tags: lines,
  skills: z.array(skill).nullable(), // null: the page shows the book's own skills
  usesHidden: z.array(z.number().int().nonnegative()),
});

const entry = z.strictObject({
  id,
  name: text,
  info: lines,
  quote: lines,
  attribution: z.string().nullable(),
  skills: z.array(skill),
  hidden: z.array(hidden),
  children: lines,
  edit: edit.optional(),
  bare: z.literal(true).optional(),
});

const group = z.strictObject({ id, title: text, intro: lines, entries: z.array(entry) });

const book1Schema = z.strictObject({
  book1: z.strictObject({
    title: text,
    subtitle: text,
    legend: lines,
    sections: z.array(z.strictObject({
      id,
      title: text,
      subtitle: z.string().nullable(),
      intro: lines,
      entries: z.array(entry),
      groups: z.array(group),
    })),
    counts: z.strictObject({ sections: z.number().int(), entries: z.number().int() }),
  }),
});

/* ---- Book 2 ---- */

const book2Schema = z.strictObject({
  book2: z.strictObject({
    title: text,
    subtitle: text,
    legend: z.strictObject({
      danger: z.strictObject({
        title: text,
        items: z.array(z.strictObject({ code: text, name: text, oldName: z.string().nullable() })),
      }),
      availability: z.strictObject({
        title: text,
        items: z.array(z.strictObject({ name: text, oldName: z.string().nullable(), text: z.string() })),
      }),
    }),
    sections: z.array(z.strictObject({
      id,
      title: text,
      // danger and availability are empty when the book doesn't give them yet
      entries: z.array(z.strictObject({ id, name: text, info: lines, danger: z.string(), availability: z.string(), skills: lines })),
    })),
  }),
});

/* ---- Checks ---- */

// "sections.3.entries.2.info" -> "sections[3].entries[2].info"
const where = (path) => path.map((p) => (typeof p === 'number' ? `[${p}]` : `.${p}`)).join('').replace(/^\./, '');

function shape(file, schema, data, problems) {
  const result = schema.safeParse(data);
  if (result.success) return true;
  for (const issue of result.error.issues) problems.push(`${file} › ${where(issue.path) || '(top)'}: ${issue.message}`);
  return false;
}

function unique(file, what, list, problems) {
  const seen = new Set();
  for (const value of list) {
    if (seen.has(value)) problems.push(`${file}: two ${what} are "${value}"`);
    seen.add(value);
  }
}

function checkBook1(problems) {
  const file = 'book1.json';
  const data = read(file);
  if (!shape(file, book1Schema, data, problems)) return;
  const { sections, counts } = data.book1;

  const all = [];
  sections.forEach((s, si) => {
    s.entries.forEach((e, ei) => all.push({ e, at: `sections[${si}].entries[${ei}]` }));
    s.groups.forEach((g, gi) => g.entries.forEach((e, ei) => all.push({ e, at: `sections[${si}].groups[${gi}].entries[${ei}]` })));
  });

  unique(file, 'entries\' ids', all.map(({ e }) => e.id), problems);

  // Anchors on the list page: chapters, groups, plain names and subgroups share one page
  const anchors = [
    ...sections.map((s) => s.id),
    ...sections.flatMap((s) => s.groups.map((g) => g.id)),
    ...all.filter(({ e }) => e.bare || SUBGROUPS.includes(e.id)).map(({ e }) => e.id),
  ];
  unique(file, 'anchors on the list page', anchors, problems);

  for (const { e, at } of all) {
    const label = `${file} › ${at} ("${e.name}")`;
    // bare = nothing to show, so no page (the rule in _local/myproject/build.mjs)
    const empty = !(e.info.length || e.quote.length || e.skills.length || e.children.length || e.hidden.length || e.edit);
    if (empty && !e.bare && !SUBGROUPS.includes(e.id)) problems.push(`${label}: has nothing to show, so it needs "bare": true`);
    if (!empty && e.bare) problems.push(`${label}: has content but is marked "bare", so its page won't be made`);
    for (const i of e.edit?.usesHidden || []) {
      if (i >= e.hidden.length) problems.push(`${label}: edit.usesHidden has ${i}, but there are only ${e.hidden.length} hidden passives`);
    }
  }

  if (counts.sections !== sections.length) problems.push(`${file}: counts.sections is ${counts.sections}, but there are ${sections.length} sections`);
  if (counts.entries !== all.length) problems.push(`${file}: counts.entries is ${counts.entries}, but there are ${all.length} entries`);

  // Subgroups: they exist, have members, and the members' pages don't clash with another page
  const pageIds = new Set(all.filter(({ e }) => !e.bare).map(({ e }) => e.id));
  for (const sg of SUBGROUPS) {
    const found = all.find(({ e }) => e.id === sg);
    if (!found) { problems.push(`subgroups.js: the subgroup "${sg}" isn't in ${file}`); continue; }
    if (!found.e.children.length) problems.push(`${file} › ${found.at}: the subgroup "${sg}" has no members`);
    for (const m of found.e.children) {
      if (pageIds.has(slug(m))) problems.push(`${file}: the subgroup member "${m}" would get the address of another page ("${slug(m)}")`);
    }
  }

  // book1.njk can't import JavaScript, so it lists the subgroups itself; the two lists must match
  const njk = fs.readFileSync(new URL('book1.njk', DIR), 'utf8');
  const listed = njk.match(/{%\s*set subgroups\s*=\s*(\[[^\]]*\])\s*%}/);
  if (!listed) problems.push('book1.njk: can\'t find the line {% set subgroups = [...] %}');
  else if (JSON.stringify(JSON.parse(listed[1]).sort()) !== JSON.stringify([...SUBGROUPS].sort())) {
    problems.push(`book1.njk lists the subgroups ${listed[1]}, but subgroups.js has ${JSON.stringify(SUBGROUPS)}`);
  }
}

function checkBook2(problems) {
  const file = 'book2.json';
  const data = read(file);
  if (!shape(file, book2Schema, data, problems)) return;
  const { sections, legend } = data.book2;
  const dangers = legend.danger.items.map((i) => i.code);
  const availabilities = legend.availability.items.map((i) => i.name);
  const all = sections.flatMap((s, si) => s.entries.map((e, ei) => ({ e, at: `sections[${si}].entries[${ei}]` })));

  unique(file, 'weapons\' ids', all.map(({ e }) => e.id), problems);
  unique(file, 'section ids', sections.map((s) => s.id), problems);
  for (const { e, at } of all) {
    const label = `${file} › ${at} ("${e.name}")`;
    if (e.danger && !dangers.includes(e.danger)) problems.push(`${label}: danger "${e.danger}" isn't in the legend (${dangers.join(', ')})`);
    if (e.availability && !availabilities.includes(e.availability)) problems.push(`${label}: availability "${e.availability}" isn't in the legend (${availabilities.join(', ')})`);
  }
}

// Throws one error listing every problem, so they can all be fixed in one go
export function checkData() {
  const problems = [];
  for (const check of [checkBook1, checkBook2]) {
    try { check(problems); } catch (err) { problems.push(`${check.name}: ${err.message}`); }
  }
  if (problems.length) {
    throw new Error(`The book data has ${problems.length} problem${problems.length > 1 ? 's' : ''}:\n  - ${problems.join('\n  - ')}`);
  }
}

// `node utils/check-data.js` (npm run check)
if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  try {
    checkData();
    console.log('Book data OK');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
