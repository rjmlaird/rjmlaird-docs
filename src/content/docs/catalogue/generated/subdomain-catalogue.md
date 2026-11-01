---
title: Generated public service catalogue
sidebar:
  label: Generated service catalogue
  order: 3
description: Public reference table of the services in the rjmlaird.co.uk estate, generated from the canonical catalogue.
status: active
lastUpdated: 2026-10-14T00:00:00.000Z
kind: catalogue
editUrl: false
---

:::note[Generated page]
Built from `data/subdomains.json`. Edit the data or run the sync script; changes made to this page are overwritten.
:::

Catalogue version 1.0.0, dated 2026-10-14. Lifecycle shows intent unless the service page says it is verified. Definitions are in the [subdomain catalogue](/platform/governance/subdomains/).

| Hostname | Service | Purpose | Classification | Visibility | Lifecycle | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| `api.rjmlaird.co.uk` | Public API | Public, read-oriented portfolio and estate catalogue API | api | public | planned | [Page](/catalogue/first-party/api/) |
| `apps.rjmlaird.co.uk` | Apps catalogue | Catalogue and presentation layer for maintained applications | catalogue | public | planned | [Page](/catalogue/first-party/apps/) |
| `auth.rjmlaird.co.uk` | Identity and access | Identity and access boundary for protected services | identity | restricted | planned | [Page](/catalogue/first-party/auth/) |
| `billing.rjmlaird.co.uk` | Billing | Checkout-session creation for paid services | integration | public | planned | — |
| `booking.rjmlaird.co.uk` | Booking | Booking integration boundary | integration | public | planned | [Page](/catalogue/first-party/booking/) |
| `cdn.rjmlaird.co.uk` | Asset delivery | Public, read-only delivery of approved assets | asset-delivery | public | planned | [Page](/catalogue/first-party/cdn/) |
| `dam.rjmlaird.co.uk` | Asset management | Governed media and asset management | asset-management | restricted | planned | [Page](/catalogue/first-party/dam/) |
| `data.rjmlaird.co.uk` | Reference data | Curated, attributed public reference-data API | data | public | planned | [Page](/catalogue/first-party/data/) |
| `dav.rjmlaird.co.uk` | WebDAV storage | Private WebDAV attachment storage for Zotero | storage | restricted | planned | [Page](/catalogue/first-party/dav/) |
| `dev.rjmlaird.co.uk` | Developer resources | Reserved for developer-facing resources and release workflow | developer | public | reserved | [Page](/catalogue/first-party/dev/) |
| `docs.rjmlaird.co.uk` | Documentation | Public documentation for the digital estate | documentation | public | active | [Page](/catalogue/first-party/docs/) |
| `hooks.rjmlaird.co.uk` | Webhook gateway | Verified inbound webhook gateway | integration | restricted | planned | [Page](/catalogue/first-party/hooks/) |
| `labs.rjmlaird.co.uk` | Labs | Experimental and exploratory work, separate from production apps and tools | experimental | public | active | [Page](/catalogue/first-party/labs/) |
| `mcp.rjmlaird.co.uk` | MCP service | Model Context Protocol service for approved AI clients | protocol | restricted | planned | [Page](/catalogue/first-party/mcp/) |
| `research.rjmlaird.co.uk` | Research | Research, essays and analysis | website | public | planned | — |
| `rjmlaird.co.uk` | Main site | Main public site for the rjmlaird.co.uk brand and content | website | public | active | [Page](/catalogue/first-party/web/) |
| `space.rjmlaird.co.uk` | Space | Space and astronomy hub | website | public | planned | — |
| `status.rjmlaird.co.uk` | Status | Curated public service-status reporting | status | public | planned | [Page](/catalogue/first-party/status/) |
| `tools.rjmlaird.co.uk` | Tools catalogue | Catalogue and presentation layer for reusable utilities | catalogue | public | planned | [Page](/catalogue/first-party/tools/) |
| `upload.rjmlaird.co.uk` | Upload | Controlled content and asset ingestion | ingestion | restricted | planned | [Page](/catalogue/first-party/upload/) |
| Concept (no hostname) | Master (control plane) | Canonical manifests and control-plane role; a concept, not a deployed hostname | control-plane | public | planned | [Page](/catalogue/first-party/master/) |
