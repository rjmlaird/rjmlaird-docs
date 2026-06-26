import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const siteBase = '/rjmlaird-docs/';

const ignore = new Set([
  '.git', '.github', 'node_modules', 'dist', '.DS_Store', 'scripts',
  'package-lock.json', 'package.json'
]);

const allowedExt = new Set([
  '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'
]);

async function findContentRoot() {
  const candidates = ['certificates', 'docs', 'public', '.'];
  for (const name of candidates) {
    const p = path.join(root, name);
    try {
      const stat = await fs.stat(p);
      if (stat.isDirectory()) return p;
    } catch {}
  }
  return root;
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
        items.push({ type: 'folder', name: entry.name, path: rel, children });
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (allowedExt.has(ext)) {
        items.push({ type: 'file', name: entry.name, path: rel });
      }
    }
  }

  return items;
}

const contentRoot = await findContentRoot();
const tree = await walk(contentRoot);

await fs.mkdir(outDir, { recursive: true });

await fs.writeFile(
  path.join(outDir, 'files.json'),
  JSON.stringify(
    {
      title: 'Ryan Laird Docs',
      sourceRoot: path.relative(root, contentRoot).split(path.sep).join('/'),
      siteBase,
      tree
    },
    null,
    2
  ),
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
    body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; max-width: 1100px; }
    details { margin-left: 1rem; }
    summary { cursor: pointer; }
    a { text-decoration: none; display: block; margin-left: 1.5rem; line-height: 1.6; }
    a:hover { text-decoration: underline; }
    .path { opacity: .7; font-size: .9rem; }
  </style>
</head>
<body>
  <h1>Ryan Laird Docs</h1>
  <p id="meta"></p>
  <div id="app">Loading…</div>
  <script>
    const icon = t => t === 'folder' ? '📁' : '📄';

    function fileHref(relPath) {
      return new URL(relPath, document.baseURI).pathname;
    }

    function renderNode(node) {
      if (node.type === 'file') {
        return '<a href="' + fileHref(node.path) + '" target="_blank" rel="noopener">' + icon('file') + ' ' + node.name + '</a>';
      }
      return '<details open><summary>' + icon('folder') + ' ' + node.name + '</summary><div class="path">' + node.path + '</div>' + node.children.map(renderNode).join('') + '</details>';
    }

    fetch('files.json')
      .then(r => r.json())
      .then(data => {
        document.getElementById('meta').textContent = 'Source: ' + data.sourceRoot + ' | Base: ' + data.siteBase;
        document.getElementById('app').innerHTML = data.tree.map(renderNode).join('');
      })
      .catch(err => document.getElementById('app').textContent = err.message);
  </script>
</body>
</html>`;

await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
