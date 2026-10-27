---
title: mcp.rjmlaird.co.uk
description: "A restricted Model Context Protocol service that exposes approved tools to approved AI clients."
owner: To confirm
review_cycle: 6 months
sidebar_position: 2
tags: [service, restricted, protocol, mcp]
visibility: restricted
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
---

# mcp.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../generated/subdomain-catalogue.md) says it is active.
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
| Catalogue | [Generated public service catalogue](../generated/subdomain-catalogue.md) |

## What it provides

- An MCP endpoint for approved clients
- A defined, reviewed set of tools and read-only resources

## Protocol interface

The service speaks MCP over authenticated HTTPS. The tool list belongs in the service repository and changes with the protocol, so this page does not enumerate it. Any tool that changes state must be documented, scoped and approved before release.

## Boundaries

This service does not:

- Offer a public API; use [api](api.md) or [data](data.md)
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

See [Security, privacy and access](../../platform/governance/security-and-privacy.md).

## Dependencies

- A Cloudflare Worker (owner-stated)
- [auth](auth.md) and the edge access controls

## Operations

- [Deployment and environments](../../platform/governance/environments.md)
- [Security, privacy and access](../../platform/governance/security-and-privacy.md)
- [Observability and status](../../operate/status-and-observability.md)
- [Adding or changing a service](../../build/adding-a-service.md)

## To confirm

:::note[To confirm]
The earlier [planning inventory](../../platform/governance/subdomain-planning-inventory.md) deferred this hostname pending a specification and authentication. Confirm both before changing the lifecycle.
:::

## Related services

- [auth.rjmlaird.co.uk](auth.md)
- [api.rjmlaird.co.uk](api.md)
