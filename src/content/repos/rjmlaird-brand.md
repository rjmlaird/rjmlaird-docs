---
title: "Brand"
slug: "rjmlaird-brand"
description: "Brand guidelines, identity assets and design foundations for the RJM Laird ecosystem, with planned integration into the rjmlaird-ui package."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "designer"]
tags: ["brand", "design-system", "assets", "ui"]
repository: "https://github.com/rjmlaird/rjmlaird-brand"
liveUrl: "https://brand.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["TypeScript"]
reviewStatus: "needs-review"
---

## Overview

Brand is the project record for the RJM Laird brand system, published
through `brand.rjmlaird.co.uk` and maintained in the `rjmlaird-brand`
repository.

Its intended purpose is to make the visual identity, approved assets
and design foundations clear and reusable across websites, applications
and communications.

The project is planned to integrate with `rjmlaird-ui`, connecting
documented brand decisions with reusable interface implementations.

That integration is not recorded here as complete.

### Intended users

- Designers applying the visual identity.
- Developers building websites and applications.
- Maintainers managing assets, guidelines and shared design foundations.
- Contributors preparing public-facing material.
- The owner approving brand decisions and changes.

### Scope

The intended scope includes:

- Brand identity and usage guidance.
- Logos and identity variants.
- Colour and typography.
- Spacing and other shared design foundations.
- Asset discovery and provenance.
- Accessibility considerations.
- Site-specific presentation profiles, where required.
- A documented relationship with `rjmlaird-ui`.

This scope describes the intended system. The implemented inventory
requires repository verification.

### Documentation status

This record requires maintainer review.

The repository, hostname and stack are supplied project metadata.
The following have not been verified for this record:

- Framework and build tooling.
- Repository structure.
- Current asset inventory.
- Token formats.
- Package exports.
- Hosting and deployment configuration.
- Automated validation.
- Existing consumers.
- The implementation status of `rjmlaird-ui`.

Do not treat proposed architecture or integration steps as deployed
capabilities.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Brand destination | <https://brand.rjmlaird.co.uk> | Brand guidance and asset discovery |
| Repository | <https://github.com/rjmlaird/rjmlaird-brand> | Source, assets and development history |
| Main website | <https://rjmlaird.co.uk> | Public professional website |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and operational project documentation |
| UI package | `rjmlaird-ui` | Planned integration with reusable interface components |

The UI package name is recorded without assuming a package registry,
installation identifier, repository URL or release channel.

The production destination does not establish that every planned
guideline or asset is already published.

## Relationship to the wider ecosystem

### Brand website

The brand website should help people understand and apply the identity.

It should answer questions such as:

- Which logo should I use?
- Which colours and type styles are approved?
- What are the rules for backgrounds, spacing and contrast?
- Where can I obtain the correct asset?
- Which variations are appropriate for different sites?
- How do these decisions relate to shared interface components?

It should not require visitors to inspect application source code to
find basic usage guidance.

### Main website

The main website applies the brand to professional content, services,
work and public-facing builds.

Brand guidance should support consistency without forcing every content
type into an identical layout.

Keep public copy and factual content owned by their respective content
systems rather than embedding them in the brand implementation.

### Applications and tools

Applications and tools may require specialist interfaces.

Shared identity should provide recognisable foundations while allowing
appropriate differences in density, interaction and task-specific
presentation.

Document intentional variations rather than allowing them to become
unexplained styling drift.

### Showcase portfolio

The planned showcase portfolio may use a more expressive visual treatment.

It should remain recognisably connected to the wider identity without
requiring the main website or documentation to adopt the same effects.

Any showcase-specific profile should retain accessible typography,
navigation and interaction.

### Documentation website

The documentation website owns setup, integration, deployment and
maintenance procedures.

The brand website owns the public explanation and presentation of the
identity.

Link these surfaces rather than maintaining contradictory copies of
the same instructions.

## Planned integration with rjmlaird-ui

### Integration goal

The planned integration should connect brand foundations with reusable
interface components.

The intended separation is:

- Brand: identity decisions, guidance and approved assets.
- UI: reusable implementations of interface patterns.
- Consumer sites: page composition, content and application behaviour.

Confirm the actual package boundaries before implementing this split.

### Proposed ownership

| Concern | Proposed owner |
| --- | --- |
| Identity guidance | `rjmlaird-brand` |
| Approved logo and identity assets | `rjmlaird-brand`, or an explicitly designated asset source |
| Primitive design tokens | One agreed authoritative source |
| Theme and semantic token mappings | Agreed shared design-system layer |
| Reusable interface components | `rjmlaird-ui` |
| Component interaction and accessibility behaviour | `rjmlaird-ui` |
| Page-specific content and composition | Consuming website or application |
| Product-specific business logic | Consuming application |

