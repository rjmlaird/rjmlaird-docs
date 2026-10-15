---
# GENERATED FILE — DO NOT EDIT DIRECTLY.
# Source: data/subdomains.json
# Command: pnpm run docs:generate
title: Generated public service catalogue
sidebar_label: Generated service catalogue
description: Public reference table of the services in the rjmlaird.co.uk estate, generated from the canonical catalogue.
sidebar_position: 3
---

:::caution[Generated file]
This table is generated from `data/subdomains.json`. Edit that file and run `pnpm run docs:generate`; changes made here are overwritten.
:::

Catalogue version 1.0.0, dated 2026-10-14. Lifecycle shows intent unless the service page says it is verified. Definitions are in the [subdomain catalogue](../subdomain-catalogue.md).

| Hostname | Service | Purpose | Classification | Visibility | Lifecycle | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| `api.rjmlaird.co.uk` | Public API | Public, read-oriented portfolio and estate catalogue API | api | public | planned | [Page](../../services/platform/api.md) |
| `apps.rjmlaird.co.uk` | Apps catalogue | Catalogue and presentation layer for maintained applications | catalogue | public | planned | [Page](../../services/platform/apps.md) |
| `auth.rjmlaird.co.uk` | Identity and access | Identity and access boundary for protected services | identity | restricted | planned | [Page](../../services/platform/auth.md) |
| `billing.rjmlaird.co.uk` | Billing | Checkout-session creation for paid services | integration | public | planned | — |
| `booking.rjmlaird.co.uk` | Booking | Booking integration boundary | integration | public | planned | [Page](../../services/platform/booking.md) |
| `cdn.rjmlaird.co.uk` | Asset delivery | Public, read-only delivery of approved assets | asset-delivery | public | planned | [Page](../../services/platform/cdn.md) |
| `dam.rjmlaird.co.uk` | Asset management | Governed media and asset management | asset-management | restricted | planned | [Page](../../services/platform/dam.md) |
| `data.rjmlaird.co.uk` | Reference data | Curated, attributed public reference-data API | data | public | planned | [Page](../../services/platform/data.md) |
| `dav.rjmlaird.co.uk` | WebDAV storage | Private WebDAV attachment storage for Zotero | storage | restricted | planned | [Page](../../services/platform/dav.md) |
| `dev.rjmlaird.co.uk` | Developer resources | Reserved for developer-facing resources and release workflow | developer | public | reserved | [Page](../../services/platform/dev.md) |
| `docs.rjmlaird.co.uk` | Documentation | Public documentation for the digital estate | documentation | public | active | [Page](../../services/platform/docs.md) |
| `hooks.rjmlaird.co.uk` | Webhook gateway | Verified inbound webhook gateway | integration | restricted | planned | [Page](../../services/platform/hooks.md) |
| `labs.rjmlaird.co.uk` | Labs | Experimental and exploratory work, separate from production apps and tools | experimental | public | active | [Page](../../services/platform/labs.md) |
| `mcp.rjmlaird.co.uk` | MCP service | Model Context Protocol service for approved AI clients | protocol | restricted | planned | [Page](../../services/platform/mcp.md) |
| `research.rjmlaird.co.uk` | Research | Research, essays and analysis | website | public | planned | — |
| `rjmlaird.co.uk` | Main site | Main public site for the rjmlaird.co.uk brand and content | website | public | active | [Page](../../services/platform/web.md) |
| `space.rjmlaird.co.uk` | Space | Space and astronomy hub | website | public | planned | — |
| `status.rjmlaird.co.uk` | Status | Curated public service-status reporting | status | public | planned | [Page](../../services/platform/status.md) |
| `tools.rjmlaird.co.uk` | Tools catalogue | Catalogue and presentation layer for reusable utilities | catalogue | public | planned | [Page](../../services/platform/tools.md) |
| `upload.rjmlaird.co.uk` | Upload | Controlled content and asset ingestion | ingestion | restricted | planned | [Page](../../services/platform/upload.md) |
| Concept (no hostname) | Master (control plane) | Canonical manifests and control-plane role; a concept, not a deployed hostname | control-plane | public | planned | [Page](../../services/platform/master.md) |
