---
title: Incident response
description: How to detect, contain, communicate and learn from an incident affecting the rjmlaird.co.uk estate, written for a single maintainer.
sidebar_position: 5
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

This guide expands the process in [Observability, status and incident response](status-and-observability.md). It is written for one person acting under pressure, so each step says what to do first.

## First ten minutes

1. **Stop the harm.** Roll back a release, disable a route or revoke access. Prefer the quickest reversible action.
2. **Rotate anything exposed.** If a secret may have leaked, rotate it now; see [Secret rotation](runbooks/secret-rotation.md).
3. **Write down what you see.** Time, symptoms and what you changed. You will need this later.
4. **Decide if personal data is involved.** If it may be, treat the incident as serious and go to the section below.

## What kind of incident is it?

| Situation | First action |
| --- | --- |
| Public site down or defaced | Roll back the last deployment; check DNS and hosting |
| Webhook failures or missing payments | Follow [Webhook failures](runbooks/webhook-failures.md) |
| Suspected leaked credential | Rotate it, then review recent use |
| Unexpected access to a restricted service | Revoke the credential or session, then review the access policy |
| Dependency or build compromise | Stop deployments, pin the previous known-good version and review the lockfile |

## Communicate

- If public services are affected, update the [status](../catalogue/first-party/status.md) page once it exists. Say what is affected and when you will next update, not guesses about cause.
- Tell affected customers or partners directly when their data or service is involved.

## Personal data

If personal data may have been lost, exposed or altered, consider your legal duties straight away. Under UK GDPR, a notifiable personal data breach must generally be reported to the Information Commissioner's Office within 72 hours of becoming aware of it. Check the current ICO guidance before relying on this, and seek advice where unsure.

## Review

Within a few days, write a short note:

- What happened, and the timeline
- Impact, and who was told
- Root cause
- What worked, and what slowed you down
- Follow-up actions, each with an owner and a date

If the cause was an architectural weakness, record an [ADR](../platform/decisions/index.md) and update the affected service page.
