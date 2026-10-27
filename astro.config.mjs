import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import legacyRoutes from './data/legacy-doc-routes.json' with { type: 'json' };

export default defineConfig({
  site: 'https://docs.rjmlaird.co.uk',
  trailingSlash: 'always',
  redirects: Object.fromEntries(legacyRoutes.map(({ from, to }) => [
    from.endsWith('/') ? from : `${from}/`,
    to.endsWith('/') ? to : `${to}/`,
  ])),
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
