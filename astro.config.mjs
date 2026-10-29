import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import legacyRoutes from './data/legacy-doc-routes.json' with { type: 'json' };
import reposData from './data/github-repos.json' with { type: 'json' };
import { slugify } from './src/lib/slugify.js';

// Generate repository slugs dynamically from github-repos.json instead of src/content/repos
const repoSlugs = reposData.repositories.map((repo) => slugify(repo.name));

const projectsToRepos = {
  '/projects/': '/repos/',
  ...Object.fromEntries(repoSlugs.map((slug) => [`/projects/${slug}/`, `/repos/${slug}/`])),
};

export default defineConfig({
  site: 'https://docs.rjmlaird.co.uk',
  trailingSlash: 'always',
  redirects: { ...projectsToRepos, ...Object.fromEntries(legacyRoutes.map(({ from, to }) => [
    from.endsWith('/') ? from : `${from}/`,
    to.endsWith('/') ? to : `${to}/`,
  ])) },
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});