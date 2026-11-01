---
title: docs.rjmlaird.co.uk
description: The public documentation site for the digital estate, built with Astro Starlight and deployed to GitHub Pages.
sidebar:
  order: 2
status: active
confidence: partly-verified
visibility: public
lifecycle: active
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - public
  - documentation
---

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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Architecture, platform service and integration documentation
- Guides, tutorials and architecture decision records
- Versioned snapshots, diagrams and local search
- A generated reference table of services, built from the canonical catalogue (see [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/))

## Boundaries

This site does not:

- Provide an API or fetch catalogue data in the browser; tables are generated at build time from committed files
- Hold secrets, credentials, private URLs or customer data
- Replace service repositories, which own their own code and configuration
- Guarantee that a documented service is live; check the lifecycle on each page

Public documentation is visible to everyone. Operational detail that would help an attacker map private infrastructure belongs in a private repository.

## Access model

Public and unauthenticated. GitHub Pages cannot set custom response headers; the build emits a `_headers` file for hosts that can (see [Security, privacy and access](/platform/governance/security-and-privacy/)).

## Dependencies

- Astro Starlight, with Mermaid and Pagefind search
- GitHub Pages and GitHub Actions ([ADR-0001](/platform/decisions/adr-0004-astro-starlight-for-docs/))
- `data/subdomains.json` and `scripts/generate-subdomain-catalogue.mjs` for generated reference tables

## Operations

- [Writing and versioning docs](/contribute/)
- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [rjmlaird.co.uk](/catalogue/first-party/web/)
- [master](/catalogue/first-party/master/)
- [status.rjmlaird.co.uk](/catalogue/first-party/status/)
- [dev.rjmlaird.co.uk](/catalogue/first-party/dev/)
