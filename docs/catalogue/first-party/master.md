---
title: master (control plane)
description: "A concept, not a deployed hostname: the canonical manifests that describe the estate."
owner: To confirm
review_cycle: 6 months
sidebar_position: 1
tags: [service, concept, control-plane]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# master (control plane)

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`master` is the control-plane role: it owns the canonical manifests that describe the estate, chiefly the service catalogue. It is a concept, not a deployed hostname. Its single responsibility is to be the one place where catalogue facts are authored.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | None (concept) |
| Classification | Control plane |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- The canonical public service catalogue, `data/subdomains.json`, with its schema
- Generated references built from it, such as the [Generated public service catalogue](../generated/subdomain-catalogue.md)
- A single source that documentation, API discovery and status monitoring can all read

## Boundaries

The control plane does not:

- Run as a service or serve traffic
- Hold secrets, account or binding identifiers, private URLs or access-policy detail
- Perform deployments or change DNS
- Contain private operational configuration

## Access model

Not applicable. The public catalogue is committed in this repository and changed by reviewed pull request.

## Dependencies

- `schemas/subdomains.schema.json` and `scripts/generate-subdomain-catalogue.mjs`
- Consumers: [docs](docs.md), [api](api.md) and [status](status.md)

## Operations

- [Subdomain catalogue](../../platform/governance/subdomains.md)
- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## To confirm

:::note[To confirm]
Whether the manifests are authored here or in a separate control-plane repository. Until that is decided, `data/subdomains.json` in this repository is the canonical public catalogue. If another repository owns it, import a sanitised snapshot instead of editing a copy here.
:::

## Related services

- [docs.rjmlaird.co.uk](docs.md)
- [api.rjmlaird.co.uk](api.md)
- [status.rjmlaird.co.uk](status.md)
