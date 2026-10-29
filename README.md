# rjmlaird-docs

Source for [docs.rjmlaird.co.uk](https://docs.rjmlaird.co.uk): a Markdown-first technical documentation platform for the RJM Laird ecosystem.

The site is built with Astro and is designed to be useful both as a published documentation site and as a local Obsidian vault. Repository records, guides, references and operational procedures are stored as Markdown in `src/content/`. Builds (labs, tools and apps) and GitHub Projects boards are built from committed JSON snapshots in `data/`.

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
| `src/content/repos/` | One metadata-rich record per source repository or deployable service |
| `data/builds.json` | Snapshot of the builds API (labs, tools, apps) behind `/builds/` |
| `data/github-projects.json` | Snapshot of GitHub Projects (v2) boards behind `/boards/` |
| `src/content/guides/` | Task-based guides and documentation migrated from the previous Docusaurus site |
| `src/content/reference/` | Stable facts, architecture, domain inventory and schemas |
| `src/content/operations/` | Runbooks, deployment and maintenance procedures |
| `src/content/archive/` | Retired systems and historical records |
| `templates/` | Markdown templates for repo records, runbooks, APIs and changelogs |
| `data/` and `schemas/` | Existing service/subdomain registry data and schema retained for future integration |
| `scripts/` | Content and internal-link validation; repo scaffolding; builds and boards sync |
| `.obsidian/` | Obsidian vault settings |
| `.github/workflows/` | CI validation and GitHub Pages deployment |

## Add a repository record

```bash
pnpm new:repo -- example-service "Example Service" "Short, accurate description."
```

Review the generated file in `src/content/repos/`, add only verified metadata, and run `pnpm validate`.

## Repositories, builds and boards

| Section | Route | Source of truth |
|---|---|---|
| Repositories | `/repos/` | `src/content/repos/` |
| Builds (labs, tools, apps) | `/builds/` | `GET https://api.rjmlaird.co.uk/v1/builds`, snapshotted to `data/builds.json` |
| GitHub Projects boards | `/boards/` | GitHub Projects (v2), snapshotted to `data/github-projects.json` |

The site build never calls an external API. Refresh the snapshots and commit the result:

```bash
pnpm sync:builds                      # no token needed
GITHUB_TOKEN=ghp_... pnpm sync:boards # classic PAT with read:project
pnpm sync                             # both
```

`pnpm sync:boards --include-private` also writes private projects; leave it off for a public site. The **Sync builds and boards** workflow does this weekly and opens a pull request. See `/reference/content-model/` for details.

## Content status and review

- `status` describes lifecycle state; it is not a health or uptime indicator.
- `reviewStatus: needs-review` is the default for migrated and newly created content.
- Set `reviewStatus: reviewed` only after a maintainer has checked the page.
- Add `lastReviewed` only when a review has actually happened.
- Unknown repository, deployment or DNS details must be marked for verification, not guessed.

## URL strategy

Repository records use `/repos/<slug>/` (`/projects/` redirects there), builds use `/builds/<kind>/<slug>/` and boards use `/boards/<slug>/`. Migrated documentation is served under `/docs/<original-path>/` to preserve the existing documentation URL shape where practical. New reference and operations material uses `/reference/` and `/operations/`.

## Deployment

GitHub Actions validates and builds the site. The deployment workflow publishes `dist/` to GitHub Pages. Confirm that GitHub Pages is configured to use GitHub Actions and that the domain's DNS/TLS configuration is correct before merging deployment changes.

## Licensing

The site currently states CC BY 4.0 for documentation. Confirm that this remains appropriate for all migrated content and any third-party material before public release.
