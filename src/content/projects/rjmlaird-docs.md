---
title: "Docs"
slug: "rjmlaird-docs"
description: "Markdown-first technical documentation for Ryan Laird’s websites, APIs, tools and infrastructure, published with Astro and designed for local use in Obsidian."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "contributor"]
tags: ["documentation", "astro", "markdown", "infrastructure", "obsidian"]
repository: "https://github.com/rjmlaird/rjmlaird-docs"
liveUrl: "https://docs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "Astro"
  - "Markdown"
  - "TypeScript"
  - "GitHub Actions"
reviewStatus: "needs-review"
---

## Overview

Docs is the technical documentation platform for the RJM Laird ecosystem.

It brings together project records, task-based guides, reference material
and operational procedures for websites, APIs, tools and infrastructure.

The site is Markdown-first. Astro provides the published interface, while
the repository is also designed to work as a local Obsidian vault.

The aim is to keep documentation readable and maintainable independently
of the presentation layer.

### Intended users

- Developers implementing and integrating systems.
- Maintainers operating websites and infrastructure.
- Contributors updating documentation.
- Readers looking for technical context about public projects.

### Scope

This site documents:

- What each project is responsible for.
- How systems relate to one another.
- Verified setup and integration steps.
- Architecture and stable reference information.
- Deployment and maintenance procedures.
- Retired systems and historical material.

It is not the main professional portfolio, a replacement for project
source repositories or a place to publish private operational records.

### Verification status

This record is based on the supplied README, migration notes,
contribution guidance and configuration work discussed during setup.

The migration notes state that a full build was not verified in the
original migration environment because dependency installation timed out.

Later local build output showed successful content synchronisation and
identified page-level type errors. Subsequent fixes were supplied, but
a final successful production build has not been recorded here.

Do not interpret this history as evidence that the current deployment
has passed every check.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Documentation | <https://docs.rjmlaird.co.uk> | Published technical documentation |
| Repository | <https://github.com/rjmlaird/rjmlaird-docs> | Source, templates and validation |
| Main website | <https://rjmlaird.co.uk> | Professional identity, services and public-facing work |
| Local vault | Repository opened in Obsidian | Local reading and authoring |

The production hostname is the intended public destination.

Deployment configuration, DNS and TLS should be checked independently
before changing publication settings.

## Relationship to other content

### Main website

The main website explains professional work, services, writing and
public-facing builds.

Docs provides the technical detail behind relevant projects.

Keep public project introductions distinct from implementation and
maintenance instructions.

### Repository documentation

Individual repositories own source-specific development instructions.

Use this site for cross-project context, maintained project records and
shared procedures.

Where instructions exist in both places, identify the authoritative
source and avoid independent copies that drift apart.

### Blog and Substack

Blog and Substack content provide commentary, reasoning and development
stories.

A reflective article is not automatically an operational procedure.
Link related editorial material without treating it as a tested runbook.

### Private documentation

Private repositories and commercial systems may require restricted
maintainer documentation.

Do not publish credentials, customer information, sensitive configuration
or private incident details in this public site.

Where useful, publish a separate overview that explains the project
without exposing internal operations.

## Architecture

### Publishing model

The site uses Astro to render Markdown-based content collections into
a static website.

The intended flow is:

```text
Markdown and frontmatter
          ↓
Content collection validation
          ↓
Astro pages and shared components
          ↓
Static output in dist/
          ↓
GitHub Actions deployment
          ↓
GitHub Pages
```

GitHub Actions and GitHub Pages are the deployment approach described
by the README. Confirm the active workflow and repository settings
before treating the configuration as verified.

### Content configuration

Collection definitions are maintained in:

```text
src/content.config.ts
```

The loader-based configuration discussed during setup defines:

- `projects`
- `guides`
- `reference`
- `operations`
- `archive`

Inspect the current configuration before moving files or changing
content paths.

### Presentation

The migration notes describe:

- Global navigation.
- Breadcrumbs.
- Project cards.
- Project filtering.
- Client-side search.
- Shared layouts and styles.

