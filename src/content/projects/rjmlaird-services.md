---
title: "Services"
slug: "rjmlaird-services"
description: "The backend connecting service enquiries, bookings, payments and client follow-up across the RJM Laird ecosystem."
status: "active"
visibility: "public"
audience: ["developer", "client", "collaborator"]
tags: ["services", "booking", "billing", "automation", "integrations"]
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Cloudflare Workers"
  - "Cloudflare Queues"
  - "Cloudflare D1"
  - "Zod"
reviewStatus: "needs-review"
---

## Overview

Services is the behind-the-scenes infrastructure supporting bookings,
payments and client follow-up across the RJM Laird ecosystem.

The aim is to connect the practical steps around working together:
choosing a service, arranging a booking, completing a payment where
required and supporting the next stage of delivery.

Rather than being a standalone application, it is a collection of
connected services supporting those workflows.

The project is under active development. Individual features should
not be treated as available until they are enabled and linked from
the relevant service or booking page.

## What it supports

The project brings together:

- Booking-related workflows.
- Payment and checkout integrations.
- Verified notifications from connected providers.
- Contact updates in the CRM.
- Client-delivery follow-up.

These capabilities are being developed as a coordinated system rather
than a collection of unrelated manual steps.

## Service surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Booking | <https://booking.rjmlaird.co.uk> | Booking-related interfaces |
| Billing | <https://billing.rjmlaird.co.uk> | Checkout and billing-related interfaces |
| Hooks | <https://hooks.rjmlaird.co.uk> | Notifications from connected service providers |

These are technical service destinations. They may not provide a
browsable homepage, and their inclusion here does not mean every planned
feature is available.

For normal use, follow the booking or payment link provided through
the relevant service page or correspondence.

Hooks is an integration endpoint, not a customer-facing application.

## How it works

When a connected provider sends a notification, the system is designed
to verify it, record the relevant event and pass the work to the
appropriate background process.

This separates receiving a notification from completing follow-up tasks.

For example, a booking or payment event may lead to an internal record
update and a subsequent CRM or delivery task.

The intended flow is:

1. Receive a notification from a connected provider.
2. Verify and validate the request.
3. Record the relevant event.
4. Process the associated workflow.
5. Pass on any required follow-up work.

Individual workflows depend on their implementation and configuration.

## Connected platforms

The project includes integrations concerning:

- Stripe for payment-related workflows.
- Cal.com for booking-related workflows.
- HubSpot for contact synchronisation.
- Notion-related client-delivery development.

An integration being part of the project does not imply that every
feature offered by that platform is supported.

## Technical approach

The project uses TypeScript and Cloudflare infrastructure, with shared
validation contracts and background processing.

Its design priorities include:

- Keeping public interfaces limited to their intended purpose.
- Validating incoming data.
- Separating provider notifications from follow-up work.
- Handling repeated events without duplicating completed work.
- Keeping development and production environments distinct.
- Making failures easier to investigate.

These are engineering objectives, not a claim that every workflow has
completed production validation.

## Relationship to the wider ecosystem

### Main website

The main website explains the services available and provides the
appropriate starting points for enquiries and engagement.

Services supports the operational steps behind those interactions.

### Public API

This project is separate from `rjmlaird-api`, which concerns public
professional content such as projects, writing and research.

The Services infrastructure is not a public directory of customers,
payments or bookings.

### Apps, tools and builds

Apps and tools provide user-facing functionality.

Services supports commercial workflows around working together. It
should not be confused with the public Builds catalogue or a general
application API.

## Privacy and access

This public page describes the project, not its private operational
records.

It does not provide access to:

- Customer lists.
- Payment records.
- Booking records.
- Administrative interfaces.
- Internal delivery information.

Publicly reachable booking or checkout interfaces do not make the
underlying operational data public.

Information about personal-data handling should be provided through
the relevant privacy notices and provider information at the point
of use.

## Current status

The project is active and remains under review.

Work includes validating integrations, completing service configuration
and testing the connected workflows before relying on them for routine
client operations.

Not every configured route represents a finished feature. In particular,
a route or hostname should not be taken as confirmation that self-service
billing or account-management functions are available.

## Using the services

Use the links provided through the relevant service page or direct
correspondence.

If a booking or payment flow does not complete as expected, use the
contact details supplied with that interaction.

Do not send passwords, payment-card details or other sensitive
credentials when reporting a problem.

## Source and documentation

The implementation is maintained privately because it concerns commercial
operations and connected service configuration.

This page provides the public overview. Deployment instructions,
credentials, internal resource configuration and incident procedures
remain in restricted maintainer documentation.

## Changelog

Public updates will be recorded when a meaningful capability becomes
available or an existing user-facing workflow changes.

Internal deployments and configuration changes are not presented as
new public features.
