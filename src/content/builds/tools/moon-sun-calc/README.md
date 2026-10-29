---
title: "Moon & Sun Calculator"
slug: "moon-sun-calc"
description: "Interactive astronomical utility calculating real-time solar and lunar ephemerides, topocentric positions, rise/set times, atmospheric refraction, twilight phases, parallax adjustments, and illumination fractions."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher", "student"]
tags: ["astronomy", "ephemeris", "moon", "sun", "lunar-phase", "twilight", "parallax", "tools", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/moon-sun-calc"
liveUrl: "https://tools.rjmlaird.co.uk/moon-sun-calc"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "Astro"]
reviewStatus: "needs-review"
---

# Moon & Sun Calculator

Interactive positional astronomy utility hosted at **[tools.rjmlaird.co.uk/moon-sun-calc](https://tools.rjmlaird.co.uk/moon-sun-calc)** for computing real-time solar and lunar positional coordinates, transit/rise/set horizons, twilight definitions, topocentric parallax corrections, and illumination parameters based on geographic location.

---

## Technical Overview & Formalisms

Computes topocentric coordinates using low-precision solar ephemeris algorithms and Meeus lunar position approximations relative to the observer's geographic latitude ($\phi$), longitude ($\lambda$), and UTC timestamp.

### Solar Altitude & Azimuth Formulation

Given Julian Date ($JD$), Greenwich Mean Sidereal Time ($\text{GMST}$), and local hour angle ($H = \text{LST} - \alpha$), the solar altitude ($a$) and azimuth ($A$) are calculated as:

$$\sin(a) = \sin(\phi) \sin(\delta) + \cos(\phi) \cos(\delta) \cos(H)$$

$$\cos(A) = \frac{\sin(\delta) - \sin(\phi) \sin(a)}{\cos(\phi) \cos(a)}$$

Where $\delta$ represents solar declination and $\alpha$ represents right ascension.

---

## Atmospheric Refraction Corrections

Near the horizon, atmospheric refraction bends incoming light rays, making celestial bodies appear higher than their true geometric position. The true altitude ($a_{\text{true}}$) is derived from the apparent observed altitude ($a_{\text{app}}$) by subtracting the refraction correction $R$ (in arcminutes):

$$R(a_{\text{app}}) = \frac{1.02}{\tan\left(a_{\text{app}} + \frac{10.3}{a_{\text{app}} + 5.11}\right)}$$

$$a_{\text{true}} = a_{\text{app}} - \frac{R(a_{\text{app}})}{60^\circ}$$

For standard pressure ($1010 \text{ mbar}$) and temperature ($10^\circ\text{C}$), this yields a horizon correction of approximately $34'$ ($0.5667^\circ$).

---

## Solar Twilight Thresholds & Horizons

Twilight times and solar rise/set events are computed by solving for the hour angle $H_0$ at specific solar center depression angles ($h_0$):

$$\cos(H_0) = \frac{\sin(h_0) - \sin(\phi)\sin(\delta)}{\cos(\phi)\cos(\delta)}$$

| Event / Phase | Target Altitude ($h_0$) | Definition & Astronomical Context |
| --- | --- | --- |
| **Standard Sunrise / Sunset** | $-0.8333^\circ$ | Accounts for solar semidiameter ($16'$) and standard atmospheric refraction ($34'$). |
| **Civil Twilight** | $-6.0^\circ$ | Limit at which horizon is clearly defined and brightest stars are visible; terrestrial activities usually require no artificial light. |
| **Nautical Twilight** | $-12.0^\circ$ | Limit at which horizon is still visible at sea for navigational sextant readings; general outline of ground structures remains visible. |
| **Astronomical Twilight** | $-18.0^\circ$ | Limit at which sky illumination ceases to interfere with astronomical observations; full dark sky condition achieved. |

---

## Topocentric Lunar Parallax Adjustments

Because the Earth's radius $R_\oplus$ is non-negligible compared to the Earth-Moon distance $\Delta$, the Moon's observed topocentric position differs significantly from its geocentric position. The horizontal parallax $\pi$ is given by:

$$\sin(\pi) = \frac{R_\oplus}{\Delta}$$

The topocentric right ascension $\alpha'$ and declination $\delta'$ are computed from geocentric $\alpha, \delta$ and local observer latitude $\phi'$ using observer geocentric distance $\rho$:

$$\Delta \alpha = \arctan\left( \frac{-\rho \cos(\phi') \sin(\pi) \sin(H)}{\cos(\delta) - \rho \cos(\phi') \sin(\pi) \cos(H)} \right)$$

$$\tan(\delta') = \frac{(\sin(\delta) - \rho \sin(\phi') \sin(\pi)) \cos(\Delta \alpha)}{\cos(\delta) - \rho \cos(\phi') \sin(\pi) \cos(H)}$$

Where $H$ is the geocentric hour angle.

---

## Nutation & Obliquity Matrix Transformation

High-precision ephemerides account for periodic gravitational perturbations (nutation) on Earth's rotational axis. The true obliquity of the ecliptic $\epsilon$ is derived from mean obliquity $\epsilon_0$ and nutation in obliquity $\Delta \epsilon$:

$$\epsilon = \epsilon_0 + \Delta \epsilon$$

Ecliptic coordinates $(\lambda, \beta)$ are transformed to equatorial coordinates $(\alpha, \delta)$ incorporating nutation in longitude ($\Delta \psi$) and obliquity ($\epsilon$):

$$\sin(\delta) = \sin(\beta) \cos(\epsilon) + \cos(\beta) \sin(\epsilon) \sin(\lambda + \Delta \psi)$$

$$\cos(\alpha) \cos(\delta) = \cos(\beta) \cos(\lambda + \Delta \psi)$$

$$\sin(\alpha) \cos(\delta) = \cos(\beta) \sin(\epsilon) \sin(\beta) + \cos(\beta) \cos(\epsilon) \sin(\lambda + \Delta \psi)$$

---

## Lunar Phase Angle & Illumination Fraction

The illuminated fraction of the Moon's disk ($k$) is derived from the geocentric phase angle ($i$):

$$k = \frac{1 + \cos(i)}{2}$$

$$\cos(i) = -\cos(\Delta_{\text{Sun-Moon}})$$

Where $\Delta_{\text{Sun-Moon}}$ is the elongation angle between the Sun and Moon as viewed from Earth.