---
title: "Glossary"
slug: "rjmlaird-glossary"
description: "A searchable glossary of space, sustainability, marketing and web-architecture terminology, published as a static Astro site with a reviewable Notion-to-Markdown sync."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "editor"]
tags: ["glossary", "reference", "astro", "markdown", "search", "notion"]
repository: "https://github.com/rjmlaird/rjmlaird-glossary"
liveUrl: "https://glossary.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "Astro"
  - "Markdown"
  - "TypeScript"
  - "Pagefind"
  - "Cloudflare"
  - "Cloudflare Workers"
  - "Notion"
  - "GitHub Actions"
reviewStatus: "needs-review"
---

## Overview

Glossary is a searchable reference site for terminology used across
space, sustainability, marketing and web architecture.

The site is built with Astro 5 and produces static output. Each term
has a Markdown source file and a dedicated public page.

A separate scheduled Worker can turn published Notion entries into
Markdown changes submitted through a GitHub pull request.

This keeps the website's content version-controlled while allowing
Notion to support the editorial workflow.

### Intended users

- Readers looking for concise explanations of unfamiliar terminology.
- Editors maintaining definitions and related terms.
- Developers integrating glossary references into other websites.
- Maintainers operating the site and Notion synchronisation.

### Scope

The supplied README establishes:

- One Markdown file per term.
- Four supported categories.
- Schema-validated term metadata.
- Static term pages.
- Build-time Pagefind indexing.
- Shared brand styling.
- Reusable integration snippets.
- A scheduled Notion-to-GitHub synchronisation Worker.

### Verification status

This record is based on the supplied README.

The current repository, production site, Cloudflare settings and
Notion-sync behaviour have not been independently verified for this
record.

Keep `reviewStatus` as `needs-review` until the relevant implementation
and operational steps have been checked.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Glossary | <https://glossary.rjmlaird.co.uk> | Public term reference and search |
| Repository | <https://github.com/rjmlaird/rjmlaird-glossary> | Content, website source and sync Worker |
| Main website | <https://rjmlaird.co.uk> | Wider professional website |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and maintainer guidance |

The Notion database is an editorial source, not a public website
destination.

Its identifier and integration credentials do not belong in public
examples.

## Architecture

### Static website

The website uses:

- Astro 5.
- Static output.
- Markdown term files.
- Type and content-schema checks.
- Pagefind indexing after the site build.

The intended publishing flow is:

```text
Markdown term files
          ↓
Astro type and content validation
          ↓
Static site build
          ↓
Pagefind indexing
          ↓
dist/
          ↓
Cloudflare deployment
```

### Editorial synchronisation

A separate Worker under `workers/notion-sync` runs on a daily schedule.

The README describes this flow:

```text
Notion database
          ↓
Scheduled sync Worker
          ↓
Generated Markdown changes
          ↓
notion-sync branch
          ↓
GitHub pull request
          ↓
Review and merge
          ↓
Normal website build and deployment
```

Creating a pull request is not the same as publishing the website.

Confirm the actual branch, review and deployment configuration before
relying on this flow.

### CI and deployment separation

The README identifies:

```text
.github/workflows/ci.yml
```

as a build-check workflow.

It does not deploy the site.

The public site is configured separately through Cloudflare.

Do not assume that a successful GitHub Actions run has updated production.

## Repository locations

| Location | Purpose |
| --- | --- |
| `src/content/terms/` | One Markdown file per term |
| `src/lib/categories.ts` | Category metadata shared by schema and pages |
| `src/styles/global.css` | Copied main-site brand stylesheet |
| `src/styles/glossary.css` | Glossary-specific layouts using brand tokens |
| `snippets/Term.astro` | Integration snippet for other sites |
| `snippets/subdomains-entry.json` | Entry intended for the subdomain registry |
| `workers/notion-sync/` | Scheduled Notion-to-GitHub sync |
| `.github/workflows/ci.yml` | Build validation |

Inspect the actual files before changing their interfaces or moving them.

## Term content model

### Source and route

Each term is stored in:

```text
src/content/terms/
```

Filenames are lower-case and hyphenated.

For example:

```text
link-budget.md
```

maps to:

```text
/link-budget/
```

Treat published slugs as public identifiers.

### Frontmatter

The README specifies:

| Field | Purpose |
| --- | --- |
| `term` | Display name |
| `category` | Supported category identifier |
| `aliases` | Alternative names |
| `short` | Concise definition, maximum 200 characters |
| `related` | Related-term slugs |
| `updated` | Content update metadata |

