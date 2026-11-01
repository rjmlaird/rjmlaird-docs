---
title: hooks.rjmlaird.co.uk
description: "The verified inbound webhook gateway: it checks provider signatures and routes events to private processing."
sidebar:
  order: 3
status: active
confidence: partly-verified
visibility: restricted
lifecycle: planned
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - restricted
  - integration
  - webhooks
---

:::note[Lifecycle: planned]
This service is planned. It is documented from its intended scope and has not been verified as deployed in this repository. Do not treat it as a live interface until the [catalogue](/catalogue/generated/subdomain-catalogue/) says it is active.
:::

## Purpose

`hooks.rjmlaird.co.uk` receives webhooks from approved providers. Its single responsibility is to verify each request's signature over the raw body and hand the normalised event to private processing.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `hooks.rjmlaird.co.uk` |
| Classification | Integration |
| Visibility | Restricted |
| Lifecycle | Planned |
| Evidence | Owner-stated; not verified in this repository |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Signature verification for Stripe, Cal.com and HubSpot webhooks
- Normalisation of verified events into internal events
- Safe acknowledgement and retry behaviour

The endpoints, status codes and events are defined in [HTTP contracts](/build/reference/http-contracts/) and [Internal events](/build/reference/events/).

## Boundaries

This service does not:

- Authenticate people or serve browsers
- Hold storage or provider API tokens; it holds only webhook secrets and a queue producer
- Run business logic or expose customer records
- Treat an unverified request as an event

## Access model

The endpoints are reachable by provider servers but are restricted by signature verification: nothing is processed until the signature verifies. Anything else returns `404`.

## Dependencies

- Cloudflare Workers and Queues
- Provider webhook secrets, held as Worker secrets
- Private consumers described in the [services architecture](/catalogue/first-party/service-delivery-architecture/)

## Operations

- [Webhook failures runbook](/operate/runbooks/webhook-failures/)
- [Secret rotation runbook](/operate/runbooks/secret-rotation/)
- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [booking.rjmlaird.co.uk](/catalogue/first-party/booking/)
- [auth.rjmlaird.co.uk](/catalogue/first-party/auth/)
- [Services overview](/catalogue/first-party/)
- [Stripe](/catalogue/external-integrations/stripe/), [Cal.com](/catalogue/external-integrations/calcom/), [HubSpot](/catalogue/external-integrations/hubspot/)
