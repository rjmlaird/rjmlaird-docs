---
title: "CV"
slug: "my-cv"
description: "Application-ready CV and professional experience site."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["cv", "career"]
repository: "https://github.com/rjmlaird/my-cv"
liveUrl: "https://cv.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["Astro"]
reviewStatus: "needs-review"
---

## Overview

CV is the dedicated website for Ryan Laird’s curriculum vitae and
professional experience.

It brings career history, education, research, credentials, memberships,
skills and volunteering into a focused destination for recruitment,
applications and professional introductions.

The site complements the main website rather than replacing it. Its
priority is to make professional information easy to find, understand
and review, with a clear relationship between capabilities and the
experience supporting them.

### Intended users

- Recruiters and hiring managers reviewing professional experience.
- Prospective clients and collaborators checking relevant capabilities.
- Application reviewers assessing qualifications and career history.
- The owner and maintainers updating records and preparing the site
  for professional use.

### Scope

The current public site includes sections for:

- Professional experience.
- Education.
- Research.
- Certifications.
- Professional memberships and networks.
- Languages.
- Awards and recognition.
- Skills and their associated experience.
- Tools and technologies.
- Volunteering.

The skills interface connects individual capabilities to the entries in
which they were applied. Experience and education records also expose
additional context, including achievements and related projects.

The site should remain useful as a standalone CV, without requiring
visitors to navigate the wider website to understand the career record.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Production | <https://cv.rjmlaird.co.uk> | Public CV and professional experience |
| Repository | <https://github.com/rjmlaird/my-cv> | Source code and development history |
| Main website | <https://rjmlaird.co.uk> | Wider professional identity, work and services |

A staging environment, downloadable CV workflow and automated application
exports are not documented here as confirmed capabilities.

## Relationship to other websites

### Main website

The main website provides the broader context for professional work,
services, editorial output and public-facing projects.

The CV site should link to relevant supporting material where useful,
without becoming a duplicate of the complete portfolio.

### Showcase portfolio

The planned `portfolio.rjmlaird.co.uk` showcase is intended for selected,
more visually presented highlights.

The CV remains the focused career record. It should not depend on the
showcase being available, and links to the showcase should only be
published once its destination is ready.

### Documentation

This project record belongs in the documentation site. Operational
instructions, architecture notes and maintenance procedures should
remain here or in the repository rather than appearing within the
public CV.

## Architecture

### Declared framework

The project record identifies Astro as the application framework.

The exact Astro version, integrations, rendering mode and build
configuration require repository verification.

### Public presentation

The public interface presents professional information as structured
sections, with additional detail available within individual records.

The site also connects skills to relevant experience and qualifications.
These connections should remain consistent when records are edited.

### Conceptual content flow

The following describes the intended relationship between content and
presentation, not a verified directory structure:

```text
Professional records and supporting metadata
                    ↓
        Page and component rendering
                    ↓
       Public CV sections and details
                    ↓
      Skills and related-record navigation
```

### Items requiring maintainer verification

Before treating this architecture section as authoritative, confirm:

- The source location and format of each content dataset.
- Whether data is maintained locally, imported or fetched remotely.
- How records are identified and related to one another.
- Which components render the major CV sections.
- Which interactions require client-side JavaScript.
- Whether production uses static output or server rendering.
- The hosting provider and deployment adapter, if any.
- Whether the CV shares datasets with the main website.
- The source of truth when records exist in multiple repositories.
- Any analytics, external scripts, embeds or third-party assets.

Do not infer the CV’s hosting provider or data architecture from another
site in the same ecosystem.

## Content model and editorial rules

### Record accuracy

Professional information must be supported by an appropriate source,
such as the owner’s records, a qualification, a publication or an
approved project description.

Maintain clear distinctions between:

- Employment, consultancy, volunteering and membership.
- Completed qualifications and research undertaken.
- Awards, nominations, invited participation and other recognition.
- Personal contributions and the wider achievements of a team.
- Current roles and historical roles.

Do not infer an awarded qualification from attendance or research
activity alone.

### Dates and status

Use dates consistently and check that current positions are genuinely
ongoing.

When a role or membership ends:

1. Add the appropriate end date.
2. Remove any inaccurate indication that it is current.
3. Review associated summaries and skills.
4. Check related records on other maintained websites.

### Related records

Keep references between experience, education, projects, organisations
and skills valid.

Prefer descriptive names in the public interface. Internal identifiers
should not appear as unexplained substitutes for project or
organisation names.

