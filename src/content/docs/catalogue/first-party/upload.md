---
title: upload.rjmlaird.co.uk
description: Restricted, controlled ingestion of assets and content. It accepts writes and delivers nothing publicly.
sidebar:
  order: 3
status: active
confidence: unverified
visibility: restricted
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - restricted
  - ingestion
  - write
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
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
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Authenticated, programmatic ingestion (command line or API)
- Validation of size and type before anything is accepted
- Hand-over of accepted files to processing and approval

## Boundaries

This service does not:

- Deliver or serve any file publicly; that is [cdn](/catalogue/first-party/cdn/)
- Offer a public upload form
- Decide whether an asset is approved; that is [dam](/catalogue/first-party/dam/)
- Render or execute what it receives

## Access model

Restricted. Callers are authenticated, and automated clients use narrowly scoped service credentials. Cloudflare Access is the primary edge control where configured.

## Security considerations

Uploads are untrusted input, and every subdomain sits inside the shared session-cookie scope, so:

- Never serve uploaded content from this host
- Keep size and type limits strict, and hold new files unpublished until approved
- Never log file contents or credentials
- Keep this service separate from the public API

See [Security, privacy and access](/platform/governance/security-and-privacy/#the-shared-session-cookie).

## Dependencies

- [auth](/catalogue/first-party/auth/) and the edge access controls
- Processing and approval steps
- Staging storage for incoming files: to confirm

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## To confirm

:::note[To confirm]
The earlier [planning inventory](/platform/governance/subdomain-planning-inventory/) advised against an `upload` hostname because of the shared cookie scope. Record the decision to proceed, and its mitigations, in an ADR.
:::

## Related services

- [dam.rjmlaird.co.uk](/catalogue/first-party/dam/)
- [cdn.rjmlaird.co.uk](/catalogue/first-party/cdn/)
- [auth.rjmlaird.co.uk](/catalogue/first-party/auth/)
