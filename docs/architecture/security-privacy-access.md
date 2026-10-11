---
id: security-privacy-access
title: Security, privacy and access control
description: Who can reach what across rjmlaird.co.uk, how secrets and sessions are handled, and the privacy considerations that follow from the integrations in use.
sidebar_position: 9
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-11
---

This page describes the controls that protect the ecosystem and the data it handles. It separates controls that are known from those that are proposed, and it highlights the places where the architecture makes a trade-off that readers should understand.

:::warning[Not a compliance statement]
This page documents intended design. It is not a security audit, and it is not legal advice. Anything marked *To confirm* has not been checked.
:::

## Trust zones

| Zone | Examples | Who can reach it | Status |
| --- | --- | --- | --- |
| Public content | Main site, docs, labs | Anyone | Live |
| Public API | `api` | Anyone, with rate limits | Proposed |
| Machine-facing | `hooks` | Verified third-party senders only | In development |
| Authenticated | `wiki`, any future tools | Allow-listed GitHub accounts | Proposed |

## Access control

| Control | Detail | Status |
| --- | --- | --- |
| Sign-in | GitHub OAuth through `auth`, restricted to an allow-list | In development |
| Private wiki | Cloudflare Access, initially one account | Proposed |
| Webhooks | Signature verification on every inbound request | In development |
| Public data | `hooks` exposes no portfolio data or customer lists | Owner-stated design |

## The shared session cookie

The design shares one session cookie across `*.rjmlaird.co.uk`. This gives single sign-on across the ecosystem, but it has a consequence that shapes other decisions: **every subdomain is inside the same trust zone**. Any page on any subdomain receives the cookie.

Practical rules that follow:

1. Never host untrusted or user-generated content on any subdomain. This is one reason to avoid `upload` and `sandbox`.
2. Treat a compromise of any subdomain as a potential compromise of the session.
3. Keep the number of subdomains small, and keep the cookie `Secure`, `HttpOnly` and `SameSite`-restricted.
4. Prefer scoping cookies to the narrowest host that needs them wherever sign-in is not required.

:::note[To confirm]
The cookie's exact attributes, its lifetime, and how an administrator is revoked from the allow-list.
:::

## Secrets management

- Secrets are held as **Cloudflare Worker secrets**, not in repositories (the wiki's Notion token is the stated case).
- The docs workflow needs no custom secrets.
- Dependencies are installed with `--frozen-lockfile` in CI, so builds use exactly the versions committed.

Not yet documented: secret rotation, who holds recovery access, and where API tokens for HubSpot, Stripe and Cal.com are stored. These belong here once confirmed.

## Edge security and headers

| Topic | Position |
| --- | --- |
| Transport security | HTTPS everywhere; see [Domain and DNS model](./domain-model.md) |
| Docs response headers | GitHub Pages does **not** allow custom response headers, so a strict `Content-Security-Policy` or `Permissions-Policy` header cannot be set there. A `meta` tag can cover part of this. |
| Worker response headers | Can be set in code; standard set to be agreed |
| Rate limiting | Required for any public endpoint; mechanism to confirm |
| Subdomain takeover | Mitigated by deleting DNS records when a service is retired |

## Privacy

The integrations in use process personal data: HubSpot (contacts), Stripe (payments), Cal.com (bookings) and the sign-in service (GitHub identity). The docs site also loads fonts from Google Fonts, which makes a third-party request from visitors' browsers.

The following should be reflected in a single privacy page at `/privacy` on the main site and linked from every site's footer:

1. What data each integration collects and why.
2. Retention periods.
3. How a person requests access to or deletion of their data.
4. Which third parties act as processors.
5. Whether any analytics or cookies are used.

## Threats to keep in mind

| Threat | Mitigation |
| --- | --- |
| Forged webhook | Signature verification and idempotency |
| Replayed webhook | Store processed-event keys |
| Leaked secret | Worker secrets; never commit; rotate on suspicion |
| Dangling DNS record | Remove records with the service |
| Compromised subdomain under shared cookie | Few subdomains; no untrusted content |
| Malicious dependency | Lockfile; review updates |

## To confirm

1. Are any analytics or error-tracking tools installed on any site?
2. What are the allow-list and revocation procedures for `auth`?
3. Are there security headers set on the main site?
4. Is two-factor authentication enforced on GitHub, Cloudflare, the registrar and HubSpot?

## Related pages

- [APIs and integrations](./apis-integrations.md)
- [Domain and DNS model](./domain-model.md)
- [Observability, status and incident response](./observability-status.md)
