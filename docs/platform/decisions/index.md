---
id: index
title: Architecture decision records
description: The log of significant architecture decisions for rjmlaird.co.uk, with status, and the backlog of decisions still to be written down.
sidebar_position: 1
status: Live
confidence: Verified
last_reviewed: 2026-10-11
---

ADRs record durable architectural decisions, including context, alternatives, the decision and consequences. General plans and implementation tasks belong in the roadmap or relevant build guide.

An architecture decision record (ADR) is a short note that captures one decision: why it was needed, what was chosen and what follows from it. Future maintainers should be able to read a record and understand the reasoning without asking the person who made it.

## When to write one

Write an ADR when a decision is hard to reverse, affects more than one system, or would puzzle a future reader. Do not write one for routine choices.

## Format

Each record lives in this folder as `ADR-NNNN-short-title.md` and has five sections: **Status**, **Context**, **Decision**, **Consequences** and **Alternatives considered**. Copy `_template.md` to begin.

| Status | Meaning |
| --- | --- |
| Proposed | Written, under discussion |
| Accepted | In force |
| Rejected | Considered and declined |
| Superseded | Replaced by a later record, which it links to |

Records are never rewritten once accepted. Supersede them instead.

## Decision log

| ADR | Title | Status |
| --- | --- | --- |
| [ADR-0001](ADR-0001-docusaurus-on-github-pages.md) | Docusaurus on GitHub Pages for the docs | Accepted (retrospective) |
| [ADR-0002](ADR-0002-justify-subdomains-before-creating-them.md) | Justify subdomains before creating them | Proposed |
| [ADR-0003](ADR-0003-separate-public-api-from-webhook-services.md) | Separate the public API from the webhook services | Accepted (retrospective) |

## Backlog: decisions to record

These choices have already been made, or need making, but are not yet written down.

1. Canonical host: apex or `www`.
2. Cloudflare as the platform for Workers and, probably, DNS.
3. Shared session cookie scope across `*.rjmlaird.co.uk`.
4. GitHub OAuth with an allow-list as the sign-in method.
5. HubSpot as sole CRM authority, with no bidirectional sync.
6. Astro for the main site and Docusaurus for the docs.
7. How brand tokens are shared between sites.
8. Whether architecture docs are included in versioned snapshots.
9. `booking` and `billing` as dedicated subdomains, against the catalogue's earlier recommendation to merge `booking` into a path.
10. At-least-once queues with idempotent consumers, enqueuing downstream messages before the database commit.
11. Hand-rolled Stripe signature verification instead of the Stripe SDK.
12. Manual quote-to-payment for enquiry-only routes in the MVP.
13. Dedicated `dam`, `upload`, `mcp` and `dev` services, superseding the planning inventory's avoid and defer recommendations, with mitigations for untrusted uploads under the shared cookie scope.
14. `data/subdomains.json` in this repository as the canonical public catalogue, rather than a separate control-plane repository.

## Related pages

- [Naming conventions and standards](../governance/standards.md)
- [Roadmap and decision log](../roadmap.md)
