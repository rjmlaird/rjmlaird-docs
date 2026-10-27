---
title: "Documentation authoring"
description: "Conventions for adding and maintaining Markdown documentation."
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
tags: ["authoring", "markdown", "conventions"]
---
## Principles

- Write in British English.
- Start with the reader's goal and prerequisites.
- Separate task instructions from architecture explanation.
- Prefer tested commands and small, copyable examples.
- Label unverified facts and proposed designs explicitly.
- Do not publish secrets, credentials, private operational details or personal data.

## Review metadata

New content defaults to `reviewStatus: needs-review`. Set `reviewStatus: reviewed` only after a maintainer has checked the factual claims, links and steps. Add `lastReviewed` only when that review actually occurs.

## Page template

See the reusable templates in the repository's `templates/` directory. Keep page titles descriptive, URLs stable and cross-links relative to the published documentation site.
