// Patterns for content that must never be published. Deliberately generic:
// estate-specific terms (private hostnames, drive names, home-network names)
// belong in the untracked file `.safety-terms.local`, one term or /regex/ per line,
// so this public repository never lists the private things it is guarding.
import fs from 'node:fs';

export const RULES = [
  { id: 'private-ipv4', re: /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}|169\.254\.\d{1,3}\.\d{1,3})\b/, why: 'private, CGNAT/Tailscale or link-local IPv4 address' },
  { id: 'private-ipv6', re: /\b(?:fd[0-9a-f]{2}|fe80)(?::[0-9a-f]{0,4}){2,7}\b/i, why: 'private or link-local IPv6 address' },
  { id: 'internal-hostname', re: /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:local|lan|internal|home\.arpa|ts\.net|corp|intranet)\b/i, why: 'internal hostname suffix' },
  { id: 'private-key', re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY(?: BLOCK)?-----/, why: 'private key block' },
  { id: 'github-token', re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b/, why: 'GitHub token' },
  { id: 'stripe-key', re: /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b|\bwhsec_[A-Za-z0-9]{16,}\b/, why: 'Stripe secret or webhook secret' },
  { id: 'aws-key', re: /\bAKIA[0-9A-Z]{16}\b/, why: 'AWS access key id' },
  { id: 'slack-token', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/, why: 'Slack token' },
  { id: 'jwt', re: /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\b/, why: 'JSON Web Token' },
  { id: 'bearer', re: /\bBearer\s+[A-Za-z0-9._~+/-]{24,}={0,2}/, why: 'bearer token' },
  { id: 'assigned-secret', re: /\b[A-Z][A-Z0-9_]*(?:SECRET|SECRET_KEY|TOKEN|PASSWORD|API_KEY|PRIVATE_KEY|ACCESS_KEY)\s*[=:]\s*["']?(?!\$|<|your|xxx|\.\.\.|example|placeholder|changeme)[A-Za-z0-9/_+=.-]{16,}/i, why: 'secret-looking value assigned to a secret-looking name' },
  { id: 'cloudflare-id', re: /\b(?:account_id|zone_id|database_id|namespace_id|kv_namespace_id)\s*["']?\s*[:=]\s*["']?[0-9a-f]{32}\b|\bdatabase_id\s*["']?\s*[:=]\s*["']?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i, why: 'Cloudflare account, zone or binding identifier' },
  { id: 'hex32', re: /(?<![0-9A-Za-z/_.-])[0-9a-f]{32}(?![0-9A-Za-z_-])/, why: '32-character hex string (possible Cloudflare account/zone id)', warn: true },
  { id: 'ssh-target', re: /\bssh\s+(?:-[A-Za-z]+\s+\S+\s+)*[a-z_][a-z0-9_-]*@[A-Za-z0-9.-]+/, why: 'ssh command naming a user and host' },
  { id: 'home-infra-term', re: /\b(?:bookstack|proxmox|unraid|truenas|synology|pi-?hole|portainer|home[- ]?lab|home server|homeserver)\b/i, why: 'term associated with private home infrastructure' },
  { id: 'personal-email', re: /\b[A-Za-z0-9._%+-]+@(?!rjmlaird\.co\.uk\b|impactorbit\.co\b|example\.(?:com|org)\b|users\.noreply\.github\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, why: 'email address outside the allowed domains', warn: true },
];

export function loadLocalTerms(file = '.safety-terms.local') {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l, i) => {
    const m = l.match(/^\/(.+)\/([a-z]*)$/);
    const re = m ? new RegExp(m[1], m[2]) : new RegExp(`\\b${l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return { id: `local-term-${i + 1}`, re, why: 'matches an entry in .safety-terms.local' };
  });
}

/** Returns findings: { id, why, line, text, warn }. A line containing `safety-ignore` is skipped. */
export function scanText(text, rules = RULES) {
  const findings = [];
  text.split('\n').forEach((line, idx) => {
    if (line.includes('safety-ignore')) return;
    line = line.replaceAll('safety-terms.local', 'safety-terms-file');
    for (const r of rules) {
      const m = line.match(r.re);
      if (m) findings.push({ id: r.id, why: r.why, line: idx + 1, text: m[0].slice(0, 60), warn: !!r.warn });
    }
  });
  return findings;
}
