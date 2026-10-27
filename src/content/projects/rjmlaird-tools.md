---
title: "Tools"
slug: "rjmlaird-tools"
description: "Stable, bookmarkable calculators, converters and focused utilities, independently deployed beneath tools.rjmlaird.co.uk."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "contributor"]
tags: ["tools", "calculators", "converters", "utilities", "earth-observation", "monorepo"]
repository: "https://github.com/rjmlaird/rjmlaird-tools"
liveUrl: "https://tools.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Cloudflare Workers"
  - "Hono"
  - "Vite"
  - "pnpm Workspaces"
reviewStatus: "needs-review"
---

## Overview

Tools is the production workspace for focused calculators, converters
and small data and Earth-observation utilities.

Each tool has a stable, bookmarkable destination beneath:

```text
[https://tools.rjmlaird.co.uk/](https://tools.rjmlaird.co.uk/)<tool>
```

Applications are independently deployable, while sharing a catalogue,
brand layer, configuration and reusable utilities.

The intended experience is simple: find a tool, complete a focused task
and return to the same destination when needed.

### Intended users

- Visitors using calculators and practical utilities.
- Developers implementing or extending tools.
- Contributors adding new applications.
- Maintainers managing shared packages, routing and deployment.

### Scope

The supplied README establishes:

- One deployable application per tool.
- Hono Workers for server-rendered or request-handling applications.
- Vite applications deployed as assets-only Workers.
- An index Worker serving the catalogue and favicon.
- Shared branding.
- Shared mathematics and units utilities.
- Shared development configuration.
- Tests enforcing the routing contract.

### Verification status

This record is based on the supplied README.

The current source, production destinations, test results and deployed
bindings have not been independently verified for this record.

The repository describes these as production tools. That positioning
does not substitute for verifying individual tool behaviour and
availability.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Catalogue | <https://tools.rjmlaird.co.uk> | Discover and open tools |
| Repository | <https://github.com/rjmlaird/rjmlaird-tools> | Applications, shared packages and configuration |
| Main website | <https://rjmlaird.co.uk> | Professional context and build overviews |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and maintainer guidance |

Individual tools use paths on the shared hostname, not separate
tool-specific subdomains.

## Relationship to the wider ecosystem

### Tools

Tools provides focused utilities intended for repeated, practical use.

A tool should make its inputs, outputs, assumptions and limitations
understandable without requiring a reader to inspect the source.

### Labs

Labs is the separate workspace for exploratory demonstrations,
experiments and simulations.

Tools and Labs have different documented deployment conventions:

- Tools uses paths beneath `tools.rjmlaird.co.uk`.
- Labs uses individual application subdomains.

Do not copy a Labs custom-domain configuration into a Tools application.

### Apps

Apps is the separate destination for broader user-facing workflows.

A tool does not need to move into Apps merely because it has several
controls or uses a particular framework.

Classify it according to its purpose and intended experience.

### Main-site Builds

The main website’s Builds section can introduce selected tools and link
to their working destinations.

Keep overview pages focused on purpose, audience, features and limitations.
Detailed implementation instructions belong here or in the repository.

### Canonical destinations

If a utility also appears in another catalogue or repository, establish
its canonical public destination.

For example, Dopamine Menu has appeared in earlier Labs planning as well
as this Tools inventory. Confirm current ownership and links rather than
maintaining conflicting publication records.

## Repository structure

```text
apps/
├── index/
├── orbital-calc/
├── unit-converter/
├── julian-date/
├── physical-limits/
├── hohmann-transfer/
├── dopamine-menu/
└── carbon-reduction-plan/

packages/
├── ui/
├── utils/
└── config/
```

### Shared packages

| Package | Responsibility |
| --- | --- |
| `packages/ui` | Brand stylesheet, Layout, brand bar and footer |
| `packages/utils` | Shared mathematics and units |
| `packages/config` | Shared TypeScript, ESLint and Prettier configuration |

Keep tool-specific behaviour in its application unless there is a
clear reason to share it.

## Documented tool inventory

### Hono Workers

The README identifies:

- `orbital-calc`
- `unit-converter`
- `julian-date`
- `physical-limits`
- `hohmann-transfer`

### Vite applications

The README identifies these as assets-only Workers:

- `dopamine-menu`
- `carbon-reduction-plan`

### Catalogue

The `index` application serves:

```text
[https://tools.rjmlaird.co.uk/](https://tools.rjmlaird.co.uk/)
```

