---
id: secret-rotation
title: Secret rotation
description: Step-by-step rotation of the Stripe, Cal.com and HubSpot credentials used by the services Workers, including the zero-downtime Stripe procedure.
sidebar_position: 2
status: In development
confidence: Partly verified
last_reviewed: 2026-10-14
---

Rotate a credential on a schedule you choose, and immediately on any suspicion of leakage.

:::warning[Never paste secrets]
Do not put secrets in tickets or chat. Use `wrangler secret put`, which reads from standard input.
:::

Secret names and the Worker that holds each one are in the [configuration reference](../reference/configuration.md).

## Stripe webhook secret (zero-downtime)

1. In the Dashboard, open the endpoint and choose **Roll secret**. Pick a delay for the old secret (for example 24 hours). Stripe signs with both secrets during that window, so the header carries two `v1` values.
2. Set the new value on the Worker. The verifier accepts any matching `v1`.

   ```bash title="Set the new secret"
   wrangler secret put STRIPE_WEBHOOK_SECRET --config apps/service-hooks/wrangler.jsonc [--env staging]
   ```

3. Confirm a fresh test event returns `200`. The old secret then expires on its own.

## Cal.com webhook secret

Cal.com has a single secret and no overlap window, so some risk of a gap is unavoidable. Choose one path.

**Path A: accept a few `400` responses.** Set the new `CALCOM_WEBHOOK_SECRET` on the Worker first, then change the secret in Cal.com.

**Path B: avoid `400` responses.**

1. Pause the webhook in Cal.com.
2. Set the new secret in Cal.com.
3. Set `CALCOM_WEBHOOK_SECRET` on the Worker.
4. Re-enable the webhook.
5. Check `webhook_events`.

Either way, compare Cal.com's booking list with `webhook_events` afterwards. Bookings made while the webhook was paused or failing may not have been delivered.

## Stripe API key (billing)

1. Create a new **restricted** key (Checkout Sessions write).
2. Set it with `wrangler secret put STRIPE_SECRET_KEY`.
3. Test checkout in staging.
4. Delete the old key.

Price IDs are not secret, but they are validated as an allowlist. To change one, create a new Price and update the matching `STRIPE_PRICE_*` value.

## HubSpot token and client secret

**Access token:**

1. Create a new private-app token with the same minimal scopes.
2. Set it on `hubspot-sync`.

   ```bash title="Set the new token"
   wrangler secret put HUBSPOT_ACCESS_TOKEN --config workers/hubspot-sync/wrangler.jsonc
   ```

3. Watch one job succeed.
4. Revoke the old token.

**Client secret (`HUBSPOT_CLIENT_SECRET`):** rotate it in the app settings, then update the Worker.

## After any rotation

- Check logs for new `signature rejected` or `403` spikes.
- Confirm `webhook_events` keeps moving.
- Record the date.

## To confirm

:::note[To confirm]
Where rotation dates are recorded, and the rotation interval.
:::

## Related pages

- [Webhook failures](./webhook-failures.md)
- [Stripe](../integrations/stripe.md)
- [Security, privacy and access control](../../architecture/security-privacy-access.md)
