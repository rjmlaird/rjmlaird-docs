// scripts/generate-catalogue.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { z } from 'zod';

const Item = z.object({
  slug: z.string(),
  title: z.string(),
  subject: z.string(),
  status: z.enum(['Planned', 'In progress', 'Active']),
  summary: z.string(),
  url: z.string().url().optional(),
  source: z.string().url().optional(),
  stack: z.array(z.string()).default([]),
  updated: z.string(), // ISO date
});
const Manifest = z.object({ version: z.literal(1), items: z.array(Item) });

const SOURCES = {
  labs: 'https://labs.rjmlaird.co.uk/manifest.json',
  tools: 'https://tools.rjmlaird.co.uk/manifest.json',
  apps: 'https://apps.rjmlaird.co.uk/manifest.json',
};

// Escape characters that break Docusaurus MDX parsing and markdown tables
const esc = (s) =>
  s.replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');

async function load(kind, url) {
  const snap = `data/snapshots/${kind}.json`;
  let raw;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw = await res.json();
    Manifest.parse(raw); // validate before overwriting the snapshot
    await mkdir('data/snapshots', { recursive: true });
    await writeFile(snap, JSON.stringify(raw, null, 2));
  } catch (err) {
    if (err instanceof z.ZodError) throw err; // bad schema: fail loudly
    console.warn(`⚠ ${kind}: fetch failed (${err.message}); using snapshot`);
    raw = JSON.parse(await readFile(snap, 'utf8'));
  }
  return Manifest.parse(raw).items;
}

function render(kind, items) {
  const bySubject = Object.groupBy(items, (i) => i.subject);
  let md = `---\ntitle: ${kind[0].toUpperCase() + kind.slice(1)} catalogue\n---\n\n`;
  md += `:::note\nGenerated from the ${kind} manifest. Do not edit by hand.\n:::\n\n`;
  for (const [subject, list] of Object.entries(bySubject).sort()) {
    md += `## ${esc(subject)}\n\n| Name | Status | Stack | Updated |\n|---|---|---|---|\n`;
    for (const i of list.sort((a, b) => b.updated.localeCompare(a.updated))) {
      const name = i.url ? `[${esc(i.title)}](${i.url})` : esc(i.title);
      md += `| ${name} | ${i.status} | ${esc(i.stack.join(', '))} | ${i.updated} |\n`;
    }
    md += '\n';
  }
  return md;
}

await mkdir('docs/reference/catalogue', { recursive: true });
for (const [kind, url] of Object.entries(SOURCES)) {
  const items = await load(kind, url);
  await writeFile(`docs/reference/catalogue/${kind}.md`, render(kind, items));
}