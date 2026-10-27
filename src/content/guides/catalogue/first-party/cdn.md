---
title: cdn.rjmlaird.co.uk
description: "Public, read-only delivery of approved assets. It accepts no writes."
owner: To confirm
review_cycle: 6 months
sidebar_position: 1
tags: [service, public, assets, read-only]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
---

# cdn.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`cdn.rjmlaird.co.uk` delivers approved public assets, such as images and documents, quickly and cacheably. Its single responsibility is the public read path for assets.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `cdn.rjmlaird.co.uk` |
| Classification | Asset delivery |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- Read-only delivery of assets approved for public use
- Stable, cacheable URLs, with fingerprinted names for long-lived caching
- A single place to apply cache rules to public media

## Boundaries

This service does not:

- Accept writes of any kind; uploads go through [upload](upload.md)
- Decide what is approved; that is governed in [dam](dam.md)
- Serve private, restricted or unreviewed files
- Provide directory listings, search or browsing
- Replace [dav](dav.md), which is private storage for Zotero attachments

Private buckets must never share a bucket, domain or cache rules with public assets.

## Access model

Public, read-only. Only `GET` and `HEAD` are accepted; everything else is refused.

## Dependencies

- Object storage holding approved public assets
- The edge cache
- A publication step from the asset-management workflow; the full path is in [Media, assets and CDN strategy](../../platform/architecture/media-and-assets.md)

## Operations

- [Caching policy](../../platform/architecture/media-and-assets.md#caching-policy-proposed)
- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## Related services

- [dam.rjmlaird.co.uk](dam.md)
- [upload.rjmlaird.co.uk](upload.md)
- [data.rjmlaird.co.uk](data.md)
- [rjmlaird.co.uk](web.md)
