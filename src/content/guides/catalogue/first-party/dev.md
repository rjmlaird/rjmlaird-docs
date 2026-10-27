---
title: dev.rjmlaird.co.uk
description: "A reserved hostname for developer-facing resources and release workflow. Nothing is deployed."
owner: To confirm
review_cycle: 6 months
sidebar_position: 1
tags: [service, public, developer, reserved]
visibility: public
lifecycle: reserved
confidence: Unverified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
---

# dev.rjmlaird.co.uk

:::info[Lifecycle: reserved]
This service is a reserved hostname. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`dev.rjmlaird.co.uk` is reserved for developer-facing resources, such as release notes and development environments. Its single responsibility, if built, would be to present them.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `dev.rjmlaird.co.uk` |
| Classification | Developer |
| Visibility | Public |
| Lifecycle | Reserved |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

Nothing yet. The hostname is held so the name is not reused for something unrelated.

## Boundaries

If built, this service would not:

- Be a staging or preview environment for the estate's services; see [Environments and deployment model](../../platform/governance/environments.md)
- Duplicate [docs](docs.md) or [labs](labs.md)
- Hold secrets, deployment configuration or private repositories

## Access model

Public if built. No access model is defined while reserved.

## Dependencies

None.

## Operations

- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## To confirm

:::note[To confirm]
Whether `dev` earns a hostname under [ADR-0002](../../platform/decisions/ADR-0002-justify-subdomains-before-creating-them.md), or whether its content belongs on a path of the main site.
:::

## Related services

- [docs.rjmlaird.co.uk](docs.md)
- [labs.rjmlaird.co.uk](labs.md)
- [rjmlaird.co.uk](web.md)
