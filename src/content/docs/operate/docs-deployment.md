---
title: Documentation deployment
description: Build, verify, publish and roll back the docs site, with options for GitHub Pages, Cloudflare, Caddy, Nginx and Docker.
status: active
reviewStatus: needs-review
owner: Ryan Laird
kind: runbook
tags: [deployment, astro, starlight, security-headers]
---

## Pipeline

1. Branch, edit Markdown or MDX, and run `pnpm dev`.
2. `pnpm validate` runs the content lint, the Astro check, the build (which fails on broken links) and the public-safety scan of the built output.
3. Open a pull request. CI repeats the same steps.
4. Merge to `main`. Only the static `dist/` directory is published; no server code, source or data snapshots are deployed beyond what the pages render.

## Where it can be hosted

| Target | Security headers | 301 redirects | Notes |
| --- | --- | --- | --- |
| GitHub Pages (current) | No | Meta-refresh stubs only | Simple, free. Uses `public/CNAME`. |
| Cloudflare Workers static assets or Pages (recommended) | Yes, from `dist/_headers` | Yes, from `dist/_redirects` | Matches the rest of the estate. `wrangler.jsonc` is included. |
| Caddy | Yes | Yes | Use `deploy/Caddyfile` with the generated snippets. |
| Nginx | Yes | Yes | Use `deploy/nginx.conf` with the generated snippets. |
| Docker | Yes | Yes | `deploy/Dockerfile` builds the site and serves it with Caddy as a non-root user. |

:::caution[Verify before relying on it]
The Caddy, Nginx and Docker files were written but not run in the environment that produced this site. Run `caddy validate`, `nginx -t` or `docker build` before first use.
:::

## Security headers

`pnpm build` writes `dist/_headers` and snippets in `deploy/generated/`. The Content-Security-Policy lists the SHA-256 hash of each inline script, so scripts need no `'unsafe-inline'`. It ships in **report-only** mode. Browse the built site (search, Mermaid pages, theme switch) with the console open, then set `CSP_MODE=enforce` for the build.

| Header | Value |
| --- | --- |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options and `frame-ancestors` | `DENY` and `'none'` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | camera, microphone, geolocation, payment and USB disabled |
| Cross-Origin-Opener-Policy | `same-origin` |

## Public-content checklist

- [ ] `pnpm lint:safety --dist` reports no errors.
- [ ] No internal IPs, hostnames, firewall, topology, credentials, account or binding identifiers, bucket names or private URLs.
- [ ] Pages describing restricted services say what they are for, not how they are reached or protected.
- [ ] Generated board and repository pages list only public items.
- [ ] `.safety-terms.local` lists your estate-specific private terms.
- [ ] New pages have an owner and `reviewStatus: needs-review` until someone has checked them.
- [ ] No `.map`, `.env` or `.git` files in `dist/`.

## Rollback

Revert the faulty commit and redeploy the previous revision. On Cloudflare, roll back to the previous deployment from the dashboard. Confirm the home page, `/sitemap-index.xml` and one redirect afterwards.
