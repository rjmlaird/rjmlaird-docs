---
title: "Apps"
slug: "rjmlaird-apps"
description: "User-facing applications for practical tasks and ongoing workflows in the RJM Laird ecosystem."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["apps", "applications"]
repository: "https://github.com/rjmlaird/rjmlaird-apps"
liveUrl: "https://apps.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["TypeScript"]
reviewStatus: "needs-review"
---

## Overview

Apps is the project record for user-facing applications published through `apps.rjmlaird.co.uk` and maintained in the `rjmlaird-apps` repository.

Its intended role is to make applications easy to discover, understand and use, while providing maintainers with a clear account of their implementation, configuration and operation.

Unlike an individual calculator or an exploratory demonstration, an app may support a broader task or an ongoing workflow. This distinction describes the intended organisation of the ecosystem, not a guarantee that every application has the same maturity or capabilities.

### Intended users

- Visitors looking for a practical application.
- Developers implementing and maintaining applications.
- Maintainers managing configuration, releases and availability.
- The owner reviewing publication, scope and user-facing claims.

### Documentation status

This record requires maintainer review.

The hostname, repository, stack and project status are supplied project metadata. The implementation has not been verified for this record.

Do not treat the following as established until checked:

- The current application catalogue.
- Repository and package structure.
- Frameworks and integrations.
- Hosting provider.
- Deployment commands.
- Authentication.
- Persistent storage.
- External APIs.
- Monitoring.
- Backup and recovery arrangements.

Project-level status does not establish the maturity or availability of
every application.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Production destination | <https://apps.rjmlaird.co.uk> | Public application surface |
| Repository | <https://github.com/rjmlaird/rjmlaird-apps> | Source code and development history |
| Main website | <https://rjmlaird.co.uk> | Professional identity, work and build overviews |
| Documentation | <https://docs.rjmlaird.co.uk> | Maintainer and technical documentation |
| Labs | <https://labs.rjmlaird.co.uk> | Separate destination for experiments and prototypes |

Confirm whether the Apps hostname serves a catalogue, a single application,
multiple applications under different paths, or another arrangement.

Do not assume that individual apps use separate subdomains or share one
deployment.

## Relationship to the wider ecosystem

### Apps

Apps is intended for user-facing applications that support practical
tasks or continuing workflows.

Each application should explain:

- Its purpose.
- Its intended audience.
- Its current availability.
- How to begin.
- Any significant limitations.
- Whether it stores information.
- Where to find support or report a problem.

Do not imply that an application requires an account, stores data or
supports synchronisation unless those capabilities exist.

### Labs

Labs is the separate destination for exploratory demonstrations,
experiments and prototypes.

An experiment may develop into an application, but promotion from Labs
to Apps should be deliberate.

Before changing its classification, review:

- Whether its intended use is clear.
- Whether the main workflow is complete enough for that use.
- Whether limitations are explained.
- Whether accessibility and responsive behaviour have been checked.
- Whether operational ownership is established.
- Whether existing links need redirects or updates.

Moving an entry between catalogues does not itself make the underlying
software more reliable.

### Tools

Tools are focused utilities for particular tasks.

Keep the distinction useful rather than rigid. A utility does not need
to become an app merely because it has several controls, and an app
does not need a separate tool entry for every feature.

Use one clear primary destination for each product and link related
surfaces where appropriate.

### Main-site Builds

The main website’s Builds section provides public-facing overview pages
for labs, tools and apps.

For an application, the build overview should help visitors evaluate
what it does and whether it suits their needs.

The application itself should prioritise completing the task.

Keep names, descriptions, status and launch destinations consistent
between the main website and Apps.

### Work and portfolio

An application may also relate to a development project or case study.

Maintain the distinction between:

- Build overview: what the application does and where to use it.
- Application: the working user experience.
- Project or case study: context, responsibilities and outcomes.
- Documentation: implementation, usage and maintenance.
- Blog or Substack: commentary, reasoning and lessons.

Avoid copying complete content between these destinations.

