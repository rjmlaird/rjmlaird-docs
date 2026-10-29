import fs from 'node:fs';
import path from 'node:path';

const projects = [
  {
    slug: 'carbon-reduction-plan',
    content: `---
title: "Carbon Reduction Plan"
slug: "carbon-reduction-plan"
description: "PPN 006 aligned Carbon Reduction Plan builder (Scope 1, 2 and 3), React + Vite, served at tools.rjmlaird.co.uk/carbon-reduction-plan by an assets-only Worker."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["carbon-reduction", "sustainability", "react", "cloudflare-worker"]
repository: "https://github.com/rjmlaird/carbon-reduction-plan"
liveUrl: "https://tools.rjmlaird.co.uk/carbon-reduction-plan"
owner: "Ryan Laird"
stack: ["React", "TypeScript", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

PPN 006 aligned Carbon Reduction Plan builder (Scope 1, 2 and 3), built with React + Vite. It is served at \`tools.rjmlaird.co.uk/carbon-reduction-plan\` by an assets-only Worker.

The page chrome uses \`@rjmlaird/ui/brand.css\`; the plan itself is a light, printable document, so the app body maintains its own custom styling.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/carbon-reduction-plan | Live tool |
| Staging | | |
| Repository | https://github.com/rjmlaird/carbon-reduction-plan | Source code |

## Architecture

Built using React, Vite, and Cloudflare Workers asset deployment. Integrates component styles with \`@rjmlaird/ui\`.

## Getting started

\`\`\`sh
pnpm --filter @rjmlaird/carbon-reduction-plan dev      # Vite dev server
pnpm --filter @rjmlaird/carbon-reduction-plan preview  # build, then wrangler dev on :8794
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'home-energy-baseline',
    content: `---
title: "Home Energy Baseline"
slug: "home-energy-baseline"
description: "Household energy audit and baseline calculator for tracking thermal efficiency, heating loads, and consumption profiles."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["energy", "sustainability", "calculator", "react"]
repository: "https://github.com/rjmlaird/home-energy-baseline"
liveUrl: "https://tools.rjmlaird.co.uk/home-energy-baseline"
owner: "Ryan Laird"
stack: ["React", "TypeScript", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Household energy audit and baseline calculator designed to assess thermal efficiency, heating loads, and domestic consumption profiles.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/home-energy-baseline | Live tool |
| Staging | | |
| Repository | https://github.com/rjmlaird/home-energy-baseline | Source code |

## Architecture

Client-side React application bundled with Vite and hosted on Cloudflare Workers.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'orbit-simulator',
    content: `---
title: "Orbit Simulator"
slug: "orbit-simulator"
description: "Interactive orbital mechanics and trajectory simulation visualization tool for space systems analysis."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher"]
tags: ["space", "astronomy", "simulation", "canvas"]
repository: "https://github.com/rjmlaird/orbit-simulator"
liveUrl: "https://tools.rjmlaird.co.uk/orbit-simulator"
owner: "Ryan Laird"
stack: ["TypeScript", "Canvas", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Interactive orbital mechanics and trajectory simulation visualization tool built for preliminary space systems analysis and educational outreach.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/orbit-simulator | Live simulation tool |
| Staging | | |
| Repository | https://github.com/rjmlaird/orbit-simulator | Source code |

## Architecture

High-performance HTML5 Canvas renderer driven by TypeScript numerical integrators for orbital dynamics.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'flight-emissions',
    content: `---
title: "Flight Emissions Calculator"
slug: "flight-emissions"
description: "Aviation carbon emissions estimator aligned with radiative forcing and distance-based GHG conversion factors."
status: "active"
visibility: "public"
audience: ["maintainer", "developer"]
tags: ["aviation", "emissions", "calculator", "sustainability"]
repository: "https://github.com/rjmlaird/flight-emissions"
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

React SPA utilizing geodesic distance calculations and structured GHG emission factor tables.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'light-pollution',
    content: `---
title: "Light Pollution Visualizer"
slug: "light-pollution"
description: "Dark-sky and artificial night sky brightness mapping tool for amateur astronomy and light pollution assessment."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "astronomer"]
tags: ["astronomy", "dark-sky", "environment", "mapping"]
repository: "https://github.com/rjmlaird/light-pollution"
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

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'orbital-calc',
    content: `---
title: "Orbital Calculator"
slug: "orbital-calc"
description: "Comprehensive astrodynamic calculator for Keplerian elements, orbital periods, velocities, and maneuvers."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "engineer"]
tags: ["space", "astrodynamics", "calculator", "physics"]
repository: "https://github.com/rjmlaird/orbital-calc"
liveUrl: "https://tools.rjmlaird.co.uk/orbital-calc"
owner: "Ryan Laird"
stack: ["TypeScript", "React", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Comprehensive astrodynamic calculation suite for computing Keplerian elements, orbital periods, characteristic velocities, and orbital maneuvers.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/orbital-calc | Live calculator |
| Staging | | |
| Repository | https://github.com/rjmlaird/orbital-calc | Source code |

## Architecture

React-based computation engine executing rigorous astrodynamic equations in TypeScript.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'habit-streak',
    content: `---
title: "Habit Streak"
slug: "habit-streak"
description: "Minimalist local-first habit tracking and consistency dashboard designed for daily operational cadence."
status: "active"
visibility: "public"
audience: ["maintainer", "user"]
tags: ["productivity", "habits", "local-first", "react"]
repository: "https://github.com/rjmlaird/habit-streak"
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

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'meta-tag-checker',
    content: `---
title: "Meta Tag Checker"
slug: "meta-tag-checker"
description: "SEO and social preview validator for inspecting Open Graph, Twitter cards, and HTML meta tags."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "marketer"]
tags: ["seo", "web-dev", "tool", "react"]
repository: "https://github.com/rjmlaird/meta-tag-checker"
liveUrl: "https://tools.rjmlaird.co.uk/meta-tag-checker"
owner: "Ryan Laird"
stack: ["TypeScript", "React", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

SEO and social preview validator tool for inspecting Open Graph tags, Twitter cards, and standard HTML metadata across web properties.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/meta-tag-checker | Live validator |
| Staging | | |
| Repository | https://github.com/rjmlaird/meta-tag-checker | Source code |

## Architecture

React web utility parsing HTML markup to simulate search engine and social media card rendering.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'physical-limits',
    content: `---
title: "Physical Limits Calculator"
slug: "physical-limits"
description: "Astrophysical and thermodynamic limit calculator exploring fundamental constraints in physics and engineering."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher"]
tags: ["physics", "astrophysics", "calculator", "science"]
repository: "https://github.com/rjmlaird/physical-limits"
liveUrl: "https://tools.rjmlaird.co.uk/physical-limits"
owner: "Ryan Laird"
stack: ["TypeScript", "React", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Astrophysical and thermodynamic limit calculator exploring fundamental physical constraints, energy balances, and theoretical maximums.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/physical-limits | Live calculator |
| Staging | | |
| Repository | https://github.com/rjmlaird/physical-limits | Source code |

## Architecture

React computational tool implementing physical constant equations and boundary constraint formulas.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'hohmann-transfer',
    content: `---
title: "Hohmann Transfer Calculator"
slug: "hohmann-transfer"
description: "Orbital transfer delta-v and transit time calculator for coplanar circular orbits."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "engineer"]
tags: ["space", "astrodynamics", "orbital-mechanics", "calculator"]
repository: "https://github.com/rjmlaird/hohmann-transfer"
liveUrl: "https://tools.rjmlaird.co.uk/hohmann-transfer"
owner: "Ryan Laird"
stack: ["TypeScript", "React", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Orbital transfer delta-v and transit time calculator specifically optimized for coplanar circular orbital transfers.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/hohmann-transfer | Live calculator |
| Staging | | |
| Repository | https://github.com/rjmlaird/hohmann-transfer | Source code |

## Architecture

Interactive web application computing two-burn orbital ellipse geometry and propellant requirements.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'optics-visualiser',
    content: `---
title: "Optics Visualiser"
slug: "optics-visualiser"
description: "Ray tracing and optical system performance calculator for lenses, mirrors, and telescopes."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "optician"]
tags: ["optics", "physics", "astronomy", "ray-tracing"]
repository: "https://github.com/rjmlaird/optics-visualiser"
liveUrl: "https://tools.rjmlaird.co.uk/optics-visualiser"
owner: "Ryan Laird"
stack: ["TypeScript", "Canvas", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Ray tracing and optical system performance calculator designed for evaluating lenses, mirrors, and telescope configurations.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/optics-visualiser | Live visualiser |
| Staging | | |
| Repository | https://github.com/rjmlaird/optics-visualiser | Source code |

## Architecture

Canvas-based geometric optics simulator computing focal lengths, ray intersections, and aberration estimates.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  },
  {
    slug: 'unit-converter',
    content: `---
title: "Unit Converter"
slug: "unit-converter"
description: "Engineering and scientific unit conversion utility spanning imperial, SI, and astronomical scales."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "engineer"]
tags: ["utilities", "engineering", "conversion", "science"]
repository: "https://github.com/rjmlaird/unit-converter"
liveUrl: "https://tools.rjmlaird.co.uk/unit-converter"
owner: "Ryan Laird"
stack: ["TypeScript", "React", "Vite", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

Engineering and scientific unit conversion utility spanning imperial, SI, and specialized astronomical scales.

## Live surfaces

| Surface | URL | Purpose |
|---|---|---|
| Production | https://tools.rjmlaird.co.uk/unit-converter | Live converter |
| Staging | | |
| Repository | https://github.com/rjmlaird/unit-converter | Source code |

## Architecture

React utility app providing instantaneous prefix and unit scaling with type safety.

## Getting started

\`\`\`sh
pnpm install
pnpm dev
\`\`\`

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
| 2026-03-30 | 1.0.0 | Initial documentation sync |
`
  }
];

for (const p of projects) {
  const dir = path.join('.', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'README.md');
  fs.writeFileSync(filePath, p.content, 'utf-8');
  console.log(`Wrote ${filePath}`);
}

console.log('All README files successfully written.');