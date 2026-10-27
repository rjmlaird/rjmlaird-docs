---
title: Platform services
description: The services in the rjmlaird.co.uk estate, grouped by role, with the boundaries that keep them separate.
sidebar_position: 1
confidence: Partly verified
last_reviewed: 2026-10-14
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

# Platform services

This section documents the services that make up the rjmlaird.co.uk digital estate. Each page states whether its service is public, restricted or internal, and whether it is active, planned, reserved or retired. Hostnames, visibility and lifecycle are held in the canonical catalogue; see the [subdomain catalogue](../../platform/governance/subdomains.md) and the [generated public service catalogue](../generated/subdomain-catalogue.md).

## Service groups

| Group | Services |
| --- | --- |
| Public services | [web](web.md), [docs](docs.md), [data](data.md), [api](api.md), [status](status.md) |
| Assets and content | [cdn](cdn.md), [dam](dam.md), [upload](upload.md) |
| Developer surfaces | [dev](dev.md), [apps](apps.md), [tools](tools.md), [labs](labs.md) |
| Integration services | [auth](auth.md), [mcp](mcp.md), [hooks](hooks.md), [booking](booking.md), [dav](dav.md) |
| Control plane | [master](master.md) |

## Boundaries at a glance

| Service | Does | Does not |
| --- | --- | --- |
| `api` | Serve public portfolio and estate catalogue data | Expose customer records, billing, uploads or tokens |
| `data` | Serve curated, attributed reference data | Accept writes or hold private data |
| `cdn` | Deliver approved public assets | Accept writes |
| `upload` | Accept controlled writes | Deliver public assets |
| `dam` | Govern media assets | Offer public browsing |
| `dav` | Store Zotero attachments privately | Act as a public host, CDN or document system |
| `apps`, `tools`, `labs` | Catalogue distinct kinds of work | Duplicate a record across catalogues |
| `auth` | Establish identity | Replace Cloudflare Access or act as a user directory |
| `mcp`, `hooks`, `upload`, `dav`, `dam` | Serve restricted purposes | Allow anonymous use |

## Reading the pages

- **Visibility:** public, restricted or internal. Restricted is the default for protocol, integration, ingestion and management services.
- **Lifecycle:** active means serving; planned means intended but not verified as deployed; reserved means the name is held; retired means withdrawn.
- **Evidence:** how the lifecycle was established. Anything other than a repository is unverified.

Shared rules are not repeated on service pages. See [Security, privacy and access](../../platform/governance/security-and-privacy.md), [Observability, status and incident response](../../operate/status-and-observability.md) and [Environments and deployment model](../../platform/governance/environments.md). To add or change a service, follow [Adding a service](../../build/adding-a-service.md).

The commercial booking and payment systems have their own section: [Services overview](index.md).