It also serves the shared:

```text
/favicon.svg
```

### Inventory ownership

Catalogue entries are maintained in:

```text
apps/index/src/tools.ts
```

Review this file when adding, renaming or retiring a tool.

Do not assume that creating an application directory automatically adds
it to the public catalogue.

## Architecture

### Request routing

```text
tools.rjmlaird.co.uk
          ↓
Cloudflare route selection
          ├── /<tool> and /<tool>/* → Tool Worker
          └── Remaining paths      → Index Worker
```

The index owns the broad hostname route. More specific tool routes
select the individual application.

### Independent deployment

Each tool is a separate deployable application.

Shared packages reduce duplication, but a catalogue update and a tool
implementation update remain distinct changes.

A working catalogue does not prove that every tool route is working.

### Application types

| Type | Implementation pattern |
| --- | --- |
| Hono | Worker routes mounted beneath the tool path |
| Vite | Static output arranged beneath the tool path and served as Worker assets |

Preserve the routing contract for both patterns.

## Routing contract

The README identifies:

```text
apps/index/src/apps.test.ts
```

as enforcing the routing rules.

### Tool routes

Every tool configuration must declare both:

```text
tools.rjmlaird.co.uk/<id>
tools.rjmlaird.co.uk/<id>/*
```

Do not use:

```text
tools.rjmlaird.co.uk/<id>*
```

The broader pattern could match unintended paths.

### Worker identity

Worker names follow:

```text
rjmlaird-tools-<id>
```

Each tool sets:

```text
workers_dev = false
```

The README explicitly excludes per-tool custom-domain routes.

### Hono applications

Use the documented pattern:

```ts
new Hono({ strict: false }).basePath("/<id>");
```

Replace `<id>` with the actual tool identifier.

Page JavaScript calls tool endpoints using absolute paths beneath that
prefix:

```text
/<id>/...
```

Do not send requests to an unprefixed route at the hostname root.

### Vite applications

The README requires:

```text
base: "/<id>/"
build.outDir: "dist/<id>"
assets.directory: "./dist"
```

This preserves the tool path within the static output.

Review the actual configuration syntax before editing it.

### Index route

The index Worker owns:

```text
tools.rjmlaird.co.uk/*
```

Do not remove or narrow it without reviewing catalogue, fallback and
favicon behaviour.

### DNS

The README requires `tools.rjmlaird.co.uk` to be a proxied DNS record
in the `rjmlaird.co.uk` zone.

The DNS target is not specified in the supplied material.

Inspect the existing record and deployment configuration rather than
inventing a target or copying a custom-domain setup from another project.

## Branding

### Existing workspace layer

The README identifies:

```text
@rjmlaird/ui
```

as the shared brand layer.

Its authoritative stylesheet within this workspace is:

```text
packages/ui/src/brand.css
```

### Hono applications

Hono applications use the shared Layout with title and introductory text.

Review its actual props and rendering interface before changing it.

### Vite applications

Vite applications import:

```ts
import "@rjmlaird/ui/brand.css";
```

The README directs contributors to use the brand-bar markup in:

```text
apps/carbon-reduction-plan/index.html
```

as the existing reference.

Avoid maintaining divergent copies without an explicit update process.

### Generate brand output

After editing the source stylesheet:

```bash
pnpm gen
```

The README states that a test fails if generated brand output is stale.

Do not edit generated CSS as the authoritative source.

### Wider brand integration

The workspace’s `@rjmlaird/ui` package must not be assumed to be identical
to the separately planned `rjmlaird-ui` package.

Likewise, this README names the local brand stylesheet as the source of
truth, while other ecosystem projects describe copied main-site palettes.

Before connecting the systems, agree:

- Authoritative token ownership.
- Package identifiers.
- Export contracts.
- Generated outputs.
- Consumer migration.
- Version compatibility.

