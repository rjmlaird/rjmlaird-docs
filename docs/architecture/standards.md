---
id: standards
title: Naming conventions and standards
description: Naming rules for hostnames, repositories, Workers and routes, plus the page template, front matter, status labels and callout conventions for architecture documentation.
sidebar_position: 11
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-11
---

Consistent names and consistent pages make a sprawling ecosystem easier to navigate. This page records the naming conventions already in use, and the standards every architecture page must follow.

## Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Hostname | Lowercase, one label, describes a function | `docs`, `auth`, `hooks` |
| Repository | `rjmlaird-` followed by the purpose | `rjmlaird-docs`, `rjmlaird-auth`, `rjmlaird-services` |
| Worker service | Matches the repository or the app | `rjmlaird-auth` |
| API routes | Versioned prefix | `/v1/webhooks/stripe` |
| KV keys | Versioned prefix per service | `auth:v1:` |
| Environments | `development`, `staging`, `production` | `rjmlaird-services` plan |
| Monorepo layout | `apps/`, `workers/`, `packages/`, `migrations/`, `docs/` | `rjmlaird-services` |
| Documentation files | Lowercase, hyphenated | `domain-model.md` |
| ADR files | `ADR-NNNN-short-title.md` | `ADR-0001-docusaurus-on-github-pages.md` |

## Documentation standards

### Writing style

- Use clear, precise British English: optimisation, centralised, programme.
- Use sentence case for headings.
- Keep one idea per page; link rather than repeat.
- Capitalise system names consistently: Cloudflare Workers, Astro, Docusaurus, Zod, GitHub Pages.
- Prefer plain language, but include the technical detail a maintainer needs.

### Page template

Every architecture page uses this structure:

1. Front matter (below).
2. An introductory paragraph saying what the page covers.
3. A status admonition if the page is not fully verified.
4. Headings at `##` and `###` only.
5. Tables or lists where they help; short paragraphs elsewhere.
6. A **To confirm** section if anything is unverified.
7. A **Related pages** list.

### Front matter

```yaml title="Front matter"
---
id: page-identifier
title: Page title in sentence case
description: One sentence for search results and link previews.
sidebar_position: 1
status: Draft
confidence: Partly verified
last_reviewed: 2026-10-11
---
```

| Field | Values | Notes |
| --- | --- | --- |
| `status` | Live, In development, Proposed, Draft, Deferred, Deprecated | The state of the page's subject. Use **Draft** for pages that mix several subjects, and give per-item status in tables |
| `confidence` | Verified, Partly verified, Unverified | How much has been checked against a repository or configuration |
| `last_reviewed` | A date | When a person last checked the content against reality |

ADRs are the exception: their `status` is Proposed, Accepted, Rejected or Superseded.

The built-in "last updated" footer comes from Git history. `last_reviewed` is separate: it records when someone *verified* the page, not when it was last edited.

### Status labels

Labels are defined in the [architecture overview](./overview.md#status-labels). Use them in tables as plain text, with the evidence in brackets where it matters, for example "Live (repository)".

### Marking uncertainty and technical debt

Use a note admonition with a fixed title, so they can be searched for:

```md title="Uncertainty callout"
:::note[To confirm]
What is unknown, and how to find out.
:::
```

```md title="Technical debt callout"
:::note[To confirm / technical debt]
What is missing or deferred, and the suggested fix.
:::
```

Never fill a gap with a plausible guess. If a provider, record, tool or setting is unconfirmed, say so.

### MDX caution

Curly braces and angle brackets in ordinary prose break the build because Docusaurus reads `.md` as MDX. Put them in backticks or a code block.

## Architecture decision records

Record any decision that is hard to reverse, affects several systems, or would puzzle a future reader.

- Store records in `docs/architecture/adrs/`, named `ADR-NNNN-short-title.md`.
- Use the template at `docs/architecture/adrs/_template.md` (a file starting with an underscore is excluded from the site).
- Every record has these sections: **Status**, **Context**, **Decision**, **Consequences** and **Alternatives considered**.
- Status is one of Proposed, Accepted, Rejected or Superseded.
- Never rewrite an accepted record. Supersede it with a new one that links back.

See the [ADR index](./adrs/index.md).

## Related pages

- [ADR index](./adrs/index.md)
- [Writing and versioning docs](../contributing/writing-docs.md)
