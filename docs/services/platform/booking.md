---
title: booking.rjmlaird.co.uk
description: "The booking integration boundary: service listing, booking intents and hand-off to the scheduling and payment providers."
sidebar_position: 4
tags: [service, public, integration, booking]
visibility: public
lifecycle: planned
confidence: Unverified
last_reviewed: 2026-10-14
---

# booking.rjmlaird.co.uk

:::info[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](../../architecture/generated/subdomain-catalogue.md) says it is active.
:::

## Purpose

`booking.rjmlaird.co.uk` is the boundary between visitors and the scheduling and payment providers. Its single responsibility is to let a visitor choose a service and be handed to the right provider. It never exposes customer records.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `booking.rjmlaird.co.uk` |
| Classification | Integration |
| Visibility | Public |
| Lifecycle | Planned |
| Evidence | None; intended scope only |
| Catalogue | [Generated public service catalogue](../../architecture/generated/subdomain-catalogue.md) |

## What it provides

- A list of bookable services
- Booking intents, which hand a visitor to Cal.com or to checkout
- Static confirmation pages for the provider redirects

## Public interface

Only the routes in [HTTP contracts](../reference/http-contracts.md#booking-booking) are public. The journey is in [Customer journeys](../architecture/customer-journeys.md).

## Boundaries

This service does not:

- Expose, list or search bookings, customers or payments
- Take or store card data
- Prove payment; only a verified webhook does, via [hooks](./hooks.md)
- Read from the CRM

## Access model

Public, with strict allow-lists, explicit CORS origins, validated request bodies and rate limiting. No stored data can be read through it.

## Dependencies

- Cal.com for scheduling and Stripe for payment, through the providers' own flows
- [hooks](./hooks.md) for verified events
- The service catalogue held in the private services repository

## Operations

- [Cal.com integration](../integrations/calcom.md)
- [Launch checklist](../launch-checklist.md)
- [Deployment and environments](../../architecture/environments.md)
- [Security, privacy and access](../../architecture/security-privacy-access.md)
- [Observability and status](../../architecture/observability-status.md)
- [Adding or changing a service](../../guides/adding-a-service.md)

## To confirm

:::note[To confirm]
The [planning inventory](../../architecture/subdomain-planning-inventory.md) recommended a path on the main site instead of a `booking` hostname. A dedicated hostname needs an ADR under [ADR-0002](../../architecture/adrs/ADR-0002-justify-subdomains-before-creating-them.md).
:::

## Related services

- [hooks.rjmlaird.co.uk](./hooks.md)
- [rjmlaird.co.uk](./web.md)
- [api.rjmlaird.co.uk](./api.md)
