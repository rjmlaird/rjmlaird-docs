---
id: customer-journeys
title: Customer journeys
description: How each service route moves from first contact to payment, which steps are manual, how return pages work and what is still to build.
sidebar_position: 2
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

Each route into the business has its own entry point and its own system of record. Only discovery calls and paid mentoring sessions are fully automated in the MVP. This page sets out the routes, the return pages and the work that remains.

## Journeys

| Route | Entry | Step 2 | Money | System of record |
| --- | --- | --- | --- | --- |
| Advisory: discovery | Direct Cal.com booking | Cal.com confirmation and reminders | None | Cal.com, then the HubSpot contact |
| Advisory: focused review | Short enquiry | Manual reply with scope and fee | **Manual:** private Cal.com link or Stripe payment link | Stripe, for payment |
| Teaching | Enquiry, with a safeguarding tick | Suitability reply; agreement shared | After the agreement, the same manual step | HubSpot deal |
| Mentoring | Direct initial conversation, or enquiry | Cal.com | Paid sessions through a billing `serviceId` | Cal.com and Stripe |
| Speaking and media | Detailed request | Review and reply | Agreed outside the portal | HubSpot |

Enquiry-only routes have no automated quote-to-payment step in the MVP. The reply is a human-review action, and a payment link sent by hand is reconciled by the existing Stripe webhook.

## Return pages

After checkout or booking, providers redirect the visitor to a static confirmation page.

| Source | Redirect target |
| --- | --- |
| Stripe | `booking.rjmlaird.co.uk/confirmation/?status=paid` or `?status=cancelled` |
| Cal.com | `?status=booked` |
| Forms | `?status=received` |

:::warning[The status parameter proves nothing]
`status` only changes the wording on a static page. Proof of payment comes from the signed Stripe webhook, never from the redirect.
:::

## Not yet built

1. **Intake receiver.** `POST /v1/intake/*` with Turnstile, Zod validation and a stored submission record. Until it exists the forms have no `action` and show "not connected yet".
2. **Route-to-service mapping.** A mapping from routes (`advisory`, `teaching` and so on) to `SERVICES` ids, Cal.com slugs and Stripe price environment variables. The current `SERVICES` catalogue is a placeholder.
3. **Marketing consent.** A separate, unticked checkbox, needed only if MailerLite is used.

## Booking portal styling

`apps/booking/src/styles/booking-portal.css` owns its layout tokens (`--bp-*`) and reads only colour, font and radius tokens from the site's `global.css`. Fonts are self-hosted through Fontsource. Route accents follow the brand: teal, amber, violet and coral.

:::warning[Token gotcha]
Do not read `--w`, `--m` or `--mb` as lengths. In `global.css` they are colours.
:::

## To confirm

:::note[To confirm]
1. How a payment made through a manually sent Stripe payment link, which carries no booking intent, is matched to a `payments` row and a HubSpot contact. Reconciliation of payments to bookings is not in the MVP.
2. Whether the safeguarding tick on the teaching enquiry is stored, and where.
:::

## Related pages

- [Services architecture](service-delivery-architecture.md)
- [HTTP contracts](../../build/reference/http-contracts.md)
- [Stripe](../external-integrations/stripe.md)
