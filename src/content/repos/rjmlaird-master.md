---
title: "Main website"
slug: "rjmlaird-master"
description: "Ryan Laird’s main personal and professional website, bringing together services, work, research, editorial output, insights and public-facing builds."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "editor"]
tags: ["website", "portfolio", "astro", "content", "accessibility", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-master"
liveUrl: "https://rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "Astro"
  - "TypeScript"
  - "Markdown"
  - "MDX"
  - "Zod"
  - "CSS"
  - "GitHub Actions"
  - "GitHub Pages"
reviewStatus: "needs-review"
---

## Overview

Main website is the source project for `rjmlaird.co.uk`, Ryan Laird’s
personal and professional website.

It brings together professional identity, services, work, research,
editorial output, insights and connections to public-facing builds.

The site uses static Astro output, Markdown and MDX content collections,
structured data and shared design foundations.

Its role is to remain the comprehensive, accessible home for the
professional ecosystem rather than depend on a separate showcase,
application or documentation site.

### Intended users

- Visitors learning about Ryan’s work and experience.
- Prospective clients reviewing services and relevant work.
- Readers exploring writing, research and commentary.
- Developers and maintainers operating the website.
- Editors updating content and structured records.

### Documentation basis

The supplied README states that it was reviewed on 22 October 2026
against:

- Astro 7.x.
- Zod 4.
- Node.js 22.

Its inventories and known issues are a dated snapshot, not a live audit
of the current repository or production site.

This project record has not independently rerun its checks.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Main website | <https://rjmlaird.co.uk> | Comprehensive professional website |
| Repository | <https://github.com/rjmlaird/rjmlaird-master> | Site source, content and tooling |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and maintainer guidance |
| Public API | <https://api.rjmlaird.co.uk> | Structured data consumed by parts of the site |
| Glossary | <https://glossary.rjmlaird.co.uk> | Canonical term definitions |

The planned showcase at `portfolio.rjmlaird.co.uk` is complementary
to the main site.

Do not add a public launch link until that destination is ready.

## Role in the wider ecosystem

### Main website

The main site should provide a coherent account of professional identity,
services, output and capabilities.

It should remain useful without requiring visitors to explore every
connected subdomain.

### Showcase portfolio

The planned showcase is intended for selected highlights with a more
visual and interactive presentation.

It should not replace the main site's complete professional record.

Keep the distinction between:

- Main site: comprehensive, navigable and accessible.
- Showcase: curated, expressive and selective.

### Documentation

Technical setup, integration and maintenance instructions belong in the
documentation site or the relevant repository.

Public project and build pages should link to that material rather than
becoming duplicate documentation systems.

### Apps, Tools and Labs

The main website introduces public-facing builds and explains their
purpose, audience, status and limitations.

The working application or experiment lives at its appropriate destination.

Keep launch links, names and availability information aligned.

### Commercial services infrastructure

Booking, billing and webhook infrastructure is maintained separately
in `rjmlaird-services`.

The public website explains services and provides appropriate entry
points. It should not expose private commercial records or administrative
operations.

## Information architecture

### Documented implementation

The README lists these route areas:

| Area | Representative destinations |
| --- | --- |
| Home | `/` |
| About | `/about/`, biography, organisations, press, authors and brand |
| Work | Projects, case studies, initiatives, events, videos, articles, talks and editorial work |
| Services | Communication, digital systems, teaching and mentoring, speaking and collaboration |
| Insights | Blog, podcasts, resources, sectors and Substack |
| Research | `/research/` and publications |
| Development | `/dev/`, open source, projects and stack |
| Taxonomy | Tags and categories |
| Contact and support | Contact, FAQ, working approach and thank-you page |
| Policies | Published legal and policy destinations |

Inspect the current routes before treating this as exhaustive.

### Intended portfolio organisation

The agreed direction is for Work to represent the complete professional
portfolio, including:

- Projects.
- Case studies.
- Initiatives.
- Research.
- Podcast contributions.
- Organised events and other clearly identified event roles.
- Editorial articles and published writing.
- Development and digital-systems work.

Insights should primarily contain the blog and Substack.

This differs from parts of the README's route inventory, including the
placement of podcasts under Insights and Research as a separate route area.

Treat the revised grouping as an information-architecture direction,
not proof that route migrations have been implemented.

### Editorial work versus personal publishing

Articles and Writing should describe editorial output and professional
publication work.

Blog and Substack should identify personal commentary and ongoing
publishing.

A format alone does not determine whether an entry belongs in Work
or Insights.

### Builds

Builds provides public-facing overview pages for labs, tools and apps.

It can connect to development work and case studies without duplicating
them.

Review the current collection and routes before deciding whether Builds
remains a distinct destination linked from Work or moves beneath it.

Do not change URLs solely to make the taxonomy appear symmetrical.

## Route management

### Source of truth

The README identifies:

```text
src/lib/routes.ts
```

as the central route helper module.

Use its existing `entryHref` convention rather than independently
hard-coding collection URLs throughout components.

### Consumers

Apply route helpers consistently to:

- Navigation.
- Breadcrumbs.
- Cards.
- Related content.
- Calls to action.
- Footer links.
- Taxonomy pages.
- Generated indexes.

Extend the existing abstraction rather than creating a competing one.

### Route changes

Before moving a section:

1. Identify current public destinations.
2. Review incoming and internal links.
3. Update route helpers.
4. Update page generation and navigation.
5. Review canonical URLs.
6. Update sitemaps and search outputs.
7. Implement an appropriate compatibility strategy.
8. Test the deployed result.

Filesystem layout, collection name and public URL do not have to be
identical.

## Architecture

### Static publishing flow

```text
Markdown, MDX and structured data
                 ↓
Collection schemas and build-time integrations
                 ↓
Astro page rendering
                 ↓
Structured data and static assets
                 ↓
dist/
                 ↓
GitHub Actions
                 ↓
GitHub Pages
```

### Stack

The README specifies:

| Area | Documented implementation |
| --- | --- |
| Framework | Astro 7 with static output |
| Content | Markdown and MDX collections |
| Language | TypeScript 6 |
| Validation | Zod 4 |
| Integrations | MDX, sitemap and astro-icon |
| Styling | Hand-written global, shared-page and scoped CSS |
| Runtime | Node.js 22 |
| Package manager | pnpm 11.11.0 in CI |
| Hosting | GitHub Pages with a custom domain |

Check manifests and the lockfile for the currently resolved versions.

### Repository layout

```text
.github/workflows/
docs/
forms/
functions/
packages/glossary/
public/
scripts/

src/
├── brand/
├── components/
├── content/
├── content.config.ts
├── data/
├── layouts/
├── lib/
├── pages/
├── sections/
├── styles/
├── tutoring/
├── types/
└── utils/
```

### Legacy hosting material

The README identifies:

- A legacy PHP contact handler under `forms/`.
- Cloudflare Pages middleware under `functions/`.
- A Cloudflare-related dependency not used by the active Astro adapter.

Do not assume these execute in the GitHub Pages deployment.

Review active form handling and analytics protection independently.

## Content model

### Collections

The README identifies:

- `projects`
- `caseStudies`
- `initiatives`
- `events`
- `blog`
- `podcasts`
- `services`
- `authors`
- `faqs`
- `brandDocs`
- `brandAssets`
- `brandSites`

A Builds collection was also developed during subsequent site work.

Confirm its presence and current schema in:

```text
src/content.config.ts
```

### Source directories

The documented structure includes:

```text
src/content/work/projects/
src/content/work/case-studies/
src/content/work/initiatives/
src/content/work/events/

src/content/insights/blog/
src/content/insights/podcasts/

src/content/services/
src/content/about/authors/
src/content/faqs/
src/content/brand/docs/
```

Do not move content solely to change navigation grouping without first
reviewing imports, loaders and routes.

### Shared metadata

The README describes shared fields for:

- Descriptions and dates.
- Tags, categories and sectors.
- Links.
- Hero media.
- Clients, organisations and institutions.
- Related records.
- Technologies and features.
- Impact.
- Draft and indexing controls.
- Canonical URLs.

Schemas are authoritative for supported fields.

### Evidence and case studies

Optional fields include:

- Role.
- Collaborators.
- Challenge.
- Objectives.
- Approach.
- Outputs.
- Outcomes.
- Testimonials.
- Evidence readiness.

Preserve factual distinctions between an individual's contribution and
the wider achievements of a team or organisation.

Do not invent impact claims to make a page appear complete.

## Content-quality controls

### Evidence readiness

The README identifies:

```text
src/lib/content-quality.mjs
```

as the quality gate for projects, case studies and initiatives.

It describes:

- `isEvidenceReady(data, body)`.
- `assessEntry`.
- `cleanText`.
- `cleanLinks`.

### Behaviour

The README states that an explicit boolean `evidenceReady` takes
precedence over the automatic assessment.

Check how schema defaults interact with that behaviour. A defaulted
boolean may mean the automatic branch is not reached.

Do not assume automatic assessment runs for every entry.

### Indexing

Entries that fail the quality gate are intended to render with
`noindex`.

Sitemap exclusion is a separate concern. The README records a known
problem with the sitemap's source paths and generated URLs.

Do not describe a noindex page as excluded from the sitemap until both
behaviours have been checked.

### Placeholder cleaning

The helpers remove template text and example links from presentation.

Cleaning output is not a substitute for completing and reviewing source
content.

Do not use `evidenceReady: true` merely to bypass an unfinished page.

## Work detail pages

### Layout

The README describes:

```text
ProjectLayout
└── project-layout
    ├── project-main
    │   ├── Introduction
    │   ├── Video
    │   ├── Markdown body
    │   └── Impact and outputs
    └── ProjectSidebar
```

The main content precedes the sidebar in DOM order.

The documented layout becomes two columns at `64rem`, with a `17rem`
sidebar. Below that breakpoint it becomes one column.

Check the current CSS before depending on these dimensions.

### Prose styling

Apply `.prose` to the Markdown body rather than the complete grid.

This preserves independent layout control for cards, metadata and
sidebar content.

### ImpactStats

The README describes `ImpactStats.astro` as supporting:

- Short scalar values as statistic tiles.
- Longer strings as labelled paragraphs.
- Arrays as lists.
- Nested objects as labelled entries.
- A top-level `outputs` list when not already supplied in `impact`.

It renders nothing without usable content.

The component owns its section heading and accessible label. Do not
wrap it in another redundant section and heading.

## Design system

### Style locations

```text
src/styles/global.css
src/styles/pages.css
```

Component-specific rules also appear in scoped style blocks.

### Foundations

The README identifies tokens for:

- Surfaces.
- Primary, secondary and muted text.
- Accents.
- Borders and focus.
- Containers and spacing.
- Navigation height.
- Radius.
- Semantic component aliases.

Use existing tokens before adding parallel values.

### Known token gaps

Some components reference `--color-*` names not defined in the repository.

Map them to the supported system or provide deliberate fallbacks before
relying on them.

Do not assume a familiar token name exists.

### Global selectors

The README warns that bare `nav`, `header` and `footer` selectors have
global styling.

Components using those elements for other purposes may require explicit
resets or a scoped alternative.

Review this before diagnosing a component as having a layout problem.

### Consistency work

The intended UX work includes standardising:

- Typography.
- Buttons.
- Links.
- Forms.
- Filter controls.
- Cards.
- Metadata.
- Spacing.
- Responsive layouts.
- Focus and interaction states.

Preserve core content while improving presentation and navigation.

## Accessibility

The README documents shared conventions including:

- Skip navigation.
- Screen-reader-only utilities.
- Visible focus.
- Labelled landmarks.
- List semantics.
- Explicit notice for new-tab links.
- Touch-friendly footer links.
- Forced-colours support.
- Reduced-motion support.

These conventions do not establish that every page has been audited.

### Automated audit

After building:

```bash
pnpm audit:a11y
```

The README states that the script requires Playwright and axe-core
installation according to its header.

To select pages:

```bash
PAGES=/,/contact/ pnpm audit:a11y
```

Review actual coverage and results.

Automated checks supplement keyboard, screen-reader and manual
interaction testing.

## Structured data

### Graph generation

The README describes one JSON-LD `@graph` per page.

Relevant sources include:

```text
src/lib/schema-org/
src/data/schema-org.json
```

The shared layout renders the graph.

### Data sources

The documented process merges seed facts with API data at build time.

The README specifies a six-second timeout, item validation and fallback
to seed information if the API is unavailable.

Verify this behaviour after changes to the API or merge logic.

### Entities

The graph includes linked website, page, person, image, breadcrumb and
organisation entities.

Specialist layouts can provide their content entity through `mainEntity`.

### Audit

```bash
pnpm build
pnpm audit:schema
```

The README describes checks for:

- Valid JSON.
- One graph block.
- Unique identifiers.
- No dangling references.
- Required nodes.
- No placeholder values.

Passing structural checks does not prove that every factual statement
is correct.

## Glossary integration

### Local package

The site includes:

```text
packages/glossary/
```

Its remark plugin connects annotated terms to the canonical glossary.

The main repository stores term metadata rather than the complete
definition source.

### Authoring syntax

The README supports:

```text
[term]
[term|display text]
[slug]
```

Escape literal brackets where appropriate.

### Strictness

Unknown terms fail the build by default.

For diagnostic work:

```bash
GLOSSARY_STRICT=0 pnpm build
```

This downgrades unknown references to warnings according to the README.

Do not use the override as a permanent substitute for correcting
references.

### Synchronisation

```bash
pnpm glossary:sync
pnpm glossary:check
pnpm test:glossary
```

The README also identifies:

```text
GLOSSARY_TERMS_DIR
```

for selecting the canonical term source.

Review `packages/glossary/README.md` for exact arguments and behaviour.

## Policy integration

### Package

The README states that the website consumes:

```text
@rjmlaird/policies
```

from a pinned GitHub tag:

```text
v0.1.0
```

Another package document may use a different tag as an example. Check
this repository's actual dependency and lockfile.

### Rendering

The README identifies:

```text
src/pages/[policy].astro
```

and the legal layout as the rendering integration.

Policies with unresolved TODO markers are described as available during
development but excluded from production.

### Snapshot status

The README lists these as built:

- `/terms-of-use/`
- `/disclaimer/`
- `/accessibility/`

It lists Privacy and Cookies as held back pending completion in the
policy package.

This is a dated snapshot, not a current route audit.

### Review points

Check:

- Package version.
- Policy register routes.
- Draft and TODO handling.
- Footer destinations.
- Related-policy links.
- Cookie-preferences integration.

The supplied policy-package README and main-site README use different
terms-of-use route examples. Resolve actual route ownership and redirects
from the installed version rather than guessing.

## FAQs

The README describes one FAQ collection under:

```text
src/content/faqs/
```

It feeds the main FAQ page and contextual sections.

Supporting files include:

```text
src/lib/faq-meta.ts
src/lib/faqs.ts
src/components/faqs/
```

Filenames act as stable FAQ identifiers.

To make FAQ validation fatal:

```bash
FAQ_STRICT=1 pnpm build
```

Check the actual validation rules and deployment policy.

## Structured data files

The README identifies data sources for:

- Navigation.
- Profile and CV.
- Expertise and milestones.
- Social links.
- Schema seed facts.
- Selected work.
- Research.
- Articles.
- Podcasts.
- Videos.
- Events.
- Press.
- Development and open-source work.
- Contact routing.
- Legal links.

### Verification flags

The README states that only verified social entries are emitted as
schema.org `sameAs` values.

It also describes a CV completeness flag.

Preserve these distinctions rather than publishing incomplete or
unverified records as finished facts.

### External data

Experience, awards and other records are described as being read through:

```text
src/lib/api.ts
```

using `api.rjmlaird.co.uk`.

Document fallback behaviour per integration rather than assuming every
API consumer has the same resilience.

### Publications

The README identifies:

```text
src/data/publications.bib
```

as the bibliography source for research publications.

Review the citation tooling and generated output when changing it.

## Development section

The `/dev/` pages fetch GitHub data at build time through:

```text
src/lib/github.ts
```

The README identifies:

```text
GITHUB_TOKEN
DEV_TOKEN
```

as configuration used by that integration.

Do not expose those tokens in browser-delivered data.

Verify how unavailable or rate-limited GitHub responses affect the build
and page presentation.

## Brand and legacy tutoring code

### Brand documentation

The README identifies:

```text
src/brand/
src/content/brand/
```

as the existing brand-documentation implementation.

It describes styles as scoped to avoid leakage.

A separate `rjmlaird-brand` project and planned `rjmlaird-ui` integration
should be coordinated deliberately. Do not assume the embedded system
has already migrated.

### Tutoring

The README identifies carried-over code under:

```text
src/tutoring/
```

and states that there was no `/tutoring/` route at review time.

Confirm the current route structure before linking to that path.

## Getting started

### Requirements

Use the README's documented environment:

- Node.js 22.
- pnpm 11.11.0.

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-master.git](https://github.com/rjmlaird/rjmlaird-master.git)
cd rjmlaird-master
```

### Enable tooling and install

```bash
corepack enable
pnpm install --frozen-lockfile
```

The README also gives explicit pnpm installation as an alternative:

```bash
npm install -g pnpm@11.11.0
```

Use one appropriate setup route.

The policy dependency requires GitHub network access during installation.

### Development

```bash
pnpm dev
```

The README identifies:

```text
http://localhost:4321
```

as the normal development destination.

### Preview

```bash
pnpm build
pnpm preview
```

Review built output rather than relying solely on development mode,
particularly for policy filtering and build-time data.

## Commands and quality gates

| Command | Purpose |
| --- | --- |
| `pnpm sync` | Regenerate content types |
| `pnpm build` | Sync, check and build |
| `pnpm preview` | Preview built output |
| `pnpm audit:schema` | Audit built JSON-LD |
| `pnpm audit:a11y` | Audit selected built pages |
| `pnpm glossary:sync` | Regenerate glossary metadata |
| `pnpm glossary:check` | Verify glossary metadata |
| `pnpm test:glossary` | Run glossary tests |

### Recommended baseline

The README suggests:

```bash
pnpm build && pnpm audit:schema
```

Run additional checks appropriate to the change.

### Commands requiring repair

The README records these as broken at review time:

```text
pnpm audit:content
pnpm brand:tokens
pnpm brand:validate
```

Inspect the known issues before treating them as reliable gates.

### Legal drafting audit

The README identifies:

```text
scripts/check-legal-todos.mjs
```

as a manual built-output check not wired into the build.

Do not assume it runs in CI merely because its header recommends it.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Build-time GitHub API access |
| `DEV_TOKEN` | Additional development-data access |
| `GLOSSARY_STRICT` | Glossary failure versus warning behaviour |
| `GLOSSARY_TERMS_DIR` | Canonical glossary source for synchronisation |
| `FAQ_STRICT` | Strict FAQ validation |
| `PAGES` | Page selection for accessibility auditing |

The README also lists analytics credentials associated with the
Cloudflare Pages middleware.

Those are not used by the documented GitHub Pages deployment.

Keep `.env` files and credentials out of version control.

## Deployment

### Workflow

The README identifies:

```text
.github/workflows/deploy.yml
```

with push-to-main and manual triggers.

The described sequence is:

1. Check out source.
2. Configure GitHub Pages.
3. Install pnpm 11.11.0.
4. Set up Node.js 22.
5. Install with the frozen lockfile.
6. Build with the intended GitHub credentials.
7. Upload `dist/`.
8. Deploy through the Pages action.

### Dependency controls

The README records:

```text
minimumReleaseAge: 1440
```

in `pnpm-workspace.yaml`, with exceptions and restricted install-script
permissions.

Review these settings before changing package-manager configuration.

Do not translate pnpm configuration blindly into npm configuration.

### Custom domain

The repository includes a `CNAME` for the custom domain.

Verify Pages settings, DNS and TLS independently.

### Retired destinations

The README states that retired-subdomain redirects must be configured
on the systems serving those hostnames.

Do not assume the main site's static deployment controls requests to
another subdomain.

### Generated output

The README notes that `dist/` is tracked in some copies.

It is regenerated by the build and is not required as committed source
for the documented Actions deployment.

Review repository policy before removing generated files.

### Pre-release checklist

- Run the build.
- Run the schema audit.
- Run relevant accessibility checks.
- Verify public routes and navigation.
- Check policy availability.
- Review sitemap behaviour.
- Inspect build-time API and GitHub output.
- Check mobile and keyboard interaction.
- Confirm no secrets enter static output.
- Identify the previous known-good deployment.

### Recovery

Restore a suitable source revision and deployment configuration.

Review dependency pins and external data inputs when reproducing a build.

A rebuilt older revision may not be byte-identical if it fetches current
external data.

## Known issues from the README review

The README records the following on 22 October 2026 and states that they
did not prevent the normal build.

| Issue | Recorded concern |
| --- | --- |
| Content audit | Still reads pre-migration content paths |
| Sitemap stub exclusion | Uses stale content paths and URLs |
| Sitemap patterns | Contains outdated route exclusions |
| Brand commands | Reference missing scripts |
| Privacy and Cookies | Excluded while unresolved, with a conflicting footer link |
| Lockfiles | npm and pnpm lockfiles can drift |
| Tokens | Some component token references are undefined |
| Legal TODO audit | Not included in the build |
| Repository hygiene | Backup, duplicate and local files require review |

### Repair approach

For each issue:

1. Confirm it still exists.
2. Identify the authoritative path or behaviour.
3. Make a focused correction.
4. Run the affected check.
5. Inspect representative built output.
6. Update the README and this record.

Do not mark the list resolved merely because a normal build succeeds.

## Operations

### Routine maintenance

Review:

- Content accuracy.
- Broken destinations.
- Placeholder text.
- Related-record consistency.
- Indexing controls.
- Sitemaps.
- Policy availability.
- External data.
- Dependency support.
- Navigation and route helpers.
- Accessibility.

### Protect core content

UX and design-system work should not silently rewrite:

- Roles.
- Dates.
- Credits.
- Research details.
- Editorial records.
- Organisation relationships.
- Outcomes and evidence.

Presentation changes and factual edits should be reviewable separately.

### Monitoring

No dedicated monitoring provider is established by the supplied README.

Distinguish:

- Deployment success.
- Page availability.
- Link integrity.
- External-data freshness.
- Accessibility.
- Content accuracy.

A successful static response does not prove all of these.

### Backups

Preserve:

- Source content.
- Structured data.
- Assets.
- Bibliography.
- Shared package sources.
- Lockfile.
- Workflow configuration.
- Domain configuration.
- External-source recovery information.

Generated `dist/` alone is not a complete source backup.

## Troubleshooting

### A content entry fails validation

Read the named file and schema error.

Fix the source or schema deliberately rather than suppressing validation.

### A shared schema import fails

Resolve imports relative to:

```text
src/content.config.ts
```

Check actual locations under `src/brand/`, `src/lib/` and `src/content/`
instead of inferring them from names.

### A page is noindex but remains in the sitemap

Review both the page-level quality gate and sitemap filtering.

The README records stale sitemap paths as a known issue.

### A local navigation element becomes sticky

Inspect global `nav` styling and component resets.

Do not assume the problem originates in the component's scoped CSS.

### A muted label is difficult to read

Check the actual foreground and surface pair.

The README warns against using the muted token for small text on the
lifted surface.

### A policy destination returns 404

Check:

- Installed policy package version.
- Unresolved TODOs.
- Policy register route.
- Production filtering.
- Footer links.

Do not publish unresolved policy text simply to remove a broken link.

### Development data fails to load

Check GitHub credentials, API responses and rate handling.

Review whether the failure affects the build, data completeness or only
a particular section.

### Analytics middleware does not execute

Confirm the hosting platform.

Cloudflare Pages Functions are not part of the documented GitHub Pages
deployment.

### A new route is linked inconsistently

Check `src/lib/routes.ts` and all consumers.

Avoid correcting only one card or navigation menu.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Current framework and dependency versions.
- [ ] Node.js and package-manager configuration.
- [ ] Authoritative lockfile.
- [ ] Collection inventory, including Builds.
- [ ] Current route map.
- [ ] Work and Insights grouping.
- [ ] Route-helper adoption.
- [ ] Evidence-ready behaviour and schema defaults.
- [ ] Sitemap exclusions.
- [ ] Content-audit repair.
- [ ] Shared styles and token mapping.
- [ ] Accessibility checks.
- [ ] JSON-LD output and audit.
- [ ] Glossary synchronisation.
- [ ] Installed policy version and routes.
- [ ] Privacy and cookie publication status.
- [ ] FAQ validation.
- [ ] API and GitHub fallback behaviour.
- [ ] Brand integration boundaries.
- [ ] Legacy code and hosting assumptions.
- [ ] Deployment workflow.
- [ ] Custom domain and retired-host redirects.
- [ ] Recovery procedure.
- [ ] Known-issue status.

Set `lastReviewed` only after an actual maintainer review of this record.

## Changelog

The supplied README records a review on 22 October 2026.

It does not provide a complete dated release history.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Content-model changes.
- Navigation and route migrations.
- Shared-component and design changes.
- Integration and package updates.
- Quality-gate changes.
- Indexing and policy-publication changes.
- Compatibility or recovery requirements.

Keep documentation review, implementation changes and production releases
distinct.