Check the schema for exact types, required fields and date handling.

The project record's metadata is separate from the metadata used by
individual term files.

### Categories

Supported category identifiers are:

```text
space
sustainability
marketing
web-architecture
```

Category metadata is maintained in:

```text
src/lib/categories.ts
```

Because the schema and pages share this module, category changes should
be made there and reviewed across content, validation and navigation.

Do not introduce a new category only in a Markdown file or Notion select
option.

### Cross-links

Use ordinary Markdown links:

```markdown
[Link budget](/link-budget/)
```

The README explicitly excludes wikilinks.

Do not use:

```text
[[link-budget]]
```

### Related terms

The `related` field contains slugs.

Before adding a relationship:

- Confirm the destination exists.
- Check the slug.
- Confirm that the relationship is useful.
- Avoid using display names in place of slugs.

Do not assume that a Notion relation is sufficient until the sync output
contains a valid term slug.

## Editorial guidance

### Definitions

Keep the short definition within the schema's 200-character limit.

Use the body for context that does not fit into a concise summary.

A useful term page can distinguish:

- What the term means.
- Where it is used.
- Important qualifications.
- Related concepts.
- Relevant sources, where appropriate.

Do not increase the short-field limit merely to accommodate an article
that belongs in the body.

### Ambiguity

Where a term has different meanings across disciplines, make the intended
context explicit.

Do not present one field's usage as universal.

### Aliases

Use aliases for genuine alternative names, spellings or abbreviations.

Avoid adding unrelated search keywords as aliases.

### Update metadata

Use `updated` to reflect an actual content change.

Do not automatically refresh every term's date during an unrelated build
unless that is a deliberate, documented policy.

### Slug changes

Before renaming a term file:

1. Identify incoming links.
2. Update related-term references.
3. Review Notion slug values.
4. Provide redirects or another compatibility approach where supported.
5. Verify the old and new destinations.

