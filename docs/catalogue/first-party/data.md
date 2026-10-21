---
title: data.rjmlaird.co.uk
description: "A curated, attributed, read-only public reference-data API, distinct from the portfolio and estate catalogue API."
owner: To confirm
review_cycle: 6 months
sidebar_position: 3
tags: [service, public, data, api]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# data.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
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
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

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

These routes are intended, not verified. The first datasets are expected to be reference data such as countries, UK geographies and launch sites. Contract and versioning rules are in [APIs and integrations](../../platform/architecture/apis-and-integrations.md).

## Boundaries

This service does not:

- Accept public writes or user uploads
- Act as a general-purpose data store
- Publish personal, customer or private data
- Expose administration endpoints
- Serve portfolio or estate catalogue content; that is [api](api.md)

## Access model

Public read access, rate limited. No authentication is required for published datasets. Publishing is a reviewed, offline workflow: see [Publishing data](../../build/publishing-data.md).

## Dependencies

- Cloudflare Workers, as the estate's service platform
- Storage for datasets and source snapshots: to confirm
- Reviewed source data held in the service repository

## Operations

- [Publishing data](../../build/publishing-data.md)
- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## Related services

- [api.rjmlaird.co.uk](api.md)
- [cdn.rjmlaird.co.uk](cdn.md)
- [status.rjmlaird.co.uk](status.md)
- [docs.rjmlaird.co.uk](docs.md)
