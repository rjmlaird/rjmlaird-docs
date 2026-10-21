---
id: hubspot
title: HubSpot
description: How contacts are synchronised one way to HubSpot, the private app and properties required, retry behaviour and data minimisation rules.
owner: To confirm
review_cycle: 6 months
sidebar_position: 3
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

HubSpot remains the CRM authority. `hubspot-sync` pushes contacts one way and never reads HubSpot state back.

## Access

1. Create a **private app** with only `crm.objects.contacts.read` and `crm.objects.contacts.write`.
2. Store its token as `HUBSPOT_ACCESS_TOKEN` on `hubspot-sync` only.
3. Create two custom contact properties (single-line text): `rjm_booking_status` and `rjm_lifecycle_note`. To use different internal names, set `HUBSPOT_PROP_BOOKING_STATUS` and `HUBSPOT_PROP_LIFECYCLE_NOTE`.

Create the properties before the first job runs.

## Mapping

A `crm.upsert-contact.v1` job maps to a contact like this. Nothing else is sent.

| Job field | HubSpot property |
| --- | --- |
| `email` (lower-cased; the match key) | `email` |
| First name | `firstname` |
| Last name | `lastname` |
| Booking status | `rjm_booking_status` |
| Lifecycle note | `rjm_lifecycle_note` |

A job without a valid email or a `lawfulBasis` is rejected by the contract and dead-lettered.

**Flow:** search by email, then `PATCH` if found or `POST` to create. If HubSpot returns an id, it is saved in `provider_links` against the booking or payment.

## Retries

| Condition | Behaviour |
| --- | --- |
| `429` | Retry, honouring `Retry-After` |
| `409`, `5xx`, network error | Retry |
| Missing token (operator error) | Retry |
| Permanent `4xx` (bad scope, invalid property) | Straight to `crm-sync-jobs-dlq` |

Backoff runs from 30 seconds to 10 minutes, with at most 5 deliveries before the message goes to the DLQ.

## Inbound webhook route

`POST /v1/webhooks/hubspot` verifies the v3 signature (`X-HubSpot-Signature-v3`, with a 5-minute timestamp window, using `HUBSPOT_CLIENT_SECRET`) and acknowledges. In the MVP it enqueues nothing.

:::note[To confirm]
Only configure a HubSpot webhook subscription once an inbound use case exists.
:::

## Data minimisation

- Emails travel only in queue messages. They are never written to D1 or to logs (key-based and pattern-based redaction).
- Each job declares its lawful basis. The MVP uses `contract` for people who book or pay.
- Logs never contain emails or tokens.

:::note[To confirm]
1. A deletion path (HubSpot GDPR delete) in the data-subject request process.
2. How long queue messages, including DLQ messages that carry emails, are retained. Emails are absent from D1, but they persist in queues until retention expires.
3. Which HubSpot app supplies `HUBSPOT_CLIENT_SECRET`, given that the contact sync uses a private app.
:::

## Related pages

- [Events](../../build/reference/events.md)
- [Secret rotation](../../operate/runbooks/secret-rotation.md#hubspot-token-and-client-secret)
- [Configuration reference](../../build/reference/service-configuration.md)
