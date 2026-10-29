---
title: "Light Pollution Visualiser"
slug: "light-pollution"
description: "Dark-sky and artificial night sky brightness mapping tool for amateur astronomy and light pollution assessment."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "astronomer"]
tags: ["astronomy", "dark-sky", "environment", "mapping"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/light-pollution"
liveUrl: "https://tools.rjmlaird.co.uk/light-pollution"
owner: "Ryan Laird"
stack: ["TypeScript", "Leaflet", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Dark-sky and artificial night sky brightness mapping tool designed for amateur astronomers and environmental light pollution assessment.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/light-pollution | Live mapping tool |
| Staging | | |
| Repository | https://github.com/rjmlaird/light-pollution | Source code |

## Architecture

Client-side mapping interface integrating Leaflet GIS layers with night sky brightness datasets.

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