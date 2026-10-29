import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { sameBuilds, validateBuilds } from '../scripts/lib/builds.mjs';

// src/lib/*-core.ts is erasable TypeScript; Node 22.18+ can import it directly.
const hasTypeStripping = Boolean(process.features.typescript);
const skip = hasTypeStripping ? false : 'needs Node 22.18+ (TypeScript type stripping)';

const snapshot = JSON.parse(fs.readFileSync('data/builds.json', 'utf8'));

test('builds snapshot matches the API contract', () => {
  assert.deepEqual(validateBuilds(snapshot), []);
  assert.equal(snapshot.source, 'https://api.rjmlaird.co.uk/v1/builds');
});

test('validateBuilds reports bad responses', () => {
  assert.ok(validateBuilds(null).length > 0);
  assert.ok(validateBuilds({ schemaVersion: 2, builds: [] }).some((p) => /schemaVersion/.test(p)));
  assert.ok(validateBuilds({ schemaVersion: 1, total: 2, builds: [] }).some((p) => /total/.test(p)));

  const dupe = { id: 'tools/a', sourceId: 'a', type: 'tool', title: 'A', status: 'active' };
  const problems = validateBuilds({ schemaVersion: 1, total: 2, builds: [dupe, dupe] });
  assert.ok(problems.some((p) => /duplicate/.test(p)));

  const unknown = validateBuilds({ schemaVersion: 1, total: 1, builds: [{ ...dupe, type: 'widget' }] });
  assert.ok(unknown.some((p) => /unknown type/.test(p)));
});

test('sameBuilds ignores only the sync stamp', () => {
  assert.ok(sameBuilds(snapshot, { ...snapshot, syncedAt: '2030-01-01T00:00:00.000Z' }));
  assert.ok(!sameBuilds(snapshot, { ...snapshot, total: 31 }));
});

test('builds are split into labs, tools and apps by id prefix', { skip }, async () => {
  const core = await import('../src/lib/builds-core.ts');

  assert.equal(core.buildsOfKind(snapshot, 'labs').length, snapshot.builds.filter((b) => b.type === 'lab').length);
  assert.equal(core.buildsOfKind(snapshot, 'tools').length, snapshot.builds.filter((b) => b.type === 'tool').length);
  assert.equal(core.buildsOfKind(snapshot, 'apps').length, snapshot.builds.filter((b) => b.type === 'app').length);

  for (const build of snapshot.builds) {
    assert.equal(`${core.kindOf(build)}/${core.slugOf(build)}`, build.id);
    assert.equal(core.buildHref(build), `/builds/${build.id}/`);
  }
});

test('every build has exactly one route', { skip }, async () => {
  const core = await import('../src/lib/builds-core.ts');
  const hrefs = snapshot.builds.map((b) => core.buildHref(b));
  assert.equal(new Set(hrefs).size, hrefs.length);
});

test('group sections cover every build of a kind', { skip }, async () => {
  const core = await import('../src/lib/builds-core.ts');

  for (const { kind } of core.KINDS) {
    const sections = core.sectionsByGroup(snapshot, kind);
    const inSections = sections.flatMap((s) => s.builds.map((b) => b.id)).sort();
    const expected = core.buildsOfKind(snapshot, kind).map((b) => b.id).sort();
    assert.deepEqual(inSections, expected);
  }
});

test('builds sort by catalogue status order, then title', { skip }, async () => {
  const core = await import('../src/lib/builds-core.ts');
  const tools = core.buildsOfKind(snapshot, 'tools');
  const orders = tools.map((b) => core.statusMeta(snapshot, 'tools', b.status).order);

  assert.deepEqual(orders, [...orders].sort((a, b) => a - b));
  assert.equal(core.statusMeta(snapshot, 'labs', 'in-progress').label, 'In progress');
  assert.equal(core.statusMeta(snapshot, 'labs', 'on-hold').label, 'On hold');
});

test('repo records link to the builds they publish', { skip }, async () => {
  const core = await import('../src/lib/builds-core.ts');
  const tools = core.buildsForRepository(snapshot, 'https://github.com/rjmlaird/rjmlaird-tools/');
  assert.ok(tools.length > 0);
  assert.ok(tools.every((b) => b.type === 'tool'));
  assert.deepEqual(core.buildsForRepository(snapshot, undefined), []);
});
