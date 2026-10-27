import fs from 'node:fs';
import path from 'node:path';
const root = 'src/content';
const errors = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : /\.mdx?$/.test(e.name) ? [path.join(dir,e.name)] : []);
}
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.startsWith('---\n')) { errors.push(`${file}: missing YAML front matter`); continue; }
  const end = text.indexOf('\n---', 4);
  if (end < 0) { errors.push(`${file}: unterminated front matter`); continue; }
  const fm = text.slice(4,end);
  for (const field of ['title:', 'description:', 'status:', 'owner:']) {
    if (!fm.split('\n').some(line => line.startsWith(field))) errors.push(`${file}: missing ${field.slice(0,-1)}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated front matter presence in ${walk(root).length} Markdown files.`);
