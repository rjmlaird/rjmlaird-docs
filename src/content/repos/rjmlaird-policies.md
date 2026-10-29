---
title: "Policies"
slug: "rjmlaird-policies"
description: "Shared legal and policy content for the RJM Laird ecosystem, maintained as Markdown and typed registers in an importable package."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["policies", "legal", "privacy", "accessibility", "content", "compliance"]
repository: "https://github.com/rjmlaird/rjmlaird-policies"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Markdown"
  - "Zod"
  - "Vite"
reviewStatus: "needs-review"
---

## Overview

Policies provides shared legal and policy content for the
`rjmlaird.co.uk` estate.

The package separates policy wording from the operational facts and
business decisions that change over time.

Policies are written in Markdown. Contact details, providers, cookies,
retention periods, commercial terms, dates and publication status are
maintained in typed registers.

The main website, `rjmlaird-master`, supplies the page layout and renders
the policy content.

### Intended users

- Maintainers updating policy wording and supporting registers.
- Developers integrating the package into the main website.
- Reviewers checking consistency, publication readiness and unresolved decisions.
- The owner approving factual statements and business terms.

### Design goals

The package is intended to:

- Reduce duplicated legal and policy content.
- Keep shared facts consistent between policies.
- Make unresolved decisions visible.
- Generate tables from maintained registers.
- Prevent incomplete policies from being marked published.
- Keep presentation separate from policy content.

Automated validation supports these goals. It does not establish legal
adequacy, regulatory compliance or correspondence with live operations.

### Verification status

The supplied README states that the package and its tests have been
verified.

The example Astro integration was not run in that context and remains
an integration sketch.

This project record has not independently verified the current repository,
deployed policy pages or consent-manager behaviour.

## Project surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Repository | <https://github.com/rjmlaird/rjmlaird-policies> | Policy content, registers, schemas and tests |
| Package | `@rjmlaird/policies` | Importable policy system |
| Main website | <https://rjmlaird.co.uk> | Rendered public policy pages |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical project guidance |

No separate policy-site hostname is assumed.

The main website owns the public page presentation and route integration.

## Repository structure

```text
rjmlaird-policies/
├── content/
│   └── Policy Markdown
├── data/
│   ├── Site information
│   ├── Policy register
│   ├── Processors
│   ├── Cookies
│   ├── Retention
│   └── Notices
├── schemas/
│   ├── Policy
│   ├── Processor
│   └── Cookie schemas
├── lib/
│   ├── placeholders.ts
│   ├── render.ts
│   └── policy-content.ts
├── docs/
│   ├── Data-flow guidance
│   ├── Review checklist
│   └── Publishing checklist
├── tests/
│   ├── Policies
│   ├── Registers
│   ├── Placeholders
│   └── Policy-content tests
└── index.ts
```

The README describes 14 policy documents.

Policy Markdown uses second-level headings and below. The consuming
layout supplies the page title and surrounding page structure.

## Policy catalogue

The following reflects the supplied README, not a live publication audit.

`data/policy-register.ts` is the authoritative source for policy status.

### Public policies

Public policies concern people using the website.

| Policy | Slug | Route | README status |
| --- | --- | --- | --- |
| Privacy | `privacy` | `/privacy/` | Draft |
| Cookies | `cookies` | `/cookies/` | Draft |
| Terms of use | `termsofuse` | `/termsofuse/` | Published |
| Disclaimer | `disclaimer` | `/disclaimer/` | Published |
| Accessibility | `accessibility` | `/accessibility/` | Published |
| Security | `security` | `/security/` | Draft |
| Safeguarding | `safeguarding` | `/safeguarding/` | Draft |
| Complaints | `complaints` | `/complaints/` | Draft |

### Client policies

Client policies concern booking, payment and commissioned work.

| Policy | Slug | Route | README status |
| --- | --- | --- | --- |
| Terms of service | `termsofservice` | `/termsofservice/` | Draft |
| Cancellation | `cancellation` | `/cancellation/` | Draft |
| Payments | `payments` | `/payments/` | Draft |
| Tutoring | `tutoring` | `/tutoring/` | Draft |
| Media consent | `mediaconsent` | `/mediaconsent/` | Draft |
| Acceptable use | `acceptableuse` | `/acceptableuse/` | Draft |

Keep documentation tables aligned with the register when statuses change.

### Excluded material

The data-processing agreement is not part of this package.

The README identifies it as a contract template issued per client, not
a general website page.

Do not add it to the public policy routes merely to complete the catalogue.

## Architecture

### Separation of responsibilities

