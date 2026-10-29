---
title: "Colour Contrast Calculator"
slug: "colour-contrast"
description: "Interactive web accessibility utility evaluating text-to-background colour contrast ratios against WCAG 2.1 AA and AAA compliance thresholds."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "designer"]
tags: ["accessibility", "a11y", "wcag", "colour-contrast", "web-performance", "tools", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/colour-contrast"
liveUrl: "https://tools.rjmlaird.co.uk/colour-contrast"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "Astro"]
reviewStatus: "needs-review"
---

# Colour Contrast Calculator

Interactive accessibility utility hosted at **[tools.rjmlaird.co.uk/colour-contrast](https://tools.rjmlaird.co.uk/colour-contrast)** for calculating relative luminance, verifying contrast ratios, and testing visual compliance across Web Content Accessibility Guidelines (WCAG 2.1 / 2.2) standards.

---

## Technical Overview & Mathematical Formalisms

The calculator calculates contrast ratios between foreground text and background elements to ensure readability for visually impaired or color-deficient users.

### Relative Luminance Calculation ($L$)

According to WCAG 2.1 guidelines, the relative luminance $L$ of any point in a color space is defined as the relative brightness of any point normalized to 0 for darkest black and 1 for lightest white.

First, sRGB channel values ($R_{8bit}, G_{8bit}, B_{8bit} \in [0, 255]$) are converted to a normalized range $R_s, G_s, B_s \in [0, 1]$:

$$R_s = \frac{R_{8bit}}{255}, \quad G_s = \frac{G_{8bit}}{255}, \quad B_s = \frac{B_{8bit}}{255}$$

Each channel is linearized to account for gamma correction:

$$R = \begin{cases} \frac{R_s}{12.92}, & R_s \le 0.04045 \\ \left(\frac{R_s + 0.055}{1.055}\right)^{2.4}, & R_s > 0.04045 \end{cases}$$

$$G = \begin{cases} \frac{G_s}{12.92}, & G_s \le 0.04045 \\ \left(\frac{G_s + 0.055}{1.055}\right)^{2.4}, & G_s > 0.04045 \end{cases}$$

$$B = \begin{cases} \frac{B_s}{12.92}, & B_s \le 0.04045 \\ \left(\frac{B_s + 0.055}{1.055}\right)^{2.4}, & B_s > 0.04045 \end{cases}$$

The total relative luminance $L$ is derived using the standard ITU-R BT.709 coefficients:

$$L = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$$

---

## Contrast Ratio Formula

Given the relative luminance of the lighter color ($L_1$) and darker color ($L_2$), the contrast ratio $CR$ is calculated as:

$$CR = \frac{L_1 + 0.05}{L_2 + 0.05}$$

Where the $0.05$ offset accounts for ambient light scattering and display glare. Contrast ratios range from $1:1$ (identical colors) to $21:1$ (pure black vs. pure white).

---

## WCAG Compliance Thresholds

| Compliance Level | Minimum Contrast (Normal Text) | Minimum Contrast (Large Text $\ge 18\text{pt}$ or $14\text{pt}$ Bold) | Graphical Objects / UI Components |
| --- | --- | --- | --- |
| **WCAG Level AA** | $4.5 : 1$ | $3.0 : 1$ | $3.0 : 1$ |
| **WCAG Level AAA** | $7.0 : 1$ | $4.5 : 1$ | N/A |