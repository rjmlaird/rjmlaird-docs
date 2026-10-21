---
title: labs.rjmlaird.co.uk
description: "Experimental and exploratory work, kept clearly separate from production apps and tools."
owner: To confirm
review_cycle: 6 months
sidebar_position: 4
tags: [service, public, experimental, labs]
visibility: public
lifecycle: active
confidence: Partly verified
last_reviewed: 2026-10-14
---

# labs.rjmlaird.co.uk

## Purpose

`labs.rjmlaird.co.uk` shows experiments, prototypes and data pieces. Its single responsibility is to make exploratory work visible while keeping it clearly distinct from supported products.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `labs.rjmlaird.co.uk` |
| Classification | Labs |
| Visibility | Public |
| Lifecycle | Active |
| Evidence | Linked from a live site; hosting not verified |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- Experiments and prototypes, each labelled as such
- Data pieces built from open datasets, with licence and attribution
- A catalogue of experiments with a short description and status

## Catalogue model

| Aspect | Rule |
| --- | --- |
| One record represents | One experiment or data piece |
| Primary classification | Lab. When an experiment is adopted, create the [app](apps.md) or [tool](tools.md) record and link it with `promoted from`; do not copy the entry |
| Stability | No guarantee. An experiment may change or be retired without notice |

## Boundaries

This service does not:

- Provide production services that other systems depend on
- Hold private or customer data
- Present experiments as supported apps or tools

## Access model

Public and unauthenticated.

## Dependencies

- Open datasets, used under their licences
- Hosting and deployment: to confirm
- The public [api](api.md) and [data](data.md) services, where an experiment uses them

## Operations

- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## Related services

- [apps.rjmlaird.co.uk](apps.md)
- [tools.rjmlaird.co.uk](tools.md)
- [data.rjmlaird.co.uk](data.md)
- [rjmlaird.co.uk](web.md)
