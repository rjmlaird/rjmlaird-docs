---
title: cdn.rjmlaird.co.uk
description: Public, read-only delivery of approved assets. It accepts no writes.
sidebar:
  order: 1
status: active
confidence: unverified
visibility: public
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - public
  - assets
  - read-only
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Read-only delivery of assets approved for public use
- Stable, cacheable URLs, with fingerprinted names for long-lived caching
- A single place to apply cache rules to public media

## Boundaries

This service does not:

- Accept writes of any kind; uploads go through [upload](/catalogue/first-party/upload/)
- Decide what is approved; that is governed in [dam](/catalogue/first-party/dam/)
- Serve private, restricted or unreviewed files
- Provide directory listings, search or browsing
- Replace [dav](/catalogue/first-party/dav/), which is private storage for Zotero attachments

Private buckets must never share a bucket, domain or cache rules with public assets.

## Access model

Public, read-only. Only `GET` and `HEAD` are accepted; everything else is refused.

## Dependencies

- Object storage holding approved public assets
- The edge cache
- A publication step from the asset-management workflow; the full path is in [Media, assets and CDN strategy](/platform/architecture/media-and-assets/)

## Operations

- [Caching policy](/platform/architecture/media-and-assets/#caching-policy-proposed)
- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [dam.rjmlaird.co.uk](/catalogue/first-party/dam/)
- [upload.rjmlaird.co.uk](/catalogue/first-party/upload/)
- [data.rjmlaird.co.uk](/catalogue/first-party/data/)
- [rjmlaird.co.uk](/catalogue/first-party/web/)
