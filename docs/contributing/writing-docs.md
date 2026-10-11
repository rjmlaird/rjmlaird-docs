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

Pages under `docs/architecture/` follow extra rules: a status and confidence in the front matter, **To confirm** callouts for anything unverified, and ADRs for significant decisions. See [Naming conventions and standards](../architecture/standards.md).
