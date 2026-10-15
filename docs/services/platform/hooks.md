---
title: hooks.rjmlaird.co.uk
description: "The verified inbound webhook gateway: it checks provider signatures and routes events to private processing."
sidebar_position: 3
tags: [service, restricted, integration, webhooks]
visibility: restricted
lifecycle: planned
confidence: Partly verified
last_reviewed: 2026-10-14
---

# hooks.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`hooks.rjmlaird.co.uk` receives webhooks from approved providers. Its single responsibility is to verify each request's signature over the raw body and hand the normalised event to private processing.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `hooks.rjmlaird.co.uk` |
| Classification | Integration |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- Signature verification for Stripe, Cal.com and HubSpot webhooks
- Normalisation of verified events into internal events
- Safe acknowledgement and retry behaviour

The endpoints, status codes and events are defined in [HTTP contracts](../reference/http-contracts.md) and [Internal events](../reference/events.md).

## Boundaries

This service does not:

- Authenticate people or serve browsers
- Hold storage or provider API tokens; it holds only webhook secrets and a queue producer
- Run business logic or expose customer records
- Treat an unverified request as an event

## Access model

The endpoints are reachable by provider servers but are restricted by signature verification: nothing is processed until the signature verifies. Anything else returns `404`.

## Dependencies

- Cloudflare Workers and Queues
- Provider webhook secrets, held as Worker secrets
- Private consumers described in the [services architecture](../architecture/overview.md)

## Operations

- [Webhook failures runbook](../runbooks/webhook-failures.md)
- [Secret rotation runbook](../runbooks/secret-rotation.md)
- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## Related services

- [booking.rjmlaird.co.uk](./booking.md)
- [auth.rjmlaird.co.uk](./auth.md)
- [Services overview](../index.md)
- [Stripe](../integrations/stripe.md), [Cal.com](../integrations/calcom.md), [HubSpot](../integrations/hubspot.md)
