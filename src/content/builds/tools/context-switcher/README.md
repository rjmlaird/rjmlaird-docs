---
title: "Carbon Reduction Plan"
slug: "carbon-reduction-plan"
description: "PPN 006 aligned Carbon Reduction Plan builder (Scope 1, 2 and 3), React + Vite, served at tools.rjmlaird.co.uk/carbon-reduction-plan by an assets-only Worker."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["carbon-reduction", "sustainability", "react", "cloudflare-worker"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/carbon-reduction-plan"
liveUrl: "https://tools.rjmlaird.co.uk/carbon-reduction-plan"
owner: "Ryan Laird"
stack: ["React", "TypeScript", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

PPN 006 aligned Carbon Reduction Plan builder (Scope 1, 2 and 3), built with React + Vite. It is served at `tools.rjmlaird.co.uk/carbon-reduction-plan` by an assets-only Worker.

The page chrome uses `@rjmlaird/ui/brand.css`; the plan itself is a light, printable document, so the app body maintains its own custom styling.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/carbon-reduction-plan | Live tool |
| Staging | | |
| Repository | https://github.com/rjmlaird/carbon-reduction-plan | Source code |

## Architecture

Built using React, Vite, and Cloudflare Workers asset deployment. Integrates component styles with `@rjmlaird/ui`.

## Getting started

```sh
pnpm --filter @rjmlaird/carbon-reduction-plan dev      # Vite dev server
pnpm --filter @rjmlaird/carbon-reduction-plan preview  # build, then wrangler dev on :8794
```

## Configuration
Document configuration and secrets handling. Never commit secret values.

## Deployment
Document build, release, rollback and DNS steps.

## Operations
Document monitoring, backups, logs and maintenance.

## Troubleshooting
Document known failure modes and tested recovery steps.


## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-03-30 | 0.1.0 | Initial documentation mapping |