## Architecture

### Declared technology

The project metadata identifies TypeScript.

The framework, runtime, build tooling and hosting model require
repository verification.

Do not infer the use of React, Astro, Vite, Hono or a particular hosting
platform from other projects in the ecosystem.

### Repository inventory

Inspect and document:

- Root manifests and lockfiles.
- Application entry points.
- Package or workspace configuration, if present.
- Shared components and styles.
- Routing.
- Data access.
- Validation.
- Tests.
- Build scripts.
- Deployment workflows.
- Platform configuration.

Do not assume that this repository is a monorepo or uses the same
package manager as `rjmlaird-labs`.

### Application inventory

Create an inventory from the implemented applications.

For each app, record:

| Field | Information to establish |
| --- | --- |
| Name | Public application name |
| Identifier | Stable internal identifier |
| Purpose | Main task or workflow |
| Status | Current availability and maturity |
| Source | Owning directory or package |
| Route | Actual public destination |
| Framework | Implemented framework and integrations |
| Data | Inputs, sources and persistence |
| Access | Public, account-based or restricted |
| Dependencies | External services and shared packages |
| Deployment | Build and hosting target |
| Ownership | Content and operational responsibility |

Only include applications that are actually represented in the repository
or deliberately documented as planned.

### Shared functionality

Confirm whether applications share:

- Navigation.
- Branding and typography.
- UI components.
- Authentication.
- Data access.
- Storage.
- Error handling.
- Analytics.
- Deployment configuration.

Document the actual boundaries. Do not create a shared dependency solely
to make the architecture appear uniform.

### Data flow

For each app, establish how information moves through the system:

```text
User input or external source
              ↓
Validation and application logic
              ↓
Output or workflow state
              ↓
Persistence or export, where implemented
```

This is a documentation framework, not a confirmed implementation.

