# Contributing

## Before editing

- Identify the page's audience and purpose.
- Prefer editing the existing source page over duplicating material.
- Verify URLs, commands, architecture and service claims.
- Do not add credentials, secrets or private operational data.

## Before opening a pull request

Run:

```bash
pnpm validate
```

For each new or materially changed page, check headings, keyboard navigation, link text, code examples and metadata. Keep `reviewStatus: needs-review` until a maintainer has checked the factual claims and steps. Add `lastReviewed` only after an actual review.

## Content placement

- Projects: one file per site, API, tool or service.
- Guides: task-based instructions and onboarding.
- Reference: stable facts, schemas, domains and architecture.
- Operations: runbooks and repeatable procedures.
- Archive: retired systems and historical records.