| Layer | Responsibility |
| --- | --- |
| Markdown content | Policy wording and document structure |
| Typed registers | Shared facts, decisions and inventories |
| Zod schemas | Structural validation |
| Rendering helpers | Placeholder resolution and register expansion |
| Tests | Consistency and publication rules |
| Main website | Layout, routes, navigation and integration |
| Review process | Factual approval and legal assessment |

### Rendering flow

```text
Policy register entry
          +
Policy Markdown
          +
Site information and supporting registers
          ↓
renderPolicy(slug)
          ↓
Resolved Markdown, entry, notice and sections
          ↓
Markdown processor in the consuming website
          ↓
Policy layout and public page
```

### Package entry points

The root entry point re-exports the package functionality except the
Vite-specific policy-content module.

The README uses:

```ts
import {
  policyRegister,
} from "@rjmlaird/policies";

import {
  renderPolicy,
} from "@rjmlaird/policies/policy-content";
```

Use the policy-content entry point within the supported Vite integration.

Do not assume that a plain Node.js process can load that module without
the required processing.

## Sources of truth

### Policy register

`data/policy-register.ts` owns policy publication status.

Use its declared routes rather than reconstructing URLs independently
from titles.

### Site information

`data/site.ts` holds shared information and decisions used across policies.

The README identifies these areas:

| Area | Examples |
| --- | --- |
| `site.commercial` | Notice periods, charges, payment terms, liability cap and API limits |
| `site.safeguarding` | Safeguarding details |
| `site.complaints` | Complaint timings |
| `site.security` | Security-related settings and targets |

These are owner decisions, not values to invent during implementation.

### Supporting registers

Maintain the applicable facts in their designated registers:

- Processors.
- Cookies.
- Retention.
- Notices.
- Other generated policy inventories.

Updating prose alone is not sufficient when the same fact is generated
elsewhere from a register.

## Content syntax

### Variables

Insert a shared value:

```text
{{site.contactEmail}}
```

Nested paths are supported:

```text
{{site.commercial.invoiceTermsDays}}
```

Policy-specific values can use:

```text
policy.<slug>.*
```

Use the paths supported by the actual data model.

### Filters

The README identifies:

```text
mailto
link
link:Label
date
```

For example:

```text
{{site.contactEmail | mailto}}
```

Use the package's implemented filter syntax rather than adding ad hoc
substitution logic in the consuming website.

### Register includes

The package expands supported register includes:

```text
{{include:retention}}
```

The README lists:

- `processing-activities`
- `processors`
- `transfers`
- `retention`
- `cookie-inventory`
- `cookie-preferences`

Use these where appropriate instead of maintaining duplicate tables
manually.

### Unresolved decisions

Unresolved content uses:

```text
[[TODO: what is needed]]
```

Data files can create the same marker through:

```text
todo()
```

Do not replace an unresolved decision with plausible wording merely to
make a check pass.

Resolve and approve the underlying fact or business term.

### Automatic markers

Unconfirmed providers and unverified cookies produce automatic TODO
markers.

This allows publication checks to detect incomplete registers as well
as incomplete prose.

## Installation in rjmlaird-master

### Dependency options

The package ships TypeScript source and is consumed through Vite/Astro.

The README describes two options.

For a pinned Git release:

```json
{
  "dependencies": {
    "@rjmlaird/policies": "github:rjmlaird/rjmlaird-policies#v0.2.0"
  }
}
```

Confirm that the repository destination and tag exist before using this
declaration.

For sibling-directory development:

```json
{
  "dependencies": {
    "@rjmlaird/policies": "file:../rjmlaird-policies"
  }
}
```

Use one appropriate dependency arrangement.

### Vite processing

The README proposes:

```ts
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["@rjmlaird/policies"],
    },
  },
});
```

Merge this with the existing Astro configuration.

Do not replace unrelated integrations or Vite settings.

### Shared legal exports

The README replaces the consuming site's legal-data module with:

```ts
export {
  site as siteLegal,
  legalLinks,
  type LegalLinkKey,
} from "@rjmlaird/policies";
```

Review existing imports and expected types before replacing the module.

Do not maintain an independently edited second copy of the same legal
contact and navigation data.

## Rendering in Astro

### Integration status

The README's Astro example is explicitly a sketch.

Verify it against the installed Astro version, package exports and
existing legal layout before relying on it.

### Intended integration

The consuming page should:

1. Select an eligible register entry.
2. Use the register's route.
3. Call `renderPolicy(slug)`.
4. Process the returned Markdown.
5. Pass the entry and notice information into the layout.
6. Render the returned sections as appropriate.
7. Render related-policy navigation.
8. Handle draft notices deliberately.

### Returned information

The example uses:

```ts
const {
  markdown,
  entry,
  notice,
  sections,
} = renderPolicy(slug);
```

The layout receives information including:

- Title.
- Description.
- Eyebrow.
- Lead.
- Summary.
- Last-updated date.
- Section navigation.
- Related policies.
- Draft note where applicable.

