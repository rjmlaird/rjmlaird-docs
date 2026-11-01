---
title: labs.rjmlaird.co.uk
description: Experimental and exploratory work, kept clearly separate from production apps and tools.
sidebar:
  order: 4
status: active
confidence: partly-verified
visibility: public
lifecycle: active
reviewStatus: needs-review
owner: To confirm
reviewCycle: 6 months
lastReviewed: 2026-10-14
tags:
  - service
  - public
  - experimental
  - labs
---

## Purpose

`labs.rjmlaird.co.uk` shows experiments, prototypes and data pieces. Its single responsibility is to make exploratory work visible while keeping it clearly distinct from supported products.

## At a glance

| Field | Value |
| --- | --- |
| Hostname | `labs.rjmlaird.co.uk` |
| Classification | Labs |
| Visibility | Public |
| Lifecycle | Active |
| Evidence | Linked from a live site; hosting not verified |
| Catalogue | [Generated public service catalogue](/catalogue/generated/subdomain-catalogue/) |

## What it provides

- Experiments and prototypes, each labelled as such
- Data pieces built from open datasets, with licence and attribution
- A catalogue of experiments with a short description and status

## Catalogue model

| Aspect | Rule |
| --- | --- |
| One record represents | One experiment or data piece |
| Primary classification | Lab. When an experiment is adopted, create the [app](/catalogue/first-party/apps/) or [tool](/catalogue/first-party/tools/) record and link it with `promoted from`; do not copy the entry |
| Stability | No guarantee. An experiment may change or be retired without notice |

## Boundaries

This service does not:

- Provide production services that other systems depend on
- Hold private or customer data
- Present experiments as supported apps or tools

## Access model

Public and unauthenticated.

## Dependencies

- Open datasets, used under their licences
- Hosting and deployment: to confirm
- The public [api](/catalogue/first-party/api/) and [data](/catalogue/first-party/data/) services, where an experiment uses them

## Operations

- [Deployment and environments](/platform/governance/environments/)
- [Security, privacy and access](/platform/governance/security-and-privacy/)
- [Observability and status](/operate/status-and-observability/)
- [Adding or changing a service](/build/adding-a-service/)

## Related services

- [apps.rjmlaird.co.uk](/catalogue/first-party/apps/)
- [tools.rjmlaird.co.uk](/catalogue/first-party/tools/)
- [data.rjmlaird.co.uk](/catalogue/first-party/data/)
- [rjmlaird.co.uk](/catalogue/first-party/web/)
