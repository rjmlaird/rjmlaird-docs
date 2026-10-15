---
title: auth.rjmlaird.co.uk
description: "The identity and access boundary for protected rjmlaird.co.uk services; Cloudflare Access is the primary edge control."
sidebar_position: 1
tags: [service, restricted, identity, access]
visibility: restricted
lifecycle: planned
confidence: Partly verified
last_reviewed: 2026-10-14
---

# auth.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`auth.rjmlaird.co.uk` is the identity and access boundary for protected services and automation. Its single responsibility is to establish who a caller is for services that need it.

It is not a public user directory, not a user database, and not a replacement for Cloudflare Access.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `auth.rjmlaird.co.uk` |
| Classification | Identity and access |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- Authentication callbacks and session handling for protected applications
- Short-lived state for sign-in flows, such as OAuth state and PKCE verifiers
- Validation of sessions and access tokens
- Controlled logout and revocation markers
- A clear boundary between public services and protected operations

## Boundaries

- Public portfolio and reference-data APIs need no sign-in
- Private dashboards and administrative tools are protected with Cloudflare Access
- Webhooks are authenticated by provider signature verification, not by this service
- Booking and billing use provider-backed customer flows where possible
- It does not store plaintext passwords, long-lived provider credentials, or data that needs strongly consistent single-use or revocation semantics

## Access model

Cloudflare Access is the primary edge access-control layer for protected subdomains where configured. A request reaching a Worker is not authorised unless the Worker validates the Access assertion or applies its own authorisation.

Humans sign in through approved identity providers; the documented design is GitHub sign-in with an allow-list. Automated clients use Cloudflare Access service tokens, not interactive login.

## Security considerations

- Keep short-lived, low-risk state in key-value storage only; keep anything needing strong consistency elsewhere
- Scope the shared session cookie deliberately; see [Security, privacy and access](../../architecture/security-privacy-access.md)
- Store secrets as Worker secrets, never in Git

## Dependencies

- Cloudflare Access (Zero Trust)
- A Worker with key-value storage (owner-stated)
- An approved identity provider

## Operations

- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## Related services

- [mcp.rjmlaird.co.uk](./mcp.md)
- [hooks.rjmlaird.co.uk](./hooks.md)
- [upload.rjmlaird.co.uk](./upload.md)
- [dam.rjmlaird.co.uk](./dam.md)
- [status.rjmlaird.co.uk](./status.md)
