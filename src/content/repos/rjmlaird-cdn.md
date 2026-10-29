---
title: "CDN and DAM"
slug: "rjmlaird-cdn"
description: "Asset upload, image processing, public CDN delivery and an Access-protected digital asset manager with an offline mirror."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["cdn", "dam", "assets", "media", "storage", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-cdn"
liveUrl: "https://dam.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Node.js"
  - "Cloudflare Workers"
  - "Cloudflare R2"
  - "Workers KV"
  - "Cloudflare Queues"
  - "Cloudflare Images"
  - "Cloudflare Access"
reviewStatus: "needs-review"
---

## Overview

CDN and DAM combines asset ingestion, image processing, public asset
delivery and a digital asset management interface in one repository.

The system is organised around four components:

- An authenticated upload Worker.
- A queue-driven image processor.
- A digital asset management API and browser.
- A local synchronisation and offline browsing tool.

The CDN delivery surface remains public. Cloudflare Access protects the
DAM interface and API, not the public CDN objects.

### Intended users

- Maintainers uploading and inspecting assets.
- Developers integrating published assets into websites and applications.
- Approved users browsing the DAM.
- Operators maintaining a local offline copy.

### Documentation status

This record is based on the supplied README, Access setup instructions
and root package configuration.

The supplied README states that the rebuilt stack was not tested against
a real Cloudflare account at the time it was prepared. It reports type
and JavaScript syntax checks, not a verified production deployment.

Treat deployment, bindings, Access policies and end-to-end processing as
requiring maintainer verification.

The project-level `active` status does not establish that the reconstructed
pipeline has been validated in production.

## Live surfaces

| Surface | Destination | Purpose | Access model |
| --- | --- | --- | --- |
| CDN | <https://cdn.rjmlaird.co.uk> | Asset delivery | Public reads |
| Upload service | <https://upload.rjmlaird.co.uk> | Asset ingestion and status routes | Bearer token |
| DAM | <https://dam.rjmlaird.co.uk> | Asset browser and manifest API | Cloudflare Access |
| Repository | <https://github.com/rjmlaird/rjmlaird-cdn> | Source and operational configuration | Repository permissions |
| Offline browser | `http://localhost:8787` | Browse the local mirror | Local loopback interface |

Confirm the repository destination before publishing this record if the
actual repository is hosted elsewhere.

The processor's public hostname, if any, is not specified here.

The DAM is used as this record's primary application destination.
It is not the public delivery origin for website assets.

## Repository structure

```text
cdn-upload/
    Upload Worker and upload-status routes

cdn-processor/
    Queue consumer, image renditions and reprocessing

dam-api/
    Manifest API and gallery/list interface

dam-sync/
    Local synchronisation and offline browser

scripts/
    Setup and upload helpers
```

### Component responsibilities

| Component | Runtime | Responsibility |
| --- | --- | --- |
| `cdn-upload` | Cloudflare Worker | Validate authenticated uploads, write metadata and store originals |
| `cdn-processor` | Cloudflare Worker | Consume processing events, create image renditions and update metadata |
| `dam-api` | Cloudflare Worker | Serve the asset manifest and browsing interface |
| `dam-sync` | Node.js CLI | Mirror assets locally and serve the offline interface |

## Reconstruction history

### Upload Worker

`cdn-upload` is described as a TypeScript reconstruction of a previously
deployed bundle.

The README states that it preserves the original:

- Routes.
- Object-key layout.
- Query parameters.
- Response behaviour.

One deliberate ordering change was introduced: the metadata record is
written before the original object is uploaded to R2.

### Metadata ordering

The R2 write triggers the processing event.

Writing metadata after the object could allow the processor to finish
and mark the asset ready, only for the upload Worker to overwrite that
state with an earlier processing status.

The reconstructed ordering is:

```text
Write initial metadata
          ↓
Write original object to R2
          ↓
R2 event triggers processing
          ↓
Processor writes renditions and ready metadata
```

This addresses the race described in the README. Upload failures,
repeated events and concurrent replacement behaviour still require
end-to-end validation.

### Processor

`cdn-processor` is new code, not a reconstruction from the supplied
deployed upload bundle.

Before deploying it, inspect any existing deployed Worker with that
name and compare:

- Its code or available deployment history.
- Bindings.
- Queue configuration.
- Image processing behaviour.
- Metadata format.
- Object-key layout.

Do not overwrite an existing processor solely because the reconstructed
repository includes one.

### Scripts

The setup and upload scripts are described as rewrites of the earlier
README's helpers.

Inspect them before execution. Do not assume a helper is safe or
non-destructive solely because it is named `setup.sh`.

## Architecture

### Upload and processing flow

```text
Authenticated upload
          ↓
cdn-upload writes KV metadata
          ↓
Original object stored in R2
          ↓
R2 event notification and queue
          ↓
cdn-processor
          ↓
Cloudflare Images transformation
          ↓
Thumbnail and web rendition stored in R2
          ↓
KV metadata updated to ready
```

The event notification, queue and consumer bindings must be confirmed
in the actual Cloudflare configuration.

### DAM flow

```text
Approved browser or service client
          ↓
Cloudflare Access
          ↓
dam-api
          ↓
Manifest and asset browsing interface
```

The supplied implementation delegates authentication to Cloudflare Access.

No authentication logic is described inside `dam-api` itself.

### Offline flow

```text
dam-sync with Access service credentials
          ↓
Remote manifest and asset retrieval
          ↓
Local files and local manifest
          ↓
Loopback-only offline browser
```

Verify how credentials are applied to every protected asset request,
not only the manifest request.

## Storage and object layout

### Originals

The upload example uses:

```text
media/originals/photo.jpg
```

Confirm the complete key layout for all supported asset types against
the upload implementation.

### Image renditions

Image renditions are written beneath:

```text
media/renditions/<path-without-extension>/
├── thumb.webp
└── web.webp
```

For nested uploads, the path is preserved rather than using only the
basename.

This avoids collisions caused solely by two files with the same basename
in different directories.

It does not, by itself, establish how files with the same path stem but
different extensions are handled. Check that case before relying on
replacement or uniqueness behaviour.

### Metadata

The reconstructed implementation assumes that `CDN_METADATA` is a
Workers KV binding.

The README identifies uncertainty in the earlier setup over whether
that name referred to KV or an R2 bucket.

Resolve this before deployment.

The metadata's `renditions` field is described as containing R2 object
keys, not necessarily complete public URLs.

### Manifest

The DAM exposes:

```text
GET /api/manifest
```

A legacy `manifest.json` object at the public CDN root is described as
unused by this implementation.

Do not delete it until checking for consumers outside this repository.

## Endpoints

### Upload Worker

| Method | Route | Purpose |
| --- | --- | --- |
| `PUT` | `/upload` | Upload an asset |
| `GET` | `/status/*` | Inspect upload or processing status |

The upload service uses a bearer token.

Verify the exact status-route parameters, response schema and error
responses against the implementation.

### Processor

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/reprocess?key=<r2-key>` | Request processing for an existing original |

The README states that `CDN_API_TOKEN` is needed by the processor for
this route.

Its hostname or local port must be obtained from actual configuration.

### DAM

| Route | Purpose |
| --- | --- |
| `/` | Asset browsing interface |
| `/api/manifest` | Asset manifest |
| `/files/*` | Asset-byte delivery used when configured without a public CDN origin |

Verify the complete route inventory and behaviour before treating this
table as an exhaustive API reference.

## Access model

### Public CDN

Reads at:

```text
[https://cdn.rjmlaird.co.uk](https://cdn.rjmlaird.co.uk)
```

remain unauthenticated.

Assets intended to remain confidential must not be published through
that public delivery surface.

Protecting the DAM does not make the underlying public CDN assets private.

### Upload and reprocessing

The upload Worker uses:

```http
Authorization: Bearer <token>
```

The reprocessing route also uses the configured token.

Do not place this token in browser-delivered application code, public
examples or committed configuration.

### DAM access

The DAM browser and API are intended to sit behind Cloudflare Access.

Treat Access configuration as a deployment prerequisite, not an optional
interface enhancement.

Check alternate Worker hostnames and routes to ensure they do not expose
an unintended path around the protected hostname.

### Relationship to rjmlaird-auth

This implementation uses Cloudflare Access for DAM access.

It is not documented as using the shared application sessions supplied
by `rjmlaird-auth`.

Do not replace or bypass Access without reviewing both browser and
service-client requirements.

## Before deployment: verify bindings

Deploying a Worker applies the bindings declared by its configuration.
Review those bindings before replacing an existing deployment.

### Inspect resources

```bash
npx wrangler kv namespace list
npx wrangler r2 bucket list
```

Also inspect the deployed Worker's bindings in the Cloudflare dashboard.

Confirm:

- Original and rendition storage.
- `CDN_METADATA`.
- Queue producers and consumers.
- R2 event notifications.
- Cloudflare Images binding.
- Secrets.
- Routes and hostnames.

### Resolve CDN_METADATA

The repository assumes KV.

If the deployed resource is actually R2, do not assume the binding can
be changed without code changes.

Review every metadata read and write in:

- `cdn-upload`.
- `cdn-processor`.
- `dam-api`.

Check return types, serialisation, listing behaviour, expiry and error
handling for the chosen storage API.

### Confirm shared configuration

Set the intended metadata namespace identifier in the three relevant
Worker configurations.

Verify that the upload service, processor and DAM reference the same
production data resources.

Keep local and production bindings distinguishable.

### Dry-run each Worker

```bash
pnpm --filter cdn-upload exec wrangler deploy --dry-run
pnpm --filter cdn-processor exec wrangler deploy --dry-run
pnpm --filter dam-api exec wrangler deploy --dry-run
```

Inspect the output before proceeding.

A dry run does not replace validation of the deployed resources,
permissions and Access policies.

## Getting started

### Tooling

The supplied root package configuration declares:

```text
pnpm@9.12.0
```

The supported Node.js version and Wrangler version require verification.

### Install dependencies

From the repository root:

```bash
pnpm install
```

### Review setup

Inspect:

```text
scripts/setup.sh
```

The README describes it as creating missing resources.

Confirm its actual behaviour before running it against the intended
Cloudflare account.

```bash
./scripts/setup.sh
```

### Configure production secrets

For the upload Worker:

```bash
cd cdn-upload
npx wrangler secret put CDN_API_TOKEN
cd ..
```

For the processor's reprocessing route:

```bash
cd cdn-processor
npx wrangler secret put CDN_API_TOKEN
cd ..
```

Use the intended token consistently where required.

If rotating it, update approved scripts and clients without exposing it
in documentation or shell examples.

## Local development

### Prepare local configuration

From the repository root:

```bash
cp dam-api/.dev.vars.example dam-api/.dev.vars
```

Review the copied file.

An empty `PUBLIC_CDN_ORIGIN` is described as routing asset bytes through
the DAM's `/files/*` routes.

Create local test credentials:

```bash
printf '%s\n' 'CDN_API_TOKEN=test-token' > cdn-upload/.dev.vars
printf '%s\n' 'CDN_API_TOKEN=test-token' > cdn-processor/.dev.vars
```

These commands overwrite the destination files. Preserve any existing
local configuration before running them.

The example token is for local development only.

### Start the stack

```bash
pnpm dev
```

The root script starts all three Workers using shared local state:

```text
.wrangler-state
```

Read the startup output to identify each Worker's port.

### Upload a test image

Use an expendable local image:

```bash
curl -X PUT \
  "http://localhost:8787/upload?type=media&name=photo.jpg" \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: image/jpeg" \
  --data-binary @photo.jpg
```

Confirm that `8787` is the upload Worker's actual port before running.

### Trigger local processing

The README states that local R2 does not emit the event notifications
needed by this workflow.

Trigger processing manually after upload:

```bash
curl -X POST \
  "http://localhost:<processor-port>/reprocess?key=media/originals/photo.jpg" \
  -H "Authorization: Bearer test-token"
```

Replace `<processor-port>` with the port printed by Wrangler.

### Images binding

The README notes that the Images binding requires Cloudflare
authentication even during local development.

If local image processing fails:

1. Check authentication and binding configuration.
2. Establish whether the operation requires remote platform access.
3. Use an isolated deployed test environment if needed.
4. Avoid overwriting production assets merely to test the pipeline.

### Type checking

The root package exposes:

```bash
pnpm typecheck
```

This runs TypeScript checks across the workspace.

No root test, lint or formatting command is established by the supplied
package configuration.

## Deployment

### Available commands

From the repository root:

```bash
pnpm deploy:upload
pnpm deploy:processor
pnpm deploy:dam
```

These map to the corresponding workspace deployment scripts.

Review the order and compatibility of changes before executing them.

### Pre-release checklist

- Confirm the account and environment.
- Inspect existing deployed Workers.
- Resolve metadata-storage ambiguity.
- Verify R2, KV, queue and Images bindings.
- Review setup-script behaviour.
- Run type checks.
- Dry-run each Worker.
- Confirm upload and reprocessing secrets.
- Confirm DAM Access configuration.
- Check public versus private asset expectations.
- Identify rollback and recovery options.

### End-to-end verification

Using a test asset:

1. Upload the original.
2. Inspect the upload response.
3. Confirm initial metadata.
4. Confirm the object exists in R2.
5. Confirm event delivery and processor execution.
6. Confirm thumbnail and web rendition objects.
7. Confirm ready metadata.
8. Confirm manifest visibility.
9. Open the DAM preview.
10. Test the intended public CDN destination.
11. Run an offline sync.
12. Check the local copy.

Also test a failed processing case and the expected retry or recovery
behaviour.

Do not treat successful deployment alone as proof that the pipeline works.

### Rollback

Document rollback separately for:

- Upload Worker.
- Processor.
- DAM Worker.
- Queue and event configuration.
- Object and metadata changes.

Reverting Worker code does not automatically restore overwritten objects,
deleted metadata or changed resource bindings.

Before changing key layout or metadata format, check compatibility with
existing assets and offline manifests.

## Cloudflare Access setup

### Browser access

Create a self-hosted Access application for:

```text
dam.rjmlaird.co.uk
```

Configure an Allow policy for the intended email addresses.

Set a deliberate session duration appropriate to the asset-management
workflow.

The supplied setup notes describe email one-time-code sign-in. Verify
that the corresponding login method is enabled in the actual Access
configuration.

### Service access for dam-sync

Create an Access service token for the synchronisation client.

For example:

```text
dam-sync-cli
```

Record its client ID and client secret securely.

Configure a Service Auth policy that accepts the intended token.
Verify the policy action and selectors in the current dashboard rather
than assuming that adding a token to an unrelated policy is sufficient.

### Client configuration

Create the local environment file:

```bash
cd dam-sync
cp .env.example .env
```

Configure:

```dotenv
DAM_API_BASE=[https://dam.rjmlaird.co.uk](https://dam.rjmlaird.co.uk)
CF_ACCESS_CLIENT_ID=<service-token-client-id>
CF_ACCESS_CLIENT_SECRET=<service-token-client-secret>
```

Do not commit `.env`.

The client sends:

```http
CF-Access-Client-Id: <client-id>
CF-Access-Client-Secret: <client-secret>
```

Verify authenticated manifest and asset retrieval before relying on an
unattended sync.

### Rotation and revocation

Rotate or revoke service credentials when a device is lost, access is
no longer required or exposure is suspected.

The Access setup notes describe revocation through the service-token
management interface without redeploying the Worker.

After revocation, verify that the old token is rejected.

Revoking remote access does not erase files already downloaded to a device.

## Offline mirror

### Synchronise

From `dam-sync`:

```bash
node dam-sync.js sync
```

The README describes an incremental synchronisation process using SHA-256
comparison.

It retrieves:

- Documents.
- Media originals.
- Ready renditions.

Verify the exact manifest and comparison behaviour before documenting
stronger integrity or recovery guarantees.

### Browse locally

```bash
node dam-sync.js serve
```

The documented destination is:

```text
http://localhost:8787
```

The server binds to:

```text
127.0.0.1
```

The local manifest is described as having the same shape as the remote
manifest, allowing the same browsing interface to show an “offline copy”
status.

### Deletion behaviour

Remote deletions are not propagated to the local folder.

The sync process does not delete local files.

Consequences include:

- Previously downloaded files may remain after remote deletion.
- Local storage usage can grow.
- A mirror may contain historical files.
- Remote removal is not a device-erasure mechanism.

Do not describe this as an exact destructive mirror.

### Local protection

The offline copy contains actual asset files.

Use appropriate device security and access controls. Do not expose the
local server to the wider network without a separate security review.

Keep the local server and development stack on distinct ports when
running them simultaneously.

## Operations

### Ownership

Ryan Laird owns asset-publication and access decisions.

Maintainers are responsible for preserving upload compatibility,
processing behaviour, metadata integrity and recoverability.

### Routine checks

Review:

- Upload success.
- Processing failures and queue behaviour.
- Metadata status.
- Rendition availability.
- DAM Access enforcement.
- Public delivery.
- Offline synchronisation.
- Storage consumption.
- Service-token expiry and ownership.
- Dependency and runtime support.

### Data consistency

Look for:

- Metadata without an original object.
- Originals without metadata.
- Ready records with missing renditions.
- Renditions not referenced by metadata.
- Replaced originals with stale renditions.
- Failed processing left in an intermediate state.

Establish repair procedures before running bulk corrective operations.

### Backup and recovery

Identify the authoritative copies of:

- Original assets.
- Metadata.
- Renditions.
- Access configuration.
- Resource bindings.
- Deployment configuration.

The offline copy can support recovery, but it is not automatically a
complete backup strategy.

Verify:

- Sync completion.
- Available disk capacity.
- Protection from accidental local deletion.
- Whether historical versions exist.
- Whether remote metadata can be reconstructed.
- Whether originals can be restored safely.
- Whether renditions can be regenerated.

### Incident response

For a pipeline failure:

1. Identify whether upload, events, processing, metadata or delivery is affected.
2. Preserve diagnostic information.
3. Prevent further corruption where necessary.
4. Restore a compatible service state.
5. Repair affected assets using a reviewed process.
6. Verify the manifest and public delivery.
7. Record the cause and preventive changes.

For unintended public disclosure, consider every surface:

- Public CDN.
- DAM.
- Downloaded copies.
- Caches.
- Offline mirrors.

Removing an item from the DAM interface alone does not remove those copies.

## Troubleshooting

These checks are diagnostic starting points. The supplied README does
not establish production-tested recovery procedures.

### Upload returns an authentication error

Check:

- The bearer header.
- The target environment.
- The configured `CDN_API_TOKEN`.
- Whether the token was rotated.
- Whether scripts still use an older value.

Do not place the token in a query string.

### An asset remains in processing

Check:

- The original exists.
- Initial metadata was written.
- R2 event notifications target the intended queue.
- The processor consumes that queue.
- The Images binding is available.
- Processor logs show successful output.
- Metadata is updated after processing.

For local development, remember that manual reprocessing is required
by the documented workflow.

### Ready metadata exists but previews fail

Check:

- Rendition keys in metadata.
- Actual R2 objects.
- URL construction.
- CDN-origin configuration.
- `/files/*` behaviour.
- Access credentials.
- Cached responses.

Do not assume that a ready status proves every referenced object exists.

### The DAM is unexpectedly public

Check:

- The Access application hostname.
- Policy configuration.
- Alternate Worker routes and hostnames.
- Whether the request is bypassing the protected surface.

Treat missing Access enforcement as a security issue, not merely a
navigation problem.

### dam-sync receives a login page

Check:

- The Access service-token headers.
- Client ID and secret.
- Token expiry or revocation.
- The Service Auth policy.
- The configured DAM base URL.

Inspect response status and content type before treating the response
as a manifest.

### Offline files remain after remote deletion

This is the documented non-deleting sync behaviour.

Do not add a bulk-delete workaround without a reviewed retention and
reconciliation policy.

### Images processing fails locally

Check:

- Cloudflare authentication.
- Images binding configuration.
- The actual processor port.
- The test asset type.
- Whether a remote test environment is required.

### Deployment changes existing bindings

Compare the proposed `wrangler.toml` bindings with the currently deployed
Worker before redeploying.

Restore the intended configuration deliberately. Do not guess resource
types or identifiers.

## Known limitations

The supplied README identifies:

- No completed real-account Cloudflare test at the time of reconstruction.
- A newly written processor requiring comparison with any existing deployment.
- Public, unauthenticated CDN reads.
- No video-processing scope.
- Non-image media listed without thumbnails.
- No propagation of remote deletions to the offline folder.
- No automatic local R2 event notifications in the documented workflow.

Additional behaviour requiring verification includes:

- Retry and duplicate-event handling.
- Replacement and overwrite semantics.
- Rendition-key collisions for identical stems with different extensions.
- Cleanup of orphaned metadata or objects.
- Complete protection of DAM alternate routes.
- Recovery after partial synchronisation.

Do not describe these review areas as confirmed defects without inspecting
and testing the implementation.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository destination.
- [ ] Runtime and tool versions.
- [ ] Existing deployed upload Worker.
- [ ] Existing deployed processor.
- [ ] Metadata resource type.
- [ ] R2 and KV bindings.
- [ ] Queue and event-notification configuration.
- [ ] Images binding.
- [ ] Upload and status contracts.
- [ ] Reprocessing protection.
- [ ] Metadata ordering and failure handling.
- [ ] Original and rendition key layout.
- [ ] Duplicate-event and retry behaviour.
- [ ] DAM manifest schema.
- [ ] Access browser policy.
- [ ] Access service-token policy.
- [ ] Protection against alternate-route bypass.
- [ ] Public CDN data classification.
- [ ] Offline sync and integrity behaviour.
- [ ] Non-deleting local retention policy.
- [ ] Legacy manifest consumers.
- [ ] End-to-end deployed test.
- [ ] Backup and restore procedure.
- [ ] Rollback procedure.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

The reconstruction notes describe:

- A TypeScript rebuild of the upload Worker.
- Metadata writes moved before the triggering R2 write.
- A new image processor.
- Nested-path-preserving rendition keys.
- Rewritten setup and upload helpers.
- A DAM manifest and browsing layer.
- An incremental offline copy and local browser.

Treat these as undated reconstruction notes until commits or releases
establish their chronology.

For future entries, record:

- The date.
- The affected component.
- The relevant commit or deployment.
- Changes to keys, metadata or manifests.
- Asset reprocessing requirements.
- Consumer compatibility.
- Access or credential changes.
- Recovery implications.
