---
title: 'Project brief: designing an all-sky camera'
slug: all-sky-project-brief
description: The goals, first constraints and next steps for a Raspberry Pi all-sky camera, written before any parts are ordered.
project: all-sky-camera
date: 2026-10-11
tags: [astronomy, all-sky, planning]
stage: planning
draft: false
---

> **Starting template.** This is an example build log. It records a plan, not a result.

## Goal

Build an all-sky camera around a Raspberry Pi that photographs the night sky automatically, stores the images locally and can optionally show them in a simple gallery. The full plan lives on the [project page](/projects/all-sky-camera/). This entry is the short version, written as the work begins.

## What I want from it

- A continuous record of the sky from dusk to dawn.
- Low power use, so it can stay on all year.
- No data loss if the network drops.
- Software small enough to understand end to end.

## Initial constraints

- **Weather.** It will live outdoors in the UK, so rain, dew and frost are the main design problems.
- **Light pollution.** The site is not dark. The images will show sky glow, and that is fine for cloud and bright-object monitoring.
- **Budget.** Modest. I will record what I spend, with dates, once I buy anything.
- **Scope.** This is a monitoring camera, not a calibrated science instrument.

## What I do not know yet

I have not chosen the lens, the sensor or the enclosure, and I have not measured anything. The open questions are listed on the project page: weatherproofing, condensation, power, storage growth, exposure, remote access and data retention.

## Next steps

1. Write a minimal capture script and run it indoors.
2. Work out how much storage a night of images needs at a few resolutions.
3. Compare enclosure and dome options, and note what each costs and what each risks.
4. Decide how images will be reached without opening the Pi to the internet.

The next entry will cover the bench test of the capture script, whether or not it goes well.
