---
title: 'Raspberry Pi All-Sky Camera: Planning a Low-Power Night-Sky Monitoring Station'
slug: all-sky-camera
description: Planning a weatherproof, low-power all-sky camera built on a Raspberry Pi, with the open questions written down before any hardware is bought.
status: in-progress
tags: [astronomy, all-sky, imaging, raspberry-pi]
dateStarted: 2026-10-01
dateUpdated: 2026-10-11
hardware:
  - Raspberry Pi (model to be decided)
  - Camera module with a wide-angle or fisheye lens (to be decided)
  - Weatherproof enclosure with a clear dome (to be decided)
  - Power supply and outdoor cabling (to be decided)
software:
  - Raspberry Pi OS
  - Image capture service (to be written)
  - Image compression and processing scripts (to be written)
draft: false
---

> **Starting template.** This is the example project that ships with the site. It is a plan, not a record of a finished build, and it contains no results or measurements because none exist yet. Replace it with your own project, or keep it as a pattern for how to write one.

## Summary

The aim is a small, low-power station that photographs the whole sky through the night, stores the images locally and, optionally, publishes a gallery. It should run unattended for months. At this stage the project is a design on paper: this page records the goals, the proposed architecture and the questions that need answering before building starts.

## Why I built it

I want a continuous record of the sky above a UK garden: cloud cover, the Moon, meteors, aurora on the rare good night and the slow turn of the constellations. Commercial all-sky cameras exist, but they cost far more than a Raspberry Pi and a camera module, and building one is the best way to understand what the images can and cannot tell me.

_Not yet built._ Nothing here describes a working system.

## Design goals and constraints

**Goals**

- Capture the full sky automatically from dusk to dawn.
- Run on low power, ideally from a small supply that can be left on permanently.
- Store images locally first, so a network outage never loses data.
- Keep the software simple enough to maintain from a laptop.
- Document every decision, including the ones that turn out wrong.

**Constraints**

- A UK climate: rain, dew, frost and long damp winters.
- A garden site with some light pollution and an unobstructed but partial view.
- A modest budget, to be recorded in the [costs](#costs) section as parts are bought.
- No claim of scientific calibration. Photometry would need a separate, careful design.

## Hardware and software

None of the parts below are chosen yet. Each is an open decision.

| Part | Options being considered | Decision |
| --- | --- | --- |
| Computer | Raspberry Pi models with a camera connector | Not decided |
| Camera | An official camera module, or a sensor with better low-light performance | Not decided |
| Lens | Wide-angle or fisheye, with a suitable image circle for the sensor | Not decided |
| Enclosure | Weatherproof box with a clear dome | Not decided |
| Heater or dew control | Small resistive heater, or passive measures | Not decided |
| Storage | microSD, USB SSD or network storage | Not decided |

## System architecture

The proposed pipeline has five stages. Each can be tested on its own.

![A flow from the Raspberry Pi and camera module, through an image capture service, to local storage, then image compression and processing, and finally an optional web gallery or dashboard.](/diagrams/all-sky-architecture.svg)

1. **Raspberry Pi and camera module.** Capture hardware, mounted in the enclosure.
2. **Image capture service.** A small service that takes exposures on a schedule and saves them with timestamps.
3. **Local storage.** Raw or lightly processed frames kept on the device first.
4. **Compression and processing.** Convert, resize and archive images to control storage growth.
5. **Optional gallery or dashboard.** A way to look at recent images without logging into the Pi.

The text version of the flow:

```text
Raspberry Pi + camera module
  -> image capture service
  -> local storage
  -> image compression / processing
  -> optional web gallery / dashboard
```

## Build process

Not started. The intended order is:

1. Prove the capture service on the bench, indoors, with a test lens.
2. Test a full night of captures from a window to check exposure logic and storage use.
3. Build and test the enclosure with a heater and a humidity sensor, away from the camera.
4. Move outdoors in a sheltered position before committing to a permanent mount.

Each step will get its own entry in the [build logs](/build-logs/).

## Configuration and code

There is no code yet. When there is, this section will hold:

- The capture service source, or a link to its repository.
- A systemd unit so capture starts at boot and restarts after a failure.
- A minimal configuration file with every setting explained.

```ini
# Placeholder: the real settings will be added after the first bench tests.
# exposure_seconds =
# capture_interval_seconds =
# output_directory =
```

## Results and observations

None yet. This section will record what the camera actually produced, with sample images, exposure settings and honest notes on what worked. Until then, any number placed here would be a guess.

## Costs

Not yet recorded. Prices change, so each part will be logged with the date it was bought and the amount paid. A running total goes here once there is something to total.

## Problems and lessons learned

Nothing has gone wrong yet, which only means nothing has been tried. The risks below are the ones most likely to appear first, and they are the open questions that shape the design.

### Open questions

- **Weatherproofing.** Which enclosure and dome keep rain out while keeping the optical surface clean? How is the cable entry sealed?
- **Condensation.** Will a small heater be enough to stop dew forming on the dome? How much power does that take, and does it add heat noise to the images?
- **Power.** Can the Pi, camera and heater run from one supply? What happens during a power cut, and does the file system survive it?
- **Storage growth.** How many gigabytes does a night produce at the chosen resolution and interval? What compression is acceptable?
- **Exposure.** How should exposure change between twilight, a full Moon and a dark night? Does a fixed schedule work, or does it need to adapt?
- **Remote access.** Should the Pi be reachable from the internet at all? A private VPN or a one-way upload is safer than an open port.
- **Data retention.** How long are raw frames kept? Which images are worth archiving permanently?

## Future improvements

Ideas for after the basic system works:

- Cloud-cover estimates from the images.
- Meteor and satellite-trail detection.
- Combining the sky record with local weather data from other builds on this site.
- Time-lapse videos, generated nightly.

## Related links and resources

- [Build log: Project brief, designing an all-sky camera](/build-logs/all-sky-project-brief/)
- [Idea: Local air-quality monitoring station](/ideas/air-quality-station/)
- [Raspberry Pi documentation](https://www.raspberrypi.com/documentation/)
