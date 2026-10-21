---
id: writing-docs
title: Writing and versioning docs
sidebar_position: 1
---

## Local preview

```bash
pnpm install
pnpm start
```

## Where things live

- `docs/` holds the unreleased **Next** docs
- `versioned_docs/` and `versioned_sidebars/` hold frozen release snapshots (created by the command below)
- `sidebars.ts` controls navigation order

## Cutting a version at release time

```bash
pnpm run version:cut 1.0
```

This copies the current `docs/` into `versioned_docs/version-1.0`. Commit the result alongside the release tag. The version dropdown updates automatically.

## Style

- Sentence case headings
- One idea per page; link rather than repeat
- Every code block states its language; add a `title` when it is a file
- Use admonitions (`:::tip`, `:::warning`) sparingly

## Architecture pages

Pages under `docs/platform/` follow extra rules: a status and confidence in the front matter, **To confirm** callouts for anything unverified, and ADRs for significant decisions. See [Naming conventions and standards](../platform/governance/standards.md).

## Services pages

Pages under `docs/catalogue/first-party/` follow the same front matter, **To confirm** callouts and **Related pages** convention as architecture pages. Runbooks and the launch checklist are operational pages: keep them short, action-first and free of secret values.
