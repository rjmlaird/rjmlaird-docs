---
title: dam.rjmlaird.co.uk
description: "Restricted governance of media and document assets: metadata, rights, approval and what is published."
sidebar:
  order: 2
status: active
confidence: unverified
visibility: restricted
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - restricted
  - assets
  - governance
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
:::

## Purpose

`dam.rjmlaird.co.uk` governs media and document assets. Its single responsibility is to decide, record and control what each asset is, who may use it and whether it is approved for public delivery.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `dam.rjmlaird.co.uk` |
| Classification | Asset management |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Asset records with descriptive metadata, rights, licence and attribution
- An approval state for each asset
- Restricted browsing for authorised users
- The control point that releases approved assets to [cdn](/catalogue/first-party/cdn/)

## Boundaries

This service does not:

- Provide a public browsing surface
- Deliver public assets; that is [cdn](/catalogue/first-party/cdn/)
- Accept raw uploads; that is [upload](/catalogue/first-party/upload/)
- Store Zotero attachments; that is [dav](/catalogue/first-party/dav/)
- Act as a document-management system for private business records

## Access model

Restricted. Cloudflare Access is the primary edge control where configured; application-level authorisation still applies. See [Security, privacy and access](/platform/governance/security-and-privacy/).

## Dependencies

- [upload](/catalogue/first-party/upload/), as the ingestion path
- Processing and approval steps
- [cdn](/catalogue/first-party/cdn/), as the publication target
- Object storage: to confirm

The relationship between these is set out in [Media, assets and CDN strategy](/platform/architecture/media-and-assets/).

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## To confirm

:::note[To confirm]
The earlier [planning inventory](/platform/governance/subdomain-planning-inventory/) advised against a separate `dam` hostname. Record the decision to proceed in an ADR.
:::

## Related services

- [upload.rjmlaird.co.uk](/catalogue/first-party/upload/)
- [cdn.rjmlaird.co.uk](/catalogue/first-party/cdn/)
- [auth.rjmlaird.co.uk](/catalogue/first-party/auth/)
