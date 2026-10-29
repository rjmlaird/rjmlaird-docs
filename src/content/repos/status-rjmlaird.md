---
title: "Status"
slug: "status-rjmlaird"
description: "A live status console and JSON feed reporting current availability and response latency for selected RJM Laird websites and services."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "visitor"]
tags: ["status", "monitoring", "availability", "infrastructure"]
repository: "https://github.com/rjmlaird/status-rjmlaird"
liveUrl: "https://status.rjmlaird.co.uk"
owner: "Ryan Laird"
stack:
  - "Astro"
  - "TypeScript"
  - "Tailwind CSS"
  - "Cloudflare"
reviewStatus: "needs-review"
---

## Overview

Status provides a live view of availability and response latency for
selected services in the RJM Laird ecosystem.

It presents the results as:

- A public status console.
- A machine-readable JSON feed.

Checks run through the server-side application rather than being captured
as a static snapshot during deployment.

The browser refreshes the displayed results periodically without requiring
a full page reload.

### Intended users

- Visitors checking whether a service is currently responding.
- Maintainers investigating availability problems.
- Developers consuming the JSON status feed.
- Operators configuring independent monitoring.

### Scope

The supplied README describes checks for:

- The main website.
- Documentation.
- CV.
- Development website.
- The API health endpoint.

This is a selected service inventory, not a complete audit of every
RJM Laird hostname or application.

### What the results mean

The console reports the outcome of the checks performed.

A successful HTTP response does not establish that every page, feature,
integration or dataset is working.

Response latency reflects the check from its execution environment.
It is not necessarily representative of every visitor's connection.

### Verification status

This record is based on the supplied README.

The current implementation, deployed adapter, cache behaviour and
production check results have not been independently verified for
this record.

The README identifies Astro 4. Confirm the installed version before
applying examples from newer Astro projects.

## Live surfaces

| Surface | Destination | Purpose |
| --- | --- | --- |
| Status console | <https://status.rjmlaird.co.uk> | Public availability display |
| JSON feed | <https://status.rjmlaird.co.uk/api/status.json> | Machine-readable check results |
| Repository | <https://github.com/rjmlaird/rjmlaird-status> | Source and configuration |
| Documentation | <https://docs.rjmlaird.co.uk> | Technical and maintainer guidance |

Confirm the repository destination if the source is maintained under
a different name.

## Checked services

The authoritative service inventory is:

```text
src/lib/services.ts
```

The supplied README lists:

| Service | Checked destination | Documented success criterion |
| --- | --- | --- |
| Main website | `https://rjmlaird.co.uk` | HTTP 2xx or 3xx |
| Docs | `https://docs.rjmlaird.co.uk` | HTTP 2xx or 3xx |
| CV | `https://cv.rjmlaird.co.uk` | HTTP 2xx or 3xx |
| Dev | `https://dev.rjmlaird.co.uk` | HTTP 2xx or 3xx |
| API | `https://api.rjmlaird.co.uk/health` | Successful HTTP response and JSON `status` equal to `"ok"` |

Each check has a documented eight-second timeout.

### Inventory review

Review this list when services are moved, consolidated or retired.

In particular, determine whether CV and Dev should continue to be checked
as independent applications if their future role becomes redirecting to
the main website.

A successful redirect can demonstrate route availability without proving
that the former standalone application still exists.

### Classification ambiguity

The README's table accepts HTTP 2xx and 3xx for website checks.

Its prose also describes non-2xx responses as down.

Confirm the implementation's actual treatment of:

- Redirects.
- Redirect chains.
- HTTP 4xx and 5xx.
- Successful API responses with an unhealthy body.
- Invalid JSON.
- Network errors.

Document the implemented rules consistently before treating the public
labels as a stable contract.

## Status model

### Operational

The service meets its configured success criterion.

For the API health check, the README requires:

```text
res.ok && body.status === "ok"
```

### Degraded

The README describes degraded status as a service responding without
meeting its full health criterion.

Its example is an API response whose status value is not `"ok"`.

Confirm exactly which failures map to degraded rather than down.

### Down

The README associates down status with conditions such as:

- No response.
- Timeout.
- An unsuccessful HTTP response.

Review the redirect ambiguity described above.

### Overall state

The JSON feed includes an overall `state`.

The aggregation rule is not specified in the supplied README.

Verify how operational, degraded, down and failed-check conditions
combine before documenting overall-state semantics.

