---
title: "Habit Streak"
slug: "habit-streak"
description: "Minimalist local-first habit tracking and consistency dashboard designed for daily operational cadence."
status: "active"
visibility: "public"
audience: ["maintainer", "user"]
tags: ["productivity", "habits", "local-first", "react"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/habit-streak"
liveUrl: "https://tools.rjmlaird.co.uk/habit-streak"
owner: "Ryan Laird"
stack: ["React", "IndexedDB", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Minimalist local-first habit tracking and consistency dashboard designed for maintaining daily operational cadence without external telemetry.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/habit-streak | Live dashboard |
| Staging | | |
| Repository | https://github.com/rjmlaird/habit-streak | Source code |

## Architecture

React application storing state locally via IndexedDB for zero-server data privacy.

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