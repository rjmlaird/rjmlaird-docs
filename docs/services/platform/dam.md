---
title: dam.rjmlaird.co.uk
description: "Restricted governance of media and document assets: metadata, rights, approval and what is published."
sidebar_position: 2
tags: [service, restricted, assets, governance]
visibility: restricted
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# dam.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
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
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- Asset records with descriptive metadata, rights, licence and attribution
- An approval state for each asset
- Restricted browsing for authorised users
- The control point that releases approved assets to [cdn](./cdn.md)

## Boundaries

This service does not:

- Provide a public browsing surface
- Deliver public assets; that is [cdn](./cdn.md)
- Accept raw uploads; that is [upload](./upload.md)
- Store Zotero attachments; that is [dav](./dav.md)
- Act as a document-management system for private business records

## Access model

Restricted. Cloudflare Access is the primary edge control where configured; application-level authorisation still applies. See [Security, privacy and access](../../architecture/security-privacy-access.md).

## Dependencies

- [upload](./upload.md), as the ingestion path
- Processing and approval steps
- [cdn](./cdn.md), as the publication target
- Object storage: to confirm

The relationship between these is set out in [Media, assets and CDN strategy](../../architecture/media-assets-cdn.md).

## Operations

- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## To confirm

:::note[To confirm]
The earlier [planning inventory](../../architecture/subdomain-planning-inventory.md) advised against a separate `dam` hostname. Record the decision to proceed in an ADR.
:::

## Related services

- [upload.rjmlaird.co.uk](./upload.md)
- [cdn.rjmlaird.co.uk](./cdn.md)
- [auth.rjmlaird.co.uk](./auth.md)
