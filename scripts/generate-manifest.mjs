// scripts/generate-manifest.mjs
import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const ignore = new Set(['.git', '.github', 'node_modules', 'dist', '.DS_Store']);
const includeExt = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.html', '.htm']);

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
      if (!includeExt.has(ext)) continue;
      items.push({ type: 'file', name: entry.name, path: rel });
    }
  }
  return items;
}

await fs.mkdir(outDir, { recursive: true });

const tree = await walk(path.join(root, 'docs'));
const manifest = { title: 'Ryan Laird Docs', tree };
await fs.writeFile(path.join(outDir, 'files.json'), JSON.stringify(manifest, null, 2), 'utf8');

const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
