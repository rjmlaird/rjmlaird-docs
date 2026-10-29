---
title: "Repositories, builds and GitHub Projects"
description: "How the docs separate source repositories, the labs, tools and apps they publish, and the GitHub Projects boards that plan the work."
status: "active"
owner: "Ryan Laird"
reviewStatus: "needs-review"
tags: ["content-model", "repos", "builds", "boards", "github-projects"]
---

## Three different things

| Section | Route | What it is | Source of truth |
|---|---|---|---|
| Repositories | `/repos/` | One record per source repository or deployable service. | Markdown in `src/content/repos/` |
| Builds | `/builds/` | The labs, tools and apps people can open and use. | Builds API, snapshotted to `data/builds.json` |
| GitHub Projects | `/boards/` | Planning boards with every issue, pull request and draft item. | GitHub Projects (v2), snapshotted to `data/github-projects.json` |

A repository can publish many builds (for example the tools repository publishes every tool), and a board can track work across several repositories. Repository pages list the builds whose `repository` matches their own.

The old `/projects/` routes redirect to `/repos/`.

## Builds

Builds come from the public builds API:

```bash
curl -X 'GET' \
  'https://api.rjmlaird.co.uk/v1/builds' \
  -H 'accept: application/json'
```

Each build has a `type` of `lab`, `tool` or `app`, and an `id` such as `tools/orbital-calc`. The first segment becomes the route group, so that build lives at `/builds/tools/orbital-calc/`. Builds are grouped using the catalogue's `groups` and ordered by the catalogue's `statuses`.

The Astro build never calls the API. Refresh the snapshot with:

```bash
pnpm sync:builds
```

At the time of writing the API lists apps and tools only. The Labs section is in place and fills in when the API starts returning `type: "lab"` builds.

## GitHub Projects boards

Boards are GitHub Projects (v2) owned by the `rjmlaird` account. Each board page shows the project README, a summary of its single-select fields, a dated timeline, and every item with its labels, assignees, fields and rendered body.

```bash
export GITHUB_TOKEN=ghp_...   # classic PAT: read:project (add repo for private repositories)
pnpm sync:boards
```

Only public projects are written by default (`--include-private` overrides this). Items in private repositories that the token cannot read appear as "Private item" so counts stay honest. Rendered bodies come from GitHub's own renderer, which sanitises the HTML.

## Keeping snapshots fresh

The **Sync builds and boards** workflow refreshes both files every Monday and opens a pull request when anything changes. It needs a `PROJECTS_READ_TOKEN` repository secret for the boards. Review the diff before merging.
