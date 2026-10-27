---
title: "WebDAV"
slug: "rjmlaird-dav"
description: "Authenticated WebDAV file storage for Zotero attachment syncing, implemented with Cloudflare Workers, Hono and private R2 storage."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["webdav", "zotero", "research", "file-sync", "storage"]
repository: "https://github.com/rjmlaird/rjmlaird-dav"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Cloudflare Workers"
  - "Hono"
  - "Cloudflare R2"
reviewStatus: "needs-review"
---

## Overview

Zotero WebDAV provides an authenticated file-sync endpoint for Zotero
attachments.

It runs on Cloudflare Workers, uses Hono for routing and stores files
in a private R2 bucket.

Zotero connects to the Worker using the configured WebDAV username and
password. The Worker is intended to be the only access path to the
stored objects.

### Intended users

- The owner synchronising Zotero attachments between devices.
- Maintainers operating the Worker and private storage.
- Developers testing compatibility with Zotero's file-sync behaviour.

### Scope

This service is intended for Zotero attachment file syncing.

Do not describe it as a complete Zotero library synchronisation service
or a general-purpose WebDAV platform without verifying those capabilities.

The supplied README documents attachment storage and the Zotero WebDAV
setup flow. It does not establish support for arbitrary WebDAV clients,
multiple independent users or additional storage workflows.

### Documentation status

This record is based on the supplied README and package configuration.

The source implementation, production hostname, deployed bindings and
end-to-end Zotero behaviour have not been independently verified for
this record.

The available checks are documented below. Their presence does not
establish that they have been run successfully against production.

## Naming

The supplied material uses three names:

| Name | Context |
| --- | --- |
| `rjmlaird-dav` | Requested project and repository identity |
| `zotero-library` | README title and proposed R2 bucket name |
| `zotero-webdav` | Name in `package.json` |

These names do not necessarily need to be identical, but their
relationship should remain clear.

Confirm the actual Worker name, repository destination and storage
binding from the deployed configuration.

Do not rename the R2 bucket merely to match the repository name.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Repository | <https://github.com/rjmlaird/rjmlaird-dav> | Source and development history |
| Production WebDAV | Not yet recorded | Zotero attachment-sync endpoint |
| Local development | `http://127.0.0.1:8787` | Local Worker |
| Documentation | <https://docs.rjmlaird.co.uk> | Setup and maintainer guidance |

Add `liveUrl` to the project metadata once the production destination
has been confirmed.

Do not infer the hostname from the repository name.

## Architecture

### Components

| Component | Responsibility |
| --- | --- |
| Cloudflare Worker | Handles WebDAV requests |
| Hono | Application routing |
| R2 | Private attachment-object storage |
| Worker secrets | Configured WebDAV username and password |
| Zotero | File-sync client |
| Vitest | Automated test runner |
| Smoke script | Command-line integration check |

### Request flow

```text
Zotero file-sync request
          ↓
Configured Worker hostname
          ↓
WebDAV route and credential validation
          ↓
Private R2 bucket
          ↓
WebDAV response to Zotero
```

Verify the actual authentication scheme, supported methods and response
behaviour against the implementation.

The secret names alone do not establish those details.

### Storage boundary

The R2 bucket must remain private.

The intended access model is:

```text
Authenticated client → Worker → R2
```

Do not expose the bucket through a public hostname or another public
delivery route.

### Application authentication

The README describes dedicated WebDAV credentials.

This service is not documented as using:

- GitHub OAuth.
- `rjmlaird-auth` session cookies.
- A browser sign-in flow.
- Cloudflare Access.

Do not add an interactive login requirement in front of the endpoint
without testing Zotero compatibility.

## File layout

### Zotero path

The configured WebDAV URL ends in:

```text
/webdav
```

Zotero appends:

```text
/zotero/
```

The resulting request path is therefore expected to include:

```text
/webdav/zotero/
```

Verify path handling in the Worker before changing prefixes or routing.

### Stored objects

The README states that Zotero stores objects under:

```text
zotero/
```

with names such as:

```text
<itemKey>.zip
<itemKey>.prop
```

Do not assume that the public request path maps directly to an R2 key
without inspecting the routing implementation.

Treat these files as application-managed sync objects. Avoid editing,
renaming or deleting them manually without a recovery plan.

### Upload handling

The README notes that R2 requires streamed uploads to have a known length
and that Zotero supplies `Content-Length`.

When testing uploads or introducing intermediaries, preserve the expected
request-body and length behaviour.

