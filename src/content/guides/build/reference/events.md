---
id: events
title: Internal events
description: The Zod-defined event envelope, the event types carried on the queues, money and CRM rules, and the versioning policy for backward compatibility.
sidebar_position: 2
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

After a webhook is verified, only the minimum fields are mapped into an internal event. Provider payloads are external input and are never passed on as they are. The source of truth is `packages/service-contracts/src/events.ts` (Zod); `eventJsonSchema()` exports it as JSON Schema.

## Envelope

| Field | Description |
| --- | --- |
| `eventId` | `evt_` followed by 32 hex characters, deterministic from provider, source id and type |
| `correlationId` | UUID minted at ingress and carried through every derived event |
| `occurredAt` | ISO 8601, UTC |
| `schemaVersion` | `1` |
| `source` | `{ provider, eventId, payloadVersion? }` |
| `type` | One of the types below |
| `payload` | Type-specific body |

## Event types

| Type | Carried on |
| --- | --- |
| `payment.confirmed.v1` | `service-events` |
| `payment.failed.v1` | `service-events` |
| `booking.created.v1` | `service-events` |
| `booking.cancelled.v1` | `service-events` |
| `crm.upsert-contact.v1` | `crm-sync-jobs` |
| `client-delivery.start.v1` | `client-delivery-jobs` (inferred from the queue name) |

## Rules

- Money is `amountMinor` (a non-negative integer) plus a lowercase ISO 4217 `currency`. Never use floats.
- CRM jobs must declare a `lawfulBasis`.
- Consumers re-validate every message against the schema, including across the RPC hop to `calcom-consumer`.

## Backward compatibility

- The version is part of the type name. Additive, optional fields stay in `v1`.
- A breaking change creates a `v2` type. Producers emit both versions until every consumer handles `v2`, then `v1` is removed.
- Consumers send unknown types to the DLQ rather than dropping them silently.

## Related pages

- [HTTP contracts](http-contracts.md)
- [Data model](data-model.md)
- [Services architecture](../../catalogue/first-party/service-delivery-architecture.md)