A filename change is also a public URL change.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-glossary.git](https://github.com/rjmlaird/rjmlaird-glossary.git)
cd rjmlaird-glossary
```

### Install dependencies

```bash
npm install
```

Check the package manifest and any runtime declarations for the supported
Node.js and npm versions.

### Start development

```bash
npm run dev
```

Use the local destination printed by the development server.

### Review configuration

Before changing build or deployment behaviour, inspect:

- `package.json`.
- The committed lockfile.
- Astro configuration.
- Content schema.
- Category metadata.
- Pagefind configuration or invocation.
- Cloudflare deployment settings.
- CI workflow.

Do not assume the site uses the same setup as another Astro repository.

## Validation and build

### Production build

```bash
npm run build
```

The README states that this command:

1. Runs `astro check`.
2. Builds the site.
3. Indexes the output with Pagefind.

Inspect the actual script before changing that sequence.

### Validation coverage

The documented build checks types and content schema.

It does not, by itself, establish that:

- Definitions are factually correct.
- Every related link exists.
- Search results are complete.
- The interface is accessible.
- Cloudflare deployment succeeded.

Identify any additional repository checks before documenting them as
available commands.

### Search verification

Test search against the built output.

Check:

- A term's exact name.
- A common alias.
- A phrase from a definition.
- An empty query.
- A query with no results.
- Result destinations.
- Keyboard interaction.

Do not assume development-server behaviour proves that the production
Pagefind index was generated correctly.

## Styling and brand integration

### Current approach

The README describes:

```text
src/styles/global.css
```

as a verbatim copy of the main website's brand stylesheet.

Glossary-specific styling is maintained in:

```text
src/styles/glossary.css
```

and uses the shared tokens.

### Updating the copied stylesheet

When the main stylesheet changes:

1. Confirm the authoritative source.
2. Copy the intended version.
3. Review the diff.
4. Check that glossary token references still resolve.
5. Test representative pages.
6. Review typography, controls and responsive layouts.

Avoid undocumented local edits to the copied file. They can be lost or
conflicted during the next update.

### Future shared-package integration

A shared brand or UI package may eventually replace manual copying.

That integration is not established by this README.

Before migrating, confirm the package contract, token compatibility,
font handling and consumer build behaviour.

## Integration snippets

### Term component

The repository provides:

```text
snippets/Term.astro
```

for copying into other sites.

Before adoption:

- Inspect its props.
- Check generated links.
- Review accessibility.
- Confirm styling assumptions.
- Record the copied source revision.

A copied snippet is not automatically updated when this repository changes.

### Subdomain registry

The repository also provides:

```text
snippets/subdomains-entry.json
```

for inclusion in `subdomains.json`.

Review the target registry schema before copying it.

Confirm the actual hostname, description and ownership metadata.

## Notion database setup

### Required properties

The README specifies:

| Property | Notion type |
| --- | --- |
| `Term` | Title |
| `Slug` | Text |
| `Category` | Select |
| `Aliases` | Multi-select |
| `Short` | Text |
| `Related` | Relation to the same database |
| `Status` | Select: `Draft` or `Published` |

Share the database with the intended Notion integration.

### Category alignment

Keep Notion category values aligned with:

```text
src/lib/categories.ts
```

Do not allow the editorial database and website schema to develop
different category vocabularies.

### Publication status

Verify the Worker's actual treatment of `Draft` and `Published`.

Confirm that draft entries do not enter the publishable term set
unintentionally.

The Notion status is separate from the review and visibility metadata
used by project records on the documentation site.

### Source ownership

Agree whether a term is maintained primarily in Notion or directly
in Git.

Before editing generated Markdown, establish whether the next sync will:

- Preserve the change.
- Overwrite it.
- Create a conflict.
- Propose a replacement in a pull request.

Do not treat two independently editable copies as an automatically
bidirectional workflow.

## Notion-sync configuration

### Non-secret configuration

Set the intended values in the Worker's `wrangler.toml`:

```text
NOTION_DATABASE_ID
GITHUB_REPO
```

Use the actual database and repository identifiers.

### Secrets

Configure:

```text
NOTION_TOKEN
GITHUB_TOKEN
```

The README calls for a fine-grained GitHub token with repository contents
and pull-request permissions for this repository.

Verify the required permission levels and scope against the implementation.

Do not grant unrelated repository access merely to make the sync succeed.

### Secret commands

From the sync Worker directory:

```bash
cd workers/notion-sync
npx wrangler secret put NOTION_TOKEN
npx wrangler secret put GITHUB_TOKEN
```

Keep secret values out of source, logs and documentation.

### Install and deploy

```bash
npm install
npx wrangler deploy
```

Confirm the Cloudflare account, Worker name, schedule and configuration
before deployment.

Deploying the sync Worker is separate from deploying the glossary site.

## Testing Notion synchronisation

### Start locally

From `workers/notion-sync`:

```bash
npm run dev
```

### Trigger the scheduled handler

The README provides:

```bash
curl "http://localhost:8787/__scheduled"
```

Confirm the actual local port and scheduled-handler configuration.

### Side effects

A locally running sync can still contact Notion and GitHub using real
credentials.

Before triggering it, confirm:

- Target database.
- Target repository.
- Branch behaviour.
- Pull-request behaviour.
- Test records.
- Expected file changes.

Do not assume “local” means the operation has no external side effects.

### Review generated changes

Check the resulting pull request for:

- Correct filenames.
- Valid categories.
- Short-definition length.
- Valid related slugs.
- Unexpected deletions or replacements.
- Draft leakage.
- Formatting changes.
- Accurate update metadata.

Run the normal site build before merging.

### Behaviour to verify

The README does not establish:

- Remote deletion handling.
- Renamed-term handling.
- Conflict resolution.
- Duplicate slug handling.
- Repeated-run behaviour.
- Notion body conversion details.
- Scheduling timezone.
- Failure notifications.

Inspect and test these before documenting operational guarantees.

## Deployment

### Website

The README specifies Cloudflare configuration:

```text
Build command: npm run build
Output directory: dist
Domain: glossary.rjmlaird.co.uk
```

The exact Cloudflare hosting product and project settings should be
confirmed in the account.

Do not assume a particular deployment mechanism beyond the supplied
configuration.

### GitHub Actions

The README states that `ci.yml` runs the build as a check.

It does not deploy.

Keep this distinction clear when diagnosing why a merged change is not
visible on the public site.

### Pre-release checklist

- Run the production build.
- Review schema failures.
- Check changed definitions.
- Confirm related links.
- Review renamed slugs.
- Verify Pagefind output.
- Test responsive presentation.
- Check keyboard navigation.
- Review stylesheet changes.
- Confirm the intended deployment source.

### Post-release verification

After deployment:

1. Open the production hostname.
2. Confirm changed term pages.
3. Test search.
4. Check result links.
5. Check category navigation.
6. Review typography and assets.
7. Test representative incoming links.
8. Confirm that draft content is absent.

### Rollback

Document recovery for:

- Website source.
- Content changes.
- Style changes.
- Sync Worker changes.
- Notion configuration.

Rolling back the website does not change Notion records or close
already-created pull requests.

Prevent an unchanged sync process from immediately reintroducing a
reverted content change.

## Operations

### Routine review

Periodically check:

- Term accuracy.
- Broken cross-links.
- Category consistency.
- Aliases.
- Search behaviour.
- Brand stylesheet drift.
- Notion-sync results.
- Open synchronisation pull requests.
- Token expiry and ownership.
- Dependency support.

### Monitoring

The README establishes a daily sync schedule but does not identify an
alerting arrangement.

Determine how maintainers learn about:

- Scheduled-run failures.
- Notion access failures.
- GitHub permission failures.
- Build failures.
- Deployment failures.
- Unmerged sync changes.

A scheduled trigger existing does not prove that content is reaching
production.

### Backups and recovery

Preserve:

- Markdown content.
- Category metadata.
- Site source.
- Lockfile.
- Worker configuration.
- Integration documentation.
- Any editorial content held only in Notion.

Do not assume that the generated Markdown captures every property or
piece of content in the editorial database.

### Credential rotation

When rotating tokens:

1. Identify the affected integration.
2. Update the Worker secret.
3. Test a controlled sync.
4. Verify expected repository changes.
5. Revoke the replaced token.
6. Check the next scheduled run.

Keep Notion and GitHub credentials separate.

## Accessibility

Review:

- Heading structure.
- Readable definitions.
- Meaningful cross-link text.
- Keyboard-operable search.
- Search-result feedback.
- Visible focus.
- Contrast.
- Mobile reflow.
- Long terms and abbreviations.
- Category navigation.
- Consistent link treatment.

A searchable reference should remain browsable without requiring readers
to know the exact term in advance.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A term fails schema validation

Check:

- Required frontmatter.
- Category value.
- `short` length.
- Array fields.
- Updated-date format.
- Any generated sync output.

Do not weaken the schema merely to accept malformed content.

### A related-term link is broken

Check the destination filename and slug.

Review both explicit Markdown links and `related` metadata.

Update incoming references when renaming a term.

### Search works incompletely or not at all

Check:

- The full build completed.
- Pagefind ran after Astro output.
- Search assets are included in deployment.
- Paths resolve correctly.
- The tested server is serving built output.
- The browser is not using older assets.

### A category is missing

Check:

- `src/lib/categories.ts`.
- Schema values.
- Term frontmatter.
- Notion select values.
- Page-generation logic.

### A Notion term does not appear on the site

Trace the complete workflow:

1. Database access.
2. Status eligibility.
3. Scheduled execution.
4. Generated branch changes.
5. Pull request.
6. Review and merge.
7. Website build.
8. Cloudflare deployment.

A successful Notion edit does not imply immediate publication.

### The sync cannot access Notion

Check:

- Token validity.
- Database identifier.
- Integration sharing.
- Property names and types.

Do not expose the token while collecting diagnostics.

### The sync cannot create a pull request

Check:

- Repository identifier.
- GitHub token scope.
- Contents and pull-request permissions.
- Branch rules.
- Existing branch and pull-request behaviour.
- The actual API error.

### Styles change unexpectedly

Check the copied brand stylesheet and glossary overrides.

Confirm which source version was copied and whether token names changed.

### GitHub CI passes but production is unchanged

The documented CI workflow does not deploy.

Inspect the separate Cloudflare deployment integration, source revision
and build results.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Current repository and production destinations.
- [ ] Runtime and dependency requirements.
- [ ] Astro and content-schema configuration.
- [ ] Term field types and requirements.
- [ ] Category metadata.
- [ ] Slug and route behaviour.
- [ ] Related-term validation.
- [ ] Pagefind build and deployed search.
- [ ] Shared stylesheet source.
- [ ] Integration snippets.
- [ ] Cloudflare build settings.
- [ ] Build-only CI behaviour.
- [ ] Notion database properties.
- [ ] Notion integration access.
- [ ] GitHub token permissions.
- [ ] Scheduled Worker configuration.
- [ ] Branch and pull-request behaviour.
- [ ] Draft exclusion.
- [ ] Rename, deletion and conflict behaviour.
- [ ] Local sync side effects.
- [ ] Monitoring and failure handling.
- [ ] Recovery procedures.
- [ ] Accessibility review.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Added or materially revised terminology.
- Category changes.
- Slug changes and redirects.
- Search changes.
- Styling updates.
- Notion-sync changes.
- Required editorial or integration action.

Keep editorial updates, website deployments and sync Worker releases
distinct.