## Architecture

### Application

The README describes:

- Astro 4.
- Server-side rendering.
- Tailwind CSS.
- A Cloudflare adapter.
- Shared brand styling.

Do not copy static-output assumptions from the main website into this
project.

### Request flow

```text
Visitor requests the console
              ↓
Server performs configured checks
              ↓
Page renders current results
              ↓
Browser periodically requests /api/status.json
              ↓
Displayed results are updated in place
```

Verify whether the page and feed perform new checks independently or
share any runtime cache.

### Shared service definitions

Both the page and JSON feed read the same service inventory.

Adding a service should therefore start in:

```text
src/lib/services.ts
```

Do not maintain separate check lists in the page and endpoint.

### Dynamic routes

The README specifies:

```ts
export const prerender = false;
```

for both:

```text
src/pages/index.astro
src/pages/api/status.json.ts
```

These routes must execute at runtime.

A deployment that serves only a generated static snapshot does not
satisfy the documented design.

## Freshness and polling

### Browser refresh

The README specifies a 45-second polling interval.

The browser requests:

```text
/api/status.json
```

and patches the existing interface.

### Freshness limitations

A polling interval is not a guarantee that results are never older
than that interval.

Consider:

- Background-tab throttling.
- Network loss.
- Failed feed requests.
- Slow checks.
- Caching.
- A suspended browser.

The interface should make the last successful check time understandable.

### Failed refreshes

Verify how the implementation handles a failed poll.

Do not silently present old results as newly checked.

Distinguish:

- A monitored service being down.
- The status feed being unavailable.
- The browser being unable to refresh.

### Cache behaviour

The supplied README does not establish the feed's HTTP cache headers.

Review browser, platform and intermediary caching to ensure the
runtime-check design is preserved.

Do not assume `prerender = false` alone prevents every form of stale
delivery.

## Latency and signal display

### Signal bars

The README identifies signal-strength bars as a functional display
derived from response latency.

The mapping is implemented through:

```text
signalFromLatency
```

in:

```text
src/lib/services.ts
```

### Interpretation

The bars represent the configured latency mapping, not a measurement
of the visitor's Wi-Fi or mobile signal.

Document or expose enough context to avoid that ambiguity.

### Review areas

Check:

- Threshold values.
- Boundary conditions.
- Timeout handling.
- Whether failed requests receive a signal value.
- Whether latency includes redirects or response-body processing.
- How the bars are announced to assistive technology.

Do not infer thresholds from the sample feed.

## Machine-readable feed

### Endpoint

```http
GET /api/status.json
```

The feed is intended to expose the same status model as the console.

### Example response

The supplied README provides this shape:

```json
{
  "state": "operational",
  "checkedAt": "2026-07-03T17:40:49.673Z",
  "services": [
    {
      "id": "api",
      "name": "api.rjmlaird.co.uk",
      "state": "operational",
      "httpStatus": 200,
      "latencyMs": 96,
      "signal": 4,
      "detail": "2026-07-03T17:40:49.673Z"
    }
  ]
}
```

This is an illustrative response, not a current observation.

### Fields

| Field | Purpose |
| --- | --- |
| `state` | Overall status classification |
| `checkedAt` | Timestamp associated with the returned checks |
| `services` | Per-service results |
| `id` | Service identifier |
| `name` | Display name |
| Service `state` | Individual classification |
| `httpStatus` | Observed HTTP status where available |
| `latencyMs` | Recorded response latency |
| `signal` | Derived signal indicator |
| `detail` | Additional implementation-defined information |

Confirm nullable fields, missing-value behaviour and timestamp semantics
against the actual implementation.

### Consumer expectations

Consumers should:

- Validate the response.
- Check its age.
- Handle missing or unexpected fields.
- Distinguish feed failure from monitored-service failure.
- Avoid treating an old operational result as current.

Do not assume the endpoint's HTTP status encodes the aggregate service
state. Inspect and document that behaviour separately.

## Design system

### Documented appearance

The README describes:

- Navy surfaces.
- Teal operational indicators.
- Amber degraded indicators.
- A red down-state indicator.
- Space Grotesk and Inter typography.

The recorded colour values are:

```text
Navy: #0B0F1A
Teal: #00C2A8
Amber: #F5A623
Down: #FF5C6C
```

These are documented project values, not a guarantee of contrast in
every foreground and background combination.

### Shared identity

