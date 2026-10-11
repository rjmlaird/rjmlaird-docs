import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ab4'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'e00'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'ede'),
            routes: [
              {
                path: '/docs/api/overview',
                component: ComponentCreator('/docs/api/overview', '393'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs',
                component: ComponentCreator('/docs/architecture/adrs', '39b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0001-docusaurus-on-github-pages',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0001-docusaurus-on-github-pages', 'd1f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0002-justify-subdomains-before-creating-them',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0002-justify-subdomains-before-creating-them', '4a4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0003-separate-public-api-from-webhook-services',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0003-separate-public-api-from-webhook-services', '8ab'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/apis-integrations',
                component: ComponentCreator('/docs/architecture/apis-integrations', 'ff6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/automation-workflows',
                component: ComponentCreator('/docs/architecture/automation-workflows', 'd0c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/content-platform',
                component: ComponentCreator('/docs/architecture/content-platform', '6d6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/domain-model',
                component: ComponentCreator('/docs/architecture/domain-model', '600'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/environments',
                component: ComponentCreator('/docs/architecture/environments', '91e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/media-assets-cdn',
                component: ComponentCreator('/docs/architecture/media-assets-cdn', 'e4b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/observability-status',
                component: ComponentCreator('/docs/architecture/observability-status', 'd73'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/overview',
                component: ComponentCreator('/docs/architecture/overview', '243'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/roadmap',
                component: ComponentCreator('/docs/architecture/roadmap', '850'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/security-privacy-access',
                component: ComponentCreator('/docs/architecture/security-privacy-access', 'fbe'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/standards',
                component: ComponentCreator('/docs/architecture/standards', 'b7e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/subdomain-catalogue',
                component: ComponentCreator('/docs/architecture/subdomain-catalogue', '6e6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/contributing/writing-docs',
                component: ComponentCreator('/docs/contributing/writing-docs', '5a4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/getting-started/installation',
                component: ComponentCreator('/docs/getting-started/installation', '0b4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/getting-started/quickstart',
                component: ComponentCreator('/docs/getting-started/quickstart', '9b5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/guides/configuration',
                component: ComponentCreator('/docs/guides/configuration', '4ce'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/guides/deployment',
                component: ComponentCreator('/docs/guides/deployment', 'cf7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'c51'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/tutorials/first-tutorial',
                component: ComponentCreator('/docs/tutorials/first-tutorial', 'a72'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
