---
id: index
title: Services overview
description: What the rjmlaird-services system does, which Workers and hostnames it uses, how this section is organised and what is not built yet.
sidebar_position: 1
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

`rjmlaird-services` is the private repository behind the commercial side of rjmlaird.co.uk. It takes bookings and payments, verifies the webhooks that Stripe, Cal.com and HubSpot send, records what happened, keeps the HubSpot contact up to date and hands new clients over for delivery. It holds no public portfolio data; that lives in `rjmlaird-api` (see [ADR-0003](../../platform/decisions/ADR-0003-separate-public-api-from-webhook-services.md)).

:::info[Status: In development]
This section is built from the repository's own documentation. It has not been checked against deployed configuration. The service catalogue is still a placeholder, the intake forms are not connected, and several launch tasks remain. See the [launch checklist](../../operate/launch-readiness.md).
:::

## What it does

1. A visitor chooses a service on the booking portal. Free sessions are handed to Cal.com; paid sessions go to Stripe Checkout through the billing Worker.
2. Stripe, Cal.com and HubSpot send signed webhooks to `service-hooks`, which verifies each one and puts a normalised event on a queue.
3. Private consumers record the booking or payment in D1, idempotently, and queue follow-up jobs.
4. `hubspot-sync` updates the HubSpot contact (one way only). `client-delivery` starts a delivery workflow once per confirmed payment.

Enquiry-only routes (focused reviews, teaching, speaking) deliberately have no automated quote-to-payment step. See [Customer journeys](customer-journeys.md).

## Components

| Worker | Role | Reachable from |
| --- | --- | --- |
| `service-hooks` | Webhook ingress at `hooks.rjmlaird.co.uk`. Verifies signatures, enqueues events. | Provider servers |
| `booking` | Service listing, booking intents and the portal pages at `booking.rjmlaird.co.uk`. | Browsers |
| `billing` | Creates Stripe Checkout Sessions. | Browsers |
| `stripe-consumer` | Sole consumer of `service-events`. Handles payment events and passes Cal.com events to `calcom-consumer` over an RPC service binding. | Queue only |
| `calcom-consumer` | Records bookings and cancellations. | Service binding only |
| `hubspot-sync` | Upserts HubSpot contacts from `crm-sync-jobs`. | Queue only |
| `client-delivery` | Starts and records client-delivery workflows from `client-delivery-jobs`. | Queue only |

:::note[Naming]
The repository is `rjmlaird-services`. The Worker behind `hooks.rjmlaird.co.uk` is called `service-hooks`. Despite its name, `stripe-consumer` also receives Cal.com events; it routes them to `calcom-consumer`.
:::

## Where to look

| You want to | Go to |
| --- | --- |
| Understand the design and trust boundaries | [Architecture overview](service-delivery-architecture.md) |
| See how a customer moves from enquiry to payment | [Customer journeys](customer-journeys.md) |
| Set up or debug a provider | [Stripe](../external-integrations/stripe.md), [Cal.com](../external-integrations/calcom.md), [HubSpot](../external-integrations/hubspot.md) |
| Look up an endpoint or event | [HTTP contracts](../../build/reference/http-contracts.md), [Internal events](../../build/reference/events.md) |
| Find a secret or setting | [Configuration reference](../../build/reference/service-configuration.md) |
| Query the database | [Data model](../../build/reference/data-model.md) |
| Fix a failing webhook | [Webhook failures runbook](../../operate/runbooks/webhook-failures.md) |
| Rotate a credential | [Secret rotation runbook](../../operate/runbooks/secret-rotation.md) |
| Prepare for launch | [Launch checklist](../../operate/launch-readiness.md) |

## To confirm

:::note[To confirm]
1. **Hostnames.** The source documents use `booking.rjmlaird.co.uk` and a `billing` subdomain. The [planning inventory](../../platform/governance/subdomain-planning-inventory.md) lists `booking` as *Merge into a path*, while the [catalogue](../generated/subdomain-catalogue.md) lists both `booking` and `billing` as dedicated hostnames. Resolve this under [ADR-0002](../../platform/decisions/ADR-0002-justify-subdomains-before-creating-them.md).
2. **Booking deployment.** Whether the portal pages and the booking API are one deployable or two, and the exact `billing` hostname.
:::

## Related pages

- [APIs and integrations](../../platform/architecture/apis-and-integrations.md)
- [Security, privacy and access control](../../platform/governance/security-and-privacy.md)
- [Automation and workflows](../../platform/architecture/automation-workflows.md)
