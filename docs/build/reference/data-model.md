---
id: data-model
title: Data model
description: The D1 tables used by the services system, their key constraints and status values, and what is deliberately never stored.
sidebar_position: 3
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

D1 is private storage, never exposed over HTTP. This page gathers what the other documents say about its tables. It is a summary, not the schema.

:::note[Authoritative schema]
The full column definitions live in the repository's `migrations/` directory. Only facts stated elsewhere in the documentation appear here.
:::

## Tables

| Table | Purpose | Key facts |
| --- | --- | --- |
| `webhook_events` | Ledger of every verified provider event | Unique on `(provider, provider_event_id)`. `processing_status` is `received`, `processed` or `failed`. A processed event is skipped. |
| `bookings` | Cal.com bookings | `status = 'cancelled'` is terminal by design. |
| `payments` | One row per payment | A Checkout Session and its PaymentIntent resolve to the same row. `booking_id` is reserved for future reconciliation. |
| `provider_links` | Maps internal records to provider ids | Stores the HubSpot id against a booking or payment. |
| `delivery_workflows` | Client-delivery workflow state | `workflow_key` is unique. Status moves `pending` to `started` or `failed`. |

Business state and the "processed" mark for an event are written in one `D1.batch()` transaction. See [Delivery semantics](../../catalogue/first-party/service-delivery-architecture.md#delivery-semantics).

## Never stored

- Card data
- Raw provider payloads
- Email addresses (they travel only in queue messages)
- Secrets or tokens (logs redact them too)

## Useful queries

The queries for finding stuck events are in the [webhook failures runbook](../../operate/runbooks/webhook-failures.md#triage).

## Related pages

- [Internal events](events.md)
- [Client delivery Worker](client-delivery.md)
