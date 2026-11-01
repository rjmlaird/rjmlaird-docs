---
title: Repositories, builds and GitHub Projects
description: How the docs separate source repositories, the labs, tools and apps they publish, and the GitHub Projects boards that plan the work.
status: active
reviewStatus: needs-review
owner: Ryan Laird
kind: reference
tags: [content-model, repos, builds, boards]
---

## Three different things

| Section | Route | What it is | Source of truth |
| --- | --- | --- | --- |
| [Repositories](/repos/) | `/repos/` | Public source repositories. | GitHub, snapshotted to `data/github-repos.json` |
| [Builds](/builds/) | `/builds/` | Labs, tools and apps you can open and use. | Builds API, snapshotted to `data/builds.json` |
| [Boards](/boards/) | `/boards/` | Public planning boards. | GitHub Projects (v2), snapshotted to `data/github-projects.json` |

A repository can publish many builds, and a board can track work across several repositories. `/projects/` redirects to `/repos/`.

## How the pages are made

`pnpm generate` (run automatically by `pnpm dev` and `pnpm build`) reads the JSON snapshots and writes ordinary Starlight pages, so they appear in search and the sitemap. The generated folders are gitignored. The build never calls an external API.

Only public repositories and public boards are written. Board items from a repository that is not in the public list are shown as "Private item".

## Refreshing the snapshots

```bash title="Refresh data"
pnpm sync:builds                       # no token needed
GITHUB_TOKEN=... pnpm sync:repos       # public repositories
GITHUB_TOKEN=... pnpm sync:boards      # classic token with read:project
```

The **Sync snapshots** workflow does this weekly and opens a pull request. Review the diff before merging.
