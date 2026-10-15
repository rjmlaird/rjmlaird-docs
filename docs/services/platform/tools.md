---
title: tools.rjmlaird.co.uk
description: "The catalogue and presentation layer for reusable utilities, which are classified once and linked by relationship."
sidebar_position: 3
tags: [service, public, catalogue, tools]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# tools.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`tools.rjmlaird.co.uk` is the public catalogue and presentation layer for reusable utilities. Its single responsibility is to list and describe them clearly; it is not a host for the utilities themselves.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `tools.rjmlaird.co.uk` |
| Classification | Catalogue |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- A browsable catalogue of reusable utilities
- A short description, owner, status and documentation link for each
- Relationships to related apps, tools and labs

## Catalogue model

| Aspect | Rule |
| --- | --- |
| One record represents | One small, reusable, single-purpose utility |
| Primary classification | Exactly one of app, tool or lab. A record appears in one catalogue only |
| Relationships | Use `uses`, `documented by` or `promoted from` links instead of duplicating a record |
| Source of records | The public [api](./api.md), not copies in this site |

A tool should do one job, avoid accounts and store nothing about the visitor. Anything larger or stateful is an [app](./apps.md); anything unproven is a [lab](./labs.md).

## Boundaries

This service does not:

- Host the runtime of the reusable utilities; each has its own deployment
- List private or internal projects
- Duplicate entries held in another catalogue

## Access model

Public and unauthenticated.

## Dependencies

- The public [api](./api.md) for catalogue records
- Each listed item's own documentation

## Operations

- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## Related services

- [apps.rjmlaird.co.uk](./apps.md)
- [labs.rjmlaird.co.uk](./labs.md)
- [api.rjmlaird.co.uk](./api.md)
- [rjmlaird.co.uk](./web.md)