Keep these elements consistent across collection indexes and detail pages.

### Supporting material

The repository also retains:

- Templates.
- Content and link-validation scripts.
- Tests.
- Service and subdomain registry data.
- Schemas.
- Legacy route mapping.
- Obsidian settings.
- Editor settings.
- CI and deployment workflows.

Retained registry data is not, by itself, proof of current deployed
services or live DNS state.

## Content model

### Projects

```text
src/content/projects/
```

One metadata-rich record per website, API, tool or service.

A project record should explain:

- Purpose.
- Intended audience.
- Known destinations.
- Architecture.
- Setup.
- Configuration.
- Deployment.
- Operations.
- Limitations.
- Review status.

Separate confirmed implementation details from plans and unverified
information.

### Guides

```text
src/content/guides/
```

Task-based instructions and onboarding.

Guides should help a reader complete a defined task, with prerequisites,
steps, expected results and relevant failure handling.

Migrated documentation retains its relative paths where practical.

### Reference

```text
src/content/reference/
```

Stable information such as:

- Architecture.
- Schemas.
- Domain inventories.
- Terminology.
- Configuration reference.
- Ecosystem relationships.

A domain inventory should state its source and review status. It is not
a live DNS audit unless such an audit was actually performed.

### Operations

```text
src/content/operations/
```

Repeatable maintenance procedures and runbooks.

Operational pages should distinguish:

- Read-only inspection.
- Local changes.
- Staging changes.
- Production changes.
- Destructive actions.
- Recovery steps.

Only publish operational detail appropriate for the public site.

### Archive

The README specifies:

```text
src/content/archive/
```

Earlier repository inspection showed a root-level directory:

```text
archive/
```

The loader was subsequently written to target that root-level directory.

Resolve this discrepancy between documentation, filesystem and active
configuration before moving historical records.

Do not maintain two competing archive locations or create an empty
directory solely to hide a loader warning.

### Templates

```text
templates/
```

The migration notes identify templates for:

- Project records.
- Runbooks.
- APIs.
- Changelogs.

Templates provide structure, not verified facts. Replace starter text
with accurate material and retain review flags until checked.

## Metadata and review

### Lifecycle status

`status` describes lifecycle state.

It is not a health check, uptime measurement or guarantee that every
feature is complete.

### Review status

Use:

```yaml
reviewStatus: "needs-review"
```

for new, migrated or materially unverified content.

Use:

```yaml
reviewStatus: "reviewed"
```

only after a maintainer has checked the relevant claims and procedures.

### Review dates

Add `lastReviewed` only when review has actually occurred.

Do not use the date a page was generated as a substitute for a factual
or operational review.

### Unknown details

Mark unknown repository, hosting, deployment and DNS details for
verification.

Do not infer one project's architecture from another merely because
they share an owner or domain.

### Visibility

Project records support:

```yaml
visibility: "public"
```

```yaml
visibility: "internal"
```

```yaml
visibility: "private"
```

Visibility metadata alone does not restrict access.

Public publication rules must be applied to every relevant output,
including:

- Detail pages.
- Indexes.
- Search data.
- Sitemaps.
- Feeds or generated manifests.
- Downloadable assets.

The project-detail and search examples used during setup included all
project records, while the project index filtered for public records.
Review and align those behaviours before storing restricted material
in the publishable content tree.

Excluding a page from navigation is not access control.

## URL strategy

### Projects

```text
/projects/<slug>/
```

With the loader-based configuration, project routes use the collection
entry's `id`.

A separately required `data.slug` field was removed during setup.

Keep links and static-path generation consistent with that decision.

### Migrated guides

```text
/docs/<original-path>/
```

The migration preserves the previous documentation URL shape where
practical.

### Reference

```text
/reference/<path>/
```

### Operations

```text
/operations/<path>/
```

### Archive

Confirm the archive route implementation and source location together.

Do not assume that the filesystem path determines the public URL.

### Legacy routes

The migration notes identify:

```text
data/legacy-doc-routes.json
```

