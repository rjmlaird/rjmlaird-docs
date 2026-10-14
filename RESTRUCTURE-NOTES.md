# Restructure notes

Not part of the docs site. Delete after reading. Unzip so that `docs/` replaces the repo's `docs/` folder.

## Where each source file went

| Source | New location |
| --- | --- |
| `overview.md` | `docs/services/architecture/overview.md` (diagram, trust boundaries, least privilege, delivery semantics); table list moved to `reference/data-model.md` |
| `customer-flow.md` | `docs/services/architecture/customer-journeys.md` |
| `contracts.md` | split: `reference/http-contracts.md` and `reference/events.md` |
| `stripe.md`, `calcom.md`, `hubspot.md` | `docs/services/integrations/` (same headings in each) |
| `hubspot-sync` README | merged into `integrations/hubspot.md` (it duplicated it entirely) |
| `client-delivery` README | `reference/client-delivery.md` |
| `webhook-failures.md`, `secret-rotation.md` | `docs/services/runbooks/` (replay gate moved before replay steps) |
| Placeholder checklist (end of `secret-rotation.md`) | `docs/services/launch-checklist.md`, plus all `TODO(operator)` items |
| Secret names scattered across files | `reference/configuration.md` |
| New | `services/index.md` |

Duplicate README uploads were collapsed (2 distinct files, each uploaded twice).

## Edits to existing pages

`intro.md`, `contributing/writing-docs.md`, `architecture/apis-integrations.md` (HubSpot scopes answered, routes added), `automation-workflows.md` (DLQ answered), `security-privacy-access.md`, `observability-status.md`, `subdomain-catalogue.md` (`booking` conflict flagged, `billing` row added), `adrs/index.md` (four backlog items). Template pages (`getting-started`, `tutorials`, `api`, `guides`) are untouched.

## Added by me, not in your sources

- Runbook: D1 Time Travel restore point and a SELECT-before-UPDATE step before the ledger reset.
- Cal.com rotation: two named paths, plus a note that bookings may be missed during a gap.
- Launch checklist: "Verify in staging" section assembled from the testing notes; privacy-page link from the existing security page.
- Quoted the Mermaid labels (parses cleanly).

## Decisions and checks for you

1. **Public exposure.** The docs site is public on GitHub Pages. The runbooks, launch checklist and the `CALCOM_ALLOW_UNSIGNED` detail are operational. `stripe.md` already referenced `docs/runbooks/` in the private repo, so consider keeping `services/runbooks/` and `launch-checklist.md` there.
2. **Hostnames.** `booking` and `billing` conflict with ADR-0002 and the catalogue's "Merge" recommendation.
3. **`last_reviewed`** is set to 2026-10-14 (restructure date), and `confidence` to Partly verified. Nothing was checked against the repo or deployment.
4. **Sidebars.** `_category_.json` files are added for the new folders. If `sidebars.ts` is explicit, add the `services` entries.
5. **Possible gaps found:** Cal.com retries are assumed, not documented; reschedules leave stale rows; emails persist in queues and DLQs; manual payment links have no stated reconciliation path.
