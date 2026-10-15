---
title: rjmlaird.co.uk
description: "The canonical public site for the rjmlaird.co.uk brand, writing, research, projects and contact routes."
sidebar_position: 1
tags: [service, public, website]
visibility: public
lifecycle: active
confidence: Partly verified
last_reviewed: 2026-10-14
---

# rjmlaird.co.uk

## Purpose

The main site is the canonical public home for the brand and its content: work, writing, research, projects, CV, open-source work and ways to get in touch. Its single responsibility is presenting curated public content.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `rjmlaird.co.uk` |
| Classification | Website |
| Visibility | Public |
| Lifecycle | Active |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- Public pages for services, writing, research, projects and the CV
- The brand identity that other sites copy from `global.css` (see [Content platform architecture](../../architecture/content-platform.md))
- Entry points to documentation, labs and booking

Content that shares this build, audience and security boundary is delivered as a path on this site rather than as a new subdomain ([ADR-0002](../../architecture/adrs/ADR-0002-justify-subdomains-before-creating-them.md)).

## Boundaries

This site does not:

- Host documentation, APIs, assets or experiments, which have their own services
- Take bookings or payments; it links to [booking](./booking.md)
- Store customer records or accept uploads
- Require sign-in

## Access model

Public and unauthenticated. Anything private is a separate, protected service. See [Security, privacy and access](../../architecture/security-privacy-access.md).

## Dependencies

- Astro, as the site generator (owner-stated)
- Hosting provider: to confirm
- Optional reads of public catalogue data from [api](./api.md)

## Operations

- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## To confirm

:::note[To confirm]
Whether the apex or `www` host is canonical. See [Domain and DNS model](../../architecture/domain-model.md#root-domain-and-apex-routing). The catalogue records the apex, `rjmlaird.co.uk`, until that is decided.
:::

## Related services

- [docs.rjmlaird.co.uk](./docs.md)
- [api.rjmlaird.co.uk](./api.md)
- [booking.rjmlaird.co.uk](./booking.md)
- [labs.rjmlaird.co.uk](./labs.md)
