#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const errors = [];
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
  }
}
walk(docsRoot);
const relative = (file) => path.relative(root, file).split(path.sep).join('/');
const frontMatter = (text) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const values = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z_][\w-]*):\s*(.*?)\s*$/);
    if (field) values[field[1]] = field[2].replace(/^['"]|['"]$/g, '');
  }
  return values;
};
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const name = relative(file);
  const fm = frontMatter(source);
  if (!fm) errors.push(`${name}: missing YAML front matter`);
  else if (!fm.title) errors.push(`${name}: missing title in front matter`);
  const firstPartyRecord = name.startsWith('docs/catalogue/first-party/') && !['docs/catalogue/first-party/index.md', 'docs/catalogue/first-party/platform-services.md', 'docs/catalogue/first-party/customer-journeys.md', 'docs/catalogue/first-party/service-delivery-architecture.md', 'docs/catalogue/first-party/service-template.md'].includes(name);
  const integrationRecord = name.startsWith('docs/catalogue/external-integrations/');
  if (firstPartyRecord || integrationRecord) {
    if (fm && !fm.owner) errors.push(`${name}: record missing owner (use \`To confirm\` when unknown)`);
    if (fm && !fm.review_cycle) errors.push(`${name}: record missing review_cycle`);
    if (fm && !/^\d{4}-\d{2}-\d{2}$/.test(fm.last_reviewed ?? '')) errors.push(`${name}: last_reviewed must be YYYY-MM-DD`);
  }
  if (firstPartyRecord) {
    if (fm && !fm.visibility) errors.push(`${name}: service record missing visibility`);
    if (fm && !fm.lifecycle) errors.push(`${name}: service record missing lifecycle`);
  }
  // Validate local Markdown links. Docusaurus validates routes and anchors at build time.
  const linkRegex = /\]\(([^)]+)\)/g;
  for (const match of source.matchAll(linkRegex)) {
    let url = match[1].trim().replace(/^<|>$/g, '').split(/[?#]/, 1)[0];
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) continue;
    let target;
    if (url.startsWith('/docs/')) target = path.join(docsRoot, url.slice('/docs/'.length));
    else if (url.startsWith('/')) continue;
    else target = path.resolve(path.dirname(file), decodeURIComponent(url));
    const candidates = [target, `${target}.md`, path.join(target, 'index.md')];
    if (!candidates.some((candidate) => existsSync(candidate) && candidate.startsWith(docsRoot))) {
      errors.push(`${name}: broken local link target "${match[1]}"`);
    }
  }
}
const redirects = JSON.parse(readFileSync(path.join(root, 'data/legacy-doc-routes.json'), 'utf8'));
const seenRedirects = new Set();
for (const redirect of redirects) {
  if (!redirect.from?.startsWith('/docs/') || !redirect.to?.startsWith('/docs/')) {
    errors.push(`legacy redirect must use a /docs/ route: ${JSON.stringify(redirect)}`);
    continue;
  }
  if (seenRedirects.has(redirect.from)) errors.push(`duplicate legacy redirect source: ${redirect.from}`);
  seenRedirects.add(redirect.from);
  const target = redirect.to.slice('/docs/'.length);
  const targetFile = path.join(docsRoot, `${target}.md`);
  const targetIndex = path.join(docsRoot, target, 'index.md');
  if (!existsSync(targetFile) && !existsSync(targetIndex)) errors.push(`legacy redirect target does not exist: ${redirect.to}`);
}

if (errors.length) {
  console.error(`Documentation checks failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Documentation source checks passed (${files.length} Markdown files).`);
