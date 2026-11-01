import test from 'node:test';
import assert from 'node:assert/strict';
import { scanText } from '../scripts/lib/safety.mjs';

const ids = (t) => scanText(t).map((f) => f.id);
test('flags private addresses and internal hosts', () => {
  assert.ok(ids('server at 192.168.1.20').includes('private-ipv4'));
  assert.ok(ids('node 100.101.2.3').includes('private-ipv4'));
  assert.ok(ids('nas.home.arpa').includes('internal-hostname'));
});
test('flags secrets and identifiers', () => {
  assert.ok(ids('token ghp_' + 'a'.repeat(36)).includes('github-token'));
  assert.ok(ids('account_id = "' + 'a1'.repeat(16) + '"').includes('cloudflare-id'));
  assert.ok(ids('STRIPE_SECRET_KEY=' + 'Qk9zT2'.repeat(3)).includes('assigned-secret'));
});
test('allows documented placeholders and public hosts', () => {
  assert.deepEqual(ids('wrangler secret put STRIPE_SECRET_KEY'), []);
  assert.deepEqual(ids('http://localhost:4321 and docs.rjmlaird.co.uk'), []);
  assert.deepEqual(ids('192.168.1.1 safety-ignore'), []);
});
