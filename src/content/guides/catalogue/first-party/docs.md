---
title: docs.rjmlaird.co.uk
description: "The public documentation site for the digital estate, built with Docusaurus and deployed to GitHub Pages."
owner: To confirm
review_cycle: 6 months
sidebar_position: 2
tags: [service, public, documentation]
visibility: public
lifecycle: active
confidence: Partly verified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
---

# docs.rjmlaird.co.uk

## Purpose

`docs.rjmlaird.co.uk` is the public documentation for the digital estate: how the services fit together, how to use and operate them, and why decisions were made. Its single responsibility is to publish accurate, versioned documentation.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `docs.rjmlaird.co.uk` |
| Classification | Documentation |
| Visibility | Public |
| Lifecycle | Active |
| Evidence | Verified from a repository |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- Architecture, platform service and integration documentation
- Guides, tutorials and architecture decision records
- Versioned snapshots, diagrams and local search
- A generated reference table of services, built from the canonical catalogue (see [Generated public service catalogue](../generated/subdomain-catalogue.md))

## Boundaries

This site does not:

- Provide an API or fetch catalogue data in the browser; tables are generated at build time from committed files
- Hold secrets, credentials, private URLs or customer data
- Replace service repositories, which own their own code and configuration
- Guarantee that a documented service is live; check the lifecycle on each page

Public documentation is visible to everyone. Operational detail that would help an attacker map private infrastructure belongs in a private repository.

## Access model

Public and unauthenticated. GitHub Pages cannot set custom response headers, which limits security headers (see [Security, privacy and access](../../platform/governance/security-and-privacy.md)).

## Dependencies

- Docusaurus, with Mermaid and local search
- GitHub Pages and GitHub Actions ([ADR-0001](../../platform/decisions/ADR-0001-docusaurus-on-github-pages.md))
- `data/subdomains.json` and `scripts/generate-subdomain-catalogue.mjs` for generated reference tables

## Operations

- [Writing and versioning docs](../../start-here/contributing.md)
- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## Related services

- [rjmlaird.co.uk](web.md)
- [master](master.md)
- [status.rjmlaird.co.uk](status.md)
- [dev.rjmlaird.co.uk](dev.md)
