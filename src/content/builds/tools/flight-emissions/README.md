---
title: "Flight Emissions Calculator"
slug: "flight-emissions"
description: "Aviation carbon emissions estimator aligned with radiative forcing and distance-based GHG conversion factors."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["aviation", "emissions", "calculator", "sustainability"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/flight-emissions"
liveUrl: "https://tools.rjmlaird.co.uk/flight-emissions"
owner: "Ryan Laird"
stack: ["React", "TypeScript", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Aviation carbon emissions estimator incorporating radiative forcing multipliers and standardized distance-based greenhouse gas conversion factors.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/flight-emissions | Live calculator |
| Staging | | |
| Repository | https://github.com/rjmlaird/flight-emissions | Source code |

## Architecture

React SPA utilising geodesic distance calculations and structured GHG emission factor tables.

## Getting started

```sh
pnpm install
pnpm dev
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