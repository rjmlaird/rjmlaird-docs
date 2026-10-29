---
title: "Unit Converter"
slug: "unit-converter"
description: "API and structured data layer for the RJM Laird ecosystem."
status: "active"
visibility: "public"
audience: ["developer", "maintainer"]
tags: ["api", "data", "infrastructure"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/unit-converter"
liveUrl: "https://tools.rjmlaird.co.uk/unit-converter"
owner: "Ryan Laird"
stack: ["TypeScript", "Cloudflare"]
reviewStatus: "needs-review"
---

# unit-converter

Physics, engineering and astronomy unit converter (length, mass, time, speed, force, pressure, energy, power, temperature, angle). Conversion logic lives in `@rjmlaird/utils` (`units.ts`).

## Run locally
```sh
pnpm --filter @rjmlaird/unit-converter dev
# open http://localhost:8788/unit-converter
```

## API
```sh
curl "http://localhost:8788/unit-converter/units"
curl "http://localhost:8788/unit-converter/convert?category=length&value=1&from=pc&to=ly"
curl "http://localhost:8788/unit-converter/convert?category=temperature&value=100&from=c&to=f"
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