Confirm the consuming layout's prop interface.

### Route conflicts

The example uses:

```text
src/pages/[policy].astro
```

Review root-level routing before adopting it.

In particular, the policy register includes:

```text
/tutoring/
```

If the main website already uses `/tutoring/` as a service destination,
resolve that collision deliberately before deployment.

Do not silently replace the service page with a policy or change the
registered policy route in only one place.

### Draft handling

The README's example includes drafts in development but excludes them
from production:

```ts
policyRegister.filter(
  (policy) =>
    policy.status !== "draft" || import.meta.env.DEV,
);
```

Review whether this rule remains appropriate if additional statuses
are introduced.

Apply the publication decision consistently to:

- Generated pages.
- Navigation.
- Related links.
- Sitemaps.
- Search indexes.

A draft should not become public through a secondary rendering path.

### Existing URLs

When a policy moves from an older route, add the appropriate redirect.

For example, a previous `/terms-of-use/` destination should not become
a broken link merely because the register now uses `/termsofuse/`.

Keep route changes, incoming links and canonical destinations aligned.

## Cookie preferences integration

The README identifies this interface hook:

```text
[data-open-cookie-preferences]
```

The consuming website must connect it to the actual consent manager.

Only then should:

```text
site.consent.managerConfigured
```

be set to:

```text
true
```

Do not mark the manager configured because a button exists or a library
has been installed.

Verify that the control:

- Opens the intended preferences interface.
- Works with keyboard interaction.
- Communicates its purpose.
- Allows the supported preference changes.
- Reflects actual consent behaviour.

The policy package does not, by itself, establish that scripts and
cookies obey the selected preferences.

## Validation

### Normal checks

The README provides:

```bash
npm test
npm run typecheck
npm run check
```

### Command responsibilities

| Command | Purpose |
| --- | --- |
| `npm test` | Policy wiring, register integrity and placeholder rules |
| `npm run typecheck` | TypeScript validation |
| `npm run check` | Tests and type checking |
| `npm run check:publish` | Strict unresolved-content gate |

### Drafts

Draft policies may contain TODO markers during normal tests.

This supports review and progressive completion without presenting the
drafts as publication-ready.

### Published policies

The README states that normal tests require a published policy to have:

- No TODO markers.
- A `lastReviewed` date.

A review date should reflect an actual review, not the date someone
wanted the tests to pass.

### Strict publication check

Run:

```bash
npm run check:publish
```

The README describes this as failing while a TODO remains in any policy
or in `site.ts`.

This is stricter than validating only currently published policies.

Decide deliberately where the strict check belongs in the release
workflow. If unfinished drafts remain, do not remove its safeguards
merely to obtain a successful build.

## Review and publication workflow

### 1. Complete shared decisions

Review `data/site.ts`.

The README identifies unresolved work concerning:

- Commercial terms.
- Safeguarding.
- Complaint timings.
- Security encrypted-reporting information.
- Security contact details.

Confirm the security email against the deployed `security.txt`.

Do not publish a reporting method that has not been configured and tested.

### 2. Verify providers and cookies

Review:

```text
data/processors.ts
data/cookies.ts
```

Confirm:

- Actual providers.
- Relevant locations.
- Transfer safeguards.
- Actual cookies and related storage.
- Their purposes.
- Their observed behaviour.

Replace template inventory entries with an audit of the live estate.

Do not describe template values as findings.

### 3. Review the policy wording

Check consistency between:

- Markdown.
- Shared values.
- Generated tables.
- Actual site behaviour.
- Commercial processes.
- Provider configuration.

A correct placeholder substitution can still produce an inaccurate
policy if the register is wrong.

### 4. Obtain appropriate review

The README calls for legal review of client policies and safeguarding
before using them with consumers or children.

Keep legal review separate from technical approval.

Passing tests does not establish that cancellation terms, liability
wording or safeguarding procedures are appropriate.

### 5. Publish related policies together

The README recommends publishing these client policies together because
they refer to one another:

- Terms of service.
- Cancellation.
- Payments.
- Tutoring.

Then update the published terms of use to link to them appropriately.

Check that all related destinations exist before releasing cross-links.

### 6. Validate the consuming website

After package integration:

- Run the website's checks and production build.
- Inspect generated policy routes.
- Confirm drafts are excluded.
- Test related links.
- Check section navigation.
- Test cookie preferences.
- Review mobile and desktop layouts.
- Confirm dates and contact details.
- Check redirects.

### 7. Record approval

Update status and review metadata only after the relevant decisions and
checks are complete.

Follow the package's review and publishing checklists in `docs/`.

## Operations

### Ownership

Ryan Laird owns factual statements, commercial decisions and publication
approval.

