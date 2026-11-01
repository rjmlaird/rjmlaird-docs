# rjmlaird-docs

Source for [docs.rjmlaird.co.uk](https://docs.rjmlaird.co.uk): public technical documentation for the rjmlaird.co.uk estate, built with [Astro Starlight](https://starlight.astro.build).

## Develop

Requires Node.js 22.23.4+ (see `.nvmrc`) and pnpm 10.

```bash
corepack enable
pnpm install
pnpm dev          # generates catalogue pages, then serves http://localhost:4321
pnpm validate     # content lint, astro check, build, public-safety scan of dist/
pnpm test
```

## Layout

| Path | Purpose |
| --- | --- |
| `src/content/docs/` | All pages (`.md`, `.mdx`). Sections: start-here, platform, catalogue, build, operate, reference, contribute, changelog |
| `src/content.config.ts` | Front matter schema (status, confidence, reviewStatus, kind, ...) |
| `src/styles/brand.css` | Brand tokens for dark and light themes |
| `src/components/` | `ToolCard`, `ToolGrid`, `Since`, and Starlight overrides (page meta line, footer) |
| `data/` | Snapshots (`builds`, `github-repos`, `github-projects`), `subdomains.json`, `redirects.json` |
| `scripts/` | Generator, sync scripts, content lint, safety scan, post-build headers/redirects |
| `deploy/` | Caddy, Nginx, Docker; generated header and redirect snippets land in `deploy/generated/` |
| `templates/` | ADR and tutorial templates (not published) |

Generated and gitignored: `src/content/docs/{repos,builds,boards,catalogue/generated}/`, `deploy/generated/`.

## Safety

Only public content belongs here. `pnpm lint:safety` scans source; `pnpm lint:safety --dist` scans the built site. Put estate-specific private terms (hostnames, device names) in an untracked `.safety-terms.local`, one per line or as `/regex/`. See `/operate/docs-deployment/` for the checklist and hosting options.

## Licence

Documentation is stated as CC BY 4.0. Confirm this suits all content and any third-party material before release.
