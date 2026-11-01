#!/usr/bin/env node
/**
 * Editorial checks that the Zod schema and link validator do not cover.
 * Errors fail CI; warnings are advisory.
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(root, 'src/content/docs');
const GENERATED = ['repos', 'builds', 'boards', 'catalogue/generated'].map((d) => path.join(DOCS, d));
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(DOCS).filter((f) => /\.mdx?$/.test(f) && !GENERATED.some((g) => f.startsWith(g)));
let errors = 0, warnings = 0;
const staleDates = [];
const ownerTbc = [];
const err = (f, m) => { console.log(`ERROR ${path.relative(root, f)}: ${m}`); errors++; };
const warn = (f, m) => { console.log(`WARN  ${path.relative(root, f)}: ${m}`); warnings++; };

for (const f of files) {
  const rel = path.relative(DOCS, f);
  const raw = fs.readFileSync(f, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { err(f, 'missing front matter'); continue; }
  let fm; try { fm = YAML.parse(m[1]) ?? {}; } catch (e) { err(f, `invalid YAML: ${e.message.split('\n')[0]}`); continue; }
  const body = m[2];

  // file names: lowercase kebab-case
  const base = path.basename(f).replace(/\.mdx?$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(base)) err(f, `file name "${base}" must be lowercase kebab-case`);

  if (!fm.title) err(f, 'missing title');
  if (!fm.description) { if (fm.template !== 'splash') warn(f, 'missing description (used for search results and social cards)'); }
  else if (String(fm.description).length > 200) warn(f, `description is ${String(fm.description).length} characters; aim for 160 or fewer`);

  if (fm.reviewStatus === 'reviewed' && !fm.lastReviewed) err(f, 'reviewStatus is "reviewed" but lastReviewed is missing');
  if (fm.lastReviewed && fm.reviewStatus !== 'reviewed') staleDates.push(rel);
  if (fm.lastReviewed && Number.isNaN(new Date(fm.lastReviewed).getTime())) err(f, 'lastReviewed is not a date');
  if (fm.owner === 'To confirm') ownerTbc.push(rel);

  // body rules, outside code fences
  let fence = false, last = 1, lineNo = 0;
  for (const line of body.split('\n')) {
    lineNo++;
    if (/^(```|~~~)/.test(line.trim())) {
      if (!fence && !/^(```|~~~)\S/.test(line.trim())) warn(f, `line ${lineNo}: code fence without a language`);
      fence = !fence; continue;
    }
    if (fence) continue;
    const h = line.match(/^(#{1,6})\s+\S/);
    if (h) {
      const level = h[1].length;
      if (level === 1) err(f, `line ${lineNo}: body contains an H1; the page title is the H1`);
      else if (level > last + 1) err(f, `line ${lineNo}: heading jumps from H${last} to H${level}`);
      if (level > 1) last = level;
    }
    if (/\]\((?!https?:|mailto:|#|\/)[^)]*\.mdx?(?:#[^)]*)?\)/.test(line)) err(f, `line ${lineNo}: relative .md link; use an absolute site path such as /platform/overview/`);
    if (/!\[\s*\]\(/.test(line)) err(f, `line ${lineNo}: image without alt text`);
    if (/\{#[a-z0-9-]+\}/.test(line)) err(f, `line ${lineNo}: custom heading ids ({#id}) are not supported`);
    if (/^:::(info|warning|tip-)/.test(line)) err(f, `line ${lineNo}: use Starlight asides (note, tip, caution, danger)`);
  }
  if (!fence === false) err(f, 'unclosed code fence');
  if (/<(script|iframe|object|embed)\b/i.test(body)) err(f, 'raw <script>/<iframe>/<object>/<embed> are not allowed in content');
  if (rel.endsWith('.md') && /^import\s/m.test(body)) err(f, 'imports need an .mdx file');
}
if (staleDates.length) { console.log(`WARN  ${staleDates.length} page(s) have lastReviewed but reviewStatus is "needs-review". Either complete the review and set reviewStatus: reviewed, or remove the date.`); warnings++; }
if (ownerTbc.length) { console.log(`WARN  ${ownerTbc.length} page(s) have owner "To confirm".`); warnings++; }
console.log(`\nContent check: ${files.length} pages, ${errors} error(s), ${warnings} warning(s).`);
if (errors) process.exit(1);
