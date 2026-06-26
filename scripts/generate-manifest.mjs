import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const contentRoot = path.join(root, 'docs');
const siteBase = '/rjmlaird-docs/';

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
  if (!stat.isDirectory()) {
    throw new Error(`${label} is not a directory: ${p}`);
  }
}

function encodePathSegments(relPath) {
  return relPath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
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
      if (children.length) {
        items.push({
          type: 'folder',
          name: entry.name,
          path: rel,
          children
        });
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (allowedExt.has(ext)) {
      items.push({
        type: 'file',
        name: entry.name,
        path: rel
      });
    }
  }

  return items;
}

function countNodes(nodes) {
  let files = 0;
  let folders = 0;

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

await assertDir(contentRoot, 'CONTENT_ROOT');
const tree = await walk(contentRoot);
const counts = countNodes(tree);

await fs.mkdir(outDir, { recursive: true });

const manifest = {
  title: 'Ryan Laird Docs',
  sourceRoot: 'docs',
  siteBase,
  counts,
  tree
};

await fs.writeFile(
  path.join(outDir, 'files.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <base href="${siteBase}" />
  <title>Ryan Laird Docs</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: canvas;
      --fg: canvastext;
      --muted: color-mix(in oklab, canvastext 45%, canvas 55%);
      --line: color-mix(in oklab, canvastext 15%, canvas 85%);
      --card: color-mix(in oklab, canvastext 3%, canvas 97%);
    }

    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 2rem;
      max-width: 1200px;
      background: var(--bg);
      color: var(--fg);
    }

    h1 { margin: 0 0 0.5rem; }

    .meta {
      color: var(--muted);
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .toolbar {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0 1.5rem;
      padding: 1rem;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: var(--card);
    }

    .toolbar label {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.9rem;
    }

    input[type="search"] {
      min-width: min(420px, 90vw);
      padding: 0.7rem 0.85rem;
      border: 1px solid var(--line);
      border-radius: 10px;
      font: inherit;
      background: var(--bg);
      color: var(--fg);
    }

    details {
      margin-left: 1rem;
      padding-left: 0.5rem;
      border-left: 1px solid var(--line);
    }

    summary {
      cursor: pointer;
      user-select: none;
      padding: 0.2rem 0;
    }

    a.file {
      text-decoration: none;
      display: block;
      margin-left: 1.5rem;
      line-height: 1.65;
      color: inherit;
      word-break: break-word;
    }

    a.file:hover { text-decoration: underline; }

    .path {
      opacity: 0.7;
      font-size: 0.9rem;
      margin-left: 1.5rem;
      margin-top: -0.2rem;
      margin-bottom: 0.35rem;
      word-break: break-all;
    }

    .hidden { display: none !important; }
  </style>
</head>
<body>
  <h1>Ryan Laird Docs</h1>
  <div class="meta" id="meta">Loading…</div>

  <div class="toolbar">
    <label>
      Search
      <input id="search" type="search" placeholder="Filter filenames and folders…" />
    </label>
  </div>

  <div id="app">Loading…</div>

  <script>
    const icon = t => t === 'folder' ? '📁' : '📄';

    function fileHref(relPath) {
      return new URL(
        relPath.split('/').map(encodeURIComponent).join('/'),
        document.baseURI
      ).pathname;
    }

    function renderNode(node) {
      if (node.type === 'file') {
        return '<a class="file" data-name="' + node.name.toLowerCase() + '" data-path="' + node.path.toLowerCase() + '" href="' + fileHref(node.path) + '" target="_blank" rel="noopener">' + icon('file') + ' ' + node.name + '</a>';
      }

      const children = (node.children || []).map(renderNode).join('');
      return '<details open data-name="' + node.name.toLowerCase() + '" data-path="' + node.path.toLowerCase() + '"><summary>' + icon('folder') + ' ' + node.name + '</summary><div class="path">' + node.path + '</div>' + children + '</details>';
    }

    function setVisible(el, visible) {
      el.classList.toggle('hidden', !visible);
    }

    function matches(el, q) {
      const name = el.dataset.name || '';
      const p = el.dataset.path || '';
      return name.includes(q) || p.includes(q);
    }

    function filterTree(q) {
      q = q.trim().toLowerCase();
      const nodes = [...document.querySelectorAll('details, a.file')];

      if (!q) {
        nodes.forEach(el => {
          setVisible(el, true);
          if (el.tagName === 'DETAILS') el.open = true;
        });
        return;
      }

      nodes.forEach(el => setVisible(el, false));

      const files = [...document.querySelectorAll('a.file')];
      const matchedFiles = files.filter(el => matches(el, q));

      matchedFiles.forEach(file => {
        setVisible(file, true);
        let parent = file.parentElement;
        while (parent && parent !== document.getElementById('app')) {
          if (parent.tagName === 'DETAILS') {
            setVisible(parent, true);
            parent.open = true;
          }
          parent = parent.parentElement;
        }
      });

      const detailNodes = [...document.querySelectorAll('details')];
      detailNodes.forEach(d => {
        const hasVisibleChild = [...d.querySelectorAll(':scope > a.file, :scope > details')].some(el => !el.classList.contains('hidden'));
        if (hasVisibleChild) setVisible(d, true);
      });
    }

    fetch('files.json')
      .then(r => r.json())
      .then(data => {
        const counts = data.counts || { files: 0, folders: 0 };
        document.getElementById('meta').textContent =
          'Source: ' + (data.sourceRoot || '') +
          ' | Files: ' + counts.files +
          ' | Folders: ' + counts.folders +
          ' | Base: ' + (data.siteBase || '');
        document.getElementById('app').innerHTML = (data.tree || []).map(renderNode).join('');
        document.getElementById('search').addEventListener('input', e => filterTree(e.target.value));
      })
      .catch(err => {
        document.getElementById('app').textContent = err.message;
      });
  </script>
</body>
</html>`;

await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
