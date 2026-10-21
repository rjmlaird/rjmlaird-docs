---
title: status.rjmlaird.co.uk
description: "Curated public reporting of the health of public services, hosted independently of what it reports on."
owner: To confirm
review_cycle: 6 months
sidebar_position: 5
tags: [service, public, status]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# status.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`status.rjmlaird.co.uk` is intended to tell visitors whether the public services are working and to communicate incidents. Its single responsibility is curated public status reporting.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `status.rjmlaird.co.uk` |
| Classification | Status |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- Current state of the public services listed in the [catalogue](../generated/subdomain-catalogue.md)
- Incident notices and history, written by a person
- Planned-maintenance notices

## Monitoring model

- **Curated, not raw.** The page reports a service state, not logs, internal metrics or health-endpoint output.
- **Independent.** It should be hosted outside the infrastructure it reports on, so that it stays up when they fail.
- **Catalogue-driven.** Which services appear is decided by the canonical catalogue, not by a separate list.
- **Public services only.** Restricted and internal services are not reported individually.

Estate-wide conventions for health checks and incidents are in [Observability, status and incident response](../../operate/status-and-observability.md).

## Boundaries

This service does not:

- Replace alerting, logging or error tracking
- Reveal restricted or internal hostnames, health URLs or configuration
- Collect visitor analytics
- Accept public input

## Access model

Public and read-only.

## Dependencies

- The canonical catalogue
- Check tooling and hosting: to confirm

## Operations

- [Incident response](../../operate/incident-response.md)
- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## Related services

- [docs.rjmlaird.co.uk](docs.md)
- [api.rjmlaird.co.uk](api.md)
- [master](master.md)
