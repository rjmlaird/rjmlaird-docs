---
title: "Earthquake Physics Explorer"
slug: "earthquake-physics-explorer"
description: "Interactive educational simulation and lab exploring seismic wave propagation, P-S wave travel-time distance, magnitude scales, and earthquake physics."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher", "student"]
tags: ["seismology", "earthquakes", "physics", "simulation", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-labs/tree/main/apps/earthquake-physics-explorer"
liveUrl: "https://earthquakes.labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["Astro", "TypeScript", "Vitest", "Cloudflare"]
reviewStatus: "needs-review"
---

## Plan and Architecture

**Astro + vanilla TypeScript** (recommended over Next.js): static-first, ships near-zero JavaScript except one script on the lab page, cheap to host, and matches the Astro stack used across the repository ecosystem.

```
src/
  lib/sim-core.ts        pure physics (tested) → wave propagation and travel-time core
  data/                  site.ts, labs.ts (registry), earthquakes.ts (config + copy)
  layouts/               Base.astro (SEO), LabLayout.astro (reusable lab template)
  components/            ModuleDocs.astro (method/equations/assumptions/limitations/try this)
  pages/                 /, /labs, /labs/earthquakes, /about, /contact, /privacy, 404, sitemap.xml
  scripts/earthquakes.ts client interactivity for the lab only
  styles/global.css      tokens, focus states, reduced motion
public/                  robots.txt, favicon.svg (add og.png, 1200×630)
tests/unit, tests/a11y   Vitest unit tests; built-HTML accessibility smoke test

```

## Setup & Commands

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # unit tests (P–S distance, magnitude, wave velocity)
npm run check        # Astro/TypeScript check
npm run build        # outputs dist/
npm run test:a11y    # builds, then smoke-tests dist/ HTML
npm run format       # Prettier

```

No environment variables are required for deployment or local execution.

## Deploy (Cloudflare Pages, Vercel or Netlify)

Build command `npm run build`, output directory `dist`, Node 20+. Point `labs.rjmlaird.co.uk` at the project (CNAME). The `site` URL in `astro.config.mjs` and `src/data/site.ts` drives canonical URLs and the sitemap.

**Checklist:** add `public/og.png` · confirm contact email in `src/data/site.ts` · `npm test && npm run test:a11y` · keyboard-only run through all modules · test at 320 px · check with reduced motion on · verify `/sitemap.xml`, `/robots.txt` and the 404 page · run a screen-reader pass (VoiceOver/NVDA) and a Lighthouse accessibility audit.

## Add a New Lab

1. Add an entry to `src/data/labs.ts` and the route to `site.routes` in `src/data/site.ts`.
2. Put pure calculations in `src/lib/` with tests in `tests/unit/`.
3. Create `src/pages/labs/<slug>.astro` using `LabLayout` (title block, disclaimer, further-reading slot) and `ModuleDocs`.
4. Keep copy and presets in `src/data/<slug>.ts`; put interactivity in `src/scripts/<slug>.ts`.

## Accessibility Checklist (Manual)

Semantic landmarks and one `h1` per page; tabs follow the ARIA tab pattern (arrow keys, Home/End); interface controls are keyboard-navigable; animations feature a pause button and respect `prefers-reduced-motion`; wave types and travel-time paths are distinguished by label and line style, not colour alone; live regions announce updates.

## Post-MVP Roadmap

1. Real historical earthquake case studies and advanced seismic scenarios.
2. Fault-type and rupture-direction visualisations.
3. Shake-intensity and local-site-effect expanders.
4. CSV/data export pipelines.
5. Embeddable widget builds.
6. Optional privacy-respecting analytics (update `/privacy` first).
7. Git-based lab workflow (PR template, lab checklist).
8. Community feedback and contribution workflow.
