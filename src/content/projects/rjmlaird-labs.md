---
title: "Labs"
slug: "rjmlaird-labs"
description: "A registry-driven monorepo for interactive experiments and simulations, with shared design tokens, interface components and independently deployed lab applications."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "contributor"]
tags: ["labs", "experiments", "simulations", "science", "monorepo"]
repository: "https://github.com/rjmlaird/rjmlaird-labs"
liveUrl: "https://labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Astro"
  - "React"
  - "Cloudflare Workers"
  - "Canvas"
reviewStatus: "needs-review"
---

## Overview

Labs is the shared workspace for interactive experiments and simulations
published under `*.labs.rjmlaird.co.uk`.

A central hub helps visitors discover the labs. Individual lab applications
share design foundations, interface components and simulation utilities,
but are built and deployed separately.

The repository is organised around a single registry so that lab identity,
theme, navigation and publication state are maintained consistently.

### Intended users

- Visitors exploring scientific and technical ideas interactively.
- Developers implementing experiments and simulations.
- Contributors adding or migrating labs.
- Maintainers managing shared packages, registry consistency and deployments.

### Scope

The supplied README establishes:

- A hub generated from a shared lab registry.
- A Mechanics application containing four experiments.
- Shared brand tokens and four themes.
- Shared React and Astro interface components.
- Shared simulation utilities.
- A lab-scaffolding command.
- Registry consistency checks.
- Independent Cloudflare Worker deployments.
- CI checks and change-aware deployment.

### Verification status

This record is based on the supplied README.

The current repository, deployed applications, workflow execution and
scientific behaviour have not been independently verified for this record.

Lifecycle status, registry publication status and successful deployment
are separate concepts. Do not treat one as evidence of the others.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Labs hub | <https://labs.rjmlaird.co.uk> | Discovery and navigation |
| Repository | <https://github.com/rjmlaird/rjmlaird-labs> | Applications, shared packages and tooling |
| Main website | <https://rjmlaird.co.uk> | Wider professional identity and build overviews |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and maintainer guidance |

Individual labs use the documented destination pattern:

```text
https://<slug>.labs.rjmlaird.co.uk
```

Confirm actual publication status and configuration before advertising
an individual destination.

## Relationship to the wider ecosystem

### Labs

Labs hosts exploratory demonstrations, experiments and simulations.

Its purpose is to make ideas easier to investigate through interaction.

An experiment should explain what it represents, how to use it and
where its assumptions limit interpretation.

### Apps and Tools

Labs is distinct from the wider Apps and Tools destinations.

- Labs focuses on exploration and experimentation.
- Apps supports more complete user-facing workflows.
- Tools provides focused utilities.

Classification should reflect the intended use rather than the number
of controls or the framework used.

### Main-site Builds

The main website’s Builds section can provide overview pages for selected
labs.

Those pages should explain purpose, audience, status and limitations,
then link to the working application.

Keep the overview and registry aligned without duplicating technical
documentation.

### Brand system

Labs shares the main website’s brand foundations.

Subject-specific themes are permitted, but should remain recognisably
part of the same system through typography, shape, focus treatment and
layout conventions.

## Repository structure

```text
packages/
├── tokens/
├── ui/
├── sim-core/
└── registry/

apps/
├── hub/
└── mechanics/

templates/
└── lab/

scripts/
├── new-lab.mjs
└── check-registry.mjs

legacy/
```

### Shared packages

| Package | Responsibility |
| --- | --- |
| `tokens` | Brand palette, semantic tokens, themes, base styles and fonts |
| `ui` | Shared React components, Astro layouts, navigation, cards and stylesheet |
| `sim-core` | Simulation loop, canvas helpers, colour resolution, keyboard helpers and mathematical utilities |
| `registry` | Authoritative lab manifest |

### Applications

| Application | Responsibility |
| --- | --- |
| `apps/hub` | Registry-generated public Labs hub |
| `apps/mechanics` | Mechanics experiments |

### Supporting directories

| Directory | Responsibility |
| --- | --- |
| `templates/lab` | Source copied by the lab-scaffolding command |
| `scripts` | Scaffolding and registry validation |
| `legacy` | Material not yet migrated |

The README states that legacy material is not built or deployed.

Review `MIGRATION.md` before moving an experiment into the active workspace.

## Current documented experiments

The supplied README lists these experiments within Mechanics:

- Ramp.
- Newton’s Cradle.
- Projectile.
- Stopping Distances.

This is a source-level inventory from the README, not a live deployment
or scientific validation report.

Check the registry and application source for the current catalogue.

## Registry and publication model

### Source of truth

Every lab is registered in:

```text
packages/registry/src/labs.ts
```

The README states that the registry drives:

- Theme.
- Navigation.
- Hub entry.
- Subdomain.

