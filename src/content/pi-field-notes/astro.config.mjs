// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { unified } from '@astrojs/markdown-remark';

// SITE_URL and BASE_PATH come from the environment (or a local .env file).
// See .env.example and docs/deployment.md.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = process.env.SITE_URL ?? env.SITE_URL ?? 'https://example.com';
const base = process.env.BASE_PATH ?? env.BASE_PATH ?? '/';

/**
 * Markdown links such as [Projects](/projects/) are root-relative. When the site is served
 * from a sub-path (GitHub Pages project sites), prefix them with the base path.
 */
function remarkBasePath() {
  const prefix = base.replace(/\/$/, '');
  /** @param {any} node */
  const walk = (node) => {
    if ((node.type === 'link' || node.type === 'image') && typeof node.url === 'string') {
      if (node.url.startsWith('/') && !node.url.startsWith('//')) node.url = prefix + node.url;
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (/** @type {any} */ tree) => {
    if (prefix) walk(tree);
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkBasePath] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
