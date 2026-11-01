// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import mermaid from 'astro-mermaid';
import fs from 'node:fs';

const SITE = 'https://docs.rjmlaird.co.uk';
const REPO = 'https://github.com/rjmlaird/rjmlaird-docs';

/** Old URLs -> new URLs. Built by the migration; extended with repo slugs below. */
const redirectList = JSON.parse(fs.readFileSync(new URL('./data/redirects.json', import.meta.url), 'utf8'));
const redirects = Object.fromEntries(redirectList.map(({ from, to }) => [from, to]));
// /projects/ was renamed /repos/ in October 2026.
redirects['/projects/'] = '/repos/';
const repos = JSON.parse(fs.readFileSync(new URL('./data/github-repos.json', import.meta.url), 'utf8'));
for (const r of repos.repositories ?? []) {
  if (r.isPrivate) continue;
  const slug = r.name.toLowerCase().replace(/[^\w-]+/g, '');
  redirects[`/projects/${slug}/`] = `/repos/${slug}/`;
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  redirects,
  integrations: [
    mermaid({ theme: 'neutral', autoTheme: true }),
    starlight({
      title: 'RJM Laird Docs',
      description:
        'Public technical documentation for the rjmlaird.co.uk digital estate: services, APIs, tools, architecture and operating practice.',
      logo: { src: './src/assets/logo.svg', alt: '' },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: REPO },
        { icon: 'external', label: 'Main site', href: 'https://rjmlaird.co.uk' },
      ],
      editLink: { baseUrl: `${REPO}/edit/main/` },
      lastUpdated: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/space-grotesk',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/brand.css',
      ],
      expressiveCode: {
        styleOverrides: { borderRadius: '6px', codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace" },
      },
      components: {
        PageTitle: './src/components/PageTitle.astro',
        Footer: './src/components/Footer.astro',
      },
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0B0F1A' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'RJM Laird Docs' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'en_GB' } },
        { tag: 'meta', attrs: { name: 'author', content: 'Ryan Laird' } },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: true,
          errorOnInvalidHashes: true,
          // Generated catalogue pages link out to many live surfaces; only internal links are checked.
          errorOnLocalLinks: true,
        }),
      ],
      sidebar: [
        { label: 'Start here', collapsed: false, items: [{ autogenerate: { directory: 'start-here' } }] },
        {
          label: 'Platform',
          collapsed: true,
          items: [
            { slug: 'platform/overview' },
            { slug: 'platform/domain-model' },
            { slug: 'platform/roadmap' },
            { label: 'Architecture', collapsed: true, items: [{ autogenerate: { directory: 'platform/architecture' } }] },
            { label: 'Governance', collapsed: true, items: [{ autogenerate: { directory: 'platform/governance' } }] },
            { label: 'Decisions (ADRs)', collapsed: true, items: [{ autogenerate: { directory: 'platform/decisions' } }] },
          ],
        },
        {
          label: 'Service catalogue',
          collapsed: true,
          items: [
            { slug: 'catalogue' },
            { slug: 'catalogue/generated/subdomain-catalogue' },
            { label: 'First-party services', collapsed: true, items: [{ autogenerate: { directory: 'catalogue/first-party' } }] },
            { label: 'External integrations', collapsed: true, items: [{ autogenerate: { directory: 'catalogue/external-integrations' } }] },
            { slug: 'catalogue/service-template' },
          ],
        },
        {
          label: 'Build',
          collapsed: true,
          items: [
            { slug: 'build/configuration' },
            { slug: 'build/deployment' },
            { slug: 'build/adding-a-service' },
            { slug: 'build/publishing-data' },
            { slug: 'build/api/overview' },
            { label: 'Technical reference', collapsed: true, items: [{ autogenerate: { directory: 'build/reference' } }] },
          ],
        },
        {
          label: 'Operate',
          collapsed: true,
          items: [
            { slug: 'operate/launch-readiness' },
            { slug: 'operate/incident-response' },
            { slug: 'operate/status-and-observability' },
            { slug: 'operate/service-ownership' },
            { slug: 'operate/docs-deployment' },
            { label: 'Runbooks', collapsed: true, items: [{ autogenerate: { directory: 'operate/runbooks' } }] },
          ],
        },
        { label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
        {
          label: 'Directory',
          collapsed: true,
          items: [
            { slug: 'repos' },
            { label: 'Builds', collapsed: true, items: [
              { slug: 'builds' }, { slug: 'builds/apps' }, { slug: 'builds/tools' }, { slug: 'builds/labs' },
            ] },
            { slug: 'boards' },
          ],
        },
        { label: 'Contribute', collapsed: true, items: [{ autogenerate: { directory: 'contribute' } }] },
        { label: 'Changelog', collapsed: true, items: [{ autogenerate: { directory: 'changelog' } }] },
      ],
    }),
  ],
});
