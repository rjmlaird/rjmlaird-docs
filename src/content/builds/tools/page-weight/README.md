---
title: "Page Weight & Asset Budget Calculator"
slug: "page-weight"
description: "Interactive web utility for inspecting resource footprints, calculating asset transfer budgets, and evaluating performance impact across web applications."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher"]
tags: ["web-performance", "asset-budget", "page-weight", "optimization", "tools", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/page-weight"
liveUrl: "https://tools.rjmlaird.co.uk/page-weight"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "Astro"]
reviewStatus: "needs-review"
---

# Page Weight & Asset Budget Calculator

Interactive web performance utility hosted at **[tools.rjmlaird.co.uk/page-weight](https://www.google.com/url?sa=E&source=gmail&q=https://tools.rjmlaird.co.uk/page-weight)** designed for analyzing HTTP resource payloads, setting performance budgets, and estimating load latencies over constrained network conditions.

---

## Technical Overview & Features

* **Resource Breakdown**: Categorizes uncompressed and gzipped/brotli transfer sizes across JavaScript, CSS, images, fonts, and document HTML.
* **Network Latency Modeling**: Estimates time-to-interactive (TTI) and total load times across simulated network profiles (e.g., Fast 3G, 4G, Fiber).
* **Budget Tracking**: Compares total page payload against customized asset budgets and Core Web Vitals threshold guidelines.

---

## Network Transfer & Compression Models

### Estimated Load Latency Formula

The theoretical network transfer time ($T_{\text{transfer}}$) for a given total payload size ($S_{\text{payload}}$ in bits) under round-trip time constraints ($\text{RTT}$) is modeled as:

$$T_{\text{transfer}} = N_{\text{RTT}} \cdot \text{RTT} + \frac{S_{\text{payload}}}{\text{Bandwidth}}$$

Where $N_{\text{RTT}}$ accounts for the HTTP TCP handshake and TLS negotiation phases ($N_{\text{RTT}} \approx 3$ for TLS 1.3 cold connections, $N_{\text{RTT}} \approx 1$ for reused HTTP/2 or HTTP/3 streams).

### TCP Slow Start Progression

During the initial phase of a TCP connection, the congestion window size ($\text{CWND}$) doubles every round-trip time ($\text{RTT}$) until congestion is detected or $\text{ssthresh}$ is reached. The data sent in round $k$ is given by:

$$\text{CWND}_k = \text{IW} \cdot 2^{k-1}$$

Where $\text{IW}$ is the Initial Window size (typically 10 MSS, where $\text{MSS} \approx 1460 \text{ bytes}$). The cumulative bytes transferred after $n$ RTTs during Slow Start is:

$$S_{\text{cumulative}}(n) = \text{MSS} \cdot \text{IW} \cdot (2^n - 1)$$

### Compression Heuristics & Asset Budget Allocation

When raw asset sizes ($S_{\text{raw}}$) are provided, compressed transfer footprints ($S_{\text{wire}}$) are approximated using baseline compression ratios ($r_{\text{comp}}$):

$$S_{\text{wire}} = \sum_{i} S_{\text{raw}, i} \times (1 - r_{\text{comp}, i})$$

| Asset Class | Typical Brotli Ratio ($r_{\text{comp}}$) | Recommended Budget Threshold |
| --- | --- | --- |
| **JavaScript** | $0.65 - 0.75$ | $\le 170 \text{ kB}$ (compressed) |
| **CSS** | $0.75 - 0.85$ | $\le 40 \text{ kB}$ (compressed) |
| **Fonts (WOFF2)** | $0.05 - 0.15$ (Pre-compressed) | $\le 100 \text{ kB}$ |
| **Images (AVIF/WebP)** | Variable | $\le 500 \text{ kB}$ |

---

## Lighthouse Performance Scoring Model

The overall Lighthouse Performance Score ($P$) is computed as a weighted log-normal distribution score across Core Web Vitals metrics ($m_i$):

$$P = \sum_{i} w_i \cdot S_i(m_i)$$

Where each individual metric score $S_i(m_i) \in [0, 1]$ is derived from the cumulative log-normal distribution function:

$$S_i(m_i) = \frac{1}{2} \left( 1 - \text{erf}\left( \frac{\ln(m_i) - \mu_i}{\sigma_i \sqrt{2}} \right) \right)$$

* **Weight Distribution ($w_i$)**: Total Blocking Time (TBT, 30%), Largest Contentful Paint (LCP, 25%), Cumulative Layout Shift (CLS, 25%), First Contentful Paint (FCP, 10%), Speed Index (SI, 10%).
