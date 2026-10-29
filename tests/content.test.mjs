import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('repo registry includes core documentation repo', () => {
  const project = fs.readFileSync('src/content/repos/rjmlaird-docs.md', 'utf8');
  assert.match(project, /title: "Docs"/);
  assert.match(project, /https:\/\/github\.com\/rjmlaird\/rjmlaird-docs/);
});

test('public site has canonical domain file', () => {
  assert.equal(fs.readFileSync('public/CNAME', 'utf8').trim(), 'docs.rjmlaird.co.uk');
});
