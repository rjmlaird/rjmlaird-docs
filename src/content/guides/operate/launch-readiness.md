---
id: launch-checklist
title: Launch checklist
description: Everything that must be configured, decided or built before the services system goes live, grouped by platform, with links to the detailed pages.
sidebar_position: 2
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

Complete this list before launch. Tick items off in your working copy of the page; the details are on the linked pages.

## Cloudflare

- [ ] Create the six queues (`service-events`, `crm-sync-jobs`, `client-delivery-jobs` and a DLQ for each), plus staging copies.
- [ ] Create the D1 database, plus staging, and paste `database_id` into the four D1 `wrangler.jsonc` files.
- [ ] Give every Worker and environment a unique rate-limit `namespace_id`.
- [ ] Set the zone and route patterns for the `hooks`, `booking` and `billing` subdomains.
- [ ] Retain the DLQs.
- [ ] Put any future admin hostname behind Cloudflare Access.

## Stripe

- [ ] Add the webhook endpoint with its three events. See [Stripe](../catalogue/external-integrations/stripe.md#setup).
- [ ] Create the restricted API key.
- [ ] Create Products and Prices.
- [ ] Set the three `CHECKOUT_*` URLs.
- [ ] Set the `STRIPE_PRICE_*` secrets.

## Cal.com

- [ ] Add the webhook URL, secret and triggers. See [Cal.com](../catalogue/external-integrations/calcom.md#setup).
- [ ] Create event types whose slugs match `services.ts`.
- [ ] Set `CALCOM_BASE_URL`.
- [ ] Confirm the webhook has a secret and uses the default payload template.

## HubSpot

- [ ] Create the private app with contacts read and write scopes.
- [ ] Create the `rjm_booking_status` and `rjm_lifecycle_note` properties.
- [ ] Decide whether to use the inbound webhook route. Leave it unconfigured until an inbound use case exists.

## Repository

- [ ] Replace the placeholder service catalogue in `packages/service-contracts/src/services.ts`.
- [ ] Enable branch protection and secret scanning on GitHub.

## Application work not yet built

- [ ] Intake receiver (`POST /v1/intake/*`).
- [ ] Route-to-service mapping.
- [ ] Marketing consent checkbox, if MailerLite is used.

See [Customer journeys](../catalogue/first-party/customer-journeys.md#not-yet-built).

## Data protection

- [ ] Add a HubSpot GDPR deletion step to the data-subject request process.
- [ ] Confirm queue and DLQ retention against the retention policy.
- [ ] Link the privacy page from the booking and billing sites.

## Verify in staging

- [ ] Stripe: run with test keys and `stripe listen`; confirm one `payments` row and one delivery workflow per payment.
- [ ] Cal.com: send the "Ping test" and make a throwaway booking; check `webhook_events` in staging D1.
- [ ] Resend a Stripe event and confirm it is skipped as a duplicate.

## Related pages

- [Services overview](../catalogue/first-party/index.md)
- [Configuration reference](../build/reference/service-configuration.md)
- [Roadmap and decision log](../platform/roadmap.md)
