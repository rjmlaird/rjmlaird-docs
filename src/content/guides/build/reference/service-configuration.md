---
id: configuration
title: Configuration reference
description: Every secret, variable and per-environment setting of the services Workers, grouped by Worker, with the rules for setting them.
sidebar_position: 4
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

This page lists names only, never values. Set secrets with `wrangler secret put`, which reads from standard input. Never paste a secret into a ticket, a chat or a repository.

```bash title="Setting a secret"
wrangler secret put <NAME> --config <path/to/wrangler.jsonc> [--env staging]
```

## Secrets and variables by Worker

| Worker | Name | Kind | Purpose |
| --- | --- | --- | --- |
| `service-hooks` | `STRIPE_WEBHOOK_SECRET` | Secret | `whsec_…`; one per endpoint and environment |
| `service-hooks` | `CALCOM_WEBHOOK_SECRET` | Secret | HMAC secret for Cal.com payloads |
| `service-hooks` | `HUBSPOT_CLIENT_SECRET` | Secret | Verifies HubSpot v3 signatures |
| `service-hooks` | `ENVIRONMENT` | Variable | `production` disables unsigned mode |
| `service-hooks` | `CALCOM_ALLOW_UNSIGNED` | Variable | Non-production only; permits unsigned Cal.com payloads |
| `billing` | `STRIPE_SECRET_KEY` | Secret | Restricted key: Checkout Sessions write |
| `billing` | `STRIPE_PRICE_*` | Secret | Price IDs, for example `STRIPE_PRICE_STRATEGY_SESSION` and `STRIPE_PRICE_SPACE_COMMS_AUDIT`. Not sensitive, but validated as the purchase allowlist |
| `billing` | `CHECKOUT_*` | Variable | Three redirect URLs (names to confirm) |
| `booking` | `CALCOM_BASE_URL` | Variable | Base URL for Cal.com handoff |
| `hubspot-sync` | `HUBSPOT_ACCESS_TOKEN` | Secret | Private app token, contacts read and write only |
| `hubspot-sync` | `HUBSPOT_PROP_BOOKING_STATUS`, `HUBSPOT_PROP_LIFECYCLE_NOTE` | Variable | Optional overrides for the custom property names |

`stripe-consumer`, `calcom-consumer` and `client-delivery` hold no secrets today. A delivery adapter adds its own secret to `client-delivery` only.

## Per-environment settings

- **Queues:** six per environment (`service-events`, `crm-sync-jobs`, `client-delivery-jobs` and a DLQ for each).
- **D1:** one `database_id` per environment, set in the four D1 `wrangler.jsonc` files.
- **Rate limiting:** `namespace_id` unique per Worker and environment.
- **Routes:** zone and route patterns for the `hooks`, `booking` and `billing` subdomains.
- **Service catalogue:** `packages/service-contracts/src/services.ts` (still a placeholder).

Never mix live and test credentials in one environment.

## To confirm

:::note[To confirm]
1. The names of the three `CHECKOUT_*` settings.
2. Where non-secret variables are set (the `wrangler.jsonc` files, or the dashboard).
:::

## Related pages

- [Secret rotation](../../operate/runbooks/secret-rotation.md)
- [Launch checklist](../../operate/launch-readiness.md)
