---
title: "Auth"
slug: "rjmlaird-auth"
description: "Central GitHub sign-in and shared application sessions for the RJM Laird ecosystem."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["authentication", "oauth", "sessions", "security", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-auth"
liveUrl: "https://auth.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["TypeScript", "Cloudflare Workers", "Hono", "Workers KV"]
reviewStatus: "needs-review"
---

## Overview

Auth provides central sign-in for applications in the RJM Laird ecosystem.

Users sign in with GitHub through `auth.rjmlaird.co.uk`. The service
creates an application session and sets a cookie shared across
`rjmlaird.co.uk` and its subdomains.

Participating applications can then ask the service who the visitor is
without implementing their own GitHub OAuth flow.

Access is restricted to configured GitHub usernames. The service supports
two application roles: `admin` and `user`.

### Intended users

- Approved users signing in to participating applications.
- Developers integrating application-level authentication.
- Maintainers managing access, deployment and operational security.

### Scope

The implementation described by the repository README includes:

- GitHub OAuth sign-in.
- Username-based access lists.
- Shared session cookies.
- Session storage in Workers KV.
- Session lookup.
- Sign-out.
- An account page.
- A liveness endpoint.
- A client package for Worker integrations.
- Hono authentication middleware.

This record is based on the supplied README. The deployed configuration,
source implementation and test results still require maintainer review.

### Authentication and authorisation

A successful sign-in establishes an identity and an assigned role.

Each consuming application remains responsible for deciding what that
identity is permitted to do.

Do not treat the presence of a session as sufficient permission for every
operation. Enforce the relevant role and resource-level rules on the server.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Account page | <https://auth.rjmlaird.co.uk> | Current sign-in state |
| Repository | <https://github.com/rjmlaird/rjmlaird-auth> | Implementation and development history |
| Documentation | <https://docs.rjmlaird.co.uk> | Integration and maintainer guidance |
| Client package | `@rjmlaird/auth-client` | Session lookup and integration helpers |

The client source is described as residing in `packages/client`.

Package publication and distribution should be verified before adding
an installation instruction to a consuming repository.

## Architecture

### Components

| Component | Responsibility |
| --- | --- |
| Cloudflare Worker | Hosts the authentication service |
| Hono | Application routing |
| GitHub OAuth | External identity-provider flow |
| Workers KV | Session and OAuth-state storage |
| Shared cookie | Carries the opaque session token |
| Client package | Session lookup and integration helpers |
| Hono middleware | Authentication and role enforcement for consumers |

### Sign-in flow

```text
Browser opens a participating application
                    ↓
Application finds no valid session
                    ↓
Browser redirects to auth /login?redirect=…
                    ↓
GitHub OAuth sign-in
                    ↓
GitHub login checked against configured access lists
                    ↓
Session stored in KV
                    ↓
Shared session cookie set
                    ↓
Browser returns to the validated destination
```

### Session lookup flow

```text
Browser sends shared cookie to an application
                    ↓
Application Worker passes the session cookie to Auth
                    ↓
Auth looks up the session
                    ↓
Application receives the identity and role
                    ↓
Application applies its authorisation rules
```

A Worker service binding is the recommended integration path described
by the README. Without a binding, the client uses the public session
endpoint.

### Trust boundary

The session cookie is shared across the parent domain and its subdomains.

Every application hosted within that cookie boundary must therefore be
treated as part of the authentication trust boundary.

Do not host untrusted applications or third-party-controlled content on
a subdomain that participates in this shared-cookie arrangement.

## Session model

### Cookie

The README specifies:

| Property | Value |
| --- | --- |
| Name | `__Secure-rjm_session` |
| Domain | `.rjmlaird.co.uk` |
| HttpOnly | Enabled |
| Secure | Enabled |
| SameSite | `Lax` |
| Lifetime | Seven days |

The cookie contains an opaque random token rather than a user profile.

Applications should obtain the current session through the authentication
service instead of trying to interpret the token.

### Session storage

Session cookie values are described as random 256-bit tokens.

KV session keys use the SHA-256 hash of the token:

```text
auth:v1:session:<hash>
```

This means the KV key does not contain the usable session token itself.

The exact stored session fields, expiry implementation and any renewal
behaviour should be checked against the source before documenting them
as a stable contract.

### OAuth state

OAuth state is described as:

- Single-use.
- Stored in KV.
- Retained for ten minutes.
- Bound to the initiating browser using a `__Host-` cookie.

State keys use:

```text
auth:v1:state:<state>
```

Do not remove state validation or browser binding to bypass a callback
error.

### Consistency

Workers KV is eventually consistent.

Session creation, lookup and deletion may therefore be affected by
propagation between locations.

The README notes that a newly created session may take approximately
a minute to become visible elsewhere. Treat this as an implementation
consideration, not a guaranteed maximum delay.

Review the deployed behaviour before relying on immediate cross-location
session availability or revocation.

The README identifies Durable Objects or D1 as possible future
alternatives if session consistency becomes a practical problem.

## Access control

### Allowed GitHub users

Access is controlled by:

| Setting | Assigned role |
| --- | --- |
| `ADMIN_GITHUB_USERS` | `admin` |
| `ALLOWED_GITHUB_USERS` | `user` |

The README states that the admin configuration defaults to `rjmlaird`.

Before deployment, verify:

- The configured usernames.
- The expected list format.
- Username normalisation.
- Behaviour when a username appears in both lists.
- Behaviour when an existing session outlives an access-list change.

Do not assume that editing an access list immediately invalidates
previously issued sessions. Confirm the implementation.

### Application permissions

Consumers must enforce their own operation-specific permissions.

Examples include distinguishing:

- Read access from write access.
- General users from administrators.
- Access to an application from access to an individual record.

Apply these checks to the actual server-side operation, not only to
navigation or button visibility.

## Endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Account page showing signed-in or signed-out state |
| `GET` | `/login?redirect=<url>` | Starts GitHub sign-in |
| `GET` | `/callback` | Handles the GitHub OAuth callback |
| `POST` | `/logout` | Deletes the session and clears the cookie |
| `GET` | `/session` | Returns authentication state and session information |
| `GET` | `/health` | Liveness check |

### Login

The `redirect` query parameter identifies the destination to return to
after sign-in.

Redirect destinations are restricted to approved origins. Do not bypass
validation or send users to arbitrary request-supplied URLs.

### Session

The documented response shape is:

```text
{ authenticated, session }
```

The README specifies `no-store` behaviour for this endpoint and CORS
support for approved RJM Laird origins.

The complete session schema requires source verification. Do not
document unverified fields as part of the public contract.

### Logout

Logout requires:

- A `POST` request.
- An allowed `Origin`.
- The session cookie, where present.

An optional `redirect` form field specifies the destination afterwards.

Logout changes session state. Do not invoke it as a monitoring request
or through an ordinary navigation link.

### Health

`GET /health` is the documented liveness route.

A successful liveness response does not, by itself, establish that
GitHub OAuth, session persistence and every consumer integration are
working.

## Origin and redirect policy

The README allows:

- `https://rjmlaird.co.uk`
- HTTPS subdomains of `rjmlaird.co.uk`
- Localhost in development

Verify the exact implementation before treating this as a complete
origin-matching specification.

Review:

- Hostname-boundary matching.
- Protocol restrictions.
- Localhost handling.
- Development versus production settings.
- Redirect validation.
- Credentialed browser requests.
- Logout-origin validation.

CORS configuration is not a substitute for application authorisation.

## KV namespace

The service uses an existing KV namespace named:

```text
rjmlaird-auth
```

The namespace also contains other keys.

This Worker is described as reading and writing only keys beginning with:

```text
auth:v1:
```

### Operational constraints

Before deployment or maintenance:

- Confirm the namespace binding points to the intended environment.
- Check that no unrelated service uses the same prefix.
- Preserve unrelated keys.
- Do not clear the whole namespace to resolve an authentication problem.
- Scope any inspection or deletion to the documented key families.

The namespace identifier is intentionally not repeated here. Use the
deployment configuration as the source of truth for the actual binding.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-auth.git](https://github.com/rjmlaird/rjmlaird-auth.git)
cd rjmlaird-auth
```

### Repository locations

The README identifies:

```text
apps/auth/
├── wrangler.toml
└── .dev.vars.example

packages/client/
```

Verify the remaining repository structure, supported Node.js version
and required pnpm version before development.

### Install dependencies

From the repository root:

```bash
pnpm install
```

### Create GitHub OAuth applications

Create separate GitHub OAuth applications for production and development.

| Environment | Callback URL |
| --- | --- |
| Production | `https://auth.rjmlaird.co.uk/callback` |
| Development | `http://localhost:8790/callback` |

Keep the client ID and client secret for each environment distinct.

### Configure access

Review:

```text
apps/auth/wrangler.toml
```

Confirm `ADMIN_GITHUB_USERS` contains the intended administrator login.

Add approved non-administrator users to `ALLOWED_GITHUB_USERS` using
the format supported by the configuration.

### Configure local development

From the repository root:

```bash
cp apps/auth/.dev.vars.example apps/auth/.dev.vars
```

Fill the local file with the development OAuth application values.

Do not commit `.dev.vars` or copy production secrets into documentation.

Start the development service:

```bash
pnpm dev
```

The README specifies:

```text
http://localhost:8790
```

### Checks

The README lists:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm format
```

Review formatting changes before committing them.

These commands are documented by the README; this project record does
not claim that they have been executed successfully during its preparation.

## Production configuration

### Authenticate the deployment tooling

```bash
cd apps/auth
pnpm exec wrangler login
```

### Set production OAuth secrets

Use the production GitHub OAuth application's values:

```bash
pnpm exec wrangler secret put GITHUB_CLIENT_ID
pnpm exec wrangler secret put GITHUB_CLIENT_SECRET
```

Enter values through the prompts rather than recording secrets in
committed files or example commands.

### Confirm bindings and variables

Before deployment, review:

- Worker name.
- KV namespace binding.
- OAuth configuration.
- Administrator and allowed-user lists.
- Production hostname.
- Development-only allowances.
- Any additional variables declared by the implementation.

## Deployment

### Deploy

From the repository root:

```bash
pnpm deploy
```

### Custom Domain

The README describes the authentication hostname as a Cloudflare Worker
Custom Domain, with DNS and certificate provisioning managed through
that configuration.

It also states that `auth.rjmlaird.co.uk` must not already have a DNS
record when establishing the Custom Domain.

Before changing existing DNS:

1. Inspect the current configuration.
2. Confirm the intended Worker and account.
3. Identify any existing service using the hostname.
4. Preserve the information needed to restore it.
5. Follow the deployment configuration rather than deleting records
   indiscriminately.

### Pre-release checklist

- Confirm the deployment account and target.
- Review the source revision.
- Run tests, type checks and linting.
- Confirm OAuth callback URLs.
- Confirm production secrets.
- Review allow-lists.
- Check the KV namespace and key-prefix ownership.
- Check redirect and origin validation.
- Identify recovery options.

### Post-release verification

Using an approved test account:

1. Check `/health`.
2. Open the account page.
3. Start sign-in with an approved redirect.
4. Complete the GitHub flow.
5. Confirm return to the intended destination.
6. Check `/session`.
7. Confirm the expected identity and role.
8. Test a participating application.
9. Sign out using a form POST.
10. Confirm subsequent access behaves as intended.

Also test rejection behaviour for unapproved users and redirect
destinations using controlled test cases.

### Rollback

Document the deployed Worker's actual rollback mechanism.

Before release, identify:

- The previous known-good version.
- Its configuration.
- Compatibility with existing session records.
- Whether secrets or bindings changed.
- Whether consumers require coordinated recovery.

Rolling back code does not automatically undo configuration changes
or restore deleted KV data.

## Integrating another Worker

### Add a service binding

In the consuming Worker's `wrangler.toml`:

```toml
[[services]]
binding = "AUTH"
service = "rjmlaird-auth"
```

The README recommends this path to avoid routing session lookups through
the public hostname.

Confirm that the binding targets the intended authentication environment.

### Use the client

```ts
import {
  getSession,
  loginUrl,
} from "@rjmlaird/auth-client";

export default {
  async fetch(
    request: Request,
    env: { AUTH: Fetcher },
  ) {
    const session = await getSession(request, {
      binding: env.AUTH,
    });

    if (!session) {
      return Response.redirect(loginUrl(request.url), 302);
    }

    return new Response(
      `Hello ${session.name ?? session.login}`,
    );
  },
};
```

This example follows the README's Worker integration.

Ensure the consuming project's TypeScript configuration includes the
required Cloudflare runtime types.

### HTTP fallback

Without a service binding, the client is described as calling:

```text
[https://auth.rjmlaird.co.uk/session](https://auth.rjmlaird.co.uk/session)
```

Confirm that the relevant cookie is forwarded and that upstream failures
are handled appropriately.

Do not turn an authentication-service failure into an authenticated
session.

## Hono integration

The README provides role-aware middleware:

```ts
import {
  requireAuth,
} from "@rjmlaird/auth-client/hono";

app.use(
  "*",
  requireAuth({
    role: "admin",
    getOptions: (c) => ({
      binding: c.env.AUTH,
    }),
  }),
);

app.get("/", (c) =>
  c.text(`Hi ${c.get("session").login}`),
);
```

This example protects every matching route with the administrator
requirement.

Scope middleware deliberately if the application also has public routes.

The README states that:

- Browser callers are redirected to sign-in.
- API callers receive a `401` JSON response when authentication is required.

Verify the caller-detection behaviour and the response used for
authenticated users with insufficient permissions.

The example assumes the consuming application has configured the
necessary Hono and environment types.

## Browser integration

A page within the approved origin policy can request the current session:

```js
const response = await fetch(
  "[https://auth.rjmlaird.co.uk/session](https://auth.rjmlaird.co.uk/session)",
  {
    credentials: "include",
    cache: "no-store",
  },
);

if (!response.ok) {
  throw new Error("Unable to check the current session.");
}

const { authenticated, session } = await response.json();
```

Use the result to present the current sign-in state.

Do not use browser-side state as the sole protection for restricted data
or actions. The server handling the operation must validate the session
and permissions.

Distinguish a failed session request from a confirmed signed-out response.

## Sign-out integration

Use a form POST:

```html
<form
  method="post"
  action="[https://auth.rjmlaird.co.uk/logout](https://auth.rjmlaird.co.uk/logout)"
>
  <input
    type="hidden"
    name="redirect"
    value="[https://rjmlaird.co.uk/](https://rjmlaird.co.uk/)"
  />

  <button type="submit">Sign out</button>
</form>
```

Replace the return destination with an appropriate approved URL.

Do not implement logout as a GET link.

## Client distribution

The README describes `packages/client` as a small, zero-dependency
package.

It proposes copying the client source or depending on it from Git.

Before documenting a dependency declaration as supported, verify:

- The consuming package manager.
- Subdirectory-package support.
- Whether compiled output is required.
- Package exports.
- Version or commit pinning.
- CI access for private repositories.

Do not assume that Git subdirectory dependency syntax is portable across
package managers.

If the client is copied into another repository, record its source
revision and an update process to avoid unmanaged divergence.

## Security considerations

### Shared-subdomain trust

The shared session cookie makes participating subdomains part of a
common trust boundary.

Review new subdomains and third-party hosting arrangements before
placing them beneath that boundary.

### Cookie handling

Do not log session cookie values.

Preserve the intended security attributes when setting or clearing the
cookie.

Check that sign-out clears the same cookie scope used during sign-in.

### Session responses

Keep session responses out of shared caches.

Do not persist authenticated identity responses in public build output,
static files or logs.

### OAuth state

Preserve state validation, expiry and browser binding.

Because state is stored in KV, review whether the implementation provides
the required single-use behaviour under concurrent requests and
cross-location access. A stated single-use intent should be checked
against the storage and validation logic.

### Access changes

Establish how access-list changes affect existing sessions.

The README does not describe a completed revoke-all-sessions capability.

Do not assume that removing a username from configuration immediately
revokes every active session.

### Rate limiting

The README identifies rate limiting as not yet implemented and suggests
a Cloudflare rule on `/login`.

Track this as follow-up work, not an existing protection.

## Operations

### Routine checks

Review:

- `/health`.
- OAuth sign-in.
- Session lookup.
- Logout.
- Role enforcement.
- Redirect rejection.
- Origin handling.
- KV bindings.
- Client compatibility.
- Dependency and runtime support.

A successful health check is not a substitute for testing the sign-in
journey.

### Logging

Keep logs useful without recording:

- Session tokens.
- OAuth client secrets.
- OAuth authorisation codes.
- Unnecessary personal information.
- Sensitive request headers.

Review callback and redirect logging for accidental credential exposure.

### Recovery

Preserve the configuration and access required to redeploy the Worker.

Document how users recover from lost or invalid sessions by signing in
again.

Do not export active session data into unsecured backups or documentation.

### Incident response

For suspected compromise:

1. Identify affected credentials, sessions and applications.
2. Restrict access where needed.
3. Rotate exposed OAuth or deployment credentials.
4. Determine the required session invalidation action.
5. Scope KV changes to the authentication prefix.
6. Verify consumer behaviour.
7. Record the cause and follow-up work.

Do not clear unrelated data from the shared namespace.

## Troubleshooting

These checks follow the documented architecture. They are not a claim
that every recovery procedure has been tested.

### GitHub rejects the callback

Check:

- The environment's OAuth application.
- The configured callback URL.
- The client ID and secret.
- Hostname and protocol.
- Whether production and development credentials were mixed.

### A user is rejected after GitHub sign-in

Check:

- The returned GitHub login.
- The configured access lists.
- The deployed configuration.
- Username parsing and normalisation.

Successful GitHub authentication does not itself grant application access.

### Sign-in succeeds but another application appears signed out

Check:

- Cookie domain and attributes.
- HTTPS use in production.
- Whether the browser sends the cookie.
- Whether the consumer forwards it.
- The service binding target.
- Session expiry.
- KV propagation.

Do not assume every instance of this symptom is a consistency delay.

### Logout fails

Check:

- The request uses `POST`.
- The `Origin` is allowed.
- The cookie is included.
- The redirect is approved.
- Cookie clearing matches the original scope.
- Session deletion and lookup behaviour.

### A browser session request fails

Check:

- The requesting origin.
- Credential inclusion.
- CORS response headers.
- Redirects.
- The actual response status.
- Network and service availability.

Do not broaden the origin policy indiscriminately.

### Local sign-in fails

Check:

- The development OAuth application's callback is
  `http://localhost:8790/callback`.
- `.dev.vars` contains the development credentials.
- The service is running on the expected port.
- Localhost is allowed in the development configuration.
- Local cookie handling matches the implementation.

### A service binding fails

Check:

- The binding name is `AUTH`.
- The target service is `rjmlaird-auth`.
- The consuming code uses the same environment binding.
- The target environment is correct.
- Both applications have compatible configuration.

## Known limitations and planned work

The README identifies the following as not yet built:

- Revoke all sessions for an individual user.
- Rate limiting.
- Additional identity providers.

Additional review areas include:

- KV consistency and revocation behaviour.
- Concurrent OAuth-state handling.
- Session-schema compatibility.
- Access-list changes affecting existing sessions.
- A verified client distribution process.
- Automated integration tests across consumers.

Do not describe these review areas as confirmed defects or completed
features without inspecting the implementation.

## Relationship to Cloudflare Access

Cloudflare Zero Trust Access is identified in the README as an alternative
when the requirement is to gate an entire internal application.

This repository serves a different purpose: application-level sessions
that consuming code can inspect and use.

Document the actual protection model for each consumer. Do not assume
that using this service also places an application behind Cloudflare
Access.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Source matches the supplied README.
- [ ] Production OAuth configuration.
- [ ] Development OAuth configuration.
- [ ] Access-list parsing and precedence.
- [ ] Session schema and expiry.
- [ ] Shared-cookie behaviour.
- [ ] OAuth-state validation and concurrency behaviour.
- [ ] Redirect and origin validation.
- [ ] Logout enforcement.
- [ ] KV namespace and prefix ownership.
- [ ] Cross-location consistency behaviour.
- [ ] Service-binding integration.
- [ ] Client distribution and versioning.
- [ ] Browser integration.
- [ ] Hono middleware behaviour.
- [ ] Role enforcement in consumers.
- [ ] Test, type-check and lint results.
- [ ] Deployment and rollback procedures.
- [ ] Logging and incident-response arrangements.
- [ ] Rate-limiting follow-up.
- [ ] Session-revocation follow-up.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this project record.

For future entries, record:

- The date.
- The affected endpoint, client or configuration.
- Security and compatibility implications.
- The relevant commit or deployment.
- Required consumer changes.
- Whether existing sessions are affected.

Keep documentation revisions distinct from deployed authentication
changes.