Do not replace a working local package with an unverified dependency.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-tools.git](https://github.com/rjmlaird/rjmlaird-tools.git)
cd rjmlaird-tools
```

### Confirm prerequisites

Inspect the repository for:

- Supported Node.js version.
- Pinned pnpm version.
- Lockfile.
- Workspace configuration.
- Package scripts.
- Wrangler configuration.

The supplied README does not specify exact runtime or pnpm versions.

### Install

```bash
pnpm install
```

### Run development

```bash
pnpm dev
```

The README states that this runs every application on its own port.

Use the actual startup output if it differs from the documented allocation.

### Build

```bash
pnpm build
```

The README describes this as regenerating brand CSS, then building or
dry-run bundling every application.

It is not a production deployment command.

### Run checks

```bash
pnpm typecheck
pnpm lint
pnpm test
```

Run the checks after changes to application configuration as well as
application code.

## Local ports

| Application | Development port | Inspector port |
| --- | --- | --- |
| `orbital-calc` | 8787 | 9229 |
| `unit-converter` | 8788 | 9230 |
| `index` | 8789 | 9231 |
| `julian-date` | 8790 | 9232 |
| `physical-limits` | 8791 | 9233 |
| `hohmann-transfer` | 8792 | 9234 |
| `dopamine-menu` | 8793 | 9235 |
| `carbon-reduction-plan` | 8794 | 9236 |

Assign both a free application port and a free inspector port when
adding a tool.

Do not assume that opening the local index reproduces production
cross-Worker route selection. Verify how local catalogue links and
individual application ports are handled.

## Adding a tool

### Choose the application pattern

The README recommends copying:

```text
apps/orbital-calc
```

for a Hono application, or:

```text
apps/dopamine-menu
```

for a Vite application.

Copy into:

```text
apps/<id>
```

### Update identity and configuration

Review and change:

- Package name.
- Worker name.
- Application title.
- Hono base path or Vite base.
- Both tool routes.
- Page-script fetch destinations.
- Development port.
- Inspector port.
- Static asset output, where applicable.

Do not leave copied routes pointing at the original tool.

### Register the tool

Add the entry to:

```text
apps/index/src/tools.ts
```

Then run:

```bash
pnpm install
```

### Validate

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

Review route-contract test results.

### Review the user experience

Before publication:

- Explain inputs and units.
- Label outputs clearly.
- Validate invalid and extreme inputs.
- Provide useful errors.
- Document important assumptions.
- Check keyboard and touch interaction.
- Check mobile presentation.
- Confirm the catalogue destination.

## Calculation and data integrity

### Calculators

For applicable tools, document:

- Formula or method.
- Input units.
- Output units.
- Assumptions.
- Valid ranges.
- Numerical precision.
- Important limitations.

Do not present an approximate educational result as a validated
operational prediction.

### Shared utilities

Changes to `packages/utils` can affect multiple tools.

Review all consumers when changing:

- Unit conversions.
- Constants.
- Date handling.
- Mathematical helpers.
- Rounding.
- Input parsing.

A passing test for one calculator does not validate every consumer.

### Data utilities

Where a tool uses external datasets or services, document:

- Source.
- Licence.
- Freshness.
- Processing.
- Failure behaviour.
- Any privacy implications.

The supplied README does not establish particular external integrations.

## Configuration

### Per-tool configuration

Review the relevant application’s Worker configuration for:

- Worker name.
- Both routes.
- Disabled workers.dev access.
- Asset settings.
- Development ports.
- Bindings, if any.
- Environment-specific values.

### Secrets

No specific runtime secrets are identified by the supplied README.

Do not infer that every tool is secret-free.

If an integration requires credentials:

- Keep them in the intended secret mechanism.
- Do not expose them in browser code.
- Document names and purposes without values.
- Separate local and production configuration.

### Persistence

The README does not establish a common data-storage model.

For any tool saving information, document:

- What is stored.
- Where it is stored.
- Retention.
- Export and deletion.
- Recovery limitations.

Do not infer browser storage or server-side persistence from a tool name.

## Deployment

### Verification status

The README documents the production routing contract but does not provide
a root deployment command or CI workflow.

Inspect package scripts and repository workflows before deploying.

Do not treat `pnpm build` as publication.

### Pre-release checklist

- Run brand generation where needed.
- Build applications.
- Run type checks, lint and tests.
- Verify the routing contract.
- Review shared-package impact.
- Confirm the intended Worker.
- Check DNS proxying.
- Test calculations and error states.
- Review accessibility.
- Identify recovery options.

### Post-release verification

After deploying an affected tool:

1. Open its exact base path.
2. Test the trailing-slash form.
3. Exercise representative functionality.
4. Check page-script requests.
5. Check static assets.
6. Confirm the shared favicon.
7. Check the catalogue link.
8. Verify that unrelated tool prefixes still work.

Test nested paths where the application uses them.

### Shared changes

A shared UI or utility update may require rebuilding and redeploying
multiple applications.

Identify affected consumers explicitly. Do not assume that deploying the
index updates their code.

### Rollback

Document recovery separately for:

- Index Worker.
- Individual tool Workers.
- Shared-package releases.
- Routing configuration.
- DNS.

Restoring an application version does not automatically restore an
incorrect route or regenerate another application's assets.

## Operations

### Routine maintenance

Review:

- Catalogue accuracy.
- Tool availability.
- Route matching.
- Calculation correctness.
- Shared utility compatibility.
- Brand output.
- Dependency support.
- External integrations.
- Accessibility.

### Stable destinations

Treat bookmarkable tool URLs as a product commitment.

Before renaming an identifier:

1. Identify incoming links.
2. Review catalogue entries.
3. Review Worker names and routes.
4. Review internal fetch paths.
5. Plan compatibility or redirects.
6. Test deployed behaviour.

Do not assume a package rename automatically updates the public route.

### Monitoring

No monitoring provider is specified in the supplied README.

Distinguish:

- Catalogue availability.
- Individual tool availability.
- Request-handling errors.
- Static asset loading.
- Functional correctness.

Avoid using expensive or state-changing operations as routine checks.

### Recovery and backups

Preserve:

- Source code.
- Shared utilities.
- Brand sources and generation tooling.
- Catalogue metadata.
- Lockfile.
- Worker configuration.
- Deployment settings.
- Any externally maintained data.

Where tools persist user information, document recovery separately.

## Accessibility

Review:

- Explicit labels.
- Units associated with inputs and outputs.
- Keyboard-operable controls.
- Visible focus.
- Useful validation messages.
- Accessible result updates.
- Colour-independent meaning.
- Responsive layouts.
- Zoom behaviour.
- Touch targets.
- Clear navigation back to the catalogue.

Brand consistency does not, by itself, establish accessible interaction.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A tool opens the catalogue instead

Check:

- Both specific routes exist.
- The identifier matches.
- The intended Worker is deployed.
- The route is in the correct zone.
- DNS is proxied.

Review route matching before changing application code.

### A tool intercepts another path

Check for an invalid route such as:

```text
/<id>*
```

Use the documented exact base route and slash-prefixed wildcard route.

### Hono endpoints return 404

Check:

- `basePath`.
- `strict: false`.
- Registered handlers.
- Page-script fetch URLs.
- Public route configuration.

A request sent to the hostname root may reach the index rather than
the tool.

### Vite assets fail

Check:

- `base: "/<id>/"`.
- Output under `dist/<id>`.
- Asset directory pointing at `./dist`.
- Built file paths.
- Deployed Worker.

### The favicon is missing

Check the index Worker's `/favicon.svg` handling and broad route.

Do not add unrelated duplicate favicon handlers merely to hide a
routing problem.

### Brand tests report stale output

Edit the authoritative source, then run:

```bash
pnpm gen
```

Review generated changes and rerun tests.

### Local development reports a port conflict

Check both application and inspector ports.

Update the affected tool configuration and documentation consistently.

### A shared utility change alters several results

Review every consumer of the changed function.

Check units, constants, rounding and reference cases rather than applying
display-only patches to individual pages.

### A copied tool still calls the original endpoints

Search its source and configuration for the original identifier.

Update routes, base paths, fetch URLs and catalogue metadata together.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Runtime and pnpm requirements.
- [ ] Current application inventory.
- [ ] Catalogue metadata.
- [ ] Hono application configuration.
- [ ] Vite asset layout.
- [ ] Exact and wildcard routes.
- [ ] Disabled workers.dev access.
- [ ] Index route and favicon.
- [ ] Proxied DNS record.
- [ ] Route-contract tests.
- [ ] Brand source and generated output.
- [ ] Relationship to wider brand and UI packages.
- [ ] Shared utility tests.
- [ ] Per-tool assumptions and limitations.
- [ ] Development and inspector ports.
- [ ] Actual deployment commands or workflows.
- [ ] Public path verification.
- [ ] Storage and privacy behaviour where applicable.
- [ ] Accessibility.
- [ ] Rollback and recovery.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

For future entries, record:

- The date.
- The affected tool or shared package.
- The relevant commit or deployment.
- Calculation or conversion changes.
- Route and identifier changes.
- Catalogue changes.
- Brand-generation changes.
- Compatibility and recovery implications.

Keep catalogue updates, application releases and shared-package changes
distinguishable.
