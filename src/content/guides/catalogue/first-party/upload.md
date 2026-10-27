---
title: upload.rjmlaird.co.uk
description: "Restricted, controlled ingestion of assets and content. It accepts writes and delivers nothing publicly."
owner: To confirm
review_cycle: 6 months
sidebar_position: 3
tags: [service, restricted, ingestion, write]
visibility: restricted
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
---

# upload.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`upload.rjmlaird.co.uk` is the controlled entry point for new assets and content. Its single responsibility is to accept, validate and hand over writes.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `upload.rjmlaird.co.uk` |
| Classification | Upload |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- Authenticated, programmatic ingestion (command line or API)
- Validation of size and type before anything is accepted
- Hand-over of accepted files to processing and approval

## Boundaries

This service does not:

- Deliver or serve any file publicly; that is [cdn](cdn.md)
- Offer a public upload form
- Decide whether an asset is approved; that is [dam](dam.md)
- Render or execute what it receives

## Access model

Restricted. Callers are authenticated, and automated clients use narrowly scoped service credentials. Cloudflare Access is the primary edge control where configured.

## Security considerations

Uploads are untrusted input, and every subdomain sits inside the shared session-cookie scope, so:

- Never serve uploaded content from this host
- Keep size and type limits strict, and hold new files unpublished until approved
- Never log file contents or credentials
- Keep this service separate from the public API

See [Security, privacy and access](../../platform/governance/security-and-privacy.md#the-shared-session-cookie).

## Dependencies

- [auth](auth.md) and the edge access controls
- Processing and approval steps
- Staging storage for incoming files: to confirm

## Operations

- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## To confirm

:::note[To confirm]
The earlier [planning inventory](../../platform/governance/subdomain-planning-inventory.md) advised against an `upload` hostname because of the shared cookie scope. Record the decision to proceed, and its mitigations, in an ADR.
:::

## Related services

- [dam.rjmlaird.co.uk](dam.md)
- [cdn.rjmlaird.co.uk](cdn.md)
- [auth.rjmlaird.co.uk](auth.md)
