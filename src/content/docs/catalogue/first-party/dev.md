---
title: dev.rjmlaird.co.uk
description: A reserved hostname for developer-facing resources and release workflow. Nothing is deployed.
sidebar:
  order: 1
status: active
confidence: unverified
visibility: public
lifecycle: reserved
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - public
  - developer
  - reserved
---

:::note[Lifecycle: reserved]
This service is a reserved hostname. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

Nothing yet. The hostname is held so the name is not reused for something unrelated.

## Boundaries

If built, this service would not:

- Be a staging or preview environment for the estate's services; see [Environments and deployment model](/platform/governance/environments/)
- Duplicate [docs](/catalogue/first-party/docs/) or [labs](/catalogue/first-party/labs/)
- Hold secrets, deployment configuration or private repositories

## Access model

Public if built. No access model is defined while reserved.

## Dependencies

None.

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## To confirm

:::note[To confirm]
Whether `dev` earns a hostname under [ADR-0002](/platform/decisions/adr-0002-justify-subdomains-before-creating-them/), or whether its content belongs on a path of the main site.
:::

## Related services

- [docs.rjmlaird.co.uk](/catalogue/first-party/docs/)
- [labs.rjmlaird.co.uk](/catalogue/first-party/labs/)
- [rjmlaird.co.uk](/catalogue/first-party/web/)