This is a proposed responsibility model, not a description of confirmed
package exports.

### Choose one source of truth

Before connecting the projects, decide where shared tokens are maintained.

Possible arrangements include:

- Brand-owned tokens consumed by the UI package.
- A dedicated foundations package consumed by Brand and UI.
- UI-owned implementation tokens documented by the Brand site.

Select one arrangement deliberately.

Do not maintain separate editable copies of the same token set in
multiple repositories.

### Avoid circular dependencies

The integration should have a clear dependency direction.

For example, shared foundations may be consumed by both the brand
website and the UI package.

Avoid an arrangement where:

- Brand needs UI to generate its foundational tokens.
- UI needs Brand to generate those same tokens.
- Both projects must be released together merely to install dependencies.

The final dependency model requires a repository-level design decision.

### Integration stages

1. Audit existing brand assets, styles and tokens.
2. Audit the current or planned `rjmlaird-ui` package.
3. Identify duplicated foundations and conflicting values.
4. Agree ownership and package boundaries.
5. Define the supported integration contract.
6. Implement and validate the shared exports.
7. Adopt the integration in a representative consumer.
8. Review accessibility and visual behaviour.
9. Document migration and release procedures.
10. Expand adoption incrementally.

Do not migrate every site simultaneously before validating the first
consumer.

## Architecture

### Declared technology

The project metadata identifies TypeScript.

The framework, rendering mode, build process and hosting platform
require verification.

Do not infer an Astro, React or other implementation solely from the
technology choices of related projects.

### Architecture inventory

Inspect and document:

- Application entry points.
- Content and guideline sources.
- Asset directories.
- Asset metadata.
- Design-token sources.
- Generated outputs.
- Validation scripts.
- Package manifests and exports, if present.
- Build configuration.
- Deployment workflows.
- Consumer integrations.

Record actual repository paths after inspection.

### Intended flow

The following describes the proposed relationship between authored
foundations and their consumers:

```text
Approved brand decisions and assets
                 ↓
Authoritative foundations and metadata
                 ↓
Validated documentation and reusable exports
                 ↓
rjmlaird-ui integration and consumer sites
```

This is a planning model, not a verified build pipeline.

### Authored and generated files

Where outputs are generated, distinguish:

- Files maintained by contributors.
- Files produced by scripts.
- Files published for consumers.
- Files used only to render documentation.

Document regeneration commands before relying on generated output.

Do not edit generated files as the primary way to change the system.

## Brand foundations

### Identity assets

For each approved identity asset, document:

- Name and intended use.
- Variant.
- Supported backgrounds.
- File format.
- Source or editable original.
- Export process.
- Usage restrictions.
- Replacement or retirement status, where applicable.

Do not assume that an asset is approved simply because it exists in
the repository.

### Colour

Document the purpose of colours, not just their values.

Where the system supports them, distinguish:

- Primitive palette values.
- Semantic roles.
- Light and dark theme mappings.
- Interaction states.
- Status and feedback colours.
- Product-specific accents.

Do not imply that an approved brand colour is readable in every
foreground and background combination.

### Typography

Establish:

- Font families.
- Licensing and permitted distribution.
- Font files and loading strategy.
- Fallback stacks.
- Weight and style availability.
- Heading and body roles.
- Line-height guidance.
- Readable line lengths.
- Behaviour when the preferred font is unavailable.

Do not add or redistribute a font without checking its licence.

### Spacing and geometry

Where standardised, document:

- Spacing scale.
- Container widths.
- Layout gaps.
- Border widths.
- Corner radii.
- Elevation or shadow roles.
- Icon sizing.
- Responsive adaptations.

Keep layout-specific decisions separate from shared foundations.

### Motion

Where motion is part of the system, document:

- Its purpose.
- Duration and easing conventions.
- Appropriate use.
- Reduced-motion alternatives.
- Cases where motion should be avoided.

Motion should clarify interactions rather than become a requirement for
understanding content.

## Assets and metadata

### Asset discovery

The brand surface should make it clear which asset to choose and where
it can be used.

Useful metadata includes:

- Descriptive name.
- Asset category.
- Variant.
- Format.
- Intended background.
- Usage notes.
- Credit or licence.
- Download destination.
- Current or deprecated status.

The exact metadata schema requires verification.

