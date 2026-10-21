---
id: ADR-0003-separate-public-api-from-webhook-services
title: "ADR-0003: Separate the public API from the webhook services"
description: The public portfolio API and the commercial webhook and workflow services are separate systems with separate repositories and hostnames.
status: Accepted
confidence: Partly verified
last_reviewed: 2026-10-11
---

:::info[Recorded retrospectively]
This reflects a design stated by the owner. Deployment of both systems is not yet verified.
:::

## Status

Accepted.

## Context

Two kinds of service are needed. One serves public portfolio data to anyone. The other handles commercial events from Stripe, Cal.com and HubSpot, and updates customer records. They have different audiences, different security needs and very different consequences if compromised.

## Decision

Keep them separate. The public portfolio API lives in `rjmlaird-api` at `api.rjmlaird.co.uk`. Commercial operations live in the private `rjmlaird-services` repository, with webhook ingress at `hooks.rjmlaird.co.uk`. The services repository exposes no public portfolio data and no customer lists.

## Consequences

- A flaw in the public API cannot expose payment or CRM data, because it holds none.
- Each system can have its own rate limits, secrets and release cadence.
- There are two repositories and two hostnames to maintain.
- Shared concerns, such as sign-in, are handled by `auth` rather than duplicated.

## Alternatives considered

- **One combined API.** Rejected: it mixes public and private concerns and enlarges the blast radius of any fault.
