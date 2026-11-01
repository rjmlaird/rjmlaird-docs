---
title: Authoring guide
description: Page naming, headings, tone, code blocks, front matter and page types for these docs.
status: active
reviewStatus: needs-review
owner: Ryan Laird
kind: reference
tags: [authoring, style]
---

## Naming

- File names are lowercase kebab-case: `domain-model.md`, `adr-0004-astro-starlight-for-docs.md`.
- A folder's overview is `index.md` (or `overview.md` where the folder is navigated explicitly).
- Titles are sentence case, name the thing and avoid "How to" padding. URLs stay stable: add a redirect in `data/redirects.json` when moving a page.

## Headings

- The front matter `title` is the H1. Never write `# Title` in the body.
- Start at H2, never skip levels, and keep to H3 where possible; the table of contents shows H2 and H3.
- Sentence case, one idea per section.

## Tone

British English. Direct, calm and specific. Say what is verified, what is planned and what is unknown. Avoid hype, "simply" and "just". Prefer a short sentence to a clever one.

## Code blocks

- Always give a language. Add `title="..."` for files or commands the reader will copy.
- Show placeholders as `<your-value>` and never real secrets, identifiers or internal hosts.
- Use `bash` for shell, `json` for payloads, `ts` for TypeScript. Copy buttons are built in.

## Front matter

| Field | Required | Values |
| --- | --- | --- |
| `title`, `description` | Yes | Description 160 characters or fewer |
| `status` | Optional | `active`, `live`, `in-development`, `planned`, `proposed`, `accepted`, `superseded`, `draft`, `deprecated`, `retired` |
| `confidence` | Optional | `verified`, `partly-verified`, `unverified` |
| `visibility`, `lifecycle` | Service pages | Must match `data/subdomains.json` |
| `reviewStatus` | Defaults to `needs-review` | `reviewed` requires `lastReviewed` |
| `owner`, `reviewCycle`, `tags`, `audience` | Optional | Free text |
| `kind` | Optional | `guide`, `tutorial`, `reference`, `explanation`, `runbook`, `decision`, `catalogue` |
| `sidebar.order`, `sidebar.label` | Optional | Starlight sidebar controls |

`pnpm lint:content` and the Zod schema in `src/content.config.ts` enforce these.

## Callouts

Use `:::note`, `:::tip`, `:::caution` and `:::danger`, with a title in brackets. Use `:::note[To confirm]` for uncertainty.

## Links

Use absolute site paths such as `/platform/overview/`, with a trailing slash. Relative `.md` links are rejected. The build fails on broken links and anchors.
