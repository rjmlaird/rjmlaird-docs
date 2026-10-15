---
id: subdomain-planning-inventory
title: Subdomain planning inventory
description: The original planning inventory of candidate subdomains with keep, merge, defer or avoid recommendations. Superseded for status by the canonical catalogue.
sidebar_position: 4
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-14
---

This page keeps the original planning analysis: the full inventory of candidate hostnames, with a recommendation to keep, merge, defer or avoid each one. It records reasoning, not current status.

:::warning[Superseded for status]
The canonical catalogue in `data/subdomains.json`, and the [generated public service catalogue](./generated/subdomain-catalogue.md), now hold hostname, visibility and lifecycle. Several recommendations below, notably for `dam`, `upload`, `dev`, `mcp` and `booking`, pre-date the [platform services](../services/platform/overview.md) plan and need an ADR before either view is treated as final.


The original inventory contained 34 entries. **Only a few of them are verified as live.** A row being present in this inventory does not mean the service is running. Check the **Status** column.
:::

## Catalogue taxonomy

### Status

Status labels are defined in the [architecture overview](./overview.md#status-labels). The brackets after a status give the **evidence** behind it:

| Evidence | Meaning |
| --- | --- |
| Repository | Verified from a repository's configuration |
| Owner-stated | Described by the owner, not independently checked |
| Linked | Referenced from another live site |
| None | Appears only in the planning inventory |

### Priority

| Priority | Meaning |
| --- | --- |
| **Now** | Needed for the current build or already live |
| **Next** | Worth doing once the current work lands |
| **Later** | Reasonable, but not before there is content or demand |
| **Defer** | Postpone until a concrete requirement appears |
| **Merge** | Do not create; deliver as a path on another site |
| **Avoid** | Do not create; adds complexity without enough benefit |

### Category

**Content**, **Application**, **Infrastructure**, **Tooling** or **Services** (revenue-related pages).

## When a subdomain is justified

A subdomain earns its place only if it needs **at least one** of the following:

1. **A different runtime or build**, such as a Worker or a separate static generator.
2. **A different security boundary**, such as private access or untrusted input.
3. **A different owner or audience** with a genuinely separate brand.
4. **An external platform that requires it**, such as a SaaS custom domain.

Everything else becomes a path on the main site. Paths share one certificate, one set of search authority, one deployment and one navigation, so they are cheaper to run and better for search.

## Core content and brand sites

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `rjmlaird.co.uk` | Live (owner-stated) | Root domain | Public | Content | Apex; redirects to `www` (proposed) | Now | Canonical rule unconfirmed; docs link to the apex |
| `www` | Live (owner-stated) | Canonical site and brand hub | Public | Content | Astro; hosting to confirm; brand from `global.css` | Now | Hosting provider unknown |
| `cv` | Proposed (none) | CV and professional experience | Public | Content | Path `/cv` on the main site | Merge | Data source and format to confirm |
| `dev` | Proposed (none) | Development-focused presence | Public | Content | Overlaps `labs`, `docs` and `portfolio` | Defer | Is this the deployment of the `rjmlaird-dev` repository? To confirm |
| `portfolio` | Proposed (none) | Portfolio and selected work | Public | Content | Path `/portfolio` on the main site | Merge | Overlaps the main site landing page |
| `research` | Proposed (none) | Research, essays and analysis | Public | Content | Static site; candidate data pipeline from Zotero via R2 | Next | Build and pipeline ownership to confirm |
| `labs` | Live (linked) | Experiments, prototypes and data pieces | Public | Content / Tooling | Hosting to confirm; data pieces use open datasets | Now | Hosting; data licences and attribution; upkeep of experimental code |
| `sandbox` | Proposed (none) | Safe testing environment | Internal | Tooling | Replace with preview deployments | Avoid | Test data leakage; sits under the shared cookie scope |

## Space, astronomy and education

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `space` | Proposed (none) | Space and astronomy hub | Public | Content | Static or interactive site; a distinct audience and brand | Next | Scope creep around external data sources |
| `astro` | Proposed (none) | Astronomy-specific content | Public | Content | Section of `space`; redirect if wanted | Merge | Duplicates `space` |
| `talks` | Proposed (none) | Talks, events and presentations | Public | Content | Path `/talks` | Merge | Decide which hub owns it |
| `tutoring` | Proposed (none) | Tutoring services | Public | Services | Path `/services/tutoring` plus a booking link | Merge | See the typo noted in [Domain and DNS model](./domain-model.md#typographical-error-in-the-planning-inventory) |
| `resources` | Proposed (none) | Learning resources | Public | Content | Path `/resources` | Merge | The inventory already allows this |
| `courses` | Proposed (none) | Courses and structured learning | Public | Services | Defer until a course exists; a learning platform may be needed | Defer | Payments, accounts and content protection |
| `stem` | Proposed (none) | STEM outreach and education | Public | Content | Section of `space` or `resources` | Merge | Overlaps `space` and `resources` |

## Booking and services

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `booking` | Proposed (none) | Bookings and scheduling | Public | Services | Path `/book` linking to or embedding Cal.com (owner-stated as the booking tool) | Merge | **Conflict:** the [services documentation](../services/index.md) treats `booking.rjmlaird.co.uk` as a dedicated portal and API Worker, not a path. Decide and record it in an ADR. Also whether Cal.com supports a custom domain on the current plan |
| `home` | Proposed (none) | Personal home-page concept | Public | Content | Duplicates the root | Avoid | Pure duplication |
| `bio` | Proposed (none) | Short bio, link-in-bio page | Public | Content | Path `/about` or `/links` | Merge | None significant |
| `physics` | Proposed (none) | Physics tutoring or content | Public | Services | Path under `/services/tutoring` or `/resources` | Merge | Fragmented search authority |
| `maths` | Proposed (none) | Maths tutoring or content | Public | Services | As `physics` | Merge | As `physics` |
| `mentoring` | Proposed (none) | Mentoring services | Public | Services | Path `/services/mentoring` | Merge | None significant |
| `coaching` | Proposed (none) | Coaching services | Public | Services | Path `/services/coaching` | Merge | None significant |

## Media, assets and infrastructure

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `api` | Proposed (owner-stated) | Public portfolio API (`rjmlaird-api`) | Public | Application | Cloudflare Worker with Hono (candidate) | Next | Deployment status; authentication; rate limiting; versioning |
| `cdn` | Proposed (none) | Static assets | Public | Infrastructure | One asset host, for example an R2 bucket on a custom domain | Later | Whether it is needed at all; cache rules; hotlinking |
| `dam` | Proposed (none) | Digital asset management | Internal | Infrastructure | Use object storage with naming conventions | Avoid | Operational weight far exceeds the need |
| `images` | Proposed (none) | Image hosting or transformation | Public | Infrastructure | Fold into the single asset host | Merge | Transformation options and cost to evaluate |
| `upload` | Proposed (none) | Upload endpoint | Internal | Infrastructure | If ever needed, an authenticated route under `api` | Avoid | Untrusted input under the shared cookie scope |
| `dashboards` | Proposed (none) | Dashboards | Mixed | Tooling | Section of `labs`, or behind `wiki` access | Defer | Public versus private data |
| `status` | Proposed (none) | Service status page | Public | Infrastructure | A status page hosted outside the monitored infrastructure | Later | Alert noise; independence from what it monitors |
| `docs` | Live (repository) | Technical and platform documentation | Public | Content | Docusaurus on GitHub Pages | Now | Alignment with live systems; template pages still present |
| `newsletter` | Proposed (none) | Newsletter landing or management | Public | Content | Path `/newsletter`; custom domain only if the provider requires it | Merge | Provider to confirm |
| `privacy` | Proposed (none) | Privacy, legal and policy information | Public | Content | Path `/privacy`, linked from every site footer | Merge | Must reflect analytics, fonts, forms and CRM use |

## Platform and tooling

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mcp` | Deferred (none) | MCP-related tooling or endpoint | Internal | Tooling | Worker (candidate); no specification yet | Defer | Rapidly evolving protocol; needs authentication |
| `app` | Proposed (none) | Generic application surface | Internal | Application | Name the application instead | Avoid | A generic name invites unrelated services |

## Added since the original inventory

These hostnames were not in the planning inventory but have real work behind them.

| Subdomain | Status | Purpose | Visibility | Category | Candidate pattern and dependencies | Priority | Risks and to confirm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `auth` | In development (owner-stated) | Central GitHub sign-in for the ecosystem | Shared | Infrastructure | Worker, Hono and KV; Custom Domain route; optional client package; other Workers call it through a service binding | Now | Deployment pending; cookie scope; admin allow-list |
| `hooks` | In development (owner-stated) | Verified webhook ingress for Stripe, Cal.com and HubSpot | Machine-facing | Infrastructure | Workers, Queues and D1 in the private `rjmlaird-services` repository | Now | Signature verification; replay and idempotency; secrets |
| `billing` | In development (services documentation) | Stripe Checkout Session creation for paid services | Public | Services | Worker in the private `rjmlaird-services` repository | Now | Not yet justified under [ADR-0002](./adrs/ADR-0002-justify-subdomains-before-creating-them.md); exact hostname to confirm |
| `wiki` | Proposed (owner-stated) | Private, read-only, Notion-backed wiki | Internal | Application | Astro SSR Worker, a separate sync Worker on a daily schedule, D1, behind Cloudflare Access | Next | Notion token handling; Workers plan limits |

## Recommended simplification

Applying the justification rule above to all 37 entries gives this end state:

| Outcome | Hostnames |
| --- | --- |
| **Keep as subdomains** | `www` (with apex redirect), `docs`, `labs`, `space`, `research`, `api`, `auth`, `hooks`, `wiki` |
| **Add later if needed** | `status`, one asset host (`cdn` or similar) |
| **Defer** | `dev`, `courses`, `dashboards`, `mcp` |
| **Merge into paths** | `cv`, `portfolio`, `astro`, `talks`, `tutoring`, `physics`, `maths`, `mentoring`, `coaching`, `resources`, `stem`, `booking`, `bio`, `newsletter`, `privacy`, `images` |
| **Avoid** | `home`, `sandbox`, `dam`, `upload`, `app` |

### Why merge so many?

| Criterion | Effect of many subdomains | Effect of paths |
| --- | --- | --- |
| Maintainability | One build, deployment and navigation per subdomain | One build and one navigation |
| SEO | Search authority is split across hostnames | Authority accumulates on one host |
| DNS and certificates | A record, a certificate and a hosting target each | Nothing extra |
| Security boundary | Every subdomain sits under the shared session cookie scope, so a weak or untrusted one weakens all of them | Same boundary, but fewer surfaces |
| Branding | Visitors see a fragmented set of properties | One coherent brand |
| Long-term cost | Each is a permanent maintenance liability | Marginal |

### Service-offering pages in particular

`tutoring`, `physics`, `maths`, `mentoring` and `coaching` share one audience and one booking flow. A single `/services` section with a page per offering, and one booking link, is easier to maintain and ranks better than five separate sites. `resources` already has a sanctioned path alternative in the inventory, and should take it.

### Exceptions worth defending

- **`research`** is kept because it may carry its own build and data pipeline. If it turns out to be an ordinary set of essays, merge it into `/research`.
- **`space`** is kept because it serves a distinct audience and can carry a distinct identity. If it never grows its own navigation, merge it too.
- **`labs`** is kept because experiments carry unpredictable dependencies that should not share a build with the main site.

### Vanity redirects

A subdomain that only redirects (for example `cv` to `/cv`) is cheap to run but still needs a DNS record and a certificate. Create one only if the short address appears on printed or fixed material, and record it here.

## Changing the catalogue

Do not edit status here. Follow [Adding a service](../guides/adding-a-service.md) and the [subdomain catalogue](./subdomain-catalogue.md).

## Related pages

- [Subdomain catalogue](./subdomain-catalogue.md)
- [Domain and DNS model](./domain-model.md)
- [Content platform architecture](./content-platform.md)
- [Roadmap and decision log](./roadmap.md)