Maintainers are responsible for preserving the package structure,
validation rules and integration behaviour.

Legal reviewers assess the matters within their agreed review scope.

### Routine review triggers

Review affected registers and policies when:

- Contact details change.
- A provider is added or removed.
- Cookies or analytics change.
- Data flows change.
- Retention practices change.
- Commercial terms change.
- A new service is introduced.
- Safeguarding arrangements change.
- Security-reporting arrangements change.
- A complaint process changes.

Do not assume that policy review is complete because no Markdown file
was edited.

### Consumer updates

For a pinned package version:

1. Prepare and validate the policy change.
2. Create the intended release or tag.
3. Update the consuming site's dependency.
4. Build and inspect the resulting pages.
5. Deploy the site.
6. Verify production.

Updating the package repository alone does not establish that the public
website has changed.

### Recovery

Retain the source and dependency information needed to reproduce a
published policy version.

If a release publishes incorrect content:

- Identify the affected pages.
- Correct the authoritative source.
- Review whether immediate withdrawal or replacement is needed.
- Rebuild and deploy the consuming site.
- Verify public output.
- Record the correction.

Do not roll back to obsolete or misleading wording solely because it
was previously deployed.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A published policy fails tests

Check:

- Remaining TODO markers.
- Automatically generated TODOs.
- Missing `lastReviewed`.
- Invalid register data.
- Broken policy relationships.

Resolve the underlying issue rather than changing status to bypass review.

### check:publish fails while normal tests pass

This can be expected when drafts contain unresolved content.

The strict check covers unfinished policy and site decisions beyond
the normal published-policy checks.

Review the reported markers and the intended release gate.

### A provider or cookie still generates a TODO

Check whether its confirmation and verification fields are complete.

Do not suppress the marker while the supporting facts remain unknown.

### A variable does not resolve

Check:

- The placeholder path.
- The data export.
- Policy-specific versus site-wide values.
- Nested property names.
- Filter syntax.
- Whether the value is intentionally unresolved.

### Policy Markdown cannot be loaded

Check:

- The `policy-content` entry point.
- Vite processing.
- Package exports.
- Installed package version.
- Source-file inclusion.
- The consuming framework's integration.

Do not assume the Vite-only module behaves like a plain Node.js import.

### The website shows an older policy

Check:

- Dependency pin.
- Installed version.
- Lockfile.
- Consumer build.
- Deployment revision.
- Cached output.

Confirm which source version actually reached production.

### A cookie-preferences button does nothing

Check:

- The `data-open-cookie-preferences` hook.
- Consent-manager initialisation.
- Event wiring.
- Route transitions.
- Runtime errors.

Do not set `managerConfigured` to true as a workaround.

### A policy route replaces an existing page

Review root-level dynamic routing and the policy register.

Resolve route ownership deliberately, particularly where a service and
policy share a proposed path.

### The section navigation is incorrect

Check:

- Markdown heading levels.
- Generated section identifiers.
- Layout expectations.
- Heading transformations during Markdown rendering.

Policy content should begin at H2 or below as described by the package.

## Known boundaries

This package does not by itself provide:

- Legal approval.
- A complete cookie audit.
- A consent-management implementation.
- Proof that live behaviour matches the registers.
- A client-specific data-processing agreement.
- Verified Astro integration.
- Automatic deployment to consuming sites.

Its role is to make policy content and supporting facts maintainable,
consistent and testable.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository and package exports.
- [ ] Current policy inventory.
- [ ] Register statuses.
- [ ] Shared contact details.
- [ ] Commercial decisions.
- [ ] Safeguarding details.
- [ ] Complaints process.
- [ ] Security-reporting arrangements.
- [ ] Processor inventory.
- [ ] Cookie audit.
- [ ] Retention and transfer information.
- [ ] Placeholder and generated-table behaviour.
- [ ] Published-policy review dates.
- [ ] Normal tests and type checks.
- [ ] Strict publication-check expectations.
- [ ] Appropriate legal review.
- [ ] Vite/Astro integration.
- [ ] Root-route ownership and conflicts.
- [ ] Draft exclusion across all publication paths.
- [ ] Cookie-preferences integration.
- [ ] Related links and redirects.
- [ ] Production rendering and dates.

Set project-level `lastReviewed` only after reviewing this project record.

Policy-level review dates remain separate.

## Changelog

No dated release history has been supplied for this record.

The README uses `v0.2.0` as a dependency example. Confirm the actual tag
before treating it as an available release.

For future entries, record:

- The date.
- The affected policy or register.
- The relevant commit or release.
- Whether wording, facts or commercial terms changed.
- Review and approval status.
- Route or integration changes.
- Required consuming-site updates.

Keep policy approval, package release and website deployment distinct.
