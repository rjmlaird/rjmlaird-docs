---
title: "Local Climate Time Machine"
slug: "local-climate-time-machine"
description: "Interactive historical and projected UK climate visualization tool featuring warming stripes, Met Office regional observation series, and CMIP6 climate model projections."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher", "educator"]
tags: ["climate", "weather", "visualization", "met-office", "cmip6", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-labs/tree/main/apps/climate-time-machine"
liveUrl: "https://climate-time-machine.labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["Astro", "TypeScript", "TailwindCSS", "Cloudflare"]
reviewStatus: "needs-review"
---

# Local Climate Time Machine

Drag a slider through 140+ years of measured UK weather and a model-based view of the next 25, for a chosen region, with plain-English notes on what changed.

The slider track is the region's own **warming stripes**: one bar per year, coloured by how far that year sits from the 1961–1990 average. Years beyond the last measurement are hatched.

## Quick start

```bash
npm install
npm run dev          # first run downloads the data automatically
```

`npm run fetch-data` re-downloads everything. `npm test` checks the parser and bias-adjustment logic. `npm run build` makes a static site in `dist/` that can be hosted under any path.

## Real data sources

| What | Source | Licence |
|---|---|---|
| Observed temperature (mean, max, min), rainfall (annual, winter, summer) and days of air frost (from 1961) | Met Office UK regional series, derived from HadUK-Grid | Open Government Licence v3.0 |
| Projections to 2050 | 7 CMIP6 HighResMIP models via the Open-Meteo Climate API | CC BY 4.0 (check their terms if your use is commercial) |

Nothing is bundled or hand-typed: `scripts/fetch-data.mjs` downloads both sources and writes `public/data/*.json`.

## What the app shows

- **Time slider** over the stripes, with play/pause and clickable markers for notable UK events.
- **Four charts**: temperature (mean, summer, daytime highs, night-time lows), rainfall (annual, winter, summer), air frost days, and growing-season dryness, with each year, a 10-year average, the model mean and the model range.
- **Annotation panel** whose sentences are computed from the data (rank, anomaly, how often a 2022-style summer occurs in the models), plus short curated notes on well-documented UK events.

## Honest limitations

- **Frost days** are measured only from 1961, and model frost counts are biased, so only their change is used.
- **Region, not county.** The Midlands series is the closest published match to Leicestershire.
- **One emissions pathway.** The HighResMIP models are run under SSP5-8.5, so there is no low/medium selector yet.
- **Projections stop at 2050.**
- **Dryness is simplified**: standardised April–September rainfall, not SPEI.
- Models are sampled at one point per region and bias-adjusted by delta change. See `docs/methods.md`.

## Roadmap

1. Multi-scenario projections (low/medium/high) from UKCP18 via CEDA, which needs a free account.
2. Finer geographies using HadUK-Grid area averages.
3. Seasonal views and region comparison.
4. Proper SPEI with an evaporation estimate.

## Structure

```
scripts/        fetch-data.mjs + lib/ (Met Office parser, model processing)
test/           parser and adjustment tests
src/lib/        data lookups, narrative sentences, curated events
src/components/ StripeSlider, ClimateChart, AnnotationPanel, Method
docs/           data-sources.md, methods.md
```

# Data sources

## Observations: Met Office UK regional series
- Files: `https://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/{Tmean|Rainfall}/date/{Region}.txt`
- Browse and download manually: https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series
- Derived from HadUK-Grid: station data interpolated to a 1 km grid, then averaged over regions.
- Series: `Tmean`, `Tmax`, `Tmin`, `Rainfall`, `AirFrost`. The last three are optional; if one fails to download, that variable is left out.
- Columns used: monthly values (for April–September rainfall), summer (JJA) mean temperature, annual mean temperature, annual rainfall.
- Licence: Open Government Licence v3.0. Credit the Met Office.
- Region file names are set in `scripts/fetch-data.mjs`. If the Met Office renames one, the script skips that region and warns.

## Projections: Open-Meteo Climate API
- Endpoint: `https://climate-api.open-meteo.com/v1/climate`
- Models: MRI_AGCM3_2_S, EC_Earth3P_HR, NICAM16_8S, CMCC_CM2_VHR4, FGOALS_f3_H, HiRAM_SIT_HR, MPI_ESM1_2_XR (CMIP6 HighResMIP).
- Variables: daily mean, maximum and minimum temperature and precipitation, 1991 to 2050.
- Licence: CC BY 4.0, free for non-commercial use. Commercial use needs their API plan.

## For multi-scenario work
UKCP18 projections (RCP2.6, 4.5, 8.5 and the 12 km local set) are the standard UK source. They are on the CEDA archive and need a free account, so the fetch script does not use them yet.


# Methods

## Reference period
Anomalies and the dryness index use 1961–1990. Bias adjustment uses 1991–2020, the current 30-year climate normal.

## Observed series
`buildObservations` joins temperature and rainfall by year. Growing-season rainfall is the sum of April to September monthly totals, and is null if any month is missing.

## Model processing
1. Daily model output is aggregated to annual mean temperature, summer (Jun–Aug) mean temperature, annual rainfall and April–September rainfall. Years with missing days are dropped.
2. Rainfall totals are scaled to a 365.25-day year so models with 360-day calendars compare fairly.
3. Frost days are days with minimum temperature below 0 °C, scaled to a 365.25-day year. Winter rainfall is December to February, labelled by the year of its January (1991 is dropped from model baselines because December 1990 isn't requested). Summer is June to August.
4. **Delta-change adjustment** per model: temperature = observed 1991–2020 mean + (model value − model 1991–2020 mean); rainfall (annual, seasonal) = observed 1991–2020 mean × (model value ÷ model 1991–2020 mean). Temperatures and frost days use the difference; frost days are floored at zero. This keeps the regional observed climate and uses the model only for change.
5. Only years after the last observed year are kept as projections.

## Dryness index
`dry = −(AprSepRain − mean₁₉₆₁₋₁₉₉₀) / sd₁₉₆₁₋₁₉₉₀`. Positive means drier than the reference. It has no evaporation term, so it understates drying in warmer years.

## Narrative sentences
Computed in `src/lib/narrative.js`: anomalies, ranks, and the share of model-years in a ±5-year window that exceed a threshold (summer 2022, or the 90th percentile of 1991–2020 annual temperature). Because the window pools model-years, the shares describe the ensemble, not a probability forecast.

## Uncertainty
The shaded band is the min–max across models and years. It mixes model disagreement with year-to-year variability and is not a confidence interval. All models share one emissions pathway, so scenario uncertainty is not shown.
