#!/usr/bin/env node
/**
 * Public-content safety scan.
 *   node scripts/public-safety-scan.mjs          scan source content and data
 *   node scripts/public-safety-scan.mjs --dist   also scan the built site in dist/
 * Exit code 1 on any error-level finding. Warnings are printed but do not fail.
 */
import fs from 'node:fs';
import path from 'node:path';
import { RULES, loadLocalTerms, scanText } from './lib/safety.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
process.chdir(root);
const rules = [...RULES, ...loadLocalTerms()];
const walk = (d, skip = []) => !fs.existsSync(d) ? [] : fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  if (skip.some((s) => p.includes(s))) return [];
  return e.isDirectory() ? walk(p, skip) : [p];
});
const targets = [
  ...walk('src', ['node_modules']),
  ...walk('data'), ...walk('public'), ...walk('deploy', ['generated']), ...walk('templates'),
  'astro.config.mjs', 'package.json', 'README.md',
].filter((f) => fs.existsSync(f) && /\.(md|mdx|json|astro|ts|mjs|txt|yml|yaml|jsonc|css|svg|toml|conf|caddy)$/.test(f) || f === 'deploy/Caddyfile');
if (process.argv.includes('--dist')) {
  if (!fs.existsSync('dist')) { console.error('dist/ not found: run the build first'); process.exit(2); }
  const all = walk('dist');
  for (const f of all) {
    if (/\.map$/.test(f) || /(^|\/)\.(env|git)/.test(f)) { console.error(`ERROR forbidden file in build output: ${f}`); process.exitCode = 1; }
  }
  targets.push(...all.filter((f) => /\.(html|xml|txt|json|svg)$/.test(f) && !f.includes('/pagefind/')));
}
// The ruleset itself and its tests mention the patterns they detect.
const SELF = new Set(['scripts/lib/safety.mjs', 'tests/safety.test.mjs']);
let errors = 0, warnings = 0;
for (const f of [...new Set(targets)]) {
  if (SELF.has(f)) continue;
  const text = fs.readFileSync(f, 'utf8');
  for (const x of scanText(text, rules)) {
    // Generated board/build pages quote public GitHub content; hex ids in hashed asset names are not secrets.
    const tag = x.warn ? 'WARN ' : 'ERROR';
    console.log(`${tag} ${f}:${x.line} [${x.id}] ${x.why}: ${x.text}`);
    x.warn ? warnings++ : errors++;
  }
}
console.log(`\nPublic-safety scan: ${new Set(targets).size} files, ${errors} error(s), ${warnings} warning(s).`);
if (errors) process.exit(1);
