---
id: webhook-failures
title: Webhook failures
description: How to find, diagnose and safely replay failed or missed webhook events in the services system, and when not to replay them.
sidebar_position: 1
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

Use this runbook when a provider reports failed deliveries, a booking or payment is missing, or a DLQ is growing. Work through triage, decide whether replay is safe, then replay in the least invasive way.

## Triage

Check these four places in order.

1. **Provider dashboard.** Delivery attempts and response codes (Stripe, Cal.com).
2. **Worker logs.** Structured JSON, searchable by `requestId`, `correlationId` and `eventId`. Emails and tokens are redacted.

   ```bash title="Live logs"
   wrangler tail --config apps/service-hooks/wrangler.jsonc
   ```

3. **D1.** Look for events that never finished.

   ```sql title="Event status overview"
   SELECT processing_status, COUNT(*) FROM webhook_events GROUP BY 1;
   ```

   ```sql title="Events stuck for more than 15 minutes"
   SELECT * FROM webhook_events
    WHERE processing_status != 'processed'
      AND received_at < datetime('now', '-15 minutes');
   ```

   `received` for a long time means a crashed or retrying attempt. `failed` means the system gave up.

4. **Dead-letter queues.** `service-events-dlq`, `crm-sync-jobs-dlq` and `client-delivery-jobs-dlq`. Messages are kept only for the queue retention period, so triage promptly.

## Symptoms and likely causes

| Symptom | Likely cause |
| --- | --- |
| Provider shows `400 invalid_signature` | Wrong or rotated secret, body modified by a proxy, or clock skew (Stripe) |
| `500 webhook_not_configured` | Secret not set for that environment |
| `503 temporarily_unavailable` | Queue send failed. The provider will retry, so watch first |
| Events accepted but no D1 rows | Consumer not deployed or bound, or `service-events` has the wrong consumer |
| DLQ growing | Poison message or a permanent downstream error |

For secret problems, see [Secret rotation](secret-rotation.md).

## When not to replay

Stop and investigate instead if any of these apply.

- **Signature failures from an unknown sender.** That is probing, not a lost event.
- **A refunded or disputed payment.** Check Stripe first. Replaying `succeeded` after a refund would start delivery for a refunded customer.
- **A cancelled booking.** `bookings.status = 'cancelled'` is terminal by design.
- **Data past its retention window.** Anything older than the retention or lawful-basis window for the contact.
- **An unfixed fault.** A deploy or configuration bug you have not fixed yet.

## Replaying safely

Consumers are idempotent, so a duplicate is skipped. That makes replay safe once the root cause is fixed. If it is not fixed, the consumer simply fails again.

1. **Prefer provider-side resend** for missed ingress (for example Stripe's "resend"). It re-verifies and re-normalises the event, and duplicates are harmless.
2. **Re-queue a DLQ message** only after the root cause is fixed.
3. **Replay in `occurredAt` order** where it matters. Cancel-before-create is handled, but keep it tidy.
4. **Reset a stuck ledger row only with intent.** Take a restore point and confirm the target first:

   ```bash title="Restore point (D1 Time Travel)"
   wrangler d1 time-travel info <DB_NAME>
   ```

   ```sql title="Confirm exactly one row matches"
   SELECT * FROM webhook_events WHERE id = 'evt_…';
   ```

   ```sql title="Reset, then re-enqueue the event"
   UPDATE webhook_events SET processing_status = 'received' WHERE id = 'evt_…';
   ```

## Duplicate events

Duplicates are expected and handled. A `duplicate` log outcome is normal.

Duplicate **side effects** are a bug: two workflows or two CRM contacts. Check `delivery_workflows.workflow_key` and the HubSpot email search.

## To confirm

:::note[To confirm]
1. Who is alerted when a DLQ receives a message.
2. DLQ and queue retention periods.
3. Whether Cal.com retries failed deliveries (see [Cal.com](../../catalogue/external-integrations/calcom.md#to-confirm)).
:::

## Related pages

- [Services architecture](../../catalogue/first-party/service-delivery-architecture.md#delivery-semantics)
- [Data model](../../build/reference/data-model.md)
- [Observability, status and incident response](../status-and-observability.md)
