# Migration notes: custom Astro to Starlight

## Done
- 71 pages migrated from `guides/`, `reference/` and `operations/` into `src/content/docs/`. Callouts (`info/warning` to `note/caution`), links (337 relative `.md` links to absolute paths), front matter (`sidebar_position` to `sidebar.order`, `last_reviewed` to `lastReviewed`, status values to kebab-case) and duplicate H1s converted.
- Dropped as duplicates or replaced: `guides/index.md`, `getting-started/index.md`, the old generated catalogue, the Docusaurus ADR template (now `templates/`).
- Corrected stale statements (Docusaurus, versions, generator commands, wiki now Quartz). ADR-0001 marked superseded by new ADR-0004.
- 137 redirects from legacy `/docs/...`, `/guides/`, `/operations/`, `/projects/...`; real 301s emitted in `_redirects`.

## Deliberately left out of the published site
- `src/content/repos/*.md` (21 unreviewed starter records; never published by the old site) and `src/content/builds/**` (README mirrors).
- `src/content/pi-field-notes/`: a separate Astro project embedded in content; move to its own repo.
- Python and `write_readmes.js` leftovers, `project.yml*`, `.docusaurus/`, `.cache/`, `.obsidian/`, `techstack.json`.

## To review
1. **Verification status**: 50 pages carry a review date but `needs-review`. Review them or drop the dates.
2. **Visibility**: the old repo records marked `rjmlaird-services` public and `dav` public while the guides call them private/restricted. They are not published, but confirm.
3. **Status page**: catalogue says `status` is planned; you describe it as built.
4. **Licence** CC BY 4.0 and the footer link to rjmlaird.co.uk/policies/.
5. **Hosting**: still GitHub Pages (no custom headers). Cloudflare is recommended; CSP ships report-only.

## Not verified here
No browser was available, so visual rendering, Mermaid and Pagefind under CSP were not checked in a browser. Caddy, Nginx and Docker files were not run. The build, link validation, content lint, safety scan and tests were.
