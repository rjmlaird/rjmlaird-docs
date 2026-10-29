```yaml
---
title: "Coordinate Converter"
slug: "coordinate-converter"
description: "Interactive astronomical coordinate transformation utility for converting between Equatorial (RA/Dec), Horizontal (Alt/Az), Ecliptic, and Galactic coordinate systems."
status: "active"
visibility: "public"
audience: ["maintainer", "developer", "researcher", "student"]
tags: ["astronomy", "coordinate-conversion", "equatorial", "horizontal", "ecliptic", "galactic", "tools", "astro"]
repository: "https://github.com/rjmlaird/rjmlaird-tools/tree/main/apps/coordinate-converter"
liveUrl: "https://tools.rjmlaird.co.uk/coordinate-converter"
owner: "Ryan Laird"
stack: ["TypeScript", "HTML5", "CSS3", "Cloudflare Workers", "Astro"]
reviewStatus: "needs-review"
---

```

# Coordinate Converter

Interactive positional astronomy utility hosted at **[tools.rjmlaird.co.uk/coordinate-converter](https://tools.rjmlaird.co.uk/coordinate-converter)** designed for seamless transformations between celestial reference frames, including Equatorial (Right Ascension $\alpha$, Declination $\delta$), Horizontal (Altitude $a$, Azimuth $A$), Ecliptic ($\lambda, \beta$), and Galactic ($l, b$) coordinate systems.

---

## Technical Overview & Reference Frames

Astronomical objects are cataloged and observed across diverse reference frames depending on whether the measurement is tied to Earth's rotation, the plane of the solar system (ecliptic), or the stellar disk of the Milky Way. This utility applies rigorous spherical trigonometry and rotation matrix transformations to convert positions accurately across epochs and frames.

---

## Equatorial to Horizontal Transformations

To convert celestial coordinates from the equatorial system (Right Ascension $\alpha$, Declination $\delta$) to local observer coordinates (Altitude $a$, Azimuth $A$), the local hour angle ($H$) is computed using Local Sidereal Time ($\text{LST}$):

$$H = \text{LST} - \alpha$$

### Altitude ($a$) & Azimuth ($A$) Formulation

$$\sin(a) = \sin(\phi) \sin(\delta) + \cos(\phi) \cos(\delta) \cos(H)$$

$$\tan(A) = \frac{-\sin(H)}{\cos(\phi) \tan(\delta) - \sin(\phi) \cos(H)}$$

Where $\phi$ represents the observer's geographic latitude. Azimuth $A$ is measured eastward from the North ($0^\circ$).

---

## Equatorial to Ecliptic Transformations

Converting equatorial coordinates ($\alpha, \delta$) to ecliptic coordinates (celestial longitude $\lambda$, latitude $\beta$) requires accounting for the obliquity of the ecliptic ($\epsilon \approx 23.439^\circ$), which represents the tilt of Earth's rotational axis relative to its orbital plane.

$$\sin(\beta) = \sin(\delta) \cos(\epsilon) - \cos(\delta) \sin(\epsilon) \sin(\alpha)$$

$$\cos(\lambda) \cos(\beta) = \cos(\alpha) \cos(\delta)$$

$$\sin(\lambda) \cos(\beta) = \sin(\delta) \sin(\epsilon) + \cos(\delta) \cos(\epsilon) \sin(\alpha)$$

---

## Equatorial to Galactic Transformations (J2000.0)

Galactic coordinates align positions relative to the plane of the Milky Way, with Galactic longitude ($l$) measured along the galactic equator from the galactic center, and Galactic latitude ($b$) measured perpendicular to it.

Using standard IAU J2000.0 North Galactic Pole coordinates ($\alpha_{\text{NGP}} = 192.85948^\circ$, $\delta_{\text{NGP}} = +27.12825^\circ$) and the ascending node of the galactic equator ($l_{\text{cp}} = 33.0$. $931^\circ$), the transformation is governed by spherical rotation:

$$\sin(b) = \sin(\delta) \sin(\delta_{\text{NGP}}) + \cos(\delta) \cos(\delta_{\text{NGP}}) \cos(\alpha - \alpha_{\text{NGP}})$$

$$\cos(b) \sin(l_{\text{cp}} - l) = \cos(\delta) \sin(\alpha - \alpha_{\text{NGP}})$$

$$\cos(b) \cos(l_{\text{cp}} - l) = \cos(\delta_{\text{NGP}}) \sin(\delta) - \sin(\delta_{\text{NGP}}) \cos(\delta) \cos(\alpha - \alpha_{\text{NGP}})$$

---

## Coordinate System Summary

| Coordinate System | Primary Axes / Variables | Reference Plane | Principal Use Case |
| --- | --- | --- | --- |
| **Equatorial** | Right Ascension ($\alpha$), Declination ($\delta$) | Celestial Equator | Star catalogs, telescope tracking mounts. |
| **Horizontal** | Altitude ($a$), Azimuth ($A$) | Observer's Horizon | Real-time pointing, rise/set visibility checks. |
| **Ecliptic** | Celestial Longitude ($\lambda$), Latitude ($\beta$) | Plane of Earth's Orbit (Ecliptic) | Solar system dynamics, planetary orbits, zodiacal tracking. |
| **Galactic** | Galactic Longitude ($l$), Latitude ($b$) | Milky Way Galactic Disk | Interstellar research, Milky Way structure, deep-sky mapping. |
