#!/usr/bin/env node
// Generates docs/catalogue/generated/subdomain-catalogue.md from data/subdomains.json.
// No dependencies, no network access. Use --check to fail if the committed output is stale.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, relative, resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'data/subdomains.json';
const SCHEMA = 'schemas/subdomains.schema.json';
const OUTPUT = 'docs/catalogue/generated/subdomain-catalogue.md';
const check = process.argv.includes('--check');

const fail = (errors) => {
  console.error(`Catalogue validation failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
};
const readJson = (p) => {
  try { return JSON.parse(readFileSync(resolve(root, p), 'utf8')); }
  catch (e) { fail([`cannot read ${p}: ${e.message}`]); }
};

const catalogue = readJson(SOURCE);
const schema = readJson(SCHEMA);
const item = schema.properties.subdomains.items;
const errors = [];

// Top level
for (const k of schema.required) if (!(k in catalogue)) errors.push(`missing top-level "${k}"`);
if (!/^\d+\.\d+\.\d+$/.test(catalogue.version ?? '')) errors.push('version must be semver');
if (!/^\d{4}-\d{2}-\d{2}$/.test(catalogue.updated ?? '')) errors.push('updated must be YYYY-MM-DD');
if (!Array.isArray(catalogue.subdomains)) fail([...errors, 'subdomains must be an array']);

// Records: required keys, no unknown keys, controlled values come from the schema
const seenSlugs = new Set(), seenHosts = new Set();
const frontMatter = (file) => {
  const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*?)\s*$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return out;
};
for (const r of catalogue.subdomains) {
  const id = r.slug ?? '(no slug)';
  for (const k of item.required) if (!(k in r)) errors.push(`${id}: missing "${k}"`);
  for (const k of Object.keys(r)) if (!(k in item.properties)) errors.push(`${id}: unknown field "${k}"`);
  for (const [k, def] of Object.entries(item.properties)) if (def.enum && k in r && !def.enum.includes(r[k])) errors.push(`${id}: ${k} "${r[k]}" not in [${def.enum.join(', ')}]`);
  if (typeof r.publish !== 'boolean') errors.push(`${id}: publish must be boolean`);
  if (!/^[a-z0-9-]+$/.test(r.slug ?? '')) errors.push(`${id}: invalid slug`);
  if (seenSlugs.has(r.slug)) errors.push(`${id}: duplicate slug`); seenSlugs.add(r.slug);
  if (r.hostname !== null && r.hostname !== undefined) {
    if (seenHosts.has(r.hostname)) errors.push(`${id}: duplicate hostname`); seenHosts.add(r.hostname);
    const expected = `${r.slug}.${catalogue.domain}`;
    if (r.slug !== 'web' && r.hostname !== expected) errors.push(`${id}: hostname must be ${expected}`);
  }
  if (r.documentation) {
    if (!r.documentation.endsWith('.md')) errors.push(`${id}: documentation must end in .md`);
    const file = resolve(root, 'docs', r.documentation);
    if (!existsSync(file)) errors.push(`${id}: documentation file docs/${r.documentation} not found`);
    else {
      const fm = frontMatter(file);
      if (fm.visibility !== r.visibility) errors.push(`${id}: page visibility "${fm.visibility}" differs from catalogue "${r.visibility}"`);
      if (fm.lifecycle !== r.lifecycle) errors.push(`${id}: page lifecycle "${fm.lifecycle}" differs from catalogue "${r.lifecycle}"`);
    }
  }
}
if (errors.length) fail(errors);

// Output: published records only, sorted by hostname (concepts without one sort last, by slug)
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const sortKey = (r) => (r.hostname ? `0:${r.hostname}` : `1:${r.slug}`);
const rows = catalogue.subdomains.filter((r) => r.publish === true)
  .sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : sortKey(a) > sortKey(b) ? 1 : 0));
const fromDir = posix.dirname(OUTPUT);
const link = (r) => r.documentation ? `[Page](${posix.relative(fromDir, posix.join('docs', r.documentation))})` : '—';

const lines = [
  '---',
  '# GENERATED FILE — DO NOT EDIT DIRECTLY.',
  `# Source: ${SOURCE}`,
  '# Command: pnpm run docs:generate',
  'title: Generated public service catalogue',
  'sidebar_label: Generated service catalogue',
  'description: Public reference table of the services in the rjmlaird.co.uk estate, generated from the canonical catalogue.',
  'sidebar_position: 3',
  '---',
  '',
  ':::caution[Generated file]',
  `This table is generated from \`${SOURCE}\`. Edit that file and run \`pnpm run docs:generate\`; changes made here are overwritten.`,
  ':::',
  '',
  `Catalogue version ${catalogue.version}, dated ${catalogue.updated}. Lifecycle shows intent unless the service page says it is verified. Definitions are in the [subdomain catalogue](../../platform/governance/subdomains.md).`,
  '',
  '| Hostname | Service | Purpose | Classification | Visibility | Lifecycle | Documentation |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| ${r.hostname ? `\`${r.hostname}\`` : 'Concept (no hostname)'} | ${cell(r.title)} | ${cell(r.purpose)} | ${r.classification} | ${r.visibility} | ${r.lifecycle} | ${link(r)} |`),
  '',
];
const out = lines.join('\n');
const target = resolve(root, OUTPUT);
if (check) {
  const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
  if (current !== out) { console.error(`${OUTPUT} is out of date. Run: pnpm run docs:generate`); process.exit(1); }
  console.log(`${OUTPUT} is up to date (${rows.length} records).`);
} else {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, out);
  console.log(`Wrote ${relative(root, target)} (${rows.length} records).`);
}
