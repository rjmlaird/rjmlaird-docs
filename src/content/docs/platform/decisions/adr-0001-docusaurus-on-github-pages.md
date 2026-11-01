---
title: "ADR-0001: Docusaurus on GitHub Pages for the docs"
description: The documentation site is built with Docusaurus and deployed to GitHub Pages through GitHub Actions.
status: superseded
confidence: partly-verified
reviewStatus: needs-review
owner: Ryan Laird
lastReviewed: 2026-10-11
---

:::note[Recorded retrospectively]
This decision was already implemented when it was written down. The original reasoning was not recorded, so the context below reconstructs it from the repository.
:::

## Status

Accepted.

## Context

The ecosystem needs a documentation site at `docs.rjmlaird.co.uk` that supports versioned documentation, search, diagrams and a custom domain, and that is cheap to run for a single maintainer. The services themselves run on Cloudflare Workers, but documentation is static content.

## Decision

Build the docs with Docusaurus (with Mermaid and local search enabled) and deploy them to GitHub Pages using GitHub Actions. The `docs` hostname points at GitHub Pages through a CNAME record.

## Consequences

- Hosting is free and tied to the repository. Deployment is automatic on a push to `main`.
- Broken links fail the build, which protects the quality of the site.
- GitHub Pages cannot set custom response headers, which limits security headers.
- There are no pull-request preview deployments.
- DNS is split between GitHub Pages and Cloudflare, so the [domain model](/platform/domain-model/) must document both.

## Alternatives considered

> To confirm: which alternatives were weighed at the time (for example another static documentation framework, or hosting the docs on Cloudflare). They were not recorded.

:::note[Superseded]
Replaced by [ADR-0004: Astro Starlight for the docs](/platform/decisions/adr-0004-astro-starlight-for-docs/). The text above is kept as the historical record.
:::