### Stable destinations

If other sites reference published assets directly, treat those
destinations as integration points.

Before moving or renaming an asset:

1. Identify consumers.
2. Check whether the public destination must remain stable.
3. Provide compatibility handling where practical.
4. Update documentation and generated manifests.
5. Verify consumer rendering.

Do not assume that updating the brand website updates every external
reference.

### Third-party material

Keep third-party logos, fonts and illustrations distinguishable from
owned identity assets.

Preserve attribution and usage restrictions.

The presence of a third-party organisation logo must not imply an
affiliation, partnership or endorsement that has not been established.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-brand.git](https://github.com/rjmlaird/rjmlaird-brand.git)
cd rjmlaird-brand
```

### Inspect the repository

Before installing dependencies, review:

- Repository instructions.
- Package manifests.
- The committed lockfile.
- Runtime and package-manager declarations.
- Framework configuration.
- Asset and token sources.
- Generation scripts.
- Validation and test configuration.
- Deployment workflows.

Use the tooling declared by this repository.

### Confirm prerequisites

Establish:

- Supported runtime.
- Package manager and version.
- Required asset-processing tools.
- Required environment variables.
- Whether package builds are needed before local preview.
- Whether the UI integration uses published packages or local development.
- How production output is previewed.

Exact commands remain subject to maintainer review.

### Development workflow

Once setup is verified:

1. Identify the source of the guideline, asset or token.
2. Review related consumers.
3. Make the change in the authoritative source.
4. Run applicable generation and validation steps.
5. Preview the brand website.
6. Test representative consumer behaviour.
7. Review accessibility.
8. Update migration notes where required.

Keep visual changes and content changes distinguishable in review.

## Configuration

### Configuration inventory

Document settings controlling:

- Production URLs.
- Asset paths.
- Content sources.
- Token generation.
- Theme selection.
- Site profiles, where implemented.
- Package resolution.
- Build output.
- Deployment behaviour.

Do not assume that configuration from the main website belongs in
this project unchanged.

### UI package integration

Before documenting an install command, confirm:

- The actual package identifier.
- Registry or distribution mechanism.
- Supported version range.
- Exported entry points.
- CSS delivery.
- Asset handling.
- Required peer dependencies.
- Theme configuration.
- Framework compatibility.
- Server-rendering requirements, if relevant.

Do not invent imports, token names or component APIs before they exist.

### Secrets

A public brand surface may still use credentials for deployment or
package publication.

Keep credentials out of:

- Source control.
- Public configuration.
- Browser-delivered code.
- Generated documentation.
- Example commands.

Document variable names and purposes without publishing their values.

## Deployment

### Verification status

The configured production destination is:

<https://brand.rjmlaird.co.uk>

Hosting, deployment commands, build output and release triggers require
verification.

Website deployment and package publication should be documented as
separate activities where both exist.

### Pre-release checklist

Before publishing:

- Confirm the source revision.
- Run available checks and builds.
- Validate asset references.
- Review typography and theme behaviour.
- Check responsive layouts.
- Test keyboard navigation.
- Review contrast and focus.
- Check downloads and external destinations.
- Confirm that generated outputs match their sources.
- Review consumer impact.
- Identify a recovery route.

### Website verification

After deployment:

1. Confirm that the intended changes are visible.
2. Check representative guideline pages.
3. Verify fonts and identity assets.
4. Test downloads.
5. Check mobile and desktop presentation.
6. Confirm navigation and links.
7. Review deployment diagnostics.

### Package publication

If reusable packages or exports are published:

- Confirm the version.
- Inspect the distributable contents.
- Verify exports and required files.
- Check dependency declarations.
- Confirm licences and attribution.
- Test installation in an isolated consumer.
- Document breaking changes.
- Publish using the approved process.

Do not treat a successful website build as evidence that a package
can be installed correctly.

### Rollback

Document recovery separately for:

- The brand website.
- Published assets.
- Shared tokens.
- UI package adoption.

Reverting the website does not automatically undo a package upgrade
in consuming applications.

For package changes, consumers may need to restore a known-compatible
version and rebuild.

### Domain and DNS

Before changing `brand.rjmlaird.co.uk`:

- Identify the current hosting target.
- Record relevant DNS and routing configuration.
- Confirm certificate requirements.
- Review asset consumers and incoming links.
- Prepare a recovery plan.

## Operations

### Ownership

Ryan Laird owns brand approval and publication decisions.

Maintainers are responsible for preserving the relationship between
approved guidance, distributed assets and implemented foundations.

### Routine maintenance

Review:

- Asset availability.
- Broken links.
- Font loading.
- Licence and attribution records.
- Token consistency.
- Theme behaviour.
- UI integration compatibility.
- Dependency support.
- Consumer adoption.
- Deprecated assets and styles.

Distinguish intentional brand evolution from accidental implementation
drift.

### Change classification

Classify changes according to their impact.

Examples include:

- Editorial clarification.
- New asset or variant.
- Corrected asset export.
- New token.
- Changed token value.
- Renamed or removed export.
- New theme behaviour.
- Updated UI integration.

A small-looking token change can affect many components and sites.
Review its scope before release.

### Backups and recoverability

Identify everything needed to rebuild the system:

- Source code.
- Guideline content.
- Editable artwork.
- Font files and licence records.
- Asset metadata.
- Token sources.
- Generation tooling.
- Deployment configuration.
- Package-publication configuration.

Do not assume that exported images are a complete backup of editable
identity assets.

### Incident response

For broken assets, unreadable themes or incompatible shared styles:

1. Identify affected surfaces and consumers.
2. Determine whether the problem is in the source, generated output,
   package or consumer configuration.
3. Restore a compatible state.
4. Validate representative pages and components.
5. Communicate any required consumer action.
6. Record the cause and preventive changes.

If publication credentials are exposed, revoke or rotate them rather
than merely removing the visible value.

## Accessibility

Brand guidance should support accessible implementation.

Review:

- Text and interface contrast.
- Readable typography.
- Focus visibility.
- Colour-independent meaning.
- Zoom and responsive reflow.
- Reduced-motion behaviour.
- Logo legibility.
- Accessible asset previews.
- Download-link names.
- Meaningful text alternatives.

Distinguish a brand recommendation from a tested implementation.

A token, palette or component is not universally accessible without
considering its actual use.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A site uses the wrong colour or font

Check:

- The authoritative token source.
- The installed package version.
- Theme selection.
- Consumer overrides.
- Font loading.
- Cached assets.
- Legacy hard-coded values.

Do not patch every page independently before identifying the shared
cause.

### The brand site and UI components disagree

Check:

- Whether the integration is implemented.
- Which project owns the relevant value.
- Whether documentation and package versions match.
- Whether generated outputs are current.
- Whether a consumer has local overrides.

Resolve the source-of-truth issue rather than maintaining separate
corrections.

### A logo is missing or unreadable

Check:

- The asset destination.
- Filename case.
- Build output.
- Base-path handling.
- Background suitability.
- The selected variant.
- SVG fills and inherited colour behaviour, where applicable.

Do not use a visually inappropriate variant merely because it loads.

### A token update has no visible effect

Check:

- The token is exported.
- The consumer imports the expected stylesheet or package.
- The component uses that token.
- Another declaration overrides it.
- The consumer has rebuilt.
- The browser is serving the current assets.

### A UI package cannot be resolved

Check:

- The package identifier.
- Distribution location.
- Published version.
- Access permissions.
- Export configuration.
- Required build output.
- Dependency and peer-dependency requirements.

Do not document a guessed installation command as a fix.

### A theme becomes unreadable

Check foreground and background pairs across:

- Body text.
- Links.
- Buttons.
- Inputs.
- Disabled states.
- Focus states.
- Alerts.
- Code and tables.

Review semantic mappings and consumer overrides rather than replacing
the entire palette without diagnosis.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository structure and framework.
- [ ] Local setup and supported tools.
- [ ] Current guidelines and asset inventory.
- [ ] Font licensing and distribution.
- [ ] Token ownership and source format.
- [ ] Authored versus generated outputs.
- [ ] Public asset destinations.
- [ ] Site profiles, if implemented.
- [ ] Current status of `rjmlaird-ui`.
- [ ] Agreed integration boundary.
- [ ] Package identifier and distribution model.
- [ ] Export and compatibility contracts.
- [ ] Representative consumer testing.
- [ ] Accessibility checks.
- [ ] Deployment and publication workflows.
- [ ] Rollback and recovery procedures.
- [ ] Backup coverage.
- [ ] Deprecation and migration process.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No verified release history has been recorded in this project document.

For future entries, record:

- The date.
- The guideline, asset, token or integration affected.
- The reason for the change.
- The relevant commit or release.
- Any consumer impact.
- Any migration or compatibility action.

Keep website deployments, asset revisions and package releases distinct.

Record the `rjmlaird-ui` integration as complete only after its agreed
contract has been implemented and verified in a consumer.
