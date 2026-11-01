---
title: dav.rjmlaird.co.uk
description: Private WebDAV attachment storage for Zotero. It is not a public file host.
sidebar:
  order: 5
status: active
confidence: partly-verified
visibility: restricted
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - restricted
  - storage
  - webdav
  - zotero
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
:::

## Purpose

`dav.rjmlaird.co.uk` is private WebDAV-compatible storage for Zotero attachment synchronisation. Its single responsibility is to store and serve those attachments to the approved client.

It is not a public file host, CDN, public API or general document-management system.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `dav.rjmlaird.co.uk` |
| Classification | Storage |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- WebDAV-compatible storage for Zotero attachments
- The read, write, list and delete operations needed for synchronisation
- A stable hostname to configure in Zotero's sync settings

Zotero adds its own `/zotero` path to a WebDAV address, so the configured address should normally be the hostname root. See [Zotero's sync guidance](https://www.zotero.org/support/sync).

## Storage architecture

```mermaid
flowchart LR
  Z[Zotero desktop] -->|HTTPS WebDAV| D[dav.rjmlaird.co.uk]
  D --> W[Dedicated DAV Worker]
  W -->|read and write objects| R[(Private R2 storage)]
```

The Worker is bound only to the storage it needs. Nothing here is exposed publicly.

## Supported methods

Only the methods the approved client needs are implemented.

| Method | Use |
| --- | --- |
| `OPTIONS` | Capability discovery |
| `PROPFIND` | List and describe files |
| `GET`, `HEAD` | Read |
| `PUT` | Write |
| `DELETE` | Remove |
| `MKCOL` | Create folders |
| `MOVE` | Only if the client requires it |

Unsupported methods return an appropriate error. Operations outside the DAV root are rejected.

## Boundaries

This service does not:

- Provide any public browsing, indexing or download interface
- Publish content through [cdn](/catalogue/first-party/cdn/) or expose it through [api](/catalogue/first-party/api/)
- Act as the source of bibliographic metadata, which Zotero and any approved research workflow manage; it stores attachment files only

## Access model

Anonymous access is not allowed.

| Client | Approach |
| --- | --- |
| Zotero desktop | Dedicated WebDAV credentials |
| Browser | Denied, or protected by Cloudflare Access |
| Administrative automation | Cloudflare Access service token or narrowly scoped credentials |
| Public | Denied |

## Security considerations

- Require HTTPS for every request
- Keep storage private; never expose a public development URL
- Use a dedicated Worker, separate from the public API
- Hold credentials as Worker secrets, never in Git
- Never log bodies, file contents or credentials
- Enforce an attachment-size limit
- Return non-cacheable responses for private content
- Reject path traversal and anything outside the DAV root
- Monitor availability without exposing a listing

## Dependencies

- A dedicated Cloudflare Worker and private object storage
- Worker secrets for credentials

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [auth.rjmlaird.co.uk](/catalogue/first-party/auth/)
- [dam.rjmlaird.co.uk](/catalogue/first-party/dam/)
- [upload.rjmlaird.co.uk](/catalogue/first-party/upload/)
- [cdn.rjmlaird.co.uk](/catalogue/first-party/cdn/)
