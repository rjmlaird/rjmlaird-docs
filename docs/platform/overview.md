---
id: overview
title: Architecture overview
description: A map of the rjmlaird.co.uk ecosystem, showing what is live, what is being built and what is only planned, plus the principles that govern how the pieces fit together.
sidebar_position: 1
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-11
---

This section documents the architecture behind **rjmlaird.co.uk**: the sites, services and infrastructure that make up Ryan Laird's personal, professional and technical web presence. It is written for four readers: the owner and maintainer, future collaborators and contractors, technical readers who want to see how the pieces fit, and non-technical readers who only need a mental model.

:::warning[Read the status labels]
The subdomain list that this section is built around is a **planning model**, not an inventory of running services. Every site and service carries a status label, and anything not yet checked is marked **To confirm**. If a page does not say something is *Live*, do not assume it is.
:::

## How to read this section

### Status labels

| Label | Meaning |
| --- | --- |
| **Live** | Serving real traffic today. |
| **In development** | Being built; not yet serving production traffic. |
| **Proposed** | Designed or recommended, but no build has started. |
| **Deferred** | Deliberately postponed until there is a concrete need. Includes exploratory ideas. |
| **Not recommended** | Considered and advised against. Recorded so the question is not reopened by accident. |
| **Deprecated** | Was live; scheduled for removal or already retired. |

### Confidence labels

Each page also carries a `confidence` value in its front matter: **Verified** (checked against a repository or configuration), **Partly verified**, or **Unverified** (from planning notes only). Where a statement is inferred rather than confirmed, it is flagged inline.

## System vision and scope

The ecosystem exists to do five jobs:

1. **Present** a clear professional and personal brand.
2. **Publish** writing, research and astronomy and space communication.
3. **Sell and schedule** services such as tutoring, mentoring and coaching.
4. **Explore** ideas in public through experiments and data pieces.
5. **Run** a small amount of back-office automation behind the scenes.

**In scope:** the public sites, the services and APIs, the documentation site and the infrastructure that connects them.

**Out of scope:** the internals of third-party platforms (GitHub, Stripe, Cal.com, HubSpot, Notion, Zotero). Only the integration points are documented here.

## Guiding principles

1. **Status before subdomain.** Nothing gets a DNS record until it has a catalogue entry with a purpose, a status and an owner.
2. **Paths before subdomains.** Content that shares a build, an audience and a security boundary belongs at a path on the main site. A subdomain must justify itself (see the [subdomain catalogue](governance/subdomains.md#when-a-subdomain-is-justified)).
3. **Static first.** Use a static site wherever possible. Add a Worker only where server-side behaviour is genuinely needed.
4. **Keep public and private surfaces apart.** The public portfolio API and the commercial webhook services are separate systems. Private tools sit behind authentication.
5. **One brand system.** `global.css` on the main site is the single source of truth for the visual identity. Other sites copy from it, never the reverse.
6. **Say what we do not know.** Unknowns are written down as **To confirm**, not papered over.
7. **Prefer reversible, low-cost choices.** This is a one-person operation; every extra moving part is maintenance debt.

## Ecosystem summary

Hostnames, visibility and lifecycle for every service are held in the canonical catalogue and published as the [generated public service catalogue](../catalogue/generated/subdomain-catalogue.md). Each service has a page under [Platform services](../catalogue/first-party/platform-services.md). This section does not repeat them.

## A mental model for non-technical readers

Think of the ecosystem as a shop with four areas:

- **The shop windows** are the public sites: the main site, the docs, the labs and, later, space and research content. Visitors browse them freely.
- **The locked doors** are the sign-in service and the private wiki. Only the owner gets through.
- **The back office** is the set of small services that receive a payment or a booking, record it and update the customer record, without anyone pressing a button.
- **The filing cabinets** are the databases and storage buckets where those services keep their records and files.

## Core technologies

| Technology | Used for | Evidence |
| --- | --- | --- |
| Astro | Main site (`Layout.astro`, `Head.astro`, `global.css`) | Owner-stated |
| Docusaurus 3.10.2 (React 19, Mermaid, local search) | Documentation site | Repository |
| GitHub Pages and GitHub Actions | Hosting and deployment of the docs | Repository |
| pnpm 10 and Node.js 22 (in CI) | Package management and builds | Repository |
| Cloudflare Workers, Hono, KV, D1, R2, Queues, Access | Services and APIs | Owner-stated across several repositories |
| TypeScript, Zod, Vitest, Wrangler | Service code, validation, tests, deployment | Owner-stated |
| GitHub OAuth, Stripe, Cal.com, HubSpot, Notion, Zotero | Third-party integrations | Owner-stated |

## Estate map

```mermaid
flowchart TB
  visitors([Visitors])
  owner([Owner and approved clients])

  subgraph cf["Cloudflare edge and platform"]
    subgraph pub["Public services"]
      pubsvc["web, docs, data, api, status, cdn, apps, tools, labs, booking"]
    end
    subgraph res["Restricted services"]
      ressvc["auth, dam, upload, mcp, hooks, dav"]
    end
    subgraph int["Internal services"]
      intsvc["Private wiki and operational tooling"]
    end
  end

  pubstore[("Public asset storage")]
  privstore[("Private storage and queues")]

  visitors --> pub
  owner --> res
  owner --> int
  pub -.->|reads| pubstore
  res --> privstore
  int --> privstore
```

Services are grouped by visibility, not by hosting. Which of them are active, planned or reserved is in the [generated catalogue](../catalogue/generated/subdomain-catalogue.md); most are planned. Solid lines are intended access paths and dotted lines are read-only.

:::note[To confirm]
- Which host serves the main site, and whether it is served from the apex or `www`.
- Where each service is deployed.

See [Domain and DNS model](domain-model.md) for the full list of open questions.
:::

## In this section

- [Domain and DNS model](domain-model.md)
- [Subdomain catalogue](governance/subdomains.md)
- [Environments and deployment model](governance/environments.md)
- [Content platform architecture](architecture/content-platform.md)
- [Media, assets and CDN strategy](architecture/media-and-assets.md)
- [APIs and integrations](architecture/apis-and-integrations.md)
- [Automation and workflows](architecture/automation-workflows.md)
- [Security, privacy and access control](governance/security-and-privacy.md)
- [Observability, status and incident response](../operate/status-and-observability.md)
- [Naming conventions and standards](governance/standards.md)
- [Roadmap and decision log](roadmap.md)
