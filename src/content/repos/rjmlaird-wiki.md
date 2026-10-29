---
title: "Wiki"
slug: "rjmlaird-wiki"
description: "A private, read-only personal reference wiki built with Quartz, published through Cloudflare Workers and protected by Cloudflare Access."
status: "active"
visibility: "internal"
audience: ["owner", "developer", "maintainer"]
tags: ["wiki", "reference", "knowledge-management", "quartz", "privacy"]
repository: "https://github.com/rjmlaird/rjmlaird-wiki"
liveUrl: "https://wiki.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "Quartz"
  - "TypeScript"
  - "Markdown"
  - "Cloudflare Workers"
  - "Cloudflare Access"
  - "GitHub Actions"
reviewStatus: "needs-review"
---

## Overview

Wiki is a private, read-only personal reference site at
`wiki.rjmlaird.co.uk`.

It uses Quartz v4 to turn selected Markdown notes into a searchable
static website. A Cloudflare Worker serves the output, while Cloudflare
Access controls who can view it.

The repository is also private.

These are separate protections: Cloudflare Access protects the website,
not the Git repository or copies of its contents.

### Intended users

- The owner reading and maintaining personal reference material.
- Approved maintainers working on the publishing infrastructure.

The supplied setup specifies an Access policy for the owner's identity
only. Broader access is not part of the documented baseline.

### Scope

The supplied README establishes:

- Markdown source notes.
- Explicit opt-in publication.
- Quartz-generated static output.
- Search and graph data.
- A Worker health route.
- Access-gated delivery.
- Privacy checks.
- CI and deployment workflows.
- Optional copying from an Obsidian publishing folder.

### Read-only meaning

The published website is described as read-only.

Authoring takes place in the repository or an optional local Obsidian
workflow, not through a documented browser editing interface.

### Verification status

This record is based on the supplied README.

Repository privacy, deployed Access policies, alternate-hostname
restrictions and privacy-test results have not been independently
verified for this record.

## Private surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Wiki | <https://wiki.rjmlaird.co.uk> | Private reference website |
| Repository | <https://github.com/rjmlaird/rjmlaird-wiki> | Private source and note history |
| Local preview | `http://localhost:8080` | Local build preview |
| Health route | `/api/health` | Worker health response |

Do not assume that the health route is publicly reachable. Verify how
the Access application covers the hostname and paths.

Do not add the private wiki to public catalogues without a deliberate
decision about what information should be disclosed.

## Architecture

### Layers

| Layer | Responsibility |
| --- | --- |
| `content/` | Markdown source notes |
| Quartz | Static-site generation |
| `public/` | Generated website output |
| `src/index.ts` | Worker health route and static asset delivery |
| Cloudflare Access | Website access decisions |
| GitHub Actions | Checks and deployment |

### Publishing flow

```text
Curated Markdown notes
          ↓
ExplicitPublish filter
          ↓
Quartz build
          ↓
Generated public/ directory
          ↓
Privacy checks
          ↓
Cloudflare Worker deployment
          ↓
Cloudflare Access
          ↓
Approved reader
```

### Repository boundary

All committed content remains subject to repository permissions,
regardless of whether Quartz publishes it.

A note excluded from the website may still exist in:

- Git history.
- Local clones.
- Branches.
- Pull requests.
- Build inputs.
- Backups.

Do not use publication filtering as permission to commit prohibited
sensitive material.

## Content organisation

### Source directory

Notes are maintained under:

```text
content/
```

The README describes organisation by Wheel of Life areas:

```text
01–11
99-Reference
```

Do not invent area names or change their meanings without reviewing
the controlled vocabulary.

### Vocabulary

Controlled values are documented in:

```text
content/99-Reference/Glossary.md
```

Use that source when setting classification metadata.

## Note metadata

The README requires each page to carry:

```text
title
type
wheel-area
sub-area
status
sensitivity
review
updated
tags
publish
```

Check the existing content and validation implementation for exact
types and permitted values.

### Explicit publication

A note is eligible for publication only when its frontmatter contains:

```yaml
publish: true
```

The README identifies the Quartz filter as:

```text
ExplicitPublish
```

configured in:

```text
quartz.config.ts
```

Do not replace this with an implicit publish-everything rule.

### Classification is not access control

Fields such as `sensitivity`, `status` and `review` support organisation
and review.

