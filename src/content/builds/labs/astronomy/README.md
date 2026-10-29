---
title: "Astronomy Labs"
slug: "astronomy-labs"
description: "Astro static site and interactive demonstration platform for astronomy.labs.rjmlaird.co.uk."
status: "active"
visibility: "public"
audience: ["developer", "maintainer", "researcher"]
tags: ["astronomy", "astro", "static-site", "education"]
repository: "https://github.com/rjmlaird/rjmlaird-labs/tree/main/apps/astronomy-labs"
liveUrl: "https://astronomy.labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["Astro", "TypeScript", "TailwindCSS", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Astro static site serving interactive labs and demonstrations at `astronomy.labs.rjmlaird.co.uk`. Features flat URLs (`/labs/<slug>/`) so recategorisation never breaks links.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://astronomy.labs.rjmlaird.co.uk | Live labs platform |
| Staging | | |
| Repository | https://github.com/rjmlaird/astronomy-labs | Source code |

## Architecture

Built using Astro, Markdown content collections, and isolated iframe shells wrapping self-contained HTML demos.

## Getting started

```sh
npm run dev     # start local dev server
npm run build   # production build
npm run preview # preview production build locally
npm run new-lab -- my-slug "My Title" optics # scaffold a new lab
```

## Configuration
Document configuration and secrets handling. Never commit secret values.

## Deployment
Deployed on Cloudflare Pages with build command npm run build and output directory dist.

## Operations
Document monitoring, backups, logs and maintenance.

## Troubleshooting
Document known failure modes and tested recovery steps.

## Changelog

| Date | Version | Change |
|---|---|---|
| 2026-03-30 | 1.0.0 | Initial documentation sync |