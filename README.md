# rjmlaird-docs

Source for [docs.rjmlaird.co.uk](https://docs.rjmlaird.co.uk): a Markdown-first technical documentation platform for the RJM Laird ecosystem.

The site is built with Astro and is designed to be useful both as a published documentation site and as a local Obsidian vault. Project records, guides, references and operational procedures are stored as Markdown in `src/content/`.

## Develop

Requirements: Node.js 20+ and pnpm 10+.

```bash
corepack enable
pnpm install
pnpm dev
```

## Validate and build

```bash
pnpm lint:content
pnpm lint:links
pnpm typecheck
pnpm build
pnpm validate
pnpm preview
```

## Content model

| Path | Purpose |
|---|---|
| `src/content/projects/` | One metadata-rich record per site, API, tool or service |
| `src/content/guides/` | Task-based guides and documentation migrated from the previous Docusaurus site |
| `src/content/reference/` | Stable facts, architecture, domain inventory and schemas |
| `src/content/operations/` | Runbooks, deployment and maintenance procedures |
| `src/content/archive/` | Retired systems and historical records |
| `templates/` | Markdown templates for projects, runbooks, APIs and changelogs |
| `data/` and `schemas/` | Existing service/subdomain registry data and schema retained for future integration |
| `scripts/` | Content and internal-link validation; project scaffolding |
| `.obsidian/` | Obsidian vault settings |
| `.github/workflows/` | CI validation and GitHub Pages deployment |

## Add a project

```bash
pnpm new:project -- example-service "Example Service" "Short, accurate description."
```

Review the generated file in `src/content/projects/`, add only verified metadata, and run `pnpm validate`.

## Content status and review

- `status` describes lifecycle state; it is not a health or uptime indicator.
- `reviewStatus: needs-review` is the default for migrated and newly created content.
- Set `reviewStatus: reviewed` only after a maintainer has checked the page.
- Add `lastReviewed` only when a review has actually happened.
- Unknown repository, deployment or DNS details must be marked for verification, not guessed.

## URL strategy

Project records use `/projects/<slug>/`. Migrated documentation is served under `/docs/<original-path>/` to preserve the existing documentation URL shape where practical. New reference and operations material uses `/reference/` and `/operations/`.

## Deployment

GitHub Actions validates and builds the site. The deployment workflow publishes `dist/` to GitHub Pages. Confirm that GitHub Pages is configured to use GitHub Actions and that the domain's DNS/TLS configuration is correct before merging deployment changes.

## Licensing

The site currently states CC BY 4.0 for documentation. Confirm that this remains appropriate for all migrated content and any third-party material before public release.
