---
title: Services overview
description: What the rjmlaird-services system does, which Workers and hostnames it uses, how this section is organised and what is not built yet.
sidebar:
  order: 1
status: in-development
confidence: partly-verified
reviewStatus: needs-review
owner: Ryan Laird
lastReviewed: 2026-10-14
---

`rjmlaird-services` is the private repository behind the commercial side of rjmlaird.co.uk. It takes bookings and payments, verifies the webhooks that Stripe, Cal.com and HubSpot send, records what happened, keeps the HubSpot contact up to date and hands new clients over for delivery. It holds no public portfolio data; that lives in `rjmlaird-api` (see [ADR-0003](/platform/decisions/adr-0003-separate-public-api-from-webhook-services/)).

:::note[Status: In development]
This section is built from the repository's own documentation. It has not been checked against deployed configuration. The service catalogue is still a placeholder, the intake forms are not connected, and several launch tasks remain. See the [launch checklist](/operate/launch-readiness/).
:::

## What it does

1. A visitor chooses a service on the booking portal. Free sessions are handed to Cal.com; paid sessions go to Stripe Checkout through the billing Worker.
2. Stripe, Cal.com and HubSpot send signed webhooks to `service-hooks`, which verifies each one and puts a normalised event on a queue.
3. Private consumers record the booking or payment in D1, idempotently, and queue follow-up jobs.
4. `hubspot-sync` updates the HubSpot contact (one way only). `client-delivery` starts a delivery workflow once per confirmed payment.

Enquiry-only routes (focused reviews, teaching, speaking) deliberately have no automated quote-to-payment step. See [Customer journeys](/catalogue/first-party/customer-journeys/).

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
| Understand the design and trust boundaries | [Architecture overview](/catalogue/first-party/service-delivery-architecture/) |
| See how a customer moves from enquiry to payment | [Customer journeys](/catalogue/first-party/customer-journeys/) |
| Set up or debug a provider | [Stripe](/catalogue/external-integrations/stripe/), [Cal.com](/catalogue/external-integrations/calcom/), [HubSpot](/catalogue/external-integrations/hubspot/) |
| Look up an endpoint or event | [HTTP contracts](/build/reference/http-contracts/), [Internal events](/build/reference/events/) |
| Find a secret or setting | [Configuration reference](/build/reference/service-configuration/) |
| Query the database | [Data model](/build/reference/data-model/) |
| Fix a failing webhook | [Webhook failures runbook](/operate/runbooks/webhook-failures/) |
| Rotate a credential | [Secret rotation runbook](/operate/runbooks/secret-rotation/) |
| Prepare for launch | [Launch checklist](/operate/launch-readiness/) |

## To confirm

:::note[To confirm]
1. **Hostnames.** The source documents use `booking.rjmlaird.co.uk` and a `billing` subdomain. The [planning inventory](/platform/governance/subdomain-planning-inventory/) lists `booking` as *Merge into a path*, while the [catalogue](/catalogue/generated/subdomain-catalogue/) lists both `booking` and `billing` as dedicated hostnames. Resolve this under [ADR-0002](/platform/decisions/adr-0002-justify-subdomains-before-creating-them/).
2. **Booking deployment.** Whether the portal pages and the booking API are one deployable or two, and the exact `billing` hostname.
:::

## Related pages

- [APIs and integrations](/platform/architecture/apis-and-integrations/)
- [Security, privacy and access control](/platform/governance/security-and-privacy/)
- [Automation and workflows](/platform/architecture/automation-workflows/)