Do not maintain separate editable copies of the same lab metadata in
individual applications or the hub.

### Status values

| Status | Meaning |
| --- | --- |
| `live` | Linked from the hub |
| `wip` | Has an application but is not published |
| `legacy` | Does not yet have an active application |

These registry values are distinct from the documentation project
record's `status: active`.

### Consistency check

Run:

```bash
pnpm check:registry
```

The README states that this fails when registry status and `apps/`
disagree.

Do not change a status merely to silence the check. Resolve whether
the application or registry entry is incomplete.

### Visibility and access

A publication status is not an authentication mechanism.

For work-in-progress labs, review whether deployment configuration,
workflow selection or alternate destinations could expose an application
that is not linked from the hub.

Do not place secrets or private material in a `wip` app on the assumption
that it cannot be reached.

## Architecture

### Hub flow

```text
Shared lab registry
          ↓
Hub generation
          ↓
Lab cards, navigation and destinations
          ↓
Published lab applications
```

### Application layers

The repository separates:

- Pure simulation logic.
- Interactive state and rendering.
- Shared simulation utilities.
- Shared interface components.
- Design tokens.
- Application deployment configuration.

Preserve these boundaries when adding experiments.

### Simulation logic

Physics belongs in:

```text
src/lib/<experiment>/
```

within the relevant application.

The README requires this logic to be pure TypeScript:

```text
State in → updated state out
```

It should not depend on React or the DOM.

This is the layer intended for unit testing.

### Shared simulation utilities

The README identifies:

- `useSimulation` for a fixed-step loop.
- `useCanvas2D`.
- `resolveColor`.
- Keyboard helpers.
- `vec2`.
- Mathematical utilities.

Check their current interfaces before adopting them.

The presence of a fixed-step loop does not establish that a particular
simulation is numerically stable or scientifically validated.

### Shared-code rule

The repository rule is:

- If two labs need functionality, move it to a shared package.
- If only one lab needs it, keep it in the application.

Apply the rule to genuine shared behaviour rather than extracting code
solely because it looks similar.

## Design system

### Token sources

The README identifies:

```text
packages/tokens/src/brand.css
```

as a mirror of the main website’s palette.

The package also provides:

- Semantic tokens.
- Four themes.
- Base styles.
- Fonts.

### Themes

The documented themes are:

- Navy.
- Forest.
- Paper.
- Slate.

Navy is the default brand theme.

The alternative themes support subject-specific presentation while
sharing typography, radius, focus-ring and layout conventions.

### Updating the brand palette

The README's workflow is:

1. Change the authoritative palette in the main website.
2. Copy the updated palette into Labs.
3. Review token compatibility.
4. Check representative applications and themes.

Do not make undocumented palette changes in the mirror and assume they
will propagate back to the main site.

### Colour rules

Use tokens rather than hard-coded hexadecimal colours in lab CSS or
components.

SVG attributes can reference CSS variables:

```text
var(--accent)
```

Canvas drawing requires a resolved colour value.

The README specifies:

```ts
resolveColor("var(--accent)")
```

from:

```text
@labs/sim-core
```

Check theme changes in canvas output as well as DOM and SVG elements.

### Shared layouts

The UI package includes:

- `BaseLayout`.
- `LabLayout`.
- `LabNav`.
- `LabCard`.
- React components.
- A shared stylesheet.

The repository requires one `<main>` element per page.

`BaseLayout` owns that landmark. Pages should render their headers,
sections and other content inside it rather than adding another `<main>`.

### Wider UI integration

This README describes local workspace packages.

It does not establish that `packages/ui` is the separate `rjmlaird-ui`
package or that a wider package integration has been completed.

Review ownership and compatibility before connecting those systems.

## Getting started

### Requirements

The README specifies:

- Node.js 20 or later.
- pnpm 9.