Distinguish temporary interface state from information saved in the
browser or stored remotely.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-apps.git](https://github.com/rjmlaird/rjmlaird-apps.git)
cd rjmlaird-apps
```

### Inspect the repository

Before installing dependencies, review:

- The repository README.
- `package.json`, if present.
- The committed lockfile.
- Runtime and package-manager version declarations.
- Application or workspace configuration.
- Example environment files.
- Test configuration.
- Deployment workflows.

Use the tools and scripts declared by this repository.

### Confirm prerequisites

Establish:

- Supported runtime version.
- Package manager and version.
- Whether development is started from the root or an application directory.
- Required environment variables.
- Required local services.
- Test-data setup.
- Whether external accounts are needed.
- How production output is previewed.

Exact commands remain subject to maintainer review.

### Development workflow

Once setup has been verified:

1. Identify the application or shared component being changed.
2. Start the documented development process.
3. Reproduce the current behaviour.
4. Make a focused change.
5. Run relevant checks.
6. Test the complete affected workflow.
7. Review mobile and desktop presentation.
8. Check accessibility and error states.
9. Confirm that public metadata remains accurate.

Use isolated test resources where changes could affect stored data or
external services.

## Configuration

### Application configuration

Document configuration affecting:

- Public URLs and base paths.
- Application routing.
- External API destinations.
- Feature availability.
- Authentication, where implemented.
- Storage, where implemented.
- Analytics, where implemented.
- Build and deployment behaviour.

Keep local, preview and production settings distinguishable.

### Environment variables

For each required variable, record:

- Name.
- Purpose.
- Whether it is public or secret.
- Whether it is used during build or at runtime.
- Which environments require it.
- How it is supplied.

Do not publish secret values.

A variable used by browser-delivered code must not contain credentials
that are intended to remain private.

### Data and storage

Where an application saves information, document:

- What is stored.
- Where it is stored.
- How records are identified.
- Whether information persists across sessions or devices.
- How users export or delete it.
- What happens when storage is unavailable.
- Any retention or recovery limitations.

Do not describe browser storage as a backup or remote synchronisation
mechanism.

### API integrations

Where an app consumes `api.rjmlaird.co.uk` or another service, confirm:

- Exact endpoints.
- Request and response contracts.
- Access requirements.
- Timeout and error behaviour.
- Freshness expectations.
- Compatibility requirements.

Do not assume that every app uses the ecosystem API.

## User experience

### Consistency

Applications should feel related through clear navigation, typography,
controls and feedback.

Consistency should support the task rather than forcing every app into
an identical interface.

Review:

- Primary and secondary actions.
- Form labels.
- Input validation.
- Loading feedback.
- Success and failure messages.
- Empty states.
- Reset and cancellation behaviour.
- Help and documentation links.

### State and destructive actions

Where applicable:

- Make unsaved changes understandable.
- Explain whether a reset clears temporary or saved information.
- Confirm consequential destructive actions.
- Prevent accidental duplicate submissions.
- Give users a clear recovery path after failure.

Do not display a success state before the underlying operation has
actually completed.

### Navigation

Visitors should be able to distinguish between:

- Returning to the Apps surface.
- Returning to the main website.
- Opening documentation.
- Viewing source code.
- Moving to another application.

Avoid labels that send visitors to Labs when they expect Apps.

## Accessibility

Review each implemented application for:

- Semantic landmarks and heading order.
- Keyboard-operable controls.
- Visible focus.
- Explicit input labels.
- Clear validation messages.
- Accessible names and control states.
- Sufficient contrast.
- Responsive reflow and zoom.
- Touch-target usability.
- Reduced-motion behaviour.
- Text alternatives for meaningful visual information.
- Screen-reader feedback for relevant asynchronous changes.

Do not rely on colour, hover or animation alone to communicate essential
information.

Record known limitations honestly rather than claiming compliance without
testing.

## Deployment

### Verification status

The configured production destination is:

<https://apps.rjmlaird.co.uk>

The hosting provider, deployment trigger, build commands, output paths
and environment arrangement require verification.

### Pre-release checklist

Before deployment:

- Confirm the affected application or shared component.
- Confirm the target environment.
- Run available type checks, tests and builds.
- Review the complete affected workflow.
- Check mobile and desktop layouts.
- Test keyboard interaction.
- Verify links and public metadata.
- Review storage and migration implications.
- Confirm that secrets and private data are absent.
- Identify the recovery route.

### Release verification

After deployment:

1. Confirm that the intended revision is available.
2. Open the affected application directly.
3. Test a representative workflow.
4. Check assets and navigation.
5. Test expected failure and empty states.
6. Verify external integrations where relevant.
7. Review available logs or deployment diagnostics.
8. Confirm that unrelated applications remain usable.

Do not assume that a successful landing page proves every app is working.

### Routing

Verify the routing strategy actually deployed.

Where client-side routing is used, test direct navigation and browser
refresh on nested routes.

Where applications use separate base paths, check that assets and links
resolve correctly beneath those paths.

### Migrations

For changes affecting saved data:

- Identify the existing data format.
- Check compatibility with the new version.
- Test migration with representative data.
- Establish whether rollback remains possible.
- Document any user action required.
- Verify integrity after deployment.

An application rollback does not necessarily reverse a data migration.

### Rollback

Document the deployment platform’s actual recovery mechanism.

Record:

- The previous known-good revision.
- Relevant configuration.
- Data compatibility.
- How the deployment is restored.
- How the recovered application is checked.

Do not assume that reverting a commit automatically restores production.

### Domain and DNS

Before changing `apps.rjmlaird.co.uk`:

- Identify current DNS and routing configuration.
- Confirm the responsible account.
- Record existing values.
- Check certificate requirements.
- Review incoming links.
- Prepare a recovery plan.

## Operations

### Ownership

Ryan Laird owns publication decisions and the intended role of each app.

Maintainers are responsible for keeping the implementation, public
description and operational documentation aligned.

### Routine maintenance

Review:

- Application availability.
- Dependency and runtime support.
- External service compatibility.
- Broken links.
- User-facing errors.
- Accessibility.
- Storage behaviour.
- Permissions and secrets.
- Public status and limitations.

Update main-site build entries when a release materially changes an app’s
purpose, capabilities or availability.

### Monitoring

Identify monitoring actually configured for:

- The Apps surface.
- Individual applications.
- External integrations.
- Build and deployment failures.
- Storage or background processing, where applicable.

No monitoring or alerting provider is confirmed by this record.

### Backups and recovery

Identify everything needed to restore the application:

- Source code.
- Configuration.
- Assets.
- External datasets.
- Stored application data.
- Deployment permissions.
- Domain configuration.

For persistent data, document backup ownership, frequency, retention and
restore procedures.

For browser-only data, explain recovery limitations and any available
export process.

### Incident response

For an outage, data issue or unintended disclosure:

1. Identify the affected applications and users.
2. Determine whether continued operation could worsen the issue.
3. Restrict affected functionality where necessary.
4. Restore a suitable working state.
5. Verify data integrity and core workflows.
6. Update public availability information if needed.
7. Record the cause and corrective actions.

If credentials are exposed, revoke or rotate them. Removing the visible
value does not invalidate an already disclosed secret.

## Troubleshooting

These checks are diagnostic starting points, not a record of tested
incidents.

### The Apps hostname loads but an application does not

Check:

- The application’s actual route.
- Its deployment status.
- Asset paths.
- Runtime errors.
- Required configuration.
- External service availability.

Establish whether the landing surface and application are deployed
together or separately.

### A nested route fails on refresh

Check:

- The intended routing model.
- Hosting fallback behaviour.
- Base-path configuration.
- Generated routes.
- Redirect or rewrite rules.

Do not apply a blanket fallback without confirming its effect on assets
and missing-page responses.

### A change appears locally but not in production

Check:

- The deployed revision.
- Build completion.
- The target environment.
- Build-time versus runtime configuration.
- Imported data.
- Browser and delivery-layer caching.

### Saved information is missing

First establish the application’s storage model.

Check:

- Browser profile and device.
- Whether site data was cleared.
- Account or environment selection, where applicable.
- Storage permissions.
- Recent data-format changes.
- Available exports or backups.

Do not promise recovery where no recoverable copy exists.

### An API request fails

Check:

- The configured destination.
- Request method and parameters.
- Authentication, where required.
- Browser cross-origin behaviour.
- Response status and body.
- Timeout handling.
- Contract compatibility.

Do not expose a server-side secret in browser code as a workaround.

### Applications look inconsistent

Check:

- Shared style imports.
- Font loading.
- Component-level overrides.
- Theme variables.
- Responsive rules.
- Version differences in shared components.

Keep application-specific interface requirements separate from accidental
styling drift.

### A build fails

Start with the first meaningful error.

Check:

- Supported runtime.
- Package-manager version.
- Lockfile consistency.
- Missing imports or assets.
- Type errors.
- Required configuration.
- Shared-package build order, if applicable.

Do not disable validation simply to bypass a structural or data error.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository scope.
- [ ] Current application inventory.
- [ ] Production surface and route structure.
- [ ] Runtime, framework and dependencies.
- [ ] Package manager and local commands.
- [ ] Shared components and styles.
- [ ] Environment-variable requirements.
- [ ] External API contracts.
- [ ] Authentication and access rules, where applicable.
- [ ] Storage and privacy behaviour.
- [ ] Deployment workflow.
- [ ] Domain and DNS configuration.
- [ ] Data migration and rollback procedures.
- [ ] Monitoring and recovery coverage.
- [ ] Accessibility testing.
- [ ] Consistency with main-site build pages.
- [ ] Clear separation from Labs and Tools.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No verified release history has been recorded in this project document.

For future entries, record:

- The date.
- The affected application or shared component.
- The user-visible change.
- The relevant commit or release.
- Any configuration or migration requirements.
- Any compatibility or recovery implications.

Keep documentation revisions distinct from application releases. Do not
infer release dates from the date this record was drafted.
