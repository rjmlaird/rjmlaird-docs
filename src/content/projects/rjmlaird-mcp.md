---
title: "MCP"
slug: "rjmlaird-mcp"
description: "Remote Model Context Protocol server on Cloudflare Workers for exposing explicitly defined tools to compatible AI clients."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["mcp", "ai", "tools", "integrations", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-mcp"
owner: "Ryan Laird"
stack:
  - "TypeScript"
  - "Cloudflare Workers"
reviewStatus: "needs-review"
---

## Overview

MCP is the project record for a remote Model Context Protocol server
maintained in `rjmlaird-mcp`.

The supplied README describes a Cloudflare Workers template that exposes
tools to compatible MCP clients without requiring authentication.

Its intended role is to provide an explicit, controlled interface between
AI clients and implemented application capabilities.

The actual tool inventory and any project-specific modifications require
repository review.

### Intended users

- Developers defining and maintaining MCP tools.
- Maintainers operating the remote server.
- Users connecting an approved MCP client.
- Application owners reviewing what capabilities are exposed.

### Scope

The supplied material establishes a template-based workflow for:

- Running an MCP server on Cloudflare Workers.
- Defining tools in `src/index.ts`.
- Connecting a remote MCP client.
- Connecting a local client through `mcp-remote`.
- Developing and deploying with Wrangler.

It does not establish:

- A confirmed production hostname.
- A verified list of implemented tools.
- Authentication or authorisation.
- Integration with other RJM Laird services.
- Persistent storage.
- Monitoring or rate limiting.
- A production-tested client compatibility matrix.

### Documentation status

This record is based on the supplied README and repository guidance.

The README retains generic example names and destinations. Those examples
should not be mistaken for deployed RJM Laird configuration.

Keep `reviewStatus` as `needs-review` until the source, configuration and
actual tool behaviour have been checked.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Repository | <https://github.com/rjmlaird/rjmlaird-mcp> | Source and development history |
| Production endpoint | Not yet recorded | Remote MCP connection |
| Local endpoint | `http://localhost:8787/mcp` | Template development endpoint |
| Cloudflare AI Playground | <https://playground.ai.cloudflare.com/> | Client described by the README |
| Documentation | <https://docs.rjmlaird.co.uk> | Project and integration guidance |

Add `liveUrl` once the actual production destination is confirmed.

The template hostname:

```text
remote-mcp-server-authless.<your-account>.workers.dev/mcp
```

is an example, not this project's recorded production URL.

## Template origin

The supplied README is titled:

```text
Building a Remote MCP Server on Cloudflare (Without Auth)
```

It includes this scaffolding command:

```bash
npm create cloudflare@latest -- my-mcp-server \
  --template=cloudflare/ai/demos/remote-mcp-authless
```

This creates a new example project.

Do not run it inside the existing repository as an installation or
upgrade procedure.

Before replacing template instructions, identify:

- Which template files remain unchanged.
- Which tools have been customised.
- Whether the project still runs without authentication.
- Which SDK and dependency versions are installed.
- Which deployment configuration is active.

## Architecture

### Components described by the README

| Component | Responsibility |
| --- | --- |
| Cloudflare Worker | Hosts the remote server |
| MCP server implementation | Registers and handles tools |
| `src/index.ts` | Template tool-definition location |
| MCP client | Discovers and invokes available tools |
| `mcp-remote` | Proxy used by the documented local-client example |
| Wrangler | Development, deployment and binding-type generation |

The exact SDK packages, classes and transport implementation require
source verification.

Do not infer the use of storage, Durable Objects or another platform
service solely from the template's purpose.

### Connection flow

```text
MCP client
    ↓
Configured /mcp endpoint
    ↓
Protocol handling
    ↓
Registered tool
    ↓
Validated operation
    ↓
Structured result or error
```

Where a tool calls another service, document that dependency separately.

### Tool registration

The supplied README directs contributors to define tools inside the
`init()` method in:

```text
src/index.ts
```

using:

```text
this.server.tool(...)
```

Confirm the installed SDK and supported registration API before adding
or changing tools.

Do not assume that examples from a different SDK version apply unchanged.

### Transport

The documented endpoint is:

```text
/mcp
```

The actual transport, session behaviour, supported protocol versions and
client requirements must be verified from the implementation.

Do not describe the server as supporting additional transports merely
because other MCP servers do.

## Tool inventory

No project-specific tool inventory was supplied.

For each implemented tool, record:

| Field | Information to document |
| --- | --- |
| Name | Exact registered tool name |
| Purpose | What it does |
| Inputs | Schema, required fields and constraints |
| Output | Result shape and interpretation |
| Side effects | Whether it changes external state |
| Dependencies | Services, bindings or datasets used |
| Access | Authentication and permission requirements |
| Limits | Payload, execution or upstream constraints |
| Errors | Expected failures and recovery guidance |
| Tests | Validation and integration coverage |

The `calculator` name in the README's client configuration is a local
configuration label. It is not sufficient evidence that the server
implements a calculator tool.

### Tool descriptions

Descriptions should explain:

- The operation.
- When it is appropriate to use.
- Required inputs.
- Important limitations.
- Whether it reads or changes information.

Do not claim capabilities that the implementation does not provide.

### Input validation

Validate inputs at the server boundary.

Review:

- Required and optional fields.
- Accepted types.
- Length and size constraints.
- Enumerations.
- URL and path handling.
- Resource identifiers.
- Unexpected fields.
- Invalid combinations.

Client-generated arguments must not bypass validation.

### Results and errors

Return results that allow the client to distinguish successful work
from a failed or incomplete operation.

Avoid presenting an upstream failure as a valid empty result unless
that behaviour is part of the documented contract.

Do not include secrets or unnecessary internal diagnostics in tool output.

## Authentication and authorisation

### Current baseline

The supplied template is explicitly authentication-free.

Unless the repository has since added protection, a reachable endpoint
must be treated as callable without a user sign-in.

Do not interpret the presence of a Worker hostname as an access-control
mechanism.

### Safe publication boundary

Before exposing a tool through an unauthenticated endpoint, review:

- The information it can read.
- The actions it can perform.
- The resources it can consume.
- The credentials it can exercise.
- Whether repeated calls could create cost or disruption.

Public availability of the documentation does not justify public access
to private capabilities.

### Side-effecting tools

Before introducing tools that create, update, send or delete information,
establish:

- Caller identity.
- Authorisation.
- Scope restrictions.
- Confirmation requirements where appropriate.
- Duplicate-request behaviour.
- Auditability.
- Recovery or reversal options.

Do not rely solely on an AI client's user-interface confirmation to
protect the server operation.

### Relationship to rjmlaird-auth

Integration with `rjmlaird-auth` is not established by the supplied
material.

Do not assume a browser session cookie automatically provides a suitable
authentication mechanism for every remote MCP client.

Any integration must account for the actual client, protocol and
credential flow.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-mcp.git](https://github.com/rjmlaird/rjmlaird-mcp.git)
cd rjmlaird-mcp
```

Confirm the repository destination if it has not yet been published
under that name.

### Inspect the repository

Review:

- `README.md`.
- `AGENTS.md` or the equivalent repository guidance.
- `package.json`.
- The committed lockfile.
- Runtime declarations.
- `src/index.ts`.
- `wrangler.jsonc`.
- Test configuration.
- Example environment files.
- Deployment workflows.

Use the package manager and installation procedure declared by the
repository.

No project-specific dependency-install command was supplied.

### Local development

The repository guidance specifies:

```bash
npx wrangler dev
```

The README's local MCP example uses:

```text
http://localhost:8787/mcp
```

Confirm the address printed by Wrangler and verify that `/mcp` is the
configured route.

### Generate binding types

After changing bindings in `wrangler.jsonc`, run:

```bash
npx wrangler types
```

Review and include the generated changes according to repository policy.

Generated types do not replace runtime binding configuration.

### Checks

Inspect `package.json` and the test configuration for the available
validation commands.

Do not invent `test`, `lint`, `typecheck` or build scripts that have not
been confirmed.

Before deployment, identify and run the checks actually provided.

## Current-documentation requirement

The repository guidance requires contributors to retrieve current
Cloudflare documentation before working on platform APIs or limits.

Apply this requirement to work involving:

- Workers.
- KV.
- R2.
- D1.
- Durable Objects.
- Queues.
- Vectorize.
- Workers AI.
- Agents SDK.
- Workflows.

### Reference destinations

Repository guidance identifies:

- Workers:
  <https://developers.cloudflare.com/workers/>
- Cloudflare MCP documentation:
  <https://docs.mcp.cloudflare.com/mcp>
- Node.js compatibility:
  <https://developers.cloudflare.com/workers/runtime-apis/nodejs/>
- Worker errors:
  <https://developers.cloudflare.com/workers/observability/errors/>

Retrieve current product-specific documentation when changing the
implementation.

### Limits

For limits and quotas, consult the relevant product's current
`/platform/limits/` documentation.

Do not copy numerical limits from memory or assume that another
environment has the same allowances.

### Conditional best practices

If the implementation uses Durable Objects, consult:

<https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/>

If it uses Workflows, consult:

<https://developers.cloudflare.com/workflows/build/rules-of-workflows/>

The presence of these references in repository guidance does not prove
that either product is used.

## Connecting a client

### Confirm the endpoint first

Obtain the actual deployed endpoint from the Worker configuration or
deployment output.

Use:

```text
https://<confirmed-hostname>/mcp
```

Do not leave template account names in published configuration.

### Cloudflare AI Playground

The supplied README describes this workflow:

1. Open <https://playground.ai.cloudflare.com/>.
2. Enter the deployed MCP endpoint.
3. Connect to the server.
4. Inspect the tools actually returned.
5. Test a harmless operation.

Confirm that the client currently supports the server's transport and
configuration.

Do not test an unfamiliar side-effecting tool merely to verify that
the connection works.

### Claude Desktop through mcp-remote

The README describes using `mcp-remote` as a proxy for a local client.

Its example can be adapted to identify this project clearly:

```json
{
  "mcpServers": {
    "rjmlaird-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/mcp"
      ]
    }
  }
}
```

This example is valid JSON and contains no inline comments.

For a deployed server, replace the local URL with the confirmed HTTPS
endpoint.

Follow the client's current configuration instructions. Merge this entry
into existing configuration rather than overwriting unrelated servers.

Restart or reconnect the client as required by its current behaviour.

### Proxy dependency

The README example resolves `mcp-remote` through `npx`.

Before adopting it as a maintained production integration:

- Verify the package and supported version.
- Consider version pinning.
- Review local runtime requirements.
- Review package execution and update behaviour.
- Test the intended endpoint.

Do not describe the proxy as a dependency of the Worker unless the
repository actually declares it there.

## Configuration

### Worker configuration

Review `wrangler.jsonc` for:

- Worker name.
- Entry point.
- Compatibility date.
- Compatibility flags.
- Bindings.
- Routes.
- Environment-specific settings.
- Observability settings.

Do not infer a custom hostname such as `mcp.rjmlaird.co.uk` unless it
has been deliberately configured.

### External integrations

For each tool calling another service, document:

- Destination.
- Authentication.
- Required bindings or variables.
- Request and response contract.
- Timeout behaviour.
- Error handling.
- Usage restrictions.
- Whether the operation changes state.

A service credential must not grant unauthorised callers unrestricted
access through a public tool.

### Secrets

Keep secrets out of:

- Source control.
- Public configuration.
- Tool descriptions.
- Tool results.
- Logs.
- Client examples.

Use the configured secret mechanism and document names and purposes
without publishing values.

### Node.js compatibility

If dependencies require Node.js APIs, review the current Cloudflare
compatibility documentation and actual Worker settings.

Do not enable broad compatibility options simply to suppress an error
without understanding the dependency.

## Deployment

### Deploy

The repository guidance specifies:

```bash
npx wrangler deploy
```

Confirm the account, Worker name, bindings and public routes first.

### Pre-release checklist

- Review current Cloudflare documentation relevant to the change.
- Confirm the deployment target.
- Inspect the tool inventory.
- Classify tools as read-only or side-effecting.
- Review authentication and authorisation.
- Check input validation.
- Check output for sensitive information.
- Run available tests and checks.
- Test the intended client transport.
- Review bindings and secrets.
- Identify a recovery route.

### Post-release verification

After deployment:

1. Confirm the intended endpoint.
2. Connect using a compatible client.
3. Inspect the reported tool list.
4. Invoke a harmless representative tool.
5. Verify output.
6. Test invalid input.
7. Check failure behaviour.
8. Review available logs.
9. Confirm that unintended capabilities are not exposed.

Do not use a normal browser GET response as the sole test of an MCP
endpoint.

### Rollback

Document the deployed Worker's actual rollback process.

Before release, identify:

- The previous known-good revision.
- Its bindings and compatibility settings.
- Its tool names and schemas.
- Whether consumers require coordinated changes.
- Whether any tool execution changed persistent data.

Rolling back server code does not reverse external actions already
performed by tools.

## Operations

### Ownership

Ryan Laird owns the service scope and publication decisions.

Maintainers are responsible for keeping exposed capabilities explicit,
validated and appropriately restricted.

### Routine checks

Review:

- Endpoint availability through a compatible client.
- Tool discovery.
- Representative tool execution.
- Validation and error behaviour.
- Dependency compatibility.
- Upstream integrations.
- Credentials and permissions.
- Resource consumption.
- Public exposure.

### Monitoring

No dedicated health endpoint, alerting provider or monitoring arrangement
is established by the supplied material.

If monitoring is added, distinguish:

- Worker availability.
- Protocol negotiation.
- Tool discovery.
- Tool execution.
- Upstream dependencies.

Avoid repeatedly invoking expensive or side-effecting tools as health
checks.

### Logging

Log enough context to diagnose failures without recording unnecessary
sensitive material.

Review whether logs contain:

- Tool arguments.
- Personal information.
- External-service responses.
- Credentials.
- Generated content.
- Internal identifiers.

Do not assume that all tool inputs are suitable for retention.

### Incident response

For unintended exposure, tool abuse or integration failure:

1. Identify affected tools and callers where possible.
2. Restrict or disable the affected capability.
3. Rotate exposed credentials.
4. Determine whether external state changed.
5. Restore a controlled service configuration.
6. Verify the tool inventory and permissions.
7. Record the cause and preventive work.

Disabling a tool prevents future calls but does not undo completed actions.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### The client cannot connect

Check:

- The exact endpoint, including `/mcp`.
- Local versus deployed destination.
- Worker availability.
- HTTPS configuration for production.
- Client transport support.
- Proxy configuration.
- Network or access restrictions.

Inspect protocol and client errors rather than assuming the URL should
render a web page.

### The client connects but shows no tools

Check:

- Tool registration executes.
- The expected source revision is deployed.
- The SDK API matches the installed version.
- Initialisation succeeds.
- The client has refreshed its tool inventory.
- The endpoint is the intended server.

### A tool rejects valid-looking arguments

Compare the client arguments with the server's actual schema.

Check:

- Required fields.
- Types.
- Enumerated values.
- Bounds.
- Optional and null behaviour.
- Schema changes since the client connected.

Do not weaken validation simply to accept an incorrect call.

### An upstream request fails

Check:

- Destination.
- Credentials.
- Binding configuration.
- Request format.
- Service permissions.
- Timeout behaviour.
- Upstream response.

Distinguish authentication failures, invalid requests and temporary
service failures in the returned error.

### Claude Desktop does not load the configuration

Check:

- The current configuration location.
- Valid JSON syntax.
- Existing server entries.
- Availability of `npx`.
- Proxy-package resolution.
- Endpoint accuracy.
- Client restart or reconnect requirements.

Do not include comments inside strict JSON.

### Binding types are out of date

After changing `wrangler.jsonc`, run:

```bash
npx wrangler types
```

Then run the repository's available checks.

Also verify the runtime binding. Correct generated types do not create
the remote resource.

### Worker error 1102 occurs

The repository guidance identifies error 1102 as a CPU or memory limit
issue.

Retrieve the current Worker limits and error documentation before
diagnosing it.

Inspect the tool's workload and resource usage. Do not assume a fixed
limit or that retrying will resolve an excessive operation.

## Known limitations and review areas

The supplied template is authentication-free.

The supplied material does not establish:

- Custom production tools.
- A production endpoint.
- Authentication or role enforcement.
- Request throttling.
- Usage quotas.
- Persistent storage.
- Monitoring.
- A tested client compatibility matrix.
- A release and deprecation policy.

Treat these as unverified capabilities, not necessarily absent features
in the current source.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository destination.
- [ ] Template modifications.
- [ ] Worker configuration.
- [ ] Installed SDK and dependency versions.
- [ ] Transport and protocol behaviour.
- [ ] Production endpoint.
- [ ] Implemented tool inventory.
- [ ] Input and output schemas.
- [ ] Read-only versus side-effecting classification.
- [ ] Authentication and authorisation.
- [ ] Public exposure and abuse controls.
- [ ] External integrations and credential scope.
- [ ] Runtime compatibility settings.
- [ ] Binding types.
- [ ] Available tests and check results.
- [ ] Cloudflare client compatibility.
- [ ] Claude Desktop or other intended client compatibility.
- [ ] Proxy distribution and versioning.
- [ ] Logging and data handling.
- [ ] Deployment and rollback procedures.
- [ ] Incident response.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this project record.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Added, changed or removed tools.
- Input and output schema changes.
- Access-control changes.
- Required client updates.
- External-service or binding changes.
- Any side-effect or compatibility implications.

Keep template provenance, documentation revisions and deployed releases
distinct.
