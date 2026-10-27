import fs from 'node:fs';
import path from 'node:path';
const root = 'src/content';
const files = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p); else if(/\.mdx?$/.test(e.name)) files.push(p);
  }
}
walk(root);
const known = new Set(files.map(f => f.replace(/^src\/content\//,'').replace(/\.mdx?$/,'')));
const errors=[];
for(const file of files) {
  const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/\]\((\/[^)#?]*)\)/g)) {
    const url=match[1].replace(/^\//,'').replace(/\/$/,'');
    if(!url || ['projects','guides','reference','operations','archive'].includes(url)) continue;
    // Dynamic docs routes are based on content IDs; catch broken internal links without rejecting external roots.
    if(url.startsWith('docs/')) {
      const slug=url.slice(5);
      if(!known.has(`guides/${slug}`) && !known.has(slug)) errors.push(`${file}: unresolved internal link ${match[1]}`);
    } else if(url.startsWith('reference/') && !known.has(url)) errors.push(`${file}: unresolved internal link ${match[1]}`);
    else if(url.startsWith('projects/') && url !== 'projects') {
      const slug=url.slice('projects/'.length);
      if(!fs.existsSync(`src/content/projects/${slug}.md`)) errors.push(`${file}: unresolved internal link ${match[1]}`);
    }
  }
}
if(errors.length){console.error(errors.slice(0,100).join('\n')); if(errors.length>100) console.error(`...and ${errors.length-100} more`); process.exit(1);}
console.log(`Checked internal links in ${files.length} Markdown files.`);