as the retained legacy route mapping.

Redirect configuration was added during migration, but its behaviour
must be verified on the actual hosting platform.

A redirect file existing in the repository does not establish that
GitHub Pages processes it.

Test representative legacy URLs after deployment.

## Local development

### Requirements

The current README specifies:

- Node.js 20 or later.
- pnpm 10 or later.

Check the package manifest, lockfile and CI configuration for any more
specific version requirements.

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-docs.git](https://github.com/rjmlaird/rjmlaird-docs.git)
cd rjmlaird-docs
```

### Install and run

```bash
corepack enable
pnpm install
pnpm dev
```

Use the local destination printed by the development server.

### Package-manager consistency

Earlier local build commands used npm. The current README specifies
pnpm.

Align local development, CI and the committed lockfile with the intended
package manager.

Review competing lockfiles rather than deleting them without confirming
which dependency set is authoritative.

## Validation and build

The README lists:

```bash
pnpm lint:content
pnpm lint:links
pnpm typecheck
pnpm build
pnpm validate
pnpm preview
```

### Validation responsibilities

| Command | Intended purpose |
| --- | --- |
| `pnpm lint:content` | Content-structure and metadata checks |
| `pnpm lint:links` | Internal-link validation |
| `pnpm typecheck` | Type validation |
| `pnpm build` | Production build |
| `pnpm validate` | Repository-defined validation workflow |
| `pnpm preview` | Local preview of built output |

Inspect `package.json` and scripts for the exact coverage of each command.

Do not assume that internal-link validation checks external destinations,
or that a build includes accessibility testing.

### Preview review

After building, inspect representative pages:

- Homepage.
- Project index.
- Project detail.
- Nested guide.
- Reference page.
- Operations page.
- Archive page, where published.
- Search.
- Missing-page behaviour.

Check both content and navigation.

## Adding a project

Use the supplied scaffolding command:

```bash
pnpm new:project -- \
  example-service \
  "Example Service" \
  "Short, accurate description."
```

Review the generated file in:

```text
src/content/projects/
```

Then:

1. Confirm the project identity.
2. Add verified destinations.
3. Set the intended visibility.
4. Describe confirmed architecture.
5. Mark unknown details clearly.
6. Keep `reviewStatus` as `needs-review`.
7. Run validation.

```bash
pnpm validate
```

Do not treat generated starter sections as implementation evidence.

## Authoring and contribution

### Before editing

- Identify the audience and purpose.
- Prefer updating an existing source page.
- Verify commands, destinations and system claims.
- Check whether the information is suitable for publication.
- Distinguish current behaviour from planned work.

### Before opening a pull request

Run:

```bash
pnpm validate
```

For new or materially changed pages, review:

- Heading structure.
- Link text.
- Code examples.
- Frontmatter.
- Keyboard navigation.
- Related content.
- Mobile presentation.
- Publication visibility.

Do not add credentials, secrets or private operational data.

### Avoid duplication

Use links between related records.

Keep:

- Task instructions in guides.
- Stable facts in reference.
- Repeatable maintenance in operations.
- Project context in project records.
- Historical material in archive.

An individual page can link to several of these without reproducing
them in full.

## Obsidian use

The repository is designed to function as a local Obsidian vault.

The README identifies:

```text
.obsidian/
```

as the settings directory.

### Authoring expectations

Keep core documentation understandable as Markdown.

Review framework-specific syntax before introducing it into material
intended for local reading.

Do not assume that every website feature, generated component or link
behaves identically inside Obsidian.

### Local and public boundaries

A local vault may contain working material, but the publishable repository
must still be reviewed for accidental disclosure.

Do not assume that an Obsidian-only convention prevents a file from
being committed or included in a deployment.

## Configuration

### Astro

Review the current Astro configuration for:

- Production site URL.
- Base path.
- Integrations.
- Markdown processing.
- Output behaviour.
- Redirect-related configuration.

Do not copy deployment settings from another site without checking
GitHub Pages requirements.

### Content collections

Keep loader directories aligned with the actual filesystem.

When moving `src/content.config.ts`, update relative module imports
according to their real locations.

Do not infer that a shared schema is inside `src/content/` merely
because it is used by content collections.

### Registries and schemas

The README retains `data/` and `schemas/` for future integration.

Treat their integration status explicitly.

Do not describe an unused registry as the site's active source of truth.

### Secrets

A static documentation site may still use deployment credentials or
tokens in CI.

Keep values out of content, source examples and public build output.

Document variable names and purposes only where appropriate.

## Deployment

### Intended workflow

The README describes GitHub Actions performing validation and build,
then publishing:

```text
dist/
```

to GitHub Pages.

Confirm:

- The active workflow.
- Build command.
- Runtime and package-manager versions.
- Repository permissions.
- Artifact configuration.
- Deployment environment.
- GitHub Pages source selection.

### GitHub Pages settings

Confirm that Pages is configured to use GitHub Actions.

Review the custom domain and DNS/TLS configuration before merging
deployment changes.

Do not assume a successful workflow proves that the custom hostname
is correctly configured.

### Pre-release checklist

- Run validation.
- Build locally or confirm the equivalent CI checks.
- Review publication filtering.
- Check search output for unintended content.
- Test representative routes.
- Review migrated links.
- Verify redirects on the target platform.
- Check mobile and keyboard navigation.
- Confirm licensing and attribution.
- Identify the previous known-good deployment.

### Post-release verification

After deployment:

1. Open the production hostname.
2. Confirm the intended revision is visible.
3. Check assets and typography.
4. Open representative collection pages.
5. Test search.
6. Check internal links.
7. Test legacy destinations.
8. Confirm restricted records are absent from public output.
9. Check certificate and hostname behaviour.

### Rollback

Document the actual recovery mechanism supported by the deployment
workflow.

Identify the previous known-good source revision and build environment.

If unintended sensitive content was published, treat the response as
more than a routine rollback:

- Remove the content from public output.
- Review repository history and generated artifacts.
- Rotate any exposed credentials.
- Check other published surfaces.
- Record the incident.

## Migration history

### Previous platform

The migration notes describe replacement of the Docusaurus application
shell with an Astro static site.

### Migrated content

The notes record migration of 69 Markdown pages from the previous
`docs/` tree into:

```text
src/content/guides/
```

Their relative paths were preserved to support existing `/docs/<path>/`
destinations.

This is a migration-time count, not the current page count.

### Added during migration

The notes describe:

- Seven initial project records.
- Starter reference and deployment material.
- Typed content collections.
- Shared navigation and breadcrumbs.
- Project filtering.
- Client-side search.
- Authoring templates.
- Content and link checks.
- Tests.
- CI and deployment workflows.
- Obsidian and editor settings.
- Legacy route mapping and redirect configuration.

The initial project count does not describe the current registry.

### Excluded generated output

The previous Docusaurus-generated directories were intentionally not
carried over.

Do not restore generated output as a replacement for the migrated source.

## Operations

### Routine maintenance

Review:

- Documentation accuracy.
- Broken links.
- Unresolved starter text.
- Review status and dates.
- Dependency support.
- CI results.
- Production routing.
- Search behaviour.
- Publication visibility.
- Domain and certificate configuration.

Prioritise pages describing systems that have materially changed.

### Search

The implementation discussed during setup performs client-side search.

Content embedded in a browser-delivered search index is public even
when it is not immediately visible on screen.

Filter sensitive material before generating search data.

Do not rely on the search interface to hide records already included
in the delivered page.

### Backups and recoverability

Identify everything needed to reproduce the site:

- Markdown.
- Templates.
- Registries and schemas.
- Images and other assets.
- Source configuration.
- Dependency lockfile.
- Workflow configuration.
- Custom-domain settings.
- Any external build inputs.

Local editor settings are not a substitute for source backup.

### Incident response

For broken publication or inaccurate guidance:

1. Identify affected pages and readers.
2. Determine whether the issue is content, build, routing or hosting.
3. Restrict or correct misleading instructions where necessary.
4. Restore working publication.
5. Validate representative pages.
6. Record the cause and follow-up work.

For private-data exposure, review page output, search data, artifacts and
repository history rather than removing only a navigation link.

## Accessibility

Review both shared components and representative content.

Check:

- Semantic landmarks.
- Heading order.
- Skip navigation.
- Keyboard access.
- Visible focus.
- Readable typography.
- Contrast.
- Mobile reflow.
- Search labels and result announcements.
- Code-block overflow.
- Table usability.
- Meaningful link text.
- Image alternatives.

A successful Astro build is not an accessibility audit.

## Licensing

The README states that the site currently identifies documentation as:

```text
CC BY 4.0
```

Confirm that this is appropriate for:

- Migrated documentation.
- Newly written pages.
- Quoted material.
- Images.
- Third-party examples.
- Other included assets.

Do not assume that a documentation licence automatically applies to
application code or third-party material.

Preserve required attribution and exceptions.

## Troubleshooting

These checks reflect issues encountered during setup and areas identified
by the supplied documentation.

### A schema or collection import cannot be resolved

Check the actual module location relative to:

```text
src/content.config.ts
```

Do not change imports based only on the name of the collection.

### A loader reports a missing directory

Compare:

- Loader `base`.
- Actual directory.
- README content model.

The archive previously existed at the repository root while the README
described `src/content/archive/`.

Choose and document one arrangement.

### A project fails because slug is required

Inspect the active schema.

The loader-based configuration used during setup does not require a
separate project `data.slug`.

Use the collection entry's `id` consistently for routing.

### A template still references data.slug

Search:

```bash
rg -n 'data\.slug' src
```

Review each match and update collection-entry routing as appropriate.

Do not add a shared default slug to make unrelated records validate.

### An inline search script produces a TypeScript parsing problem

Check whether the script uses:

```text
define:vars
```

The corrected example uses plain JavaScript in that inline block and
runtime DOM type checks.

Keep TypeScript syntax in script contexts that actually process it.

### A public index hides a record but its detail page still exists

Review page generation, not only the index filter.

Apply visibility policy to every public output, including search data.

### A legacy destination fails on GitHub Pages

Check the deployed redirect mechanism.

Do not assume that configuration intended for another host is honoured
by Pages.

### A nested entry fails to generate a route

Compare the entry ID with the dynamic route filename.

Review whether the page needs a catch-all route rather than a single
path-segment parameter.

### Validation succeeds but deployment fails

Check:

- Workflow permissions.
- Package-manager setup.
- Lockfile compatibility.
- Build artifact.
- Pages configuration.
- Custom domain.
- DNS and TLS.

Keep build failures distinct from hosting failures.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Current repository structure.
- [ ] Runtime and package-manager requirements.
- [ ] Authoritative lockfile.
- [ ] Successful validation.
- [ ] Successful production build.
- [ ] Content collection configuration.
- [ ] Archive location.
- [ ] Entry-ID routing.
- [ ] Nested routes.
- [ ] Visibility enforcement.
- [ ] Search publication filtering.
- [ ] Migration route coverage.
- [ ] Redirect behaviour on GitHub Pages.
- [ ] Obsidian authoring expectations.
- [ ] Template accuracy.
- [ ] Registry integration status.
- [ ] CI and Pages settings.
- [ ] Custom domain and TLS.
- [ ] Accessibility review.
- [ ] Licensing and attribution.
- [ ] Recovery procedure.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this project record.

The migration notes provide an undated account of the move from
Docusaurus to Astro.

Subsequent setup work included:

- Explicit loader-based collections.
- Removal of a required project slug field.
- Entry-ID-based project routing.
- Search-script corrections.
- Review of archive paths.

These changes should only be recorded as completed releases after the
actual repository changes and successful validation are confirmed.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Content-model changes.
- Route and redirect changes.
- Validation changes.
- Publication and visibility changes.
- Required contributor action.

Keep documentation edits, code changes and production deployments distinct.