The supplied README does not establish separate access permissions for
each classification.

Do not assume a sensitive published note is hidden from other authorised
readers merely because its metadata says it is sensitive.

### Updates and review

Use `updated` for actual content updates.

Keep note-level review metadata distinct from this documentation record's
`reviewStatus` and `lastReviewed`.

Do not assign review dates solely to satisfy a template.

## Content safety

### Prohibited material

The README explicitly prohibits committing:

- Passwords.
- API keys.
- Recovery codes.
- Account numbers.
- Identity documents.
- Medical records.
- Financial statements.

This restriction applies even when the repository and website are private.

### Placeholders

Use placeholders where a reference needs structure without storing the
real value.

For example:

```text
[Provider Name]
```

Do not replace placeholders with sensitive values merely to make a note
feel complete.

### Publication review

Before setting `publish: true`, review:

- The note body.
- Frontmatter.
- Links.
- Embedded files.
- Images.
- Attachment metadata.
- Related notes.
- Information exposed through search and graph data.

Do not assume that a note is safe because its title is innocuous.

## Search, graph and generated files

### Content index

Quartz still generates:

```text
/static/contentIndex.json
```

for search and graph functionality.

The README states that this is protected by Access alongside the rest
of the website.

Treat it as content-bearing output, not harmless implementation metadata.

### Sitemap and RSS

The README states that sitemap and RSS generation are disabled.

The privacy check is intended to verify their absence.

Disabling these files reduces unintended publication surfaces but does
not replace access control.

### Direct asset requests

Test direct requests to generated content and assets.

Do not verify only the homepage and assume every other path is protected.

## Getting started

