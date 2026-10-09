# rjmlaird-docs

Source for **docs.rjmlaird.co.uk**, built with [Docusaurus](https://docusaurus.io).

## Develop

Uses pnpm (version pinned in `package.json` via `packageManager`; enable with `corepack enable`).

```bash
pnpm install
pnpm start         # live preview at http://localhost:3000
pnpm run build     # production build; fails on broken links
pnpm run typecheck
```

## Structure

| Path | Purpose |
| --- | --- |
| `docs/` | Unreleased ("Next") documentation |
| `versioned_docs/` | Frozen release snapshots (created by `version:cut`) |
| `sidebars.ts` | Navigation |
| `docusaurus.config.ts` | Site config, navbar, footer, search, versions |
| `src/css/custom.css` | Brand tokens and theme overrides |
| `src/data/projects.ts` | Project cards on the landing page |
| `static/CNAME` | Custom domain for GitHub Pages |

## Release a docs version

```bash
pnpm run version:cut 1.0
```

## Deploy (GitHub Pages)

1. Push to a GitHub repo named `rjmlaird-docs` (update `GITHUB_ORG` / `GITHUB_REPO` in `docusaurus.config.ts` if different).
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. At your DNS provider, add `CNAME  docs  →  <your-github-username>.github.io`.
4. In **Settings → Pages**, set the custom domain to `docs.rjmlaird.co.uk` and enable HTTPS.

Pushes to `main` deploy automatically; pull requests run a build check.

## Syncing the brand

`src/css/custom.css` holds placeholder hex values for the ink, teal, amber and violet palette. Copy the exact values from `global.css` on rjmlaird.co.uk so the two sites match.
