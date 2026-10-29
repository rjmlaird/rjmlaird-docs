---
title: "UK Drought Risk Monitor"
slug: "uk-drought-monitor"
description: "Reusable lab tool for teaching UK drought risk combining live Copernicus drought indicators with real-time EA and SEPA hydrology data, supported by formal hydrological and meteorological equations."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher"]
tags: ["drought", "climate", "hydrology", "copernicus", "leaflet", "equations"]
repository: "https://github.com/rjmlaird/rjmlaird-labs/tree/main/apps/uk-drought-monitor"
liveUrl: "https://equations.labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["JavaScript", "Leaflet", "Copernicus", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

The UK Drought Risk Monitor is an interactive lab tool designed for teaching and analysing drought risk. It integrates live Copernicus European & Global Drought Observatories (EDO/GDO) indicators with real-time Environment Agency (EA) and SEPA hydrology data. This version incorporates the underlying mathematical formulations—such as the Standardised Precipitation Index (SPI) and soil moisture anomaly models—used to compute drought severity.

## Live surfaces

| Surface | URL | Purpose |
| --- | --- | --- |
| Production | [https://tools.rjmlaird.co.uk/uk-drought-monitor](https://tools.rjmlaird.co.uk/uk-drought-monitor) | Live drought monitor & calculation interface |
| Staging |  |  |
| Repository | [https://github.com/rjmlaird/uk-drought-monitor](https://github.com/rjmlaird/uk-drought-monitor) | Source code |

## Architecture & Mathematical Formulations

The tool relies on client-side JavaScript processing combined with live WMS and REST endpoints. Key hydrological and meteorological indices are calculated using the following mathematical models:

### 1. Standardised Precipitation Index (SPI)

To quantify precipitation deficits across multiple timescales (e.g., SPI-1 through SPI-48), precipitation data is typically fitted to a gamma probability density function. The gamma PDF is defined as:

$$g(x) = \frac{1}{\beta^\alpha \Gamma(\alpha)} x^{\alpha-1} e^{-\frac{x}{\beta}} \quad \text{for } x > 0$$

where $x > 0$ is the precipitation amount, $\alpha > 0$ is a shape parameter, $\beta > 0$ is a scale parameter, and $\Gamma(\alpha)$ is the gamma function given by:

$$\Gamma(\alpha) = \int_{0}^{\infty} y^{\alpha-1} e^{-y} \, dy$$

The parameters $\alpha$ and $\beta$ are estimated using maximum likelihood estimation:

$$\alpha = \frac{1}{4A} \left( 1 + \sqrt{1 + \frac{4A}{3}} \right), \quad \beta = \frac{\bar{x}}{\alpha}$$

where $\bar{x}$ is the mean precipitation and $A$ is expressed as:

$$A = \ln(\bar{x}) - \frac{\sum \ln(x)}{N}$$

The cumulative probability of an observed precipitation event is then transformed into a standard normal random variable ($Z$-score) with a mean of zero and a variance of one, yielding the SPI value.

### 2. Soil Moisture Anomaly

Soil moisture anomalies quantify deviations from long-term climatological norms. The anomaly $A_{sm}$ is calculated as:

$$A_{sm} = \frac{\theta - \mu_{\theta}}{\sigma_{\theta}}$$

where $\theta$ is the current soil moisture value, $\mu_{\theta}$ is the multi-year historical mean soil moisture for the given period, and $\sigma_{\theta}$ is the corresponding standard deviation.

## Getting started

```sh
git clone https://github.com/rjmlaird/uk-drought-monitor.git
cd uk-drought-monitor
pnpm install
pnpm dev

```

## Configuration

Document configuration parameters, map bounding boxes, and API base URLs. Never commit secret values or API credentials into source control.

## Deployment

Build the static output and deploy via Cloudflare Pages or an assets-only Worker.

## Operations

Monitor client-side performance, WMS response latencies from Copernicus EDO endpoints, and EA/SEPA telemetry stream availability.

## Troubleshooting

* **WMS Tile Load Failures:** Verify network connectivity to `drought.emergency.copernicus.eu` and ensure CORS policies permit tile rendering.
* **Station Search Timeouts:** Check rate limits on Environment Agency flood-monitoring endpoints.

## Changelog

| Date | Version | Change |
| --- | --- | --- |
| 2026-03-30 | 1.1.0 | Added formal mathematical formulations for SPI and soil moisture anomalies. |
| 2026-03-30 | 1.0.0 | Initial documentation and live feed synchronization. |
