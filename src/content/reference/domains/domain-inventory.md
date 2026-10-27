---
title: "Domain inventory"
description: "Inventory of public domains and service surfaces referenced by the documentation."
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
tags: ["domains", "dns", "reference"]
---
## Scope

This inventory is a starting point based on the repository and supplied restructuring brief. It is not a live DNS audit. Confirm ownership, DNS targets, hosting, TLS and renewal arrangements before relying on it for an operational change.

| Domain | Intended role | Verification |
|---|---|---|
| `rjmlaird.co.uk` | Main personal site | Needs review |
| `docs.rjmlaird.co.uk` | Documentation | Configured in repository via `CNAME`; verify deployment |
| `api.rjmlaird.co.uk` | API / data services | Needs review |
| `cv.rjmlaird.co.uk` | CV | Needs review |
| `labs.rjmlaird.co.uk` | Labs and experiments | Needs review |
| `dev.rjmlaird.co.uk` | Developer workbench | Needs review |
| `status.rjmlaird.co.uk` | Service status | Needs review |

## Change procedure

1. Identify the owning repository and service.
2. Confirm the intended DNS record and hosting target from the provider.
3. Record TTL, rollback value and verification steps before changing DNS.
4. Verify HTTPS, redirects and application health after the change.
5. Update this inventory and the project record.