The site is intended to match the wider brand system.

The README does not establish an installed shared brand or UI package.

If adopting `rjmlaird-brand` or `rjmlaird-ui`, review the existing Tailwind
configuration, token ownership and component behaviour first.

### Status communication

Do not rely on colour alone.

Keep textual state labels, timestamps and latency information available
alongside visual indicators.

## Getting started

### Obtain the source

```bash
git clone [https://github.com/rjmlaird/rjmlaird-status.git](https://github.com/rjmlaird/rjmlaird-status.git)
cd rjmlaird-status
```

### Confirm prerequisites

Inspect:

- `package.json`.
- Lockfile.
- Runtime declarations.
- Astro configuration.
- Adapter version.
- Tailwind configuration.
- Service definitions.
- Platform configuration.

The supplied README does not specify the supported Node.js or npm
version.

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Use the address printed by the development server.

### Build

```bash
npm run build
```

Review the actual script for included checks.

Do not invent a test or lint command that is not defined in the repository.

### Local network effects

Development requests may perform real checks against the configured
public services.

Use controlled destinations when testing timeout and failure behaviour.

Do not change production service configuration merely to create a
test failure.

## Adding a service

Add the service definition in:

```text
src/lib/services.ts
```

Review the existing type and fields before editing.

For each service, establish:

- Stable identifier.
- Display name.
- Checked URL.
- Request method.
- Success criterion.
- Failure classification.
- Timeout.
- Any special response parsing.

Then verify:

1. The console includes the service.
2. The JSON feed includes it.
3. Operational behaviour is correct.
4. Failure behaviour is correct.
5. Overall-state aggregation remains appropriate.
6. The display remains accessible.

Keep checked destinations controlled by maintainers.

Do not turn the feed into an unrestricted user-supplied URL checker.

## Deployment

### Documented adapter

The README ships the site with:

```text
@astrojs/cloudflare
```

Its stated rationale refers to the wider ecosystem using Cloudflare.

That rationale is not verification of the current hosting configuration.

### Cloudflare setup

The README proposes:

```text
Build command: npm run build
Output directory: dist
Domain: status.rjmlaird.co.uk
```

Verify these settings against the installed Astro and Cloudflare adapter
versions.

Do not deploy only the static assets if the runtime rendering and
endpoint output are also required.

### Domain configuration

Configure the custom domain using the hosting platform's actual setup
procedure.

Inspect existing DNS and certificate configuration before changing
records.

The README's general CNAME/proxy instruction is not sufficient to identify
the correct target value.

### Other hosting platforms

The README mentions Vercel and Netlify as alternatives.

An adapter change requires review of:

- Runtime compatibility.
- Output structure.
- Environment variables.
- Deployment settings.
- Timeout behaviour.
- Caching.
- Endpoint execution.

Do not assume changing an import is the only required migration work.

### Pre-release checklist

- Review service URLs.
- Confirm success and failure classifications.
- Resolve redirect semantics.
- Check overall-state aggregation.
- Verify dynamic rendering.
- Verify feed cache behaviour.
- Test polling.
- Test stale and failed-refresh states.
- Review latency mapping.
- Check accessibility.
- Confirm runtime deployment output.
- Identify recovery options.

### Post-release verification

After deployment:

1. Open the console.
2. Inspect the JSON feed.
3. Confirm timestamps advance on fresh checks.
4. Confirm the intended services are checked.
5. Observe a browser refresh cycle.
6. Check network and runtime errors.
7. Verify the custom domain and certificate.
8. Test the deployed runtime rather than only build artifacts.

Use controlled tests for failure states.

Do not deliberately interrupt production services to test the console.

### Rollback

Document the actual platform rollback process.

Restore the relevant application version and configuration together.

After rollback, verify:

- Runtime execution.
- Feed freshness.
- Service inventory.
- Polling.
- Classification behaviour.

## Operations

### Live checks versus uptime history

The README describes current-state reporting.

It does not establish:

- Historical uptime percentages.
- Stored check results.
- An incident database.
- Maintenance notices.
- Alert delivery.
- A service-level commitment.

Do not label the site as a historical uptime system without implementing
and validating those capabilities.

### Independent monitoring

The README proposes adding an external monitor.

This remains a follow-up, not a confirmed integration.

An independent monitor should check the status service itself and
interpret feed freshness and health appropriately.

