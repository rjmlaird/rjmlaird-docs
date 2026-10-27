import fs from 'node:fs';
import path from 'node:path';
const [slug, title, description] = process.argv.slice(2);
if (!slug || !title || !description) {
  console.error('Usage: pnpm new:project -- <slug> "Project title" "Short description"');
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Slug must be lowercase kebab-case.');
  process.exit(1);
}
const file = path.join('src/content/projects', `${slug}.md`);
if (fs.existsSync(file)) { console.error(`Project already exists: ${file}`); process.exit(1); }
const yaml = value => JSON.stringify(value);
const content = `---
title: ${yaml(title)}
slug: ${yaml(slug)}
description: ${yaml(description)}
status: "in-development"
visibility: "internal"
audience: ["maintainer"]
tags: []
owner: "Ryan Laird"
reviewStatus: "needs-review"
---

## Overview

Describe the project, its audience and purpose.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | | |
| Staging | | |
| Repository | | |

## Architecture

Describe components, data flow, dependencies and hosting.

## Getting started

Document verified local setup and contribution steps.

## Configuration

Document configuration and secrets handling. Never commit secret values.

## Deployment

Document build, release, rollback and DNS steps.

## Operations

Document monitoring, backups, logs and maintenance.

## Troubleshooting

Document known failure modes and tested recovery steps.

## Changelog

| Date | Version | Change |
|---|---|---|
`;
fs.writeFileSync(file, content);
console.log(`Created ${file}. Add verified metadata and run pnpm validate.`);
