---
id: roadmap
title: Roadmap and decision log
description: The sequence in which planned parts of the rjmlaird.co.uk ecosystem should be built or documented, the decisions still open and where decisions are recorded.
sidebar_position: 12
status: Proposed
confidence: Partly verified
last_reviewed: 2026-10-11
---

This roadmap orders the work so that foundations come before features. It deliberately uses **Now, Next, Later and Defer** instead of dates: for a one-person project, sequence matters more than a calendar.

## Roadmap

### Now

| Item | Why now |
| --- | --- |
| Document the confirmed foundation (this section) | Maintainers need one accurate description |
| Deploy `auth` | Other private tools depend on it |
| Ship the `hooks` MVP | Payment and booking events are the revenue-critical automation |
| Decide the canonical host (apex or `www`) | Affects every canonical link, sitemap and cookie |
| Fix the brand token sync between the main site and the docs | Known gap with a known fix |

### Next

| Item | Why next |
| --- | --- |
| Build the wiki MVP | Architecture is already agreed |
| Confirm and publish `api` | Gives the portfolio a stable public interface |
| Establish `research` | Depends on the Zotero ingest pipeline |
| Establish `space` | Content hub, once there is content |
| Replace the template pages in `getting-started`, `api` and `guides` | They currently describe an example project |

### Later

| Item | Condition |
| --- | --- |
| Status page | Once there are services worth reporting on |
| Single asset host | Once media outgrows the site builds |
| Preview deployments for docs | When more than one contributor is involved |

### Deferred or not recommended

| Item | Position |
| --- | --- |
| `dev`, `courses`, `dashboards`, `mcp` | Defer until a concrete need appears |
| `home`, `sandbox`, `dam`, `upload`, `app` | Not recommended |
| Merging 16 content subdomains into paths | Decide in an ADR, then implement as the sites are built |

## Open decisions

1. Canonical host: apex or `www`.
2. Whether `cv` and `research` stay separate from the main site.
3. How brand tokens are shared between sites.
4. Which newsletter and booking providers, and whether their custom domains are needed.
5. Whether the architecture docs are included in versioned snapshots.

## Decision log

Decisions are recorded as ADRs. See the [ADR index](decisions/index.md) for the full list and the backlog of decisions still to be written down.

## Related pages

- [Subdomain catalogue](governance/subdomains.md)
- [ADR index](decisions/index.md)
