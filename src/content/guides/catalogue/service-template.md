---
title: Service documentation template
description: Reusable structure for documenting a first-party service.
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

# Service documentation template

Copy this structure into a new service record and replace every bracketed instruction. Do not invent URLs, owners, deployment status or dependencies; use `To confirm` where evidence is missing. Keep hostname, visibility and lifecycle aligned with `data/subdomains.json`.

```yaml
---
title: Service name
description: One-sentence purpose and scope.
owner: Team or named role
last_reviewed: YYYY-MM-DD
review_cycle: 6 months
visibility: public # public | restricted | internal
lifecycle: planned # active | planned | reserved | retired
confidence: Unverified
---
```

## Purpose and boundaries

What the service does, who it serves and what it explicitly does not do.

## At a glance

| Field | Value |
| --- | --- |
| Canonical URL | To confirm |
| Repository | To confirm |
| Owner | To confirm |
| Lifecycle and evidence | To confirm |

## Interfaces and data

Document public routes, API/event/webhook contracts, input/output data and trust boundaries. Link to canonical contract references rather than duplicating them. Never include secrets.

## Dependencies and integrations

List first-party dependencies and link external providers to their integration records. Include the consequence of a dependency failure.

## Security and privacy

Describe access control, data classification, retention and abuse controls at a level safe for public documentation.

## Operations

Link deployment, observability, incident response and relevant runbooks. State how to verify health and how to roll back, where confirmed.

## Related records

Link to relevant ADRs, architecture pages, contracts and related service records.
