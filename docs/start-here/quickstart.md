---
title: Contributor quickstart
description: The shortest safe path to making and validating a documentation change.
---

# Contributor quickstart

## 1. Install dependencies

Use the pinned package manager and lockfile so local and CI environments are consistent.

```bash
corepack enable
pnpm install --frozen-lockfile
```

## 2. Start the local site

```bash
pnpm start
```

Open the local URL printed by Docusaurus. Stop the server with `Ctrl+C` when finished.

## 3. Edit the canonical page

Choose the page's home based on its purpose: cross-cutting design belongs in `docs/platform/`, first-party and vendor records in `docs/catalogue/`, implementation contracts in `docs/build/`, and procedures in `docs/operate/`. Update a canonical source rather than duplicating repeated facts.

## 4. Validate before review

```bash
pnpm run docs:generate
pnpm run docs:check
pnpm run typecheck
pnpm run build
```

If you did not change `data/subdomains.json`, the generation command should not change the generated catalogue. Never edit generated output by hand.

## Next steps

- Read [Writing and versioning docs](./contributing.md).
- Review the [documentation standards](../platform/governance/standards.md).
- Follow [Adding a service](../build/adding-a-service.md) when documenting a new capability.
