---
title: "API"
slug: "rjmlaird-api"
description: "API and structured data layer for the RJM Laird ecosystem."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["api", "data", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-api"
liveUrl: "https://api.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["TypeScript", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

API is the structured data and integration layer for the RJM Laird
ecosystem.

Its purpose is to provide a consistent interface for data used across connected websites, applications and internal workflows, reducing the need for consumers to maintain separate copies of the same information.

This record describes the project's responsibilities, integration expectations and maintenance procedures. It does not yet constitute a verified endpoint reference.

The declared stack is TypeScript and Cloudflare. The specific runtime, framework, storage services and deployment configuration require repository verification.

### Intended users

- Developers integrating websites, applications or tools.
- Maintainers updating data sources, contracts and infrastructure.
- The owner reviewing data publication and access decisions.

### Documentation status

This document requires maintainer review.

In particular, the following are not yet verified:

- Available endpoints and HTTP methods.
- Request and response schemas.
- Authentication and authorisation.
- Public versus restricted datasets.
- Storage and authoritative data sources.
- Caching and freshness behaviour.
- Rate limits and usage restrictions.
- Deployment and rollback procedures.
- Monitoring, backup and recovery arrangements.

The project's public visibility does not mean that every dataset or
operation should be publicly accessible.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Production API | <https://api.rjmlaird.co.uk> | Configured production destination |
| Repository | <https://github.com/rjmlaird/rjmlaird-api> | Source code and development history |
| Main website | <https://rjmlaird.co.uk> | Public professional website |
| Documentation | <https://docs.rjmlaird.co.uk> | Project and integration documentation |

The configured API root is not assumed to be a human-readable landing
page or a health-check endpoint.

A staging hostname, API explorer, OpenAPI document and status page are
not confirmed by this record.

## Scope and responsibilities

### Structured data delivery

The API should expose intentionally published data through documented
interfaces.

For each dataset, maintainers need to establish:

- Its authoritative source.
- Its owner.
- Its public or restricted classification.
- Its schema and identifiers.
- Its update process.
- Its freshness expectations.
- Which consumers depend on it.

Do not assume that a dataset belongs in the public API simply because
it exists in a repository or another connected system.

### Integration boundary

Consumers should depend on documented contracts rather than internal
file layouts, database structures or implementation details.

Where multiple sites use the same records, identify which system owns
the data and which systems consume it.

Avoid circular dependencies in which a website and the API each assume
the other is the authoritative source.

### Separation from other services

This API record is distinct from:

- Public-facing build overview pages.
- Individual tool or calculator APIs.
- Repository development instructions.
- Editorial content and blog posts.
- The complete documentation for each consuming application.

Document actual integrations rather than assuming every tool or website
uses this service.

## Architecture

### Declared technologies

| Technology | Declared role |
| --- | --- |
| TypeScript | Application implementation language |
| Cloudflare | Platform dependency; specific services require verification |

Do not infer the use of Workers, Pages, D1, KV, R2, Durable Objects or
another Cloudflare service from the platform name alone.

### Architecture inventory

Before treating this section as authoritative, identify:

- Application entry points.
- Routing framework, if any.
- Request validation.
- Response serialisation.
- Error handling.
- Authentication and authorisation middleware, if any.
- Data adapters and upstream integrations.
- Persistent storage, if any.
- Cache layers, if any.
- Scheduled or background tasks, if any.
- Deployment configuration.
- Logging and monitoring integrations.

Record the relevant repository paths after inspection.

### Data flow

The following is an inventory framework, not a confirmed implementation:

```text
Authoritative data source
          ↓
Validation and transformation, where implemented
          ↓
API request handling and access controls
          ↓
Documented response
          ↓
Website, application or workflow consumer
```

For each implemented route, establish where its data originates and
which processing steps actually occur.

### Identifiers and relationships

Where records refer to other records:

- Define stable identifiers.
- Distinguish identifiers from display names and URL slugs.
- Document how missing references are handled.
- Preserve compatibility when records are renamed.
- Avoid exposing internal system identifiers unnecessarily.

Do not change identifier semantics without reviewing dependent consumers.

## API contract

### Endpoint inventory

No endpoint inventory has yet been verified.

For each implemented endpoint, document:

| Field | Required information |
| --- | --- |
| Method and path | Exact supported HTTP method and route |
| Purpose | What the endpoint provides or changes |
| Access | Public, authenticated or otherwise restricted |
| Parameters | Path, query and body fields |
| Validation | Accepted types, limits and constraints |
| Response | Schema and representative example |
| Errors | Relevant status codes and error structure |
| Freshness | Source update and caching behaviour |
| Consumers | Known dependent applications |
| Compatibility | Versioning and deprecation expectations |

Examples should use sanitised data and must not contain credentials or
private records.

### Read and write operations

Document read and write routes separately.

For write operations, verify:

- Who is permitted to perform the operation.
- How authorisation is enforced.
- What validation occurs.
- Whether repeated requests can create duplicate changes.
- What audit information is retained.
- Whether the change can be reversed.

Do not test state-changing production endpoints as an availability check.

### Response structure

Document the response format actually implemented.

Check:

- Required and optional fields.
- Null and missing-value behaviour.
- Date and timestamp formats.
- Identifier types.
- Ordering guarantees.
- Pagination, where implemented.
- Empty-result behaviour.
- Error response consistency.

Do not introduce a new response envelope solely to match this document.

### Versioning and compatibility

The current versioning strategy requires verification.

Before changing an existing response:

1. Identify known consumers.
2. Determine whether the change is compatible.
3. Update contract tests and documentation.
4. Coordinate consumer changes where necessary.
5. Establish a transition or rollback plan.

Record any implemented version prefixes, compatibility guarantees and
deprecation periods.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-api.git](https://github.com/rjmlaird/rjmlaird-api.git)
cd rjmlaird-api
```

### Inspect the repository

Before installing or deploying, review:

- The repository README.
- `package.json`.
- The committed dependency lockfile.
- Runtime and package-manager version declarations.
- TypeScript configuration.
- Platform configuration files.
- Example environment files.
- Test configuration.
- Build and deployment workflows.

Do not assume that the API uses the same commands as an Astro website
elsewhere in the ecosystem.

### Verify local prerequisites

Confirm:

- Supported Node.js version.
- Package manager and version.
- Required platform tooling.
- Whether a Cloudflare account is required for local development.
- Whether local emulation is available.
- Required environment variables and bindings.
- How test data is supplied.

Prefer isolated local or test resources over production resources.

### Development workflow

Once the repository's instructions are confirmed:

1. Install dependencies using the committed lockfile and package manager.
2. Configure local environment values and resource bindings.
3. Prepare test data where required.
4. Start the documented local development process.
5. Exercise the affected routes with representative requests.
6. Run validation, tests and build checks.
7. Review response compatibility before proposing deployment.

Exact commands remain subject to maintainer review.

## Configuration

### Configuration inventory

Document configuration in terms of its purpose and environment:

| Area | Details to verify |
| --- | --- |
| Runtime | Execution environment and compatibility settings |
| Routing | Hostnames, route matching and base paths |
| Data | Source locations and storage bindings |
| Access | Authentication and authorisation settings |
| Browser access | Cross-origin policy, if browser consumers use the API |
| Cache | Cache keys, lifetimes and invalidation |
| Upstream services | Destinations, timeouts and credentials |
| Observability | Logging, error reporting and metrics |
| Limits | Request, payload and resource limits |

These are review categories, not claims that every feature is implemented.

### Environment separation

Keep local, preview and production configuration distinguishable.

Where separate environments exist, verify:

- They use the intended data sources.
- Test writes cannot affect production.
- Credentials are scoped appropriately.
- Preview deployments do not expose restricted data.
- Environment-specific URLs are not accidentally published.

### Secrets

Do not store secret values in source control, examples, documentation
or browser-delivered code.

For each required secret, document:

- Its name.
- Its purpose.
- The environment in which it is required.
- The system used to supply it.
- Its owner.
- Its rotation and revocation procedure.

Use placeholders in examples.

### Public-data controls

Review the fields returned by public endpoints.

Exclude private notes, credentials, personal information and internal
integration identifiers unless publication is intentional and justified.

Filtering public data should be enforced at the service boundary, not
left solely to the consuming interface.

## Deployment

### Verification status

The production destination is configured as:

<https://api.rjmlaird.co.uk>

The deployment service, commands, account configuration and release
trigger have not yet been verified in this record.

### Pre-deployment checklist

Before deploying:

- Confirm the target environment.
- Review code and configuration changes.
- Identify affected endpoints and consumers.
- Run available type checks and tests.
- Validate representative response schemas.
- Review access-control changes.
- Check environment variables and resource bindings.
- Review any storage or data migrations.
- Confirm rollback and recovery options.
- Ensure examples and logs do not expose secrets.

### Release verification

After deployment:

1. Confirm the intended revision is running using available release
   information.
2. Test documented, non-mutating endpoints.
3. Check response status, content type and representative data.
4. Test relevant browser integrations where applicable.
5. Check error handling without disclosing sensitive internals.
6. Review available logs and metrics.
7. Confirm that dependent consumers still work.

Use a documented health endpoint only if one exists. Do not invent
`/health`, `/status` or another path as part of the release procedure.

### Data and schema migrations

Where deployment changes persistent data:

- Identify whether older application versions can read the new data.
- Back up or export affected data where appropriate.
- Test the migration in an isolated environment.
- Record whether the migration is reversible.
- Coordinate the application and data rollout.
- Verify integrity after migration.

An application rollback does not automatically undo a data migration.

### Rollback

Document the actual platform-supported rollback process.

Before releasing a significant change, identify:

- The previous known-good application revision.
- The configuration associated with it.
- Its compatibility with current data.
- How routing or deployment promotion will be restored.
- How consumers will be checked after rollback.

Do not assume that a Git revert alone restores the deployed service.

### Domain and DNS

Before changing `api.rjmlaird.co.uk`:

- Identify current DNS records and routing configuration.
- Confirm the responsible account and permissions.
- Record existing values.
- Check certificate and hostname-verification requirements.
- Review effects on consumers.
- Prepare a recovery plan.

Do not infer the required DNS record type from the use of Cloudflare.

## Operations

### Ownership

Ryan Laird owns service-level publication and integration decisions.

Maintainers are responsible for documenting the deployed behaviour,
preserving compatibility and operating the service safely.

### Routine maintenance

Periodically review:

- Dependencies and runtime support.
- Route and schema documentation.
- Data-source availability.
- Identifier consistency.
- Access controls.
- Secrets and platform permissions.
- Usage and resource consumption.
- Consumer compatibility.
- Backup and recovery arrangements.

Keep operational documentation aligned with the deployed service,
not merely the latest development branch.

### Monitoring

Identify the monitoring capabilities actually configured.

Useful review areas include:

- Availability of representative endpoints.
- Request failures.
- Response latency.
- Upstream failures.
- Authentication failures.
- Unexpected resource usage.
- Data freshness.
- Scheduled-job results, where applicable.

No specific monitoring service or alerting configuration is confirmed
by this document.

### Logging

Review logs for both diagnostic usefulness and privacy.

Avoid recording credentials, authorisation headers, sensitive request
bodies or unnecessary personal information.

Document retention, access and redaction behaviour where logging
services are used.

### Backup and recovery

Determine whether the service stores data or only exposes data held
elsewhere.

For each persistent or authoritative source, document:

- Backup ownership.
- Export or snapshot mechanism.
- Backup frequency.
- Retention.
- Restore procedure.
- How recovery is tested.

If all API responses are derived from version-controlled files, confirm
whether any additional configuration or external resources are still
required to rebuild the service.

### Incident response

For an outage, compatibility failure or unintended disclosure:

1. Establish the affected routes, data and consumers.
2. Determine whether continued operation could worsen the issue.
3. Restrict affected functionality where necessary.
4. Restore a known-good service state.
5. Verify data integrity and consumer behaviour.
6. Record the incident and corrective actions.

For exposed credentials, revoke or rotate them. Removing the visible
value does not invalidate an already disclosed secret.

## Troubleshooting

The following checks are diagnostic starting points, not a record of
tested incidents.

### The API hostname does not respond

Distinguish between:

- DNS resolution failure.
- Certificate or connection failure.
- Platform routing failure.
- An application error response.
- An intentionally unsupported root path.

Check the exact failing endpoint rather than assuming the API root
should return a web page.

### An endpoint returns an unexpected status

Check:

- The HTTP method.
- The route and any version prefix.
- Required parameters and content type.
- Authentication and permissions.
- Upstream or storage availability.
- Relevant application logs.

Compare the response with the documented contract before changing the
consumer.

### A browser request fails but a command-line request succeeds

Inspect the browser's network response and console.

Check:

- The requesting origin.
- Cross-origin response headers.
- Preflight handling, where required.
- Credential handling.
- Redirects.
- The actual server response.

Do not disable access controls or allow every origin as a blanket fix.

### Data appears stale

Check:

- The authoritative source was updated.
- Any import or transformation completed.
- The deployed revision includes the change.
- Application and edge caching.
- Browser or consumer-side caching.
- Whether the request targets the intended environment.

Establish which layer is stale before purging caches.

### A consumer breaks after a release

Compare the previous and current contracts.

Check for:

- Renamed or removed fields.
- Changed types.
- Changed null behaviour.
- Different ordering.
- Pagination changes.
- Altered access requirements.
- Identifier changes.

Prefer a compatible correction or coordinated migration over an
undocumented consumer-specific workaround.

### Local behaviour differs from production

Compare:

- Runtime versions.
- Configuration and bindings.
- Environment variables.
- Data sources.
- Network access.
- Platform limits.
- Deployed revision.
- Cache behaviour.

Do not copy production secrets into local files simply to reproduce
an issue.

### A record relationship cannot be resolved

Check:

- The referenced identifier exists.
- Identifier types match.
- The relevant dataset is available.
- Renamed records retain any required compatibility mapping.
- Restricted records are not being referenced by public responses.

Decide and document how unresolved references should appear in the
response.

## Security and publication review

Before introducing a new endpoint or dataset, review:

- Whether the data should be public.
- Whether read and write operations need different access rules.
- Whether responses expose unnecessary fields.
- Whether input validation covers supported operations.
- Whether errors disclose internal details.
- Whether caching is appropriate for the response.
- Whether limits are needed for expensive operations.
- Whether logs retain sensitive data.
- Whether downstream consumers can safely handle the output.

Treat client-side controls as interface behaviour, not service-side
authorisation.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Runtime, framework and platform services.
- [ ] Repository structure and application entry points.
- [ ] Local setup and supported tool versions.
- [ ] Exact endpoint inventory.
- [ ] Request and response contracts.
- [ ] Authentication and authorisation.
- [ ] Public and restricted data boundaries.
- [ ] Authoritative sources and identifiers.
- [ ] Storage and resource bindings.
- [ ] Caching and freshness behaviour.
- [ ] Browser cross-origin requirements.
- [ ] Deployment and environment separation.
- [ ] Domain and DNS configuration.
- [ ] Rollback and migration procedures.
- [ ] Monitoring and logging.
- [ ] Backup and restore arrangements.
- [ ] Known consumers and compatibility expectations.
- [ ] Tested operational and troubleshooting procedures.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No verified release history has been recorded in this project document.

For future changes, record:

- The date.
- The affected routes, datasets or infrastructure.
- Whether the change is compatible with existing consumers.
- The relevant commit or release.
- Any required consumer action.
- Any migration or rollback considerations.

Keep documentation updates distinct from service releases. Do not infer release dates from the date this record was drafted.
