---
title: "Contrast Lab"
slug: "contrast-lab"
description: "WCAG 2.x colour contrast checker and compliance validator built with Astro and React."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "designer"]
tags: ["accessibility", "wcag", "contrast", "react", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-labs/tree/main/apps/contrast-lab"
liveUrl: "https://contrast.labs.rjmlaird.co.uk"
owner: "Ryan Laird"
stack: ["Astro", "React", "TypeScript", "Cloudflare"]
reviewStatus: "needs-review"
---

## Overview

WCAG 2.x colour contrast checker built with Astro + React.

## What it does

- Pick a foreground and background colour.
- See the contrast ratio instantly.
- Check AA/AAA pass-fail for normal and large text.

## WCAG thresholds

- AA normal text: 4.5:1
- AA large text: 3:1
- AAA normal text: 7:1
- AAA large text: 4.5:1

## Start coding

```bash
pnpm install
pnpm dev
````

The WCAG thresholds above match the standard contrast guidance for normal text, large text, and AAA levels.
