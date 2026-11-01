---
title: tools.rjmlaird.co.uk
description: The catalogue and presentation layer for reusable utilities, which are classified once and linked by relationship.
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
  - catalogue
  - tools
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

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
| Source of records | The public [api](/catalogue/first-party/api/), not copies in this site |

A tool should do one job, avoid accounts and store nothing about the visitor. Anything larger or stateful is an [app](/catalogue/first-party/apps/); anything unproven is a [lab](/catalogue/first-party/labs/).

## Boundaries

This service does not:

- Host the runtime of the reusable utilities; each has its own deployment
- List private or internal projects
- Duplicate entries held in another catalogue

## Access model

Public and unauthenticated.

## Dependencies

- The public [api](/catalogue/first-party/api/) for catalogue records
- Each listed item's own documentation

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [apps.rjmlaird.co.uk](/catalogue/first-party/apps/)
- [labs.rjmlaird.co.uk](/catalogue/first-party/labs/)
- [api.rjmlaird.co.uk](/catalogue/first-party/api/)
- [rjmlaird.co.uk](/catalogue/first-party/web/)
