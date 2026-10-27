---
title: "Documentation deployment"
description: "Build, verify and deploy the Astro documentation site."
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
tags: ["deployment", "astro", "github-actions"]
---
## Local verification

Use Node.js 20 or later and the pinned pnpm version in `package.json`.

```bash
corepack enable
pnpm install
pnpm validate
pnpm dev
```

## Release flow

1. Make changes on a feature branch.
2. Run content validation, internal-link checks, Astro type checks and the production build.
3. Review the generated site locally with `pnpm preview`.
4. Open a pull request and review the rendered pages, metadata, navigation and links.
5. Merge only after CI passes.
6. Confirm the deployment and custom domain after release.

## Rollback

Revert the faulty commit and redeploy the last known-good revision. Verify the site and sitemap after rollback. Confirm the actual hosting workflow before using this runbook in production.
