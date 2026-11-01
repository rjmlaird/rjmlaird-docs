import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const redirects = JSON.parse(fs.readFileSync('data/redirects.json', 'utf8'));
const exists = (url) => {
  const p = url.replace(/^\/|\/$/g, '');
  const base = `src/content/docs/${p}`;
  return p === '' || ['.md', '.mdx', '/index.md', '/index.mdx'].some((s) => fs.existsSync(base + s));
};
test('redirects have unique sources and no loops', () => {
  const from = redirects.map((r) => r.from);
  assert.equal(new Set(from).size, from.length);
  assert.ok(redirects.every((r) => r.from !== r.to));
});
test('every redirect target is a real page', () => {
  const bad = redirects.filter((r) => !exists(r.to) && !/^\/(repos|builds|boards)\//.test(r.to)).map((r) => r.to);
  assert.deepEqual(bad, []);
});
