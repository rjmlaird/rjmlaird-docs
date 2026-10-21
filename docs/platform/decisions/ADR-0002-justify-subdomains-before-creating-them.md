---
id: ADR-0002-justify-subdomains-before-creating-them
title: "ADR-0002: Justify subdomains before creating them"
description: A subdomain is created only if it needs a different runtime, security boundary, audience or external platform; otherwise content is delivered as a path.
status: Proposed
confidence: Partly verified
last_reviewed: 2026-10-11
---

## Status

Proposed.

## Context

The planning inventory lists 34 candidate subdomains, many of which overlap. Each real subdomain brings its own DNS record, certificate, deployment and navigation. Search authority is split across hostnames. Because the session cookie is shared across `*.rjmlaird.co.uk`, every subdomain also sits in the same trust zone.

## Decision

Create a subdomain only if it needs at least one of: a different runtime or build, a different security boundary, a different owner or audience with a distinct brand, or an external platform that requires it. Otherwise deliver the content as a path on the main site. Every subdomain must have an entry in the [subdomain catalogue](../governance/subdomains.md) with a status before a DNS record is added.

## Consequences

- Around 16 of the inventory hostnames become paths, and 5 are not created.
- One certificate, one navigation and one deployment cover most content.
- Some short URLs (for example `cv.rjmlaird.co.uk`) are lost unless a vanity redirect is added.
- Moving a section to its own subdomain later is possible, but needs redirects.

## Alternatives considered

- **One subdomain per topic** (the original inventory). Rejected: heavy maintenance, fragmented authority, and a larger shared-cookie surface.
- **No subdomains at all.** Rejected: the Workers services, docs and private tools genuinely need separate hostnames.
