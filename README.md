# rjmlaird-docs

Source for **[docs.rjmlaird.co.uk](https://docs.rjmlaird.co.uk)**, a Docusaurus technical overview and operational knowledge base for the RJM Laird digital platform.

## Develop

Uses pnpm (version pinned in `package.json` via `packageManager`; enable with `corepack enable`).

```bash
pnpm install --frozen-lockfile
pnpm start
pnpm run docs:generate
pnpm run docs:check
pnpm run typecheck
pnpm run build
pnpm validate
```

`docs:generate` validates `data/subdomains.json` against `schemas/subdomains.schema.json` and regenerates `docs/catalogue/generated/subdomain-catalogue.md`. Do not edit generated output manually.

## Structure

| Path | Purpose |
| --- | --- |
| `docs/start-here/` | Orientation, onboarding and contribution guidance |
| `docs/platform/` | Cross-cutting architecture, governance, ADRs and roadmap |
| `docs/catalogue/` | First-party services, external integrations and generated inventory |
| `docs/build/` | Configuration, deployment, APIs and technical contracts |
| `docs/operate/` | Ownership, launch readiness, incident response and runbooks |
| `docs/changelog/` | Significant documentation changes |
| `data/subdomains.json` | Canonical public-safe subdomain and service metadata |
| `schemas/` | Machine-readable registry schema |
| `scripts/` | Catalogue generation and documentation validation |
| `sidebars.ts` | Explicit site navigation |
| `docusaurus.config.ts` | Site configuration, redirects, navbar, footer, search and versions |
| `static/CNAME` | Custom domain for GitHub Pages |

## Release a docs version

```bash
pnpm run version:cut 1.0
```

## Deploy

Pull requests run validation and build checks. Pushes to `main` deploy the generated `build/` directory to GitHub Pages through GitHub Actions. The custom domain is configured with `static/CNAME`.
