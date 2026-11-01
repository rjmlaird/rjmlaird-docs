#!/usr/bin/env node
/**
 * Generates the data-driven pages from the committed JSON snapshots:
 *   data/subdomains.json     -> catalogue/generated/subdomain-catalogue.md
 *   data/github-repos.json   -> repos/index.md, repos/<slug>.md
 *   data/builds.json         -> builds/index.md, builds/<kind>.md, builds/<kind>/<slug>.md
 *   data/github-projects.json-> boards/index.md, boards/<slug>.md
 *
 * Output is gitignored. The build never calls an external API.
 * Only public repositories and public boards are written, and board items from
 * repositories that are not in the public list are masked.
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(root, 'src/content/docs');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
const slugify = (t) => String(t).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
const https = (u) => (u && !/^[a-z][a-z0-9+.-]*:/i.test(u) ? `https://${u}` : u);
const esc = (s = '') => String(s).replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, ' ').trim();
const label = (v) => { const s = String(v).replace(/-/g, ' '); return s.charAt(0).toUpperCase() + s.slice(1); };
const date = (v) => (v ? new Date(v).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '');
const errors = [];

for (const d of ['repos', 'builds', 'boards', 'catalogue/generated']) fs.rmSync(path.join(DOCS, d), { recursive: true, force: true });

function write(rel, front, body) {
  const file = path.join(DOCS, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const fm = { ...front, editUrl: false, kind: front.kind ?? 'catalogue' };
  fs.writeFileSync(file, `---\n${YAML.stringify(fm, { lineWidth: 0 })}---\n\n${body.trim()}\n`);
}
const generatedNote = (src) => `:::note[Generated page]\nBuilt from \`${src}\`. Edit the data or run the sync script; changes made to this page are overwritten.\n:::`;

// ---- Repositories --------------------------------------------------------------------
const reposData = read('data/github-repos.json');
const buildsData = read('data/builds.json');
const projectsData = read('data/github-projects.json');
const publicRepos = reposData.repositories.filter((r) => !r.isPrivate);
const publicFullNames = new Set(publicRepos.map((r) => r.fullName));
const seen = new Set();
const repoRows = [];
for (const repo of publicRepos) {
  const slug = slugify(repo.name);
  if (seen.has(slug)) { errors.push(`duplicate repo slug ${slug}`); continue; }
  seen.add(slug);
  const builds = buildsData.builds.filter((b) => b.repository?.replace(/\/$/, '') === repo.url);
  const facts = [
    ['Language', repo.language], ['Licence', repo.license ?? 'Not stated'], ['Default branch', repo.defaultBranch && `\`${repo.defaultBranch}\``],
    ['Created', date(repo.createdAt)], ['Last pushed', date(repo.pushedAt ?? repo.updatedAt)], ['Open issues', repo.openIssues],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '');
  const links = [`[Source on GitHub](${repo.url})`, repo.homepage && `[Homepage](${https(repo.homepage)})`].filter(Boolean).join(' · ');
  let body = `${esc(repo.description) || 'No description provided.'}\n\n${links}\n\n## Details\n\n| | |\n| --- | --- |\n${facts.map(([k, v]) => `| ${k} | ${esc(v)} |`).join('\n')}\n`;
  if (repo.topics?.length) body += `\n**Topics:** ${repo.topics.map((t) => `\`${t}\``).join(' ')}\n`;
  if (repo.isArchived) body += `\n:::caution[Archived]\nThis repository is archived and read-only.\n:::\n`;
  if (builds.length) {
    body += `\n## Published builds (${builds.length})\n\n| Build | Type | Status |\n| --- | --- | --- |\n`;
    body += builds.map((b) => `| [${esc(b.title)}](/builds/${b.id}/) | ${b.type} | ${label(b.status)} |`).join('\n') + '\n';
  }
  body += `\n${generatedNote('data/github-repos.json')}`;
  write(`repos/${slug}.md`, {
    title: repo.name, description: esc(repo.description) || `Source repository ${repo.name}.`,
    sidebar: { hidden: true }, lastUpdated: new Date(reposData.syncedAt),
  }, body);
  repoRows.push({ slug, repo, builds: builds.length });
}
repoRows.sort((a, b) => a.repo.name.localeCompare(b.repo.name));
write('repos/index.md', {
  title: 'Repositories', description: 'Public source repositories behind the rjmlaird.co.uk estate.', lastUpdated: new Date(reposData.syncedAt),
}, `Public source repositories owned by \`${reposData.owner}\`. A repository can publish many [builds](/builds/) (the tools repository publishes every tool, for instance) and a [board](/boards/) can track work across several repositories.\n\n| Repository | Description | Language | Builds | Last pushed |\n| --- | --- | --- | --- | --- |\n${repoRows.map(({ slug, repo, builds }) => `| [${esc(repo.name)}](/repos/${slug}/) | ${esc(repo.description)} | ${esc(repo.language ?? '')} | ${builds || ''} | ${date(repo.pushedAt ?? repo.updatedAt)} |`).join('\n')}\n\nSnapshot taken ${date(reposData.syncedAt)}. Private repositories are never listed.\n\n${generatedNote('data/github-repos.json')}`);

// ---- Builds --------------------------------------------------------------------------
const KINDS = [['apps', 'Apps', 'Maintained applications you can open and use.'], ['tools', 'Tools', 'Small, single-purpose utilities and calculators.'], ['labs', 'Labs', 'Experiments and interactive explainers, kept separate from production apps and tools.']];
const builds = buildsData.builds;
const kindOf = (b) => b.id.split('/')[0];
const slugOf = (b) => b.id.split('/').slice(1).join('/');
for (const [kind, title, blurb] of KINDS) {
  const cat = buildsData.catalogues[kind];
  const items = builds.filter((b) => kindOf(b) === kind);
  const order = (s) => cat?.statuses?.[s]?.order ?? 99;
  let body = `${blurb}\n\n${items.length} ${kind} · [Open ${title.toLowerCase()} catalogue ↗](${cat.origin}) · [Source repository ↗](${cat.repository})\n\n`;
  for (const g of cat.groups) {
    const gi = items.filter((b) => b.group === g.id).sort((a, b) => order(a.status) - order(b.status) || a.title.localeCompare(b.title));
    if (!gi.length) continue;
    body += `## ${g.name}\n\n${g.blurb ?? ''}\n\n| ${title.slice(0, -1)} | What it does | Status | Updated |\n| --- | --- | --- | --- |\n`;
    body += gi.map((b) => `| [${esc(b.title)}](/builds/${b.id}/) | ${esc(b.description)} | ${cat.statuses?.[b.status]?.label ?? label(b.status)} | ${date(b.updated)} |`).join('\n') + '\n\n';
  }
  const ungrouped = items.filter((b) => !cat.groups.some((g) => g.id === b.group));
  if (ungrouped.length) errors.push(`${kind}: ${ungrouped.length} builds with unknown group`);
  body += generatedNote('data/builds.json');
  write(`builds/${kind}.md`, { title, description: blurb, sidebar: { label: title, order: 2 }, lastUpdated: new Date(buildsData.syncedAt) }, body);

  for (const b of items) {
    const statusLabel = cat.statuses?.[b.status]?.label ?? label(b.status);
    const grp = cat.groups.find((g) => g.id === b.group)?.name ?? b.group;
    const links = [b.url && `[Open ${esc(b.title)} ↗](${b.url})`, b.source && `[Source ↗](${b.source})`, b.repository && `[Repository ↗](${b.repository})`].filter(Boolean).join(' · ');
    let pb = `${esc(b.description)}\n\n${links || 'No live surface yet.'}\n\n| | |\n| --- | --- |\n| Type | ${label(b.type)} |\n| Group | ${esc(grp)} |\n| Status | ${statusLabel} |\n| Updated | ${date(b.updated)} |\n`;
    if (b.tech?.length) pb += `| Built with | ${b.tech.map((t) => esc(t)).join(', ')} |\n`;
    pb += `\n[← All ${kind}](/builds/${kind}/)\n\n${generatedNote('data/builds.json')}`;
    write(`builds/${kind}/${slugOf(b)}.md`, { title: b.title, description: esc(b.description), sidebar: { hidden: true }, lastUpdated: new Date(b.updated) }, pb);
  }
}
const counts = KINDS.map(([k, t]) => `| [${t}](/builds/${k}/) | ${builds.filter((b) => kindOf(b) === k).length} |`).join('\n');
write('builds/index.md', { title: 'Builds', description: 'Apps, tools and labs published from the rjmlaird.co.uk estate.', sidebar: { order: 1 }, lastUpdated: new Date(buildsData.syncedAt) },
  `Builds are the things you can open and use: **apps**, **tools** and **labs**. They are listed in the public builds API and snapshotted here, so this page never depends on a live service.\n\n| Kind | Count |\n| --- | --- |\n${counts}\n\n\`\`\`bash title="Builds API"\ncurl -H 'accept: application/json' https://api.rjmlaird.co.uk/v1/builds\n\`\`\`\n\nSnapshot taken ${date(buildsData.syncedAt)} from \`${buildsData.source}\`.\n\n${generatedNote('data/builds.json')}`);

// ---- Boards --------------------------------------------------------------------------
const boards = projectsData.boards.filter((b) => b.isPublic && !b.closed);
const boardRows = [];
for (const b of boards) {
  const slug = b.slug || slugify(b.title);
  const items = b.items ?? [];
  const status = {};
  for (const i of items) { const s = i.fields?.Status ?? 'No status'; status[s] = (status[s] ?? 0) + 1; }
  let body = `${esc(b.description) || ''}\n\n[Open board on GitHub ↗](${b.url}) · ${items.length} items · last updated ${date(b.updatedAt)}\n\n`;
  if (items.length) {
    body += `## Status\n\n| Status | Items |\n| --- | --- |\n${Object.entries(status).map(([k, v]) => `| ${esc(k)} | ${v} |`).join('\n')}\n\n## Items\n\n| Item | Type | State | Status |\n| --- | --- | --- | --- |\n`;
    body += items.map((i) => {
      const masked = i.repo && !publicFullNames.has(i.repo);
      const title = masked ? 'Private item' : esc(i.title);
      const link = !masked && i.url ? `[${title}](${i.url})` : title;
      return `| ${link} | ${i.kind === 'draft' ? 'Draft' : 'Issue'} | ${i.state ? label(i.state.toLowerCase()) : ''} | ${esc(i.fields?.Status ?? '')} |`;
    }).join('\n') + '\n\n';
  } else body += 'No items yet.\n\n';
  body += generatedNote('data/github-projects.json');
  write(`boards/${slug}.md`, { title: b.title, description: esc(b.description).slice(0, 200), sidebar: { hidden: true }, lastUpdated: new Date(b.updatedAt) }, body);
  boardRows.push({ slug, b, n: items.length });
}
write('boards/index.md', { title: 'Boards', description: 'Public GitHub Projects boards that plan work across the estate.', lastUpdated: new Date(projectsData.syncedAt) },
  `Public GitHub Projects (v2) boards owned by \`${projectsData.owner}\`. Private boards are never included.\n\n| Board | What it plans | Items | Updated |\n| --- | --- | --- | --- |\n${boardRows.map(({ slug, b, n }) => `| [${esc(b.title)}](/boards/${slug}/) | ${esc((b.description ?? '').slice(0, 140))} | ${n} | ${date(b.updatedAt)} |`).join('\n')}\n\nSnapshot taken ${date(projectsData.syncedAt)}.\n\n${generatedNote('data/github-projects.json')}`);

// ---- Subdomain catalogue -------------------------------------------------------------
const subs = read('data/subdomains.json');
const pageFront = (docPath) => {
  const f = path.join(DOCS, docPath.replace(/\.md$/, '.md'));
  if (!fs.existsSync(f)) return null;
  return YAML.parse(fs.readFileSync(f, 'utf8').match(/^---\n([\s\S]*?)\n---/)[1]);
};
const rows = [];
for (const s of subs.subdomains.filter((x) => x.publish).sort((a, b) => (a.hostname ?? 'zzz').localeCompare(b.hostname ?? 'zzz'))) {
  let doc = '—';
  if (s.documentation) {
    const fm = pageFront(s.documentation);
    if (!fm) errors.push(`${s.slug}: documentation page ${s.documentation} does not exist`);
    else {
      if (fm.visibility && fm.visibility !== s.visibility) errors.push(`${s.slug}: visibility is ${s.visibility} in the catalogue but ${fm.visibility} on its page`);
      if (fm.lifecycle && fm.lifecycle !== s.lifecycle) errors.push(`${s.slug}: lifecycle is ${s.lifecycle} in the catalogue but ${fm.lifecycle} on its page`);
      doc = `[Page](/catalogue/${s.documentation.replace(/^catalogue\//, '').replace(/\.md$/, '')}/)`;
    }
  }
  rows.push(`| ${s.hostname ? `\`${s.hostname}\`` : 'Concept (no hostname)'} | ${esc(s.title)} | ${esc(s.purpose)} | ${s.classification} | ${s.visibility} | ${s.lifecycle} | ${doc} |`);
}
write('catalogue/generated/subdomain-catalogue.md', {
  title: 'Generated public service catalogue', sidebar: { label: 'Generated service catalogue', order: 3 },
  description: 'Public reference table of the services in the rjmlaird.co.uk estate, generated from the canonical catalogue.',
  status: 'active', lastUpdated: new Date(subs.updated), kind: 'catalogue',
}, `${generatedNote('data/subdomains.json')}\n\nCatalogue version ${subs.version}, dated ${subs.updated}. Lifecycle shows intent unless the service page says it is verified. Definitions are in the [subdomain catalogue](/platform/governance/subdomains/).\n\n| Hostname | Service | Purpose | Classification | Visibility | Lifecycle | Documentation |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join('\n')}`);

if (errors.length) { console.error('Generation problems:\n - ' + errors.join('\n - ')); process.exit(1); }
console.log(`generated: ${repoRows.length} repos, ${builds.length} builds, ${boardRows.length} boards, ${rows.length} services`);
