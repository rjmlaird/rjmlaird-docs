---
id: client-delivery
title: Client delivery Worker
description: How the client-delivery consumer records workflows and hands new clients over, and how to add a real handover adapter.
sidebar_position: 5
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

`client-delivery` is a private consumer of the `client-delivery-jobs` queue. For each `workflowKey` it stores a durable workflow row in D1 (`pending`, then `started` or `failed`) and calls a `HandoverAdapter`.

## Behaviour

- Delivery starts only on the first transition of a payment to `succeeded`.
- `delivery_workflows.workflow_key` is unique, so duplicate messages collapse into one workflow.
- Messages that exhaust their retries go to `client-delivery-jobs-dlq`.
- The default adapter only logs. No client is actually handed over until an adapter is added.

## Adding an adapter

To connect Notion, OpenProject or email:

1. Implement `HandoverAdapter` in `src/adapters.ts`.
2. Return it from `selectAdapter`.
3. Add that provider's secret to this Worker only.

## To confirm

:::note[To confirm]
1. Which adapter comes first.
2. How a workflow stuck in `failed` is retried or closed.
:::

## Related pages

- [Services architecture](../../catalogue/first-party/service-delivery-architecture.md)
- [Data model](data-model.md)
