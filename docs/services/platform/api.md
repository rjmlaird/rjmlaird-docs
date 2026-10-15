---
title: api.rjmlaird.co.uk
description: "The public, read-oriented portfolio and estate catalogue API, separate from private operational services."
sidebar_position: 4
tags: [service, public, api]
visibility: public
lifecycle: planned
confidence: Partly verified
last_reviewed: 2026-10-14
---

# api.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`api.rjmlaird.co.uk` is the public API for portfolio content and the public estate catalogue. Its single responsibility is read-oriented access to content that is already public, so that sites, apps, tools and labs share one source.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `api.rjmlaird.co.uk` |
| Classification | API |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- Portfolio content such as projects, case studies and CV data
- The public estate catalogue, derived from the canonical catalogue, for discovery by other services
- Versioned, stable, machine-readable responses

## Public interface

- Versioned under `/v1`
- Read-oriented: `GET` and `HEAD` for public content
- Rate limited, with explicit CORS origins

The route inventory belongs in the [API reference](../../api/overview.md), which is still a template. Contract and versioning rules are in [APIs and integrations](../../architecture/apis-integrations.md).

## Boundaries

This API does not expose or document:

- Customer records, bookings, billing or payments
- Webhook ingestion ([hooks](./hooks.md))
- Raw uploads, WebDAV or private files ([upload](./upload.md), [dav](./dav.md))
- Access tokens, sessions or administration
- Reference datasets, which belong to [data](./data.md)

The separation is recorded in [ADR-0003](../../architecture/adrs/ADR-0003-separate-public-api-from-webhook-services.md).

## Access model

Public read access. Write and administrative operations are not part of this API.

## Dependencies

- A Cloudflare Worker, with Hono (owner-stated)
- Content source: to confirm
- The catalogue snapshot described in [master](./master.md)

## Operations

- [API reference](../../api/overview.md)
- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## To confirm

:::note[To confirm]
Whether the API is deployed, what it returns today, and what authentication and rate limiting apply.
:::

## Related services

- [data.rjmlaird.co.uk](./data.md)
- [apps.rjmlaird.co.uk](./apps.md)
- [tools.rjmlaird.co.uk](./tools.md)
- [labs.rjmlaird.co.uk](./labs.md)
- [rjmlaird.co.uk](./web.md)