Do not assume that every generic streaming WebDAV client is compatible
with the implementation.

## Package configuration

### Application package

The supplied package configuration declares:

```text
Name: zotero-webdav
Version: 1.0.0
Private: true
Module type: ESM
```

The package version is source metadata, not evidence that the same
version is deployed.

### Dependencies

Declared dependency ranges include:

| Dependency | Declared range | Role |
| --- | --- | --- |
| `hono` | `^4.6.0` | Routing |
| `@cloudflare/workers-types` | `^4.20250101.0` | Worker type definitions |
| `typescript` | `^5.6.0` | Type checking |
| `vitest` | `^2.1.0` | Tests |
| `wrangler` | `^3.90.0` | Development and deployment tooling |

The installed versions depend on the resolved dependency tree and
lockfile.

The supported Node.js and npm versions require repository verification.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-dav.git](https://github.com/rjmlaird/rjmlaird-dav.git)
cd rjmlaird-dav
```

Confirm the repository destination if the project has not yet been
published under that name.

### Inspect configuration

Before setup, review:

- The repository README.
- `package.json`.
- The committed lockfile.
- Wrangler configuration.
- R2 binding names.
- Worker routes and hostname.
- `.dev.vars.example`.
- `scripts/smoke.sh`.
- Test files.

Use actual configuration values rather than assuming that the README
title is also the Worker name or binding name.

### Install dependencies

```bash
npm install
```

Review changes to the lockfile before committing.

### Create storage

For a new environment, the README provides:

```bash
npx wrangler r2 bucket create zotero-library
```

Before running it:

1. Confirm the Cloudflare account.
2. Check whether the intended bucket already exists.
3. Confirm the configured binding points to that bucket.
4. Confirm that it will remain private.

Do not replace an existing bucket or change production bindings solely
to repeat initial setup.

### Configure production credentials

```bash
npx wrangler secret put ZOTERO_WEBDAV_USER
npx wrangler secret put ZOTERO_WEBDAV_PASS
```

Enter credentials through the prompts.

Do not record their values in documentation, source control or example
configuration.

### Deploy

```bash
npm run deploy
```

The package script runs:

```text
wrangler deploy
```

Review the target Worker, bindings and routes before deployment.

## Local development

### Prepare local configuration

```bash
cp .dev.vars.example .dev.vars
```

Populate the local file according to the example.

The Worker credentials use:

```text
ZOTERO_WEBDAV_USER
ZOTERO_WEBDAV_PASS
```

Keep `.dev.vars` out of version control.

### Start the Worker

```bash
npm run dev
```

The README identifies the local destination as:

```text
http://127.0.0.1:8787
```

Use the actual destination printed by Wrangler if it differs.

### Run the smoke check

With the development Worker running, the README provides:

```bash
DAV_USER=zotero DAV_PASS=change-me npm run smoke
```

The supplied script definition runs:

```text
bash scripts/smoke.sh
```

The smoke script uses `DAV_USER` and `DAV_PASS`, while the Worker uses
the `ZOTERO_WEBDAV_*` secret names.

Their values must match the environment under test.

The sample password is for local testing only.

### Review smoke-test behaviour

Before running the script against a non-local endpoint, inspect whether
it creates, overwrites or deletes objects.

Confirm:

- Target URL.
- Test-object names.
- Credential handling.
- Cleanup behaviour.
- Expected responses.

Do not run an unreviewed write/delete smoke test against production.

## Validation

### Type checking

```bash
npm run typecheck
```

This runs:

```text
tsc --noEmit
```

### Automated tests

```bash
npm test
```

This runs:

```text
vitest run
```

### Integration validation

Type checks and unit tests do not replace a real Zotero verification
and attachment-sync test.

Validate:

- Correct credentials.
- Incorrect credentials.
- Expected WebDAV paths.
- Required request methods.
- Upload and download behaviour.
- Response headers and status codes.
- Upload-length handling.
- Missing objects.
- Error handling.
- Any overwrite or deletion behaviour.

Record tested behaviour rather than inferring support from a generic
WebDAV specification.

## Zotero configuration

In Zotero, open:

```text
Settings → Sync → File Syncing → WebDAV
```

### Server URL

Use:

```text
https://<your-worker-host>/webdav
```

Replace the hostname with the confirmed production destination.

Zotero appends `/zotero/`, so do not add it a second time without
checking the expected configuration.

### Credentials

Use the values configured as:

```text
ZOTERO_WEBDAV_USER
ZOTERO_WEBDAV_PASS
```

### Verify the server

Click:

```text
Verify Server
```

Resolve any verification error before relying on the service for file sync.

### Confirm actual syncing

After verification:

1. Use an expendable test attachment.
2. Sync it from one device.
3. Check that the expected objects appear in the private bucket.
4. Sync from a second configured device.
5. Confirm that the attachment opens correctly.
6. Review any Zotero sync errors.

Do not use an irreplaceable attachment as the only copy during initial
validation.

## Configuration

### Required secrets

| Name | Purpose |
| --- | --- |
| `ZOTERO_WEBDAV_USER` | Configured WebDAV username |
| `ZOTERO_WEBDAV_PASS` | Configured WebDAV password |

### Deployment configuration

Verify and document:

- Worker name.
- R2 binding name.
- Bucket name.
- Worker compatibility settings.
- Public hostname.
- Route configuration.
- Environment separation.
- Local persistence behaviour.

These values are not established by the supplied package scripts alone.

### Environment separation

Keep local tests and production storage distinct.

Before any test involving object creation or deletion, establish which
bucket the Worker will use.

Do not assume that local development always uses isolated storage without
checking the Wrangler configuration and invocation.

### Secret handling

Do not expose WebDAV credentials through:

- Browser-delivered code.
- Public URLs.
- Committed configuration.
- Logs.
- Screenshots.
- Support messages.
- Shared shell examples.

Store credentials in the configured secret mechanism and in the approved
client settings.

## Deployment

### Pre-release checklist

- Confirm the Cloudflare account.
- Review the intended Worker and hostname.
- Confirm the private R2 bucket.
- Verify bindings.
- Review credential configuration.
- Run type checks.
- Run tests.
- Inspect changes to request and object-key handling.
- Identify the previous known-good deployment.
- Confirm recovery options for stored attachments.

### Post-release verification

After deployment:

1. Run Zotero's Verify Server action.
2. Confirm rejection with incorrect credentials using a controlled test.
3. Upload a test attachment through Zotero.
4. Confirm successful retrieval.
5. Check stored object paths.
6. Review available logs.
7. Confirm the bucket is not publicly exposed.

Do not assume that an HTTP response from the root URL establishes a
working WebDAV service.

### Rollback

Document the deployment platform's actual rollback procedure.

Before release, identify:

- The previous Worker revision.
- Its bindings.
- Credential compatibility.
- Object-layout compatibility.
- Any configuration changes.

Rolling back code does not restore deleted or overwritten attachment
objects.

### Domain changes

When changing the endpoint:

- Establish the new route and certificate.
- Verify the WebDAV path.
- Test with Zotero.
- Update each configured client.
- Preserve access to the previous service until migration is complete,
  where appropriate.
- Avoid assuming that generic redirects preserve every WebDAV operation.

Do not change both storage layout and endpoint location without a tested
migration plan.

## Operations

### Ownership

Ryan Laird owns the service and publication decisions.

Maintainers are responsible for protecting the stored files, preserving
Zotero compatibility and maintaining a recoverable deployment.

### Routine checks

Periodically review:

- Zotero server verification.
- Attachment upload and retrieval.
- Worker errors.
- Storage usage.
- Bucket privacy.
- Credential ownership.
- Dependency and runtime support.
- Backup and recovery arrangements.

Do not use destructive requests as routine availability checks.

### Monitoring

No dedicated health endpoint, monitoring service or alerting system is
documented in the supplied README.

If monitoring is introduced, distinguish:

- Endpoint reachability.
- Authentication.
- WebDAV compatibility.
- Storage availability.
- End-to-end file integrity.

A lightweight check should avoid modifying user attachments.

### Backups

Treat file sync and backup as separate responsibilities.

Identify how originals and stored sync objects are protected against:

- Accidental deletion.
- Unintended overwrites.
- Client-side mistakes.
- Credential compromise.
- Storage or configuration errors.

Document:

- Backup scope.
- Backup frequency.
- Retention.
- Storage location.
- Restore procedure.
- Restore-test results.

Do not assume that the existence of an R2 copy provides historical
recovery.

### Credential rotation

Before rotating credentials:

1. Identify configured Zotero clients.
2. Plan the update.
3. Change the Worker secrets.
4. Update client settings.
5. Run Verify Server.
6. Confirm attachment syncing.

Document the actual behaviour when clients continue using the old values.

### Incident response

For failed syncing or suspected compromise:

1. Identify affected devices and operations.
2. Preserve useful diagnostics without recording credentials.
3. Stop potentially destructive activity where necessary.
4. Restore a suitable Worker configuration.
5. Rotate credentials if exposure is suspected.
6. Inspect attachment and metadata integrity.
7. Recover files from an appropriate source.
8. Verify syncing before resuming normal use.

Do not delete the bucket as a troubleshooting shortcut.

## Security considerations

### Private storage

Keep the bucket private and verify that no public domain or alternate
delivery route exposes its objects.

The Worker is intended to be the only access path.

### Client credentials

The documented configuration provides one username/password pair.

It does not establish independent user accounts, per-user permissions
or separate storage namespaces.

Do not expand use to multiple unrelated users without reviewing those
requirements.

### Path handling

Review how the Worker maps incoming paths to object keys.

Check:

- Prefix validation.
- Encoded paths.
- Unexpected separators.
- Access outside the intended collection.
- Unsupported operations.

Do not assume arbitrary object keys should be reachable through WebDAV.

### Errors and logging

Return useful errors without disclosing secrets or unnecessary internal
details.

Avoid logging authorisation headers, passwords or attachment contents.

Review whether object names themselves contain information that should
not appear in logs.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### Zotero cannot verify the server

Check:

- Production hostname.
- HTTPS availability.
- The `/webdav` prefix.
- Whether `/zotero/` was added twice.
- Username and password.
- Worker deployment status.
- R2 binding.
- Required WebDAV responses.
- Any proxy or access layer in front of the Worker.

Inspect the actual error before changing routes.

### Requests return an authentication error

Check:

- The environment being contacted.
- The deployed secret values.
- Client credentials.
- Recent credential rotation.
- Whether the request reaches the expected Worker.

Do not expose credentials in query parameters as a workaround.

### Uploads fail while downloads work

Check:

- Request-body handling.
- `Content-Length`.
- Storage permissions and binding.
- Object-size constraints in the actual deployment.
- The Worker error response.
- Differences between Zotero and the test client.

The supplied README specifically identifies known upload length as a
requirement for its R2 streaming approach.

### A file appears in storage but does not sync correctly

Check:

- The expected object key.
- The associated `.zip` and `.prop` objects.
- Whether an upload completed.
- Client-side sync errors.
- Response headers.
- Any recent change to path or overwrite behaviour.

Do not manually edit sync objects before preserving a recoverable copy.

### Local smoke testing fails

Check:

- The development Worker is running.
- The expected port is correct.
- `DAV_USER` matches the Worker's configured username.
- `DAV_PASS` matches the Worker's configured password.
- The script targets the intended local URL.
- Local storage is available.

### Production differs from local development

Compare:

- Wrangler configuration.
- Resource bindings.
- Secret names.
- Runtime compatibility settings.
- Hostname and routing.
- Local versus remote storage.
- Deployed revision.
- Any intermediary access controls.

## Known limitations and review areas

The supplied material does not establish:

- A production hostname.
- The complete supported WebDAV method set.
- General-purpose WebDAV compatibility.
- Multiple independent users.
- Per-user storage isolation.
- Backup automation.
- Monitoring and alerts.
- Rate limiting.
- Credential-management interfaces.
- Tested rollback or restore procedures.

Treat these as unverified capabilities, not necessarily absent features.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository destination.
- [ ] Worker name.
- [ ] Production hostname and WebDAV prefix.
- [ ] R2 bucket and binding.
- [ ] Bucket privacy.
- [ ] Authentication implementation.
- [ ] Secret configuration.
- [ ] Supported WebDAV operations.
- [ ] Object-key mapping.
- [ ] Upload streaming and length handling.
- [ ] Node.js and package-manager requirements.
- [ ] Local storage isolation.
- [ ] Smoke-script behaviour.
- [ ] Type-check and test results.
- [ ] Zotero Verify Server success.
- [ ] Attachment sync between devices.
- [ ] Logging and credential protection.
- [ ] Deployment and rollback procedures.
- [ ] Backup and restore process.
- [ ] Credential rotation.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

The supplied package configuration declares version `1.0.0`.

No dated deployment or release history has been supplied for this record.

For future entries, record:

- The date.
- The relevant commit or release.
- WebDAV compatibility changes.
- Object-layout changes.
- Authentication changes.
- Required client updates.
- Storage migration or recovery implications.

Keep package versions, documentation revisions and production deployments
distinct.
