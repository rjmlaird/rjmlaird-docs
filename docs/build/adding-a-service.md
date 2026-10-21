---
title: Adding a service
description: The checklist for adding a new service or hostname to the rjmlaird.co.uk estate, from justification to documentation, in a single pull request.
sidebar_position: 3
---

A new service touches DNS, security, monitoring and documentation, so it is added in one reviewed change. Nothing here may be skipped; "not applicable" needs a stated reason.

## Requirements

| # | Requirement | Where it is recorded |
| --- | --- | --- |
| 1 | **Justify the hostname.** Meet at least one test in [When a subdomain is justified](../platform/governance/subdomains.md#when-a-subdomain-is-justified); otherwise use a path | ADR or pull request description |
| 2 | **Add a catalogue entry** to `data/subdomains.json` | [Subdomain catalogue](../platform/governance/subdomains.md) |
| 3 | **Write a first-party service page** with one responsibility and its boundaries | `docs/catalogue/first-party/<slug>.md` |
| 4 | **Set visibility and lifecycle explicitly.** Default to restricted for anything that writes, integrates or manages | Catalogue and page front matter |
| 5 | **Decide ownership.** Name who maintains it and where the code lives | Service page |
| 6 | **Decide monitoring.** State whether it has a health check and whether it appears on the status page | Service page; [Observability](../operate/status-and-observability.md) |
| 7 | **Review threats and access.** Cover untrusted input, the shared session cookie, secrets and least privilege | [Security, privacy and access](../platform/governance/security-and-privacy.md) |
| 8 | **Write deployment and rollback notes.** Say how it is released and how it is reversed | [Environments and deployment model](../platform/governance/environments.md) |
| 9 | **Update documentation and status in the same pull request** | This checklist |

## Steps

1. Open the pull request and describe the justification (requirement 1).
2. Add the catalogue record. Use `planned` until the service is verified as running, and set `evidence` honestly.

   ```json title="Catalogue record (illustrative)"
   {
     "slug": "example",
     "hostname": "example.rjmlaird.co.uk",
     "title": "Example",
     "purpose": "One public-safe sentence",
     "classification": "integration",
     "visibility": "restricted",
     "lifecycle": "planned",
     "evidence": "none",
     "documentation": "catalogue/first-party/example.md",
     "publish": true,
     "status": null,
     "health": null,
     "repository": null
   }
   ```

3. Create the service page. Give it `visibility` and `lifecycle` front matter that match the record, and link to shared pages instead of repeating their rules.
4. Run `pnpm run docs:generate`, then `pnpm run docs:check`, and commit the regenerated table.
5. Add the page to `sidebars.ts` in the right group.
6. Build the site and fix any broken link before requesting review.

## Never include

Secrets, credentials, account or binding identifiers, bucket names, internal hostnames, private management or health URLs, and exact access-policy rules.

## After launch

Change `lifecycle` to `active` only when a repository or a check verifies the service, and update the page, the catalogue and the status page together. To retire a service, set `retired`, redirect or remove DNS in the same change, and record the decision.
