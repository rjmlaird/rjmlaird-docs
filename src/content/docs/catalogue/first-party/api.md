---
title: api.rjmlaird.co.uk
description: The public, read-oriented portfolio and estate catalogue API, separate from private operational services.
sidebar:
  order: 4
status: active
confidence: partly-verified
visibility: public
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - public
  - api
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Portfolio content such as projects, case studies and CV data
- The public estate catalogue, derived from the canonical catalogue, for discovery by other services
- Versioned, stable, machine-readable responses

## Public interface

- Versioned under `/v1`
- Read-oriented: `GET` and `HEAD` for public content
- Rate limited, with explicit CORS origins

The route inventory belongs in the [API reference](/build/api/overview/), which is still a template. Contract and versioning rules are in [APIs and integrations](/platform/architecture/apis-and-integrations/).

## Boundaries

This API does not expose or document:

- Customer records, bookings, billing or payments
- Webhook ingestion ([hooks](/catalogue/first-party/hooks/))
- Raw uploads, WebDAV or private files ([upload](/catalogue/first-party/upload/), [dav](/catalogue/first-party/dav/))
- Access tokens, sessions or administration
- Reference datasets, which belong to [data](/catalogue/first-party/data/)

The separation is recorded in [ADR-0003](/platform/decisions/adr-0003-separate-public-api-from-webhook-services/).

## Access model

Public read access. Write and administrative operations are not part of this API.

## Dependencies

- A Cloudflare Worker, with Hono (owner-stated)
- Content source: to confirm
- The catalogue snapshot described in [master](/catalogue/first-party/master/)

## Operations

- [API reference](/build/api/overview/)
- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## To confirm

:::note[To confirm]
Whether the API is deployed, what it returns today, and what authentication and rate limiting apply.
:::

## Related services

- [data.rjmlaird.co.uk](/catalogue/first-party/data/)
- [apps.rjmlaird.co.uk](/catalogue/first-party/apps/)
- [tools.rjmlaird.co.uk](/catalogue/first-party/tools/)
- [labs.rjmlaird.co.uk](/catalogue/first-party/labs/)
- [rjmlaird.co.uk](/catalogue/first-party/web/)
