---
title: Satellite imagery dashboard for local environmental data
slug: satellite-imagery-dashboard
description: A small dashboard that pulls open satellite products for a local area and sits beside ground-based sensor data.
date: 2026-10-11
tags: [earth-observation, satellites, dashboard, open-data]
priority: low
status: idea
draft: false
---

## The idea

Build a Pi-hosted dashboard that fetches open Earth-observation products for a small area, such as vegetation indices or surface temperature, and shows them next to local sensor readings.

## Why it might be worth doing

Satellite data gives context that a single sensor cannot: the wider pattern around a point measurement. It also makes a good teaching example of how remote sensing and ground truth fit together.

## Things to find out

- Which open data sources offer the right resolution and revisit time for a small area.
- How much processing a Pi can realistically do, and what must be pre-computed elsewhere.
- How to handle cloud cover, which hides the ground in many scenes.
- The licence and attribution terms for each dataset.

## First step

Pick one dataset, fetch a single scene for one location by hand, and note every step that would need automating.