The repository pins the package-manager version for Corepack.

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-labs.git](https://github.com/rjmlaird/rjmlaird-labs.git)
cd rjmlaird-labs
```

### Enable the package manager

```bash
corepack enable
```

Verify the repository's pinned version rather than using another
project's pnpm requirement.

### Install

```bash
pnpm install
```

### Run the hub

```bash
pnpm dev
```

The README identifies this as the hub development command.

Use the destination printed by the development server.

### Run Mechanics

```bash
pnpm --filter @labs/mechanics dev
```

Check the package manifest for other application-specific commands.

### Validate and build

```bash
pnpm check:registry
pnpm typecheck
pnpm build
```

Inspect package scripts for the available unit-test commands.

The supplied README does not identify a single root test command.

## Adding a lab

### Scaffold

The README provides:

```bash
pnpm new:lab magnetism "Magnetic Fields" slate magnetism
```

Review `scripts/new-lab.mjs` for the exact positional argument meanings
before adapting the command.

Do not assume the final argument has a particular role without checking
the script.

### Review generated output

Check:

- Application directory.
- Package name.
- Registry entry.
- Theme.
- Navigation.
- Public destination.
- Wrangler configuration.
- Initial publication status.
- Starter content.

Generated files are a starting point, not evidence that a lab is ready
for public use.

### Implement the experiment

1. Define the intended learning or exploration task.
2. Document assumptions.
3. Implement pure simulation logic.
4. Add tests for reference cases and boundaries.
5. Build the interaction using shared components and utilities.
6. Review mobile, keyboard and touch behaviour.
7. Check theme compatibility.
8. Run registry, type and build checks.

### Publish deliberately

Before marking a lab `live`:

- Confirm its intended workflow works.
- Review scientific claims.
- Explain limitations.
- Test accessibility.
- Confirm its deployment destination.
- Check the hub entry and launch link.
- Establish maintenance ownership.

## Migrating legacy labs

The README identifies:

```text
legacy/
MIGRATION.md
```

as the legacy material and migration guidance.

Before migration:

- Identify the original behaviour.
- Preserve useful source material.
- Review existing public destinations.
- Separate model logic from rendering where practical.
- Adopt shared tokens and layouts.
- Check licensing and attribution.
- Validate behaviour after changes.

Do not assume a migrated visualisation is equivalent merely because
it looks similar.

Update the registry when the application and publication state justify it.

## Scientific and educational integrity

### Explain the model

Each experiment should distinguish between:

- A conceptual demonstration.
- An approximation.
- A numerical simulation.
- A calculation.
- Measured data.

Do not present an illustrative animation as a precise prediction without
appropriate validation.

### Units and assumptions

Keep quantities and units consistent across:

- Inputs.
- Controls.
- Charts.
- Canvas labels.
- Readouts.
- Explanatory text.

Make significant simplifications visible to the user.

### Test cases

For applicable simulations, consider:

- Known reference cases.
- Boundary conditions.
- Invalid inputs.
- Conservation relationships.
- Numerical stability.
- Reset behaviour.
- Extreme control values.

Keep tests close to the pure model logic.

## Configuration

### Application configuration

Each application has:

```text
apps/<slug>/wrangler.jsonc
```

Review:

- Worker name.
- Static assets configuration.
- Custom-domain route.
- Runtime compatibility settings.
- Bindings, if any.
- Environment-specific values.

Do not assume every lab needs the same external services.

### Shared registry

Keep application identity and publication metadata in the registry.

Avoid hand-maintained URLs in multiple components when they can be
derived from the existing model.

### Secrets

The deployment workflow requires:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Store them in the appropriate CI secret configuration.

The README does not establish per-application runtime secrets.

If a lab adds an external integration, document its requirements
separately and keep private credentials out of browser-delivered code.

## Deployment

### Hosting model

The README describes each app as a Cloudflare Worker with static assets.

Individual labs use custom-domain routes:

```text
<slug>.labs.rjmlaird.co.uk
```

The hub uses:

```text
labs.rjmlaird.co.uk
```

### DNS

The README states that the custom-domain route creates its DNS record
on first deployment, so a manual CNAME is not part of the documented
initial workflow.

Inspect existing DNS and route ownership before changing a hostname.
Do not remove an existing record without understanding its current use.

### Workflow

The deployment workflow is:

```text
.github/workflows/deploy.yml
```

The README describes:

| Trigger | Behaviour |
| --- | --- |
| Pull request | Registry check, type check and build |
| Push to `main` | Same checks, then deploy changed applications |
| Manual run | Deploy Mechanics or all applications |

Changes to shared packages, the lockfile or the workflow trigger
deployment of all applications according to the README.

Verify the workflow's actual path filters and application selection
before relying on change detection.

### Adding applications to deployment

The manual workflow currently described names Mechanics or all apps.

When adding another lab, review whether workflow inputs, app discovery
or deployment selection also need updating.

Do not assume scaffolding alone updates every deployment path.

### Pre-release checklist

- Run registry checks.
- Run type checks.
- Build affected applications.
- Run applicable model tests.
- Review scientific explanations.
- Check all supported themes.
- Test keyboard, pointer and touch behaviour.
- Review reduced-motion behaviour.
- Confirm registry status.
- Review deployment targets.
- Identify recovery options.

### Post-release verification

After deployment:

1. Open the affected application directly.
2. Check assets, fonts and styles.
3. Exercise a representative experiment.
4. Check numerical and visual output.
5. Test reset and pause behaviour where available.
6. Check mobile presentation.
7. Verify the hub entry and navigation.
8. Confirm unpublished entries are handled as intended.

A successful hub deployment does not prove that every lab is functioning.

### Rollback

Document recovery for:

- The hub.
- Individual labs.
- Shared packages.
- Registry changes.
- Domain configuration.

A shared-package regression may affect multiple applications.

Restoring only the hub does not restore the lab implementations, and
restoring a lab does not automatically correct its registry metadata.

## Operations

### Routine maintenance

Review:

- Application availability.
- Registry consistency.
- Scientific accuracy.
- Dependency support.
- Shared-token compatibility.
- Canvas rendering.
- Navigation.
- Deployment outcomes.
- Legacy migration progress.

### Monitoring

No dedicated monitoring or alerting provider is established by the
supplied README.

Distinguish checks of:

- Hub availability.
- Application availability.
- Asset loading.
- Interactive behaviour.
- Model correctness.

A page loading successfully is not a scientific validation check.

### Backups and recoverability

Preserve:

- Application source.
- Pure model code and tests.
- Registry.
- Shared packages.
- Fonts and assets.
- Dependency lockfile.
- Workflow and deployment configuration.
- Legacy source needed for migration.

If an application later stores user data, document its storage and
backup requirements separately.

### Incident response

For broken or misleading behaviour:

1. Identify affected applications.
2. Determine whether the issue is scientific, visual, interactive or operational.
3. Restrict publication where continued use would be misleading.
4. Restore or correct the relevant application.
5. Verify model and interface behaviour.
6. Update registry information if needed.
7. Record the cause and preventive action.

Do not leave an experiment advertised as available merely because its
HTML still loads.

## Accessibility

Interactive simulations require more than accessible page navigation.

Review:

- Explicit control labels.
- Keyboard alternatives.
- Visible focus.
- Accessible values and units.
- Pause and reset controls.
- Text explanations of visual output.
- Colour-independent meaning.
- Reduced-motion preferences.
- Touch interaction.
- Responsive layouts.
- Focus order.
- Screen-reader access to essential results.

Preserve the single-main-landmark convention provided by `BaseLayout`.

Where an interaction remains inaccessible, document the limitation and
provide an appropriate alternative where practical.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### Registry validation fails

Compare the registry entry with `apps/`.

Check:

- Slug.
- Application existence.
- Publication status.
- Expected metadata.

Do not change `legacy` to `wip` unless the corresponding application
actually exists.

### A lab is absent from the hub

Check its registry status.

The README states that `live` entries are linked from the hub.

Also check the deployed hub revision and active filters.

### A new application is not deployed

Check:

- Workspace registration.
- Package scripts.
- Wrangler configuration.
- Workflow change detection.
- Manual workflow inputs.
- Registry state.

### Canvas colours do not match the theme

Check whether canvas code receives a resolved colour.

Use the shared `resolveColor` utility rather than passing an unresolved
CSS variable string directly to drawing code.

Verify behaviour after a theme change as well as initial rendering.

### A page contains two main landmarks

Check whether a page or nested layout adds `<main>` inside `BaseLayout`.

Keep page content as sections and headers within the layout's existing
landmark.

### Physics tests require React or the DOM

Review the model boundary.

Move framework-independent state transitions into the experiment's
`src/lib/` code and keep rendering concerns in the interface layer.

### A shared change breaks several labs

Check:

- Token names.
- Shared component interfaces.
- Simulation utility behaviour.
- Lockfile changes.
- Consumer builds.

Review every affected application rather than patching only the first
visible failure.

### Production assets fail

Check:

- Static asset configuration.
- Build output.
- Application base paths.
- Filename case.
- Deployed revision.
- Custom-domain routing.

### A legacy lab is unavailable

Confirm whether it remains in `legacy/`.

The README explicitly excludes that directory from build and deployment.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Current repository structure.
- [ ] Node.js and pinned pnpm requirements.
- [ ] Registry schema and status behaviour.
- [ ] Current application inventory.
- [ ] Hub generation.
- [ ] Scaffolding arguments and output.
- [ ] Legacy migration process.
- [ ] Shared token and theme behaviour.
- [ ] Brand palette update process.
- [ ] React and Astro component interfaces.
- [ ] Single-main-landmark convention.
- [ ] Pure simulation boundaries.
- [ ] Model test coverage.
- [ ] Canvas colour resolution.
- [ ] Accessibility checks.
- [ ] Per-app Worker configuration.
- [ ] Custom-domain setup.
- [ ] CI change detection.
- [ ] Manual deployment options.
- [ ] Work-in-progress publication handling.
- [ ] Production verification.
- [ ] Recovery procedures.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

For future entries, record:

- The date.
- The affected application or shared package.
- The relevant commit or deployment.
- Experiment or model changes.
- Theme and component changes.
- Registry and publication changes.
- Legacy migrations.
- Compatibility or recovery implications.

Keep model revisions, application releases and hub updates distinguishable.
