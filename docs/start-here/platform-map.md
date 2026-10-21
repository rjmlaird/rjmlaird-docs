---
title: Platform map
description: A high-level map of first-party services, integration boundaries and shared platform layers.
---

# Platform map

The platform is documented in layers so that shared design is not confused with a service implementation.

```mermaid
flowchart TD
  People[Visitors and contributors] --> Web[Public websites and documentation]
  Web --> Catalogues[Service and application catalogues]
  Catalogues --> APIs[Public read APIs and reference data]
  APIs --> Data[Canonical data and generated snapshots]
  Services[First-party services] <--> Integrations[External providers]
  Services --> Operations[Deployment, status and runbooks]
  Governance[Security, privacy and standards] -. applies across .-> Services
  Governance -. applies across .-> APIs
```

This is a conceptual map, not a live dependency graph. Check each [first-party service record](../catalogue/first-party/index.md) for lifecycle, dependencies and evidence. External vendors are recorded separately in the [integration catalogue](../catalogue/index.md#external-integrations).

## Where to find details

- Cross-cutting patterns: [platform architecture](../platform/overview.md).
- Hostnames, lifecycle and visibility: [subdomain governance](../platform/governance/subdomains.md) and the [generated catalogue](../catalogue/generated/subdomain-catalogue.md).
- API and data contracts: [build reference](../build/reference/http-contracts.md).
- Routine operational procedures: [runbooks](../operate/runbooks/secret-rotation.md).
