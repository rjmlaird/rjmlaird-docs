---
title: data.rjmlaird.co.uk
description: A curated, attributed, read-only public reference-data API, distinct from the portfolio and estate catalogue API.
sidebar:
  order: 3
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
  - data
  - api
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
:::

## Purpose

`data.rjmlaird.co.uk` is intended to publish reviewed reference datasets, each with its source, licence and attribution. Its single responsibility is read-only delivery of curated public data.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `data.rjmlaird.co.uk` |
| Classification | Data |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- A catalogue of datasets and their metadata
- Versioned, machine-readable, read-only responses
- Source, licence, attribution and review date for every dataset

## Public interface

The intended shape is a versioned, read-only HTTP API.

| Route | Intended purpose |
| --- | --- |
| `GET /v1` | Describe the API and its version |
| `GET /v1/datasets` | List available datasets and metadata |
| `GET /v1/datasets/{id}` | Describe one dataset |

These routes are intended, not verified. The first datasets are expected to be reference data such as countries, UK geographies and launch sites. Contract and versioning rules are in [APIs and integrations](/platform/architecture/apis-and-integrations/).

## Boundaries

This service does not:

- Accept public writes or user uploads
- Act as a general-purpose data store
- Publish personal, customer or private data
- Expose administration endpoints
- Serve portfolio or estate catalogue content; that is [api](/catalogue/first-party/api/)

## Access model

Public read access, rate limited. No authentication is required for published datasets. Publishing is a reviewed, offline workflow: see [Publishing data](/build/publishing-data/).

## Dependencies

- Cloudflare Workers, as the estate's service platform
- Storage for datasets and source snapshots: to confirm
- Reviewed source data held in the service repository

## Operations

- [Publishing data](/build/publishing-data/)
- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [api.rjmlaird.co.uk](/catalogue/first-party/api/)
- [cdn.rjmlaird.co.uk](/catalogue/first-party/cdn/)
- [status.rjmlaird.co.uk](/catalogue/first-party/status/)
- [docs.rjmlaird.co.uk](/catalogue/first-party/docs/)
