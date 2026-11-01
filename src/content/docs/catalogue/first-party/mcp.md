---
title: mcp.rjmlaird.co.uk
description: A restricted Model Context Protocol service that exposes approved tools to approved AI clients.
sidebar:
  order: 2
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
  - protocol
  - mcp
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
:::

## Purpose

`mcp.rjmlaird.co.uk` is a Model Context Protocol service for approved AI clients. Its single responsibility is to expose a small, explicitly approved set of tools and resources.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `mcp.rjmlaird.co.uk` |
| Classification | Protocol |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- An MCP endpoint for approved clients
- A defined, reviewed set of tools and read-only resources

## Protocol interface

The service speaks MCP over authenticated HTTPS. The tool list belongs in the service repository and changes with the protocol, so this page does not enumerate it. Any tool that changes state must be documented, scoped and approved before release.

## Boundaries

This service does not:

- Offer a public API; use [api](/catalogue/first-party/api/) or [data](/catalogue/first-party/data/)
- Give clients broad access to private data or files
- Return secrets, tokens or credentials in any result
- Replace authentication; clients must still be authorised

## Access model

Restricted. Approved clients only, with Cloudflare Access as the edge control where configured.

## Security considerations

- Make tools read-only by default and grant the least privilege each needs
- Require explicit approval for any tool that writes or deletes
- Treat tool inputs and any retrieved content as untrusted; text returned to a model can carry hostile instructions
- Log calls without payloads or credentials

See [Security, privacy and access](/platform/governance/security-and-privacy/).

## Dependencies

- A Cloudflare Worker (owner-stated)
- [auth](/catalogue/first-party/auth/) and the edge access controls

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## To confirm

:::note[To confirm]
The earlier [planning inventory](/platform/governance/subdomain-planning-inventory/) deferred this hostname pending a specification and authentication. Confirm both before changing the lifecycle.
:::

## Related services

- [auth.rjmlaird.co.uk](/catalogue/first-party/auth/)
- [api.rjmlaird.co.uk](/catalogue/first-party/api/)
