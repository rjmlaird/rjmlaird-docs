import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('project registry includes core documentation project', () => {
  const project = fs.readFileSync('src/content/projects/rjmlaird-docs.md', 'utf8');
  assert.match(project, /title: "RJM Laird Docs"/);
  assert.match(project, /https:\/\/github\.com\/rjmlaird\/rjmlaird-docs/);
});

test('public site has canonical domain file', () => {
  assert.equal(fs.readFileSync('public/CNAME', 'utf8').trim(), 'docs.rjmlaird.co.uk');
});
