---
title: "Dopamine Menu Planner"
slug: "dopamine-menu"
description: "Interactive neurodiversity productivity utility for structuring a 'dopamine menu' of healthy stimulation activities—categorized into starters, mains, sides, desserts, and specials—to support executive function and task self-regulation."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher", "student"]
tags: ["neurodiversity", "productivity", "adhd", "dopamine-menu", "executive-function", "tools", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/dopamine-menu"
liveUrl: "https://tools.rjmlaird.co.uk/dopamine-menu"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "Astro"]
reviewStatus: "needs-review"
---

# Dopamine Menu Planner

Interactive productivity utility hosted at **[tools.rjmlaird.co.uk/dopamine-menu](https://www.google.com/url?sa=E&source=gmail&q=https://tools.rjmlaird.co.uk/dopamine-menu)** designed around the therapeutic framework of a "dopamine menu." The tool helps neurodivergent professionals, researchers, and knowledge workers curate, categorize, and select healthy stimulation activities to overcome executive dysfunction, manage attention regulation, and prevent burnout.

---

## Technical Overview & Framework

The application structures task initiation and stimulation management using a culinary metaphor, mapping cognitive engagement types to structured menu categories. This externalizes working memory and reduces the cognitive load of deciding *what* to do when facing paralysis or under-stimulation.

---

## Menu Categories & Cognitive Function

| Menu Course | Stimulation Profile | Target Duration | Cognitive Objective & Use Case |
| --- | --- | --- | --- |
| **Starters** | Low-effort, quick-reward | $2 - 5 \text{ mins}$ | Overcome task initiation paralysis; friction-free micro-wins (e.g., clearing one inbox item, stretching, drinking water). |
| **Mains** | Deep focus, high reward | $30 - 90 \text{ mins}$ | Sustained "flow state" activities requiring heavy cognitive investment (e.g., architectural coding, writing complex documentation). |
| **Sides** | Background accompaniment | Ongoing | Concurrent sensory input that stabilizes attention during routine work (e.g., instrumental ambient soundscapes, lo-fi beats, tactile fidgets). |
| **Desserts** | High indulgence, low requirement | $15 - 30 \text{ mins}$ | Post-task celebration or intentional transition buffers; purely pleasurable activities with no performance metric. |
| **Specials** | Rare, high novelty | Variable | Periodic novelty injections when routine tasks induce under-stimulation or executive stagnation (e.g., visiting a new workspace, exploratory prototyping). |

---

## Decision Matrix & Selection Heuristics

When experiencing executive dysfunction or attentional fatigue, the utility computes a weighted recommendation score $S_{\text{rec}}$ based on current available energy ($E_{\text{avail}}$) and available time window ($T_{\text{avail}}$):

$$S_{\text{rec}} = w_1 \cdot (\text{EnergyMatch}) + w_2 \cdot (\text{TimeMatch}) + w_3 \cdot (\text{NoveltyWeight})$$

* **Energy Matching**: Filters out "Mains" when cognitive reserves are depleted, automatically surfacing "Starters" or "Sides".
* **Time Boxing**: Ensures selected activities fit within strict temporal constraints to prevent time-blindness and rabbit-hole fixation.

---

## Privacy & State Architecture

* **Local Persistence**: All customized menu items, tags, and frequency counters are stored client-side via encrypted browser `localStorage`, ensuring zero server-side telemetry or tracking.
* **Edge Delivery**: Served via an assets-only Cloudflare Worker for instant global availability and zero-latency interaction.