---
title: Terminology
description: Shared terms used throughout the RJM Laird platform documentation.
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

# Terminology

| Term | Meaning |
| --- | --- |
| **First-party service** | A capability operated as part of the RJM Laird platform, with an owner, purpose, interfaces, dependencies and operational considerations. |
| **External integration** | A vendor, product or connected system on which a first-party service depends. |
| **Canonical source** | The one maintained source from which repeated facts or generated output are derived. |
| **ADR** | Architecture Decision Record: a durable record of a significant decision, its context, options and consequences. |
| **Runbook** | A concrete procedure for a routine operational task, incident or failure mode. |
| **Contract** | A versioned or otherwise explicit interface definition for HTTP APIs, events, webhooks or data. |
| **Lifecycle** | The current state of a service or hostname, such as planned, active, reserved or retired. |
| **Evidence** | The basis for a lifecycle claim; a catalogue row alone is not evidence of deployment. |
| **Public** | Intended to be accessible without an account. Do not infer that all operational details are safe to publish. |
| **Restricted** | Intended for authenticated, approved or otherwise limited access. Never publish credentials or private endpoints. |
| **Generated document** | Output derived from a canonical data source and generator; update the source and regenerate rather than editing the output. |

Use British English and define specialist abbreviations on first use unless they are common in the relevant technical context.