### Obtain the private source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-wiki.git](https://github.com/rjmlaird/rjmlaird-wiki.git)
cd rjmlaird-wiki
```

Use an approved repository authentication mechanism.

Do not embed access credentials in committed configuration.

### Runtime

The README specifies Node.js 22 and identifies:

```text
.node-version
```

as the runtime declaration.

It provides:

```bash
nvm use
```

If the installed version manager does not read that file automatically,
select Node.js 22 explicitly and verify:

```bash
node --version
```

### Install

```bash
npm ci
```

Use the committed lockfile.

### Local preview

```bash
npm run dev
```

The documented destination is:

```text
http://localhost:8080
```

Inspect the actual startup output.

Do not assume the production Access policy protects a local preview.

## Commands

| Command | Documented behaviour |
| --- | --- |
| `npm run dev` | Build and local preview |
| `npm run build` | Build into `public/` |
| `npm run check` | Inspect generated output for privacy conditions |
| `npm test` | Run Quartz unit tests |
| `npm run typecheck` | Run TypeScript checks |
| `npm run deploy` | Build, check and manually deploy |
| `npm run sync` | Optional Obsidian publishing-folder copy |

### Validation boundaries

Quartz unit tests and type checks do not establish Access enforcement.

The privacy build check and deployed access tests serve different
purposes and should both be retained.

## Optional Obsidian workflow

### Sync command

The README provides:

```bash
VAULT_PUBLISH_DIR=/path/to/vault/publish npm run sync
```

The process requires `rsync`.

### Replacement behaviour

The README states that synchronisation replaces `content/` with the
selected publishing folder.

Treat this as a potentially destructive local content operation.

Before running it:

1. Confirm the source path.
2. Check for uncommitted work.
3. Preserve changes that must not be overwritten.
4. Inspect the sync script.
5. Confirm the selected folder contains only intended material.

### Review afterwards

```bash
git status
git diff --stat
git diff
```

Check additions, deletions and attachment changes before committing.

Do not assume the publishing-folder name guarantees that every file
is suitable for the repository.

### Source ownership

Decide whether each note is maintained in Obsidian or directly in
`content/`.

Avoid editing both copies independently without understanding how the
next sync handles changes.

## First-time deployment setup

### Repository privacy

Create or confirm the private repository.

Check the repository's Settings page to verify that it is private.

Do not rely on a local folder name or a README warning as proof.

### Cloudflare credentials

The README requires GitHub Actions configuration for:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

It describes an API token with Workers script-editing permission and
route or custom-domain permissions as required.

Scope access to the intended account and deployment needs.

### Worker configuration

The README identifies:

```text
wrangler.jsonc
```

as configuring:

- The custom domain.
- Disabled workers.dev access.
- Disabled preview URLs.

Inspect the actual values before deployment.

### Initial release

The README supports:

- Pushing to `main`.
- Running the Deploy workflow.

Set up and verify the Access gate as part of bringing the hostname
online.

Do not introduce real notes before the privacy and access tests have
passed.

## Cloudflare Access

### Application

Create an Access application covering:

```text
wiki.rjmlaird.co.uk
```

### Policy

The documented baseline is:

- Allow the owner's identity only.
- No Bypass policies.
- No Service Auth policies.
- No broader overlapping application or policy granting access.

Confirm the actual identity-provider and policy settings.

### Alternate entry points

Verify that the same content is not available through:

- workers.dev.
- Preview URLs.
- Another custom domain.
- An unintended public deployment.
- A publicly accessible build artifact.

The absence of a link is not protection.

### Branch protection

The README recommends requiring CI to pass before merging into `main`.

Review whether repository settings enforce that requirement.

A recommendation in the README is not an active branch-protection rule.

## Privacy verification

Run these checks before introducing real notes and after changes affecting
publication or access.

### Unpublished-note canary

Create a temporary note containing:

```text
CANARY-PRIVATE-7f3a
```

Do not give it:

```yaml
publish: true
```

Run:

```bash
npm run build
npm run check
```

Both commands should pass according to the documented test procedure.

This checks that the unpublished canary is not exposed in generated
output.

### Signed-out check

Run:

```bash
bash scripts/verify-access.sh [https://wiki.rjmlaird.co.uk](https://wiki.rjmlaird.co.uk)
```

The README requires no HTTP 200 responses for the tested protected paths.

Inspect the script to understand exactly which paths and response
conditions it checks.

A non-200 response alone does not prove that no information leaked.

### Unauthorised identity

Use a private browser window and an identity outside the Allow policy.

Confirm access is denied, including direct access to:

```text
/static/contentIndex.json
```

### Authorised access

Confirm that the approved identity can:

- Open the site.
- Browse intended notes.
- Use search.
- Use graph functionality where enabled.
- Open approved assets.

### Cleanup

Delete the temporary canary note after testing.

Review the diff before committing.

### Test limitations

A canary check detects a specific class of publication failure.

It does not prove that every published note is appropriate or that every
possible access path is protected.

## Deployment

### Workflow

The README describes:

- CI on every pull request and push.
- Deployment on push to `main`.

Inspect the workflow files for exact commands, permissions and artifact
handling.

### Manual deployment

```bash
npm run deploy
```

The documented script builds, runs the privacy check and then invokes
Wrangler deployment.

Do not bypass the check to force a release.

### Pre-release checklist

- Confirm repository privacy.
- Review source changes for prohibited content.
- Review publication flags.
- Build.
- Run privacy checks.
- Run unit tests.
- Run type checks.
- Review generated output.
- Confirm Access configuration.
- Confirm alternate URLs are disabled.
- Identify the previous known-good deployment.

### Post-release verification

After deployment:

1. Run the signed-out access script.
2. Test an unauthorised identity.
3. Test the approved identity.
4. Check direct content-index access.
5. Check representative note and asset paths.
6. Confirm intended content.
7. Verify sitemap and RSS remain absent.

Do not record a successful deployment as a successful privacy review
unless these checks were actually performed.

## Rollback and emergency restriction

### Source rollback

The README provides:

```bash
git revert <commit>
git push
```

Review the target commit and resulting changes before execution.

The deployment workflow must complete before the public website reflects
the revert.

### Platform rollback

The README also describes restoring a previous Worker deployment through
the Cloudflare dashboard.

Verify the resulting content and access behaviour afterwards.

### Immediate restriction

The README identifies two ways to take the website offline:

- Change Access to deny everyone.
- Remove the Worker's custom domain.

Use the appropriate verified procedure for the incident.

### Disclosure limitations

Rollback does not erase information already downloaded or copied.

If prohibited material was committed, review:

- Git history.
- Clones.
- Pull requests.
- Artifacts.
- Published output.
- Backups.

Rotate exposed credentials where relevant. Removing the current file
does not invalidate a disclosed secret.

## Backups

### Notes

The private Git repository provides version history for committed notes.

It does not protect uncommitted local work or necessarily cover all
Obsidian source material.

### Cloudflare configuration

The README states that Access policies and domain settings are not
stored in Git.

Maintain a secure record of the configuration needed for recovery.

Do not include secrets in screenshots or notes.

### Recovery review

Confirm that recovery information covers:

- Repository access.
- Deployment workflow.
- Account ownership.
- Domain configuration.
- Access application and policies.
- Deployment credentials.
- Any content source outside the repository.

A copy of generated `public/` output is not a replacement for the
authoritative source and access configuration.

## Secrets

The README states that no secrets are required by the application at
build time or runtime.

Deployment uses the GitHub Actions Cloudflare credentials.

Do not commit tokens or `.env` files.

Review this assumption whenever adding:

- External integrations.
- Remote content sources.
- Analytics.
- API calls.
- Additional deployment tooling.

## Updating Quartz

### Upstream

The README identifies:

```text
[https://github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)
```

and Quartz v4.

### Update process

Before merging upstream changes:

1. Review the diff.
2. Check publication-filter configuration.
3. Check generated output behaviour.
4. Review search and graph changes.
5. Build and run tests.
6. Run privacy checks.
7. Repeat deployed Access tests.

Do not assume an upstream update preserves every local privacy control.

### Licence

The README states that Quartz is MIT licensed and references:

```text
LICENSE.txt
```

Preserve required licence material.

Quartz's software licence does not automatically license the private
note content for public reuse.

## Accessibility and usability

Review:

- Keyboard navigation.
- Visible focus.
- Readable typography.
- Search labels and results.
- Heading structure.
- Mobile reflow.
- Graph alternatives.
- Link meaning.
- Contrast.
- Zoom behaviour.

Keep essential reference content understandable without requiring use
of the graph view.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A note does not appear

Check:

- Its location under `content/`.
- Frontmatter syntax.
- `publish: true`.
- The ExplicitPublish filter.
- Build output.
- Deployed revision.

Do not weaken publication filtering merely to reveal an unfinished note.

### A note appears unexpectedly

Treat this as a publication-control issue.

Check the filter, metadata interpretation and generated indexes.

Restrict access if necessary while investigating.

### An unauthorised visitor receives content

Treat this as a security incident.

Check:

- Access application coverage.
- Allow and Bypass policies.
- Overlapping applications.
- Alternate domains.
- workers.dev and preview settings.
- Public artifacts or deployments.

### Search reveals an excluded note

Inspect generated search and graph data, not only HTML pages.

Run the canary test and review Quartz plugin behaviour.

### The sync removes expected notes

The documented sync replaces `content/`.

Stop before committing. Review the selected source folder and recover
local work from an appropriate copy.

Do not use a destructive Git reset without checking for unrelated work.

### A deployment fails authentication

Check:

- Cloudflare API token.
- Account identifier.
- Token scope.
- Repository secret names.
- Workflow permissions.
- Target Worker and custom domain.

Do not paste credentials into logs or support messages.

### Privacy checks pass but access is still wrong

The build check and Access tests cover different layers.

Review the deployed hostname and policies separately.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository privacy.
- [ ] Approved audience.
- [ ] Node.js and dependency requirements.
- [ ] Quartz version.
- [ ] ExplicitPublish configuration.
- [ ] Controlled frontmatter values.
- [ ] Prohibited-content review.
- [ ] Obsidian sync replacement behaviour.
- [ ] Source ownership.
- [ ] Canary test.
- [ ] Hidden-file checks.
- [ ] Sitemap and RSS exclusion.
- [ ] Search and graph protection.
- [ ] Worker asset configuration.
- [ ] Disabled workers.dev and preview access.
- [ ] Access application coverage.
- [ ] No unintended Bypass or Service Auth policy.
- [ ] No broader overlapping access.
- [ ] Signed-out and unauthorised-identity tests.
- [ ] CI and branch protection.
- [ ] Deployment credentials.
- [ ] Recovery configuration.
- [ ] Emergency restriction procedure.
- [ ] Quartz update procedure.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Quartz updates.
- Publication-filter changes.
- Metadata or content-organisation changes.
- Search and graph changes.
- Access-policy changes.
- Privacy-test results.
- Recovery implications.

Keep private note details out of public release notes.

Documentation visibility must be reviewed independently from the
visibility of the wiki itself.
