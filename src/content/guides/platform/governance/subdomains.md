---
id: subdomain-catalogue
title: Subdomain catalogue
description: How the canonical public service catalogue works, what each field means, when a subdomain is justified and how to change the catalogue.
sidebar_position: 3
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-14
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

Every hostname under rjmlaird.co.uk is registered once, in a machine-readable catalogue. Documentation, API discovery and status monitoring read that catalogue instead of repeating hostname facts by hand. This page explains the catalogue and its rules. The table itself is generated: see the [Generated public service catalogue](../../catalogue/generated/subdomain-catalogue.md).

:::warning[A row is not a deployment]
Lifecycle records intent unless the evidence is a repository. Check the **evidence** field and the service page before treating a service as live.
:::

## Canonical source

| Item | Location |
| --- | --- |
| Catalogue | `data/subdomains.json` |
| Schema | `schemas/subdomains.schema.json` |
| Generator | `scripts/generate-subdomain-catalogue.mjs` (`pnpm run docs:generate`) |
| Generated table | [Generated public service catalogue](../../catalogue/generated/subdomain-catalogue.md) |

The catalogue holds public, non-sensitive facts only. It never holds secrets, account or binding identifiers, internal hostnames, private management or health URLs, or access-policy detail. The generator validates the file, checks that each linked service page exists and agrees on visibility and lifecycle, and writes the table. Nothing is fetched in the browser or at build time.

## Fields

| Field | Meaning |
| --- | --- |
| `slug` | Unique lowercase label; also the service page name |
| `hostname` | Fully qualified hostname, or `null` for a concept |
| `purpose` | One public-safe sentence |
| `classification` | The service's single primary kind (below) |
| `visibility` | Who may reach it |
| `lifecycle` | Where it is in its life |
| `evidence` | How the lifecycle was established |
| `documentation` | Service page path, relative to `docs/` |
| `publish` | Whether the record appears in the generated public table |

| Visibility | Meaning |
| --- | --- |
| `public` | Anyone may read it |
| `restricted` | Authenticated or approved clients only; the default for protocol, integration, ingestion and management services |
| `internal` | Operational only; not normally listed in a public catalogue |

| Lifecycle | Meaning |
| --- | --- |
| `active` | Serving, verified or credibly stated |
| `planned` | Intended or in development; not verified as deployed |
| `reserved` | The name is held; nothing is built |
| `retired` | Withdrawn; redirect or remove DNS |

Classifications: `website`, `documentation`, `api`, `data`, `asset-delivery`, `asset-management`, `ingestion`, `identity`, `protocol`, `integration`, `storage`, `status`, `catalogue`, `developer`, `experimental` and `control-plane`. Evidence values are `repository`, `owner-stated`, `linked` and `none`.

## When a subdomain is justified

A subdomain earns its place only if it needs **at least one** of the following:

1. **A different runtime or build**, such as a Worker or a separate static generator.
2. **A different security boundary**, such as private access or untrusted input.
3. **A different owner or audience** with a genuinely separate brand.
4. **An external platform that requires it**, such as a SaaS custom domain.

Everything else becomes a path on the main site. Paths share one certificate, one set of search authority, one deployment and one navigation, so they are cheaper to run and better for search.

## How to change the catalogue

1. Edit `data/subdomains.json`. Do not edit the generated file.
2. Create or update the service page and keep its `visibility` and `lifecycle` front matter identical to the catalogue.
3. Run `pnpm run docs:generate`, then commit the regenerated table.
4. Record any non-obvious choice as an [ADR](../decisions/index.md).

The full checklist is in [Adding a service](../../build/adding-a-service.md).

## To confirm

:::note[To confirm]
Whether this repository owns the catalogue or a separate control-plane repository does. If another repository owns it, import a sanitised snapshot rather than keeping two copies; see [master](../../catalogue/first-party/master.md).
:::

## Related pages

- [Generated public service catalogue](../../catalogue/generated/subdomain-catalogue.md)
- [Subdomain planning inventory](subdomain-planning-inventory.md)
- [Platform services](../../catalogue/first-party/platform-services.md)
- [Domain and DNS model](../domain-model.md)
