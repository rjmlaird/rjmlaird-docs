---
id: stripe
title: Stripe
description: How Stripe Checkout and webhooks are set up for the services system, how signatures are verified, how duplicates are handled and how to recover missed events.
sidebar_position: 1
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

Stripe handles payment. The `billing` Worker creates Checkout Sessions, and `service-hooks` receives Stripe's webhooks. The signed webhook is the only proof of payment.

## Events handled

Subscribe the endpoint to exactly these three events.

| Event | Handling |
| --- | --- |
| `checkout.session.completed` | Recorded when `payment_status` is `paid`. Otherwise (delayed payment methods) acknowledged and ignored. |
| `payment_intent.succeeded` | Recorded. Maps to the same `payments` row as the session. |
| `payment_intent.payment_failed` | Recorded as a failed payment. |

## Setup

1. In the Dashboard (Developers, then Webhooks), add the endpoint `https://hooks.rjmlaird.co.uk/v1/webhooks/stripe`. For staging, use the staging host in test mode.
2. Select the three events above and no others.
3. Reveal the signing secret and store it on `service-hooks`:

   ```bash title="Set the webhook secret"
   wrangler secret put STRIPE_WEBHOOK_SECRET --config apps/service-hooks/wrangler.jsonc
   ```

4. Create a Price for each paid service. Set the matching `STRIPE_PRICE_*` secret on `billing`. These Price IDs are the purchase allowlist.
5. Create a restricted API key with Checkout Sessions write access and store it as `STRIPE_SECRET_KEY` on `billing`.

Secret names are listed in the [configuration reference](../reference/configuration.md).

## Verification

`service-hooks` reads the raw body once, as text, and checks the `Stripe-Signature` header (`t=…,v1=…`):

- HMAC-SHA256 over `${t}.${rawBody}`, using Web Crypto and the endpoint's signing secret.
- Any `v1` value may match, which supports secret rotation.
- A 5-minute timestamp tolerance.
- JSON is parsed only after verification. Failures return a generic `400`.

:::note[To confirm / technical debt]
This is a hand-rolled implementation of Stripe's documented scheme, chosen to keep the bundle small. It ignores the older `v0` scheme. To use the SDK instead, call `Stripe.createSubtleCryptoProvider()` with `constructEventAsync`. Consider recording the choice as an ADR.
:::

## Idempotency

Stripe retries and duplicates events, so there are two layers of protection.

- **Event level:** `webhook_events` is unique on `(provider, provider_event_id)`.
- **Business level:** the Checkout Session and its PaymentIntent resolve to one `payments` row, and delivery starts once.
- **Session creation:** `billing` sends `Idempotency-Key: checkout:<serviceId>:<intentId>`.

A browser success redirect is never proof of payment.

## Testing

Use test keys, a separate staging endpoint and `stripe listen` locally. Never mix live and test secrets in one environment. Use only Stripe's documented test card numbers.

## Recovery

To recover a missed event, open the endpoint in the Dashboard and resend the event. Resending is safe because duplicates are skipped. If a payment completed while ingress was down, resend `checkout.session.completed`. Check for refunds and disputes first; see [When not to replay](../runbooks/webhook-failures.md#when-not-to-replay).

## To confirm

:::note[To confirm]
1. The names of the three `CHECKOUT_*` URL settings and where each is set.
2. How payments from manually sent payment links are reconciled (see [Customer journeys](../architecture/customer-journeys.md#to-confirm)).
:::

## Related pages

- [HTTP contracts](../reference/http-contracts.md)
- [Secret rotation](../runbooks/secret-rotation.md#stripe-webhook-secret-zero-downtime)
- [Webhook failures](../runbooks/webhook-failures.md)
