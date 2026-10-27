---
id: http-contracts
title: HTTP contracts
description: The public HTTP endpoints of the booking, billing and webhook Workers, with request and response shapes, status codes and error format.
sidebar_position: 1
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

This page lists every HTTP route the services system exposes. Anything not listed returns `404`. Internal events are covered separately in [Internal events](events.md).

## Conventions

- Errors are JSON of the form `{ "error": "<stable_code>", "requestId": "..." }`. They never contain internals.
- Every JSON response carries security headers and an `X-Request-Id` header.
- Public Workers use route and method allow-lists, explicit CORS origins, strict Zod bodies and rate limiting.

## Webhook ingress (`service-hooks`)

Bodies are the provider's raw payloads. Signature verification happens before anything is parsed.

| Method and path | Provider | Signature header | Details |
| --- | --- | --- | --- |
| `POST /v1/webhooks/stripe` | Stripe | `Stripe-Signature` | [Stripe](../../catalogue/external-integrations/stripe.md) |
| `POST /v1/webhooks/calcom` | Cal.com | `X-Cal-Signature-256` | [Cal.com](../../catalogue/external-integrations/calcom.md) |
| `POST /v1/webhooks/hubspot` | HubSpot | `X-HubSpot-Signature-v3` | [HubSpot](../../catalogue/external-integrations/hubspot.md#inbound-webhook-route) |

| Status | Meaning | Notes |
| --- | --- | --- |
| `200` | `{ "received": true }`, or `{ "received": true, "ignored": true }` for a verified event that is deliberately not processed | Event accepted |
| `400` | Invalid signature or payload (`invalid_signature` for signature failures) | Failures return a generic body |
| `413` | Body too large | Body exceeds the size limit |
| `500` | Secret missing for this environment (`webhook_not_configured`) | Not configured, not a provider fault |
| `503` | Enqueue failed (`temporarily_unavailable`) | The provider retries, so watch rather than act |

## Booking (`booking`)

| Method and path | Purpose |
| --- | --- |
| `GET /v1/services` | List the bookable services. |
| `POST /v1/booking-intents` | Create a booking intent. |

```json title="POST /v1/booking-intents (request body)"
{ "serviceId": "<service id>", "timezone": "<optional timezone>" }
```

## Billing (`billing`)

| Method and path | Purpose |
| --- | --- |
| `POST /v1/checkout-sessions` | Create a Stripe Checkout Session for a service and intent. |
| `POST /v1/customer-portal-sessions` | Not implemented. Always returns `501`. |

```json title="POST /v1/checkout-sessions (request and response)"
{ "serviceId": "<service id>", "intentId": "<intent id>" }
```

```json title="Response"
{ "sessionId": "<Stripe session id>", "url": "<Checkout URL>" }
```

`serviceId` must resolve to a configured Stripe Price; see the [configuration reference](service-configuration.md).

## To confirm

:::note[To confirm]
1. The full list of stable error codes. Only `invalid_signature`, `webhook_not_configured` and `temporarily_unavailable` are named in the runbooks.
2. The response body of `POST /v1/booking-intents`, the request size limit behind `413`, and the rate-limit thresholds.
3. The OpenAPI document. The [APIs and integrations](../../platform/architecture/apis-and-integrations.md) page recommends one for any API with external consumers.
:::

## Related pages

- [Internal events](events.md)
- [Services architecture](../../catalogue/first-party/service-delivery-architecture.md)
