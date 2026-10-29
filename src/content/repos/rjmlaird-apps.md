---
title: "Apps"
slug: "rjmlaird-apps"
description: "Monorepo of small, bookmarkable personal productivity and utility apps deployed as individual Cloudflare Workers serving static assets on apps.rjmlaird.co.uk."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["monorepo", "cloudflare-workers", "typescript", "pnpm", "productivity", "apps"]
repository: "https://github.com/rjmlaird/rjmlaird-apps"
liveUrl: "https://apps.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "pnpm"]
reviewStatus: "needs-review"
---

## Overview

Small, bookmarkable apps for **[apps.rjmlaird.co.uk](https://apps.rjmlaird.co.uk)**. Each app is its own Cloudflare Worker serving static assets on `<app>.apps.rjmlaird.co.uk`; `apps/index` is the dir

Primary languages: HTML (76%), TypeScript (11%), CSS (10%), JavaScript (1%). Licence: none declared.


## Problem and motivation

Small, bookmarkable apps for **[apps.rjmlaird.co.uk](https://apps.rjmlaird.co.uk)**. Each app is its own Cloudflare Worker serving static assets on `<app>.apps.rjmlaird.co.uk`; `apps/index` is the directory page. pnpm workspace, Node 22.

*Source: README opening paragraph.*

## Objectives

Not documented in the repository.

## Technical implementation

| Area | Implementation | Evidence |
|---|---|---|
| Languages | HTML (76%), TypeScript (11%), CSS (10%), JavaScript (1%) | GitHub language stats |
| Manifests | `package.json` | file tree |
| Runtime deps | none detected | package.json / requirements.txt |
| Dev deps | @rjmlaird/eslint-config, @rjmlaird/prettier-config, eslint, prettier, typescript, wrangler | package.json |
| CI | none found | .github/workflows |
| Deployment config | `apps/astrodash/wrangler.jsonc`, `apps/index/wrangler.toml`, `apps/kinship-notes/wrangler.jsonc`, `apps/launches/wrangler.jsonc`, `apps/mini-bar/wrangler.jsonc`, `apps/spice-cupboard/wrangler.jsonc`, `apps/weatherdash/wrangler.jsonc` | file tree |
| Top-level layout | `.gitignore`, `README.md`, `apps`, `brand-report.md`, `docs`, `eslint.config.js`, `generated`, `package.json`, `packages`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `public`, `scripts`, `tsconfig.base.json` | file tree |

Scripts: `dev`, `build`, `typecheck`, `test`, `lint`, `format`, `brand:sync`, `brand:check`, `verify`

## Current status

- Status: **in-progress** *(inferred from activity)*
- Last push: 2026-10-25
- Latest commit: new (2026-10-25)
- Open issues: 0; open pull requests: 0
- Releases: none published

Recent commits:

- new (2026-10-25)
- new (2026-10-25)
- kinship (2026-10-22)
- new (2026-10-22)
- deploy (2026-10-12)

## Roadmap

No public roadmap is currently documented in the repository.

## Documentation quality

| Area | Assessment | Notes |
|---|---|---|
| README | Strong | 2750 characters |
| Setup instructions | Adequate | Keyword check on README |
| Architecture documentation | Adequate | docs/adding-an-app.md |
| Contribution guidance | Absent | No CONTRIBUTING file |
| Testing documentation | Adequate | 3 test files found |

*Heuristic assessment; review before publishing.*

## Repository links

- Repository: https://github.com/rjmlaird/rjmlaird-apps
- Issues: https://github.com/rjmlaird/rjmlaird-apps/issues
- Pull requests: https://github.com/rjmlaird/rjmlaird-apps/pulls

<!--
Evidence log
Metadata file: none
Files inspected: GitHub metadata, README, file tree, package.json, commits, issues, PRs, releases
Inferred: status (if not in YAML), documentation ratings, problem statement (README opener)
-->
