import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const contentRoot = path.join(root, 'docs');
const siteBase = '/rjmlaird-docs/';
const jsonPath = path.join(outDir, 'files.json');
const htmlPath = path.join(outDir, 'index.html');

const ignore = new Set([
  '.git',
  '.github',
  'node_modules',
  'dist',
  '.DS_Store',
  'scripts',
  'package-lock.json',
  'package.json'
]);

const allowedExt = new Set([
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg'
]);

async function assertDir(p, label) {
  const stat = await fs.stat(p);
  if (!stat.isDirectory()) throw new Error(`${label} is not a directory: ${p}`);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const items = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (ignore.has(entry.name)) continue;

    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).split(path.sep).join('/');

    if (entry.isDirectory()) {
      const children = await walk(full);
      if (children.length) items.push({ type: 'folder', name: entry.name, path: rel, children });
      continue;
    }

    if (allowedExt.has(path.extname(entry.name).toLowerCase())) {
      items.push({ type: 'file', name: entry.name, path: rel });
    }
  }

  return items;
}

function countNodes(nodes) {
  let files = 0, folders = 0;
  for (const node of nodes) {
    if (node.type === 'file') files += 1;
    if (node.type === 'folder') {
      folders += 1;
      const c = countNodes(node.children || []);
      files += c.files;
      folders += c.folders;
    }
  }
  return { files, folders };
}

function validateJson(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object') throw new Error('Manifest is not a JSON object');
  if (!Array.isArray(parsed.tree)) throw new Error('Manifest tree must be an array');
  if (!parsed.counts || typeof parsed.counts.files !== 'number' || typeof parsed.counts.folders !== 'number') {
    throw new Error('Manifest counts are missing or invalid');
  }
  return parsed;
}

await assertDir(contentRoot, 'CONTENT_ROOT');

const tree = await walk(contentRoot);
const manifest = {
  title: 'Ryan Laird Docs',
  sourceRoot: 'docs',
  siteBase,
  counts: countNodes(tree),
  tree
};

const manifestText = JSON.stringify(manifest, null, 2);
validateJson(manifestText);

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(jsonPath, manifestText, 'utf8');

const reread = await fs.readFile(jsonPath, 'utf8');
validateJson(reread);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <base href="${siteBase}" />
  <title>Ryan Laird Docs</title>
</head>
<body>
  <h1>Ryan Laird Docs</h1>
  <div id="meta">Loading…</div>
  <input id="search" type="search" placeholder="Filter filenames and folders…" />
  <div id="app">Loading…</div>
  <script>
    const jsonUrl = '/rjmlaird-docs/files.json';

    function fileHref(relPath) {
      return new URL(relPath.split('/').map(encodeURIComponent).join('/'), document.baseURI).pathname;
    }

    function renderNode(node) {
      if (node.type === 'file') {
        return '<a href="' + fileHref(node.path) + '" target="_blank" rel="noopener">' + node.name + '</a>';
      }
      return '<details open><summary>' + node.name + '</summary>' + (node.children || []).map(renderNode).join('') + '</details>';
    }

    fetch(jsonUrl)
      .then(async r => {
        const text = await r.text();
        const ct = r.headers.get('content-type') || '';
        if (!r.ok) throw new Error('files.json request failed: ' + r.status + ' ' + r.statusText + ' :: ' + text.slice(0, 120));
        if (!ct.includes('application/json')) throw new Error('Expected JSON but got ' + ct + ' :: ' + text.slice(0, 120));
        return JSON.parse(text);
      })
      .then(data => {
        const counts = data.counts || { files: 0, folders: 0 };
        document.getElementById('meta').textContent = 'Source: ' + (data.sourceRoot || '') + ' | Files: ' + counts.files + ' | Folders: ' + counts.folders;
        document.getElementById('app').innerHTML = (data.tree || []).map(renderNode).join('');
      })
      .catch(err => {
        document.getElementById('app').textContent = err.message;
      });
  </script>
</body>
</html>`;

await fs.writeFile(htmlPath, html, 'utf8');