A monitor that only checks for HTTP 200 may miss an unhealthy aggregate
state or stale response.

### Availability boundary

If the status page shares infrastructure with monitored services, a
platform incident may affect both.

Do not assume the console remains available during every failure it
is intended to report.

### Incident communication

An incident log and maintenance notices are identified as optional
future work.

Until implemented, do not imply that the current page provides an
explanation or timeline for every failure.

### Routine maintenance

Review:

- Service inventory.
- Retired destinations.
- Redirect behaviour.
- Health-response contracts.
- Polling.
- Cache behaviour.
- Adapter support.
- Runtime limits.
- Accessibility.
- Independent monitoring coverage.

## Accessibility

Review:

- Textual status labels.
- Accessible signal descriptions.
- Contrast.
- Keyboard navigation.
- Focus visibility.
- Timestamp clarity.
- Responsive cards.
- Zoom behaviour.
- Reduced motion.
- Screen-reader handling of periodic updates.

Avoid repeatedly announcing the entire dashboard every 45 seconds if
only one result changed.

Do not move focus when background polling updates the interface.

## Troubleshooting

These are diagnostic starting points, not a record of tested incidents.

### A service is down here but works in a browser

Compare:

- Check location.
- Timeout.
- Redirect handling.
- Response status.
- Response body.
- Bot or access restrictions.
- DNS resolution.
- Health criterion.

A browser and the server-side checker may take different paths.

### The API is degraded despite returning HTTP 200

Inspect the body.

The documented API criterion also requires:

```text
status === "ok"
```

Check whether the API contract changed or is reporting a genuine problem.

### Redirecting sites are classified inconsistently

Inspect fetch redirect behaviour and classification code.

Resolve the difference between the README's acceptance of 3xx and its
description of non-2xx failures.

### Results stop updating

Check:

- Browser connectivity.
- Polling errors.
- Background-tab behaviour.
- Feed availability.
- Response parsing.
- Caching.
- Runtime errors.

Keep the last-successful timestamp visible.

### The console shows an old all-clear result

Check:

- Prerender settings.
- Platform output.
- Cache headers.
- CDN rules.
- Browser cache.
- Whether failed polls preserve old results without a warning.

### Signal bars look inconsistent with the displayed latency

Check:

- `signalFromLatency`.
- Thresholds.
- Units.
- Rendering.
- Whether both values came from the same response.

### Deployment succeeds but the endpoint does not run

Verify the adapter output and hosting integration.

A static upload alone cannot satisfy the documented server-rendered
check flow.

### An external monitor reports healthy while services are down

Check whether it validates:

- Feed body.
- Aggregate state.
- Check timestamp.
- Individual results.

Do not assume an HTTP-success response means every monitored service
is operational.

## Planned follow-ups

The README identifies:

- Independent external monitoring.
- Incident history.
- Maintenance notices.

Other review areas include:

- Explicit stale-result behaviour.
- Documented aggregation rules.
- Consistent HTTP-status classification.
- Cache verification.
- Updated service inventory.
- Automated failure-state tests.

These are follow-ups or verification tasks, not confirmed defects unless
reproduced.

## Maintainer review checklist

Before changing this record to `reviewed`, confirm:

- [ ] Repository destination.
- [ ] Astro and adapter versions.
- [ ] Runtime requirements.
- [ ] Active hosting platform.
- [ ] Service inventory.
- [ ] Redirect semantics.
- [ ] API response validation.
- [ ] Timeout handling.
- [ ] Degraded and down classifications.
- [ ] Overall-state aggregation.
- [ ] Timestamp meaning.
- [ ] Dynamic rendering.
- [ ] Feed cache headers.
- [ ] Polling and stale-result behaviour.
- [ ] Latency measurement and signal mapping.
- [ ] JSON response contract.
- [ ] Accessibility.
- [ ] Custom domain and TLS.
- [ ] Independent monitoring status.
- [ ] Incident-history status.
- [ ] Rollback procedure.

Set `lastReviewed` only after an actual maintainer review.

## Changelog

No dated release history has been supplied for this record.

The timestamp in the README's JSON example is sample output, not a
release date.

For future entries, record:

- The date.
- The relevant commit or deployment.
- Service-inventory changes.
- Classification or aggregation changes.
- Polling and cache changes.
- Feed-contract changes.
- Hosting or adapter changes.
- Monitoring and incident-communication additions.

Keep observed service incidents distinct from application releases.
