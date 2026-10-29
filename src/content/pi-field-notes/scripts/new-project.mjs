#!/usr/bin/env node
// Create a new content file from a template.
//
//   npm run new -- "My project title"
//   npm run new -- "My project title" --status idea --tags astronomy,sensors
//   npm run new -- "Update title" --type build-log --project all-sky-camera --stage hardware
//   npm run new -- "Idea title" --type idea
//   npm run new -- "Essay title" --type essay
//
// Projects use docs/project-template.md as their template. Edit that file to change
// what every new project starts with.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const TYPES = {
  project: { dir: 'projects' },
  'build-log': { dir: 'build-logs' },
  idea: { dir: 'ideas' },
  essay: { dir: 'essays' },
};
const PROJECT_STATUSES = ['idea', 'in-progress', 'operational', 'archived'];
const STAGES = ['planning', 'hardware', 'software', 'testing', 'deployment', 'maintenance'];

function usage(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error(`Usage: npm run new -- "Title" [options]

Options:
  --type <project|build-log|idea|essay>   Default: project
  --slug <slug>                           Default: derived from the title
  --tags <a,b,c>                          Comma-separated
  --status <status>                       Projects only. Default: idea
  --project <project-slug>                Build logs only. Required
  --stage <stage>                         Build logs only. Default: planning
  --help                                  Show this message`);
  process.exit(message ? 1 : 0);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') usage();
    if (arg.startsWith('--')) {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) usage(`${arg} needs a value`);
      args[arg.slice(2)] = value;
      i++;
    } else {
      args._.push(arg);
    }
  }
  return args;
}

const slugify = (text) =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');

// Wrap in single quotes so titles containing colons or quotes stay valid YAML.
const yamlString = (text) => `'${text.replace(/'/g, "''")}'`;

const today = new Date().toISOString().slice(0, 10);

const args = parseArgs(process.argv.slice(2));
const title = args._.join(' ').trim();
if (!title) usage('Please give a title.');

const type = args.type ?? 'project';
if (!(type in TYPES)) usage(`Unknown type "${type}".`);

const slug = args.slug ?? slugify(title);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) usage(`"${slug}" is not a valid slug.`);

const tags = (args.tags ?? '')
  .split(',')
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean);
const tagList = `[${tags.join(', ')}]`;

let contents;

if (type === 'project') {
  const status = args.status ?? 'idea';
  if (!PROJECT_STATUSES.includes(status))
    usage(`Status must be one of: ${PROJECT_STATUSES.join(', ')}.`);
  const templatePath = join(root, 'docs', 'project-template.md');
  contents = readFileSync(templatePath, 'utf8')
    .replaceAll('{{title}}', yamlString(title))
    .replaceAll('{{slug}}', slug)
    .replaceAll('{{status}}', status)
    .replaceAll('{{tags}}', tagList)
    .replaceAll('{{date}}', today);
} else if (type === 'build-log') {
  if (!args.project) usage('Build logs need --project <project-slug>.');
  if (!existsSync(join(root, 'src/content/projects', `${args.project}.md`))) {
    console.warn(
      `Warning: no file src/content/projects/${args.project}.md yet. The build will fail until it exists.`,
    );
  }
  const stage = args.stage ?? 'planning';
  if (!STAGES.includes(stage)) usage(`Stage must be one of: ${STAGES.join(', ')}.`);
  contents = `---
title: ${yamlString(title)}
slug: ${slug}
description: One sentence saying what this update covers.
project: ${args.project}
date: ${today}
tags: ${tagList}
stage: ${stage}
draft: true
---

## What I set out to do

## What happened

## What I learned

## Next steps
`;
} else if (type === 'idea') {
  contents = `---
title: ${yamlString(title)}
slug: ${slug}
description: One sentence describing the idea.
date: ${today}
tags: ${tagList}
priority: medium
status: idea
draft: true
---

## The idea

## Why it might be worth doing

## Things to find out

## First step
`;
} else {
  contents = `---
title: ${yamlString(title)}
slug: ${slug}
description: One or two sentences summarising the argument.
date: ${today}
tags: ${tagList}
draft: true
---

Start with the point you want the reader to take away.
`;
}

const targetDir = join(root, 'src/content', TYPES[type].dir);
const target = join(targetDir, `${slug}.md`);
if (existsSync(target)) {
  console.error(`Error: ${target} already exists. Choose another title or pass --slug.`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
writeFileSync(target, contents);

console.log(`Created src/content/${TYPES[type].dir}/${slug}.md`);
console.log(
  'It is marked draft: true, so it appears in `npm run dev` but not in production builds.',
);
console.log('Remove that line, or set it to false, when you are ready to publish.');
