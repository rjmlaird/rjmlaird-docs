---
title: "ADR-0004: Astro Starlight for the docs"
description: The documentation site moves from Docusaurus (and an interim custom Astro site) to Astro Starlight, with generated catalogue pages and self-hosted fonts.
status: accepted
confidence: partly-verified
reviewStatus: needs-review
owner: Ryan Laird
kind: decision
---

## Status

Accepted. Supersedes [ADR-0001](/platform/decisions/adr-0001-docusaurus-on-github-pages/).

## Context

The docs moved from Docusaurus to a bespoke Astro site, which then needed its own navigation, search, theming, accessibility work and link checking. The main site already uses Astro, and the estate's content is Markdown in Git.

## Decision

Build the docs with Astro Starlight. Use its sidebar, Pagefind search, asides, tabs and code blocks. Generate repository, build, board and service-catalogue pages from the committed JSON snapshots. Keep the brand theme in one CSS file and self-host fonts.

## Consequences

- Less custom code to maintain; accessibility and search come from Starlight.
- No built-in documentation versioning. The docs are a single living version; `starlight-versions` is the option if that changes.
- Mermaid is client-side (`astro-mermaid`), loaded only on pages with diagrams.
- Security headers are generated at build time. GitHub Pages cannot apply them, so a header-capable host is recommended.
- Legacy `/docs/...`, `/guides/` and `/projects/...` URLs redirect to the new routes.