Where two records describe overlapping activity, make their relationship
clear rather than presenting the same contribution as independent
experience twice.

### Public information

Publish only information intended for public professional use.

Do not include private addresses, confidential client material,
unpublished references, internal notes, credentials or application-specific
personal information without an explicit decision to publish it.

## Getting started

### Prerequisites

The following must be checked in the repository:

- Supported Node.js version.
- Package manager and version.
- Dependency lockfile.
- Available development, validation and build scripts.
- Required environment variables.
- Any content-generation or data-import steps.

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/my-cv.git](https://github.com/rjmlaird/my-cv.git)
cd my-cv
```

### Inspect the project before running it

Review:

- `README.md`, if present.
- `package.json`.
- The committed lockfile.
- Node.js version declarations, if present.
- Astro configuration.
- Example environment files, if present.
- Deployment configuration and workflow files, if present.

Use the package manager and scripts declared by this repository.
Do not assume that commands used by the documentation site or main
website also apply here.

### Local development workflow

Once the repository instructions have been verified:

1. Install dependencies using the committed package-manager setup.
2. Configure only the environment values required for local development.
3. Run any required content preparation.
4. Start the documented development server.
5. Check the affected CV sections in the browser.
6. Run the repository’s validation and production-build scripts.

Exact install, development and preview commands remain subject to
maintainer review.

## Configuration

### Application configuration

Review configuration affecting:

- The production site URL.
- Asset and base paths.
- Rendering mode and adapter.
- Content sources.
- External destinations.
- Analytics and third-party integrations.
- Deployment-specific behaviour.

Keep production URLs distinct from local or preview destinations.

### Environment variables and secrets

The project’s environment-variable requirements have not yet been
verified.

Do not assume that a public CV requires no secrets: build-time data
access or deployment integrations may still use credentials.

If environment variables are required:

- Document their names and purpose without publishing secret values.
- State whether each is required locally, during builds or at runtime.
- Keep secrets out of version control.
- Do not expose credentials in browser-delivered JavaScript.
- Maintain an example environment file containing placeholders only.
- Record how production values are managed and rotated.

### Shared data

If the site consumes shared career or organisation data, document:

- The authoritative source.
- The import or synchronisation process.
- What happens when that source is unavailable.
- How changes are reviewed before publication.
- Whether imported data is pinned to a version or fetched dynamically.

## Deployment

### Current verification status

The production site is available at:

<https://cv.rjmlaird.co.uk>

The hosting provider, deployment trigger, build command, output
directory and rollback mechanism require repository and platform
verification.

### Pre-release checklist

Before publishing:

- Review the content diff for factual accuracy.
- Confirm the intended production branch or release revision.
- Run the repository’s available checks.
- Confirm that the production build succeeds.
- Review the built site locally or in a preview environment.
- Check internal navigation and external links.
- Check that private notes and credentials are absent.
- Review the page on mobile and desktop.
- Test expandable details and skill navigation.
- Check keyboard access and visible focus.
- Check print output if it is part of the intended application workflow.

### Release verification

After deployment:

1. Confirm that the production site loads.
2. Confirm that the intended changes are visible.
3. Check styling, fonts and images.
4. Test representative links and interactions.
5. Check that no unintended content was published.
6. Record the deployed revision and any significant issues.

### Rollback

Before a significant release, identify the previous known-good revision
and verify the deployment platform’s rollback procedure.

Use the mechanism supported by the actual deployment setup. Do not
assume that reverting a Git commit automatically restores production.

If reverting through Git, review the change carefully and preserve
unrelated work.

### Domain and DNS

Before changing the production domain or DNS:

- Identify the current DNS provider and hosting target.
- Record existing relevant DNS records.
- Confirm domain verification and certificate requirements.
- Check whether other services depend on the same records.
- Prepare a recovery plan.

Do not replace DNS records based on an assumed hosting provider.

## Operations

### Ownership

Ryan Laird owns the professional content and publication decisions.

Maintainers are responsible for preserving accurate presentation,
working navigation and a reproducible technical workflow.

### Routine maintenance

Review the site after:

- Starting or ending a role.
- Completing a qualification or certification.
- Receiving relevant recognition.
- Publishing significant research or professional work.
- Changing membership status.
- Updating contact or professional destinations.
- Making substantial dependency or infrastructure changes.

A review should cover both the record itself and related skills,
summaries, links and dates.

### Availability checks

Periodically verify:

- The production URL loads successfully.
- The certificate is valid.
- Styles, fonts and images load.
- Navigation and detail interactions work.
- External destinations remain appropriate.
- Content updates have reached production.

No automated monitoring service is confirmed by this document.

### Backups and recoverability

Identify everything required to rebuild the site, including any
resources outside the repository:

- Content datasets.
- Images and documents.
- Imported or generated data.
- Deployment configuration.
- Environment-variable definitions.
- Domain and hosting configuration.

Do not treat the Git repository as a complete backup until external
dependencies have been identified.

### Incident response

For a broken deployment or inaccurate public record:

1. Establish whether the issue concerns availability, presentation,
   content accuracy or unintended disclosure.
2. Limit exposure where necessary.
3. Restore the last appropriate working version.
4. Correct and validate the underlying issue.
5. Recheck production.
6. Record the cause and preventive action.

If a secret has been published, revoke or rotate it; removing the
visible value alone is not sufficient.

## Accessibility and application readiness

The CV should be straightforward to read, navigate and assess.

Review:

- Logical heading order.
- Meaningful section labels.
- Keyboard access to interactive elements.
- Visible focus indicators.
- Legible typography and sufficient contrast.
- Responsive reflow and zoom behaviour.
- Accessible names and state changes for expandable details.
- Text alternatives for meaningful images.
- Reduced-motion behaviour where animation is used.
- Availability of essential information without relying solely on hover.

For print or PDF use, check:

- Section and record page breaks.
- Hidden or expanded detail behaviour.
- Font size and contrast.
- Clipped content and unnecessary blank pages.
- Whether links remain understandable outside the browser.

A browser printout is not automatically an application-ready document.
Verify the actual output before using it for an application.

## Troubleshooting

The checks below are diagnostic starting points. They are not a record
of previously tested incidents.

### A content change does not appear

Check:

- The edited file is the actual source for that section.
- The change was committed to the deployed revision.
- Any required import or generation step completed.
- The production deployment finished successfully.
- The browser or delivery layer is not serving an older version.

If the site consumes shared data, confirm that the relevant update has
reached the CV project.

### A project or organisation appears as an unexplained identifier

Check:

- The referenced record exists.
- Identifiers match across datasets.
- The related-record lookup succeeds.
- The renderer has an appropriate fallback when a lookup fails.

Resolve the relationship rather than replacing identifiers indiscriminately
across unrelated files.

### A skill has missing or unexpected associations

Check:

- Skill names and identifiers are consistent.
- The intended records contain the relevant skill.
- Duplicate records are not inflating counts.
- The relationship-building logic includes the correct record types.

Keep the relationship meaningful rather than adding tags merely to
increase apparent coverage.

### Styling differs between sections

Check:

- Shared styles and component-level overrides.
- Font loading and fallback behaviour.
- Styles applied to content rendered from data.
- Theme-specific colours.
- Responsive breakpoints.
- Whether older generated assets are still being served.

### The local build fails

Use the first meaningful error in the build output.

Check:

- Node.js and package-manager requirements.
- Dependency installation against the committed lockfile.
- Missing imports or assets.
- Content syntax and schema requirements.
- Required configuration.
- Content preparation steps.

Do not weaken validation simply to bypass a factual or structural
content error.

### Production differs from the local preview

Compare:

- The deployed revision.
- Build commands and environment.
- Environment-variable names.
- Rendering mode and adapter.
- Data available during the build.
- Asset paths and filename case.
- Hosting redirects and cache behaviour.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Framework version and integrations.
- [ ] Local setup and supported runtime.
- [ ] Package manager and scripts.
- [ ] Content locations and authoritative data sources.
- [ ] Related-record and skill-association behaviour.
- [ ] Environment-variable requirements.
- [ ] Hosting provider and deployment workflow.
- [ ] Production domain and DNS ownership.
- [ ] Rollback procedure.
- [ ] Backup coverage.
- [ ] Accessibility and print checks.
- [ ] External integrations and privacy implications.
- [ ] Accuracy of operational instructions.

Set `lastReviewed` only when an actual maintainer review has taken place.

## Changelog

No verified release history has been recorded in this project document.

For future entries, record:

- The date.
- The user-visible or operational change.
- The relevant commit or release, where available.
- Any migration, compatibility or follow-up action.

Keep documentation changes distinct from application releases. Do not
infer release dates from the date this record was drafted.
