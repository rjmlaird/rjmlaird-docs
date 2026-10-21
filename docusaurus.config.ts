import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GITHUB_ORG = 'rjmlaird';
const GITHUB_REPO = 'rjmlaird-docs';

const config: Config = {
  title: 'RJM Laird Docs',
  tagline: 'Guides, references, and architecture notes for RJM Laird projects and tools.',
  favicon: 'img/favicon.svg',

  url: 'https://docs.rjmlaird.co.uk',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: GITHUB_ORG,
  projectName: GITHUB_REPO,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en-GB',
    locales: ['en-GB'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchBarPosition: 'right',
      },
    ],
  ],

  plugins: [
    'docusaurus-plugin-mermaid-pan-zoom',
    './plugins/legacy-redirects',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/edit/main/`,
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'RJM Laird Docs',
      logo: {
        alt: 'RJM Laird',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/build/api/overview',
          label: 'API',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://rjmlaird.co.uk',
          label: 'Main site',
          position: 'right',
        },
        {
          href: 'https://labs.rjmlaird.co.uk',
          label: 'Labs',
          position: 'right',
        },
        {
          href: `https://github.com/${GITHUB_ORG}`,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting started',
              to: '/docs/start-here/overview',
            },
            {
              label: 'Access and environments',
              to: '/docs/platform/governance/environments',
            },
            {
              label: 'Architecture',
              to: '/docs/platform/overview',
            },
            {
              label: 'Deployment',
              to: '/docs/build/deployment',
            },
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            {
              label: 'Main site',
              href: 'https://rjmlaird.co.uk',
            },
            {
              label: 'Labs',
              href: 'https://labs.rjmlaird.co.uk',
            },
            {
              label: 'GitHub',
              href: `https://github.com/${GITHUB_ORG}`,
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Ryan Laird. Documentation licensed under CC BY 4.0.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'toml', 'python', 'diff'],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },

    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
