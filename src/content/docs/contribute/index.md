---
title: Contributing
description: How to propose, write, check and publish changes to these docs.
status: active
reviewStatus: needs-review
owner: Ryan Laird
kind: guide
---

## Before editing

- Identify the page's audience and purpose, and edit the existing page rather than duplicating it.
- Verify URLs, commands and service claims. Write **To confirm** for anything unchecked.
- Never add credentials, internal addresses or private operational detail. See the [safety checklist](/operate/docs-deployment/#public-content-checklist).

## Workflow

```bash title="Local commands"
corepack enable
pnpm install
pnpm dev          # http://localhost:4321
pnpm validate     # lint, check, build, safety scan
```

Open a pull request. Keep `reviewStatus: needs-review` until a maintainer has checked the page, then set `reviewed` and `lastReviewed`.

## Where things go

| Type | Folder | Use it for |
| --- | --- | --- |
| Guide | `build/`, `operate/`, `start-here/` | A task the reader wants to complete |
| Tutorial | `start-here/` | Learning by doing, with a visible result at each step |
| Reference | `reference/`, `build/reference/`, `catalogue/` | Stable facts, schemas, contracts |
| Explanation | `platform/` | Why it is built this way |
| Decision | `platform/decisions/` | ADRs, from `templates/adr-template.md` |
| Runbook | `operate/runbooks/` | Repeatable operational steps |

More in the [authoring guide](/contribute/authoring/) and the [component examples](/contribute/components/).
