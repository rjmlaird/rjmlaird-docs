---
title: Documentation changelog
description: Significant changes to the documentation structure, governance and validation.
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

# Documentation changelog

## 2026-10-28 — Repositories, builds and GitHub Projects

- Renamed the `projects` collection to `repos` (`/repos/`); `/projects/` and every `/projects/<slug>/` redirect to the new routes.
- Added Builds (`/builds/`), separating labs, tools and apps from repositories. Data comes from `GET https://api.rjmlaird.co.uk/v1/builds`, snapshotted to `data/builds.json`.
- Added GitHub Projects boards (`/boards/`) with an index and a per-board page showing the README, field summaries, timeline and every issue, pull request and draft item, snapshotted to `data/github-projects.json`.
- Added `pnpm sync:builds`, `pnpm sync:boards` and a weekly workflow that opens a pull request when either snapshot changes.

## 2026-10-21 — Information architecture restructuring

- Established separate homes for onboarding, cross-cutting platform architecture, governance, architecture decisions, first-party services, external integrations, build/reference material and operations.
- Preserved existing service records, ADRs, integration guidance, technical contracts and runbooks while updating internal links.
- Moved the subdomain catalogue output to `catalogue/generated/`; `data/subdomains.json` remains its source.
- Added a redirect map and documentation-specific validation tooling.
- Reviewed the prior restructuring notes and retained durable decisions in the canonical documentation; temporary migration notes are no longer published.
