---
id: calcom
title: Cal.com
description: How Cal.com booking webhooks are configured and verified for the services system, including the values to enter, the assumptions made and known gaps.
sidebar_position: 2
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

Cal.com handles scheduling. When a booking is created or cancelled, Cal.com calls `service-hooks`, which verifies the signature and queues a normalised event.

## Implementation assumptions

- Cal.com signs the **raw body** with HMAC-SHA256 using the webhook's secret and sends the hex digest in `X-Cal-Signature-256`. `verifyCalcomSignature` (`apps/service-hooks/src/calcom.ts`) implements exactly this and nothing else.
- Cal.com sends **no timestamp**, so replay protection relies on idempotency, not on a time window.
- Payloads carry no event id. The source event id is `<triggerEvent>:<booking uid>`.
- A rescheduled booking gets a new uid. `BOOKING_RESCHEDULED` is acknowledged and ignored in the MVP.

## Failure behaviour

| Condition | Response |
| --- | --- |
| Secret missing in production | `500 webhook_not_configured` |
| Signature missing or wrong | `400` |
| Unsigned mode | Allowed only when `ENVIRONMENT` is not `production` **and** `CALCOM_ALLOW_UNSIGNED` is `true` |

## Setup

In Cal.com, go to Settings, then Developer, then Webhooks, then New, and enter:

| Field | Value |
| --- | --- |
| Subscriber URL | `https://hooks.rjmlaird.co.uk/v1/webhooks/calcom` |
| Secret | The value stored as `CALCOM_WEBHOOK_SECRET` |
| Event triggers | Booking Created and Booking Cancelled only |
| Payload template | Default (leave empty) |
| Active | On, after the secret is set on the Worker |

Also set `CALCOM_BASE_URL` on the `booking` Worker, and create event types whose slugs match `calcomSlug` in `packages/service-contracts/src/services.ts`.

:::warning[Use the default payload template]
Custom templates change the body and fail validation.
:::

## Testing

Unit tests sign synthetic payloads (`apps/service-hooks/test/webhooks.test.ts`). For staging, use Cal.com's "Ping test" and a throwaway booking, then check `webhook_events` in the staging D1 database.

## To confirm

:::note[To confirm]
1. That the production webhook has a secret and uses the default payload template.
2. Whether Cal.com retries failed deliveries. The runbooks assume it does, but the integration notes do not say so. If it does not, a `503` or a rotation gap loses a booking until reconciled by hand.
3. Reschedule handling. Only two triggers are subscribed, so `BOOKING_RESCHEDULED` never reaches the Worker. A rescheduled booking may therefore leave a stale row and an outdated HubSpot status.
:::

## Related pages

- [Secret rotation](../runbooks/secret-rotation.md#calcom-webhook-secret)
- [Webhook failures](../runbooks/webhook-failures.md)
- [Events](../reference/events.md)
