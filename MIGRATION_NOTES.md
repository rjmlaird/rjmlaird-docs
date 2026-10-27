# Migration notes

## What changed

- Replaced the Docusaurus app shell with an Astro static site.
- Migrated all 69 Markdown pages from the previous `docs/` tree into `src/content/guides/`, preserving their relative path so existing `/docs/<path>/` routes can be generated.
- Added seven project records for the repositories and live surfaces identified in the supplied brief.
- Added starter pages for repository ecosystem, domain inventory, documentation authoring and deployment.
- Added typed Astro content collections for projects, guides, reference, operations and archive.
- Added global navigation, breadcrumbs, project filtering and a client-side search page.
- Added project/runbook/API/changelog templates, content and internal-link checks, tests, GitHub Actions workflows and Obsidian/VS Code settings.
- Retained the existing subdomain data and JSON schema, and copied the legacy route mapping into `data/legacy-doc-routes.json`.
- Added redirect configuration for the legacy route map.

## Important review points

- Project and service records are migration starters. Records use `reviewStatus: needs-review` until facts have been checked by a maintainer.
- The domain inventory is not a live DNS audit.
- The existing repository's former Docusaurus source configuration was replaced; the original generated `.docusaurus/` and `build/` outputs were intentionally not carried over.
- The npm dependency installation timed out in the execution environment, so a full Astro build has not been verified here. Run `corepack enable`, `pnpm install`, then `pnpm validate` in an environment with package-registry access. Commit the generated `pnpm-lock.yaml` after confirming the resolved dependency set.
