---
title: Platform services
description: The services in the rjmlaird.co.uk estate, grouped by role, with the boundaries that keep them separate.
sidebar:
  order: 1
status: active
confidence: partly-verified
reviewStatus: needs-review
owner: Ryan Laird
lastReviewed: 2026-10-14
---

This section documents the services that make up the rjmlaird.co.uk digital estate. Each page states whether its service is public, restricted or internal, and whether it is active, planned, reserved or retired. Hostnames, visibility and lifecycle are held in the canonical catalogue; see the [subdomain catalogue](/platform/governance/subdomains/) and the [generated public service catalogue](/catalogue/generated/subdomain-catalogue/).

## Service groups

| Group | Services |
| --- | --- |
| Public services | [web](/catalogue/first-party/web/), [docs](/catalogue/first-party/docs/), [data](/catalogue/first-party/data/), [api](/catalogue/first-party/api/), [status](/catalogue/first-party/status/) |
| Assets and content | [cdn](/catalogue/first-party/cdn/), [dam](/catalogue/first-party/dam/), [upload](/catalogue/first-party/upload/) |
| Developer surfaces | [dev](/catalogue/first-party/dev/), [apps](/catalogue/first-party/apps/), [tools](/catalogue/first-party/tools/), [labs](/catalogue/first-party/labs/) |
| Integration services | [auth](/catalogue/first-party/auth/), [mcp](/catalogue/first-party/mcp/), [hooks](/catalogue/first-party/hooks/), [booking](/catalogue/first-party/booking/), [dav](/catalogue/first-party/dav/) |
| Control plane | [master](/catalogue/first-party/master/) |

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

Shared rules are not repeated on service pages. See [Security, privacy and access](/platform/governance/security-and-privacy/), [Observability, status and incident response](/operate/status-and-observability/) and [Environments and deployment model](/platform/governance/environments/). To add or change a service, follow [Adding a service](/build/adding-a-service/).

The commercial booking and payment systems have their own section: [Services overview](/catalogue/first-party/).
