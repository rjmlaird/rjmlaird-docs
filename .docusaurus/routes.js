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
    component: ComponentCreator('/docs', 'e8e'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '88c'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '15b'),
            routes: [
              {
                path: '/docs/api/overview',
                component: ComponentCreator('/docs/api/overview', '393'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs',
                component: ComponentCreator('/docs/architecture/adrs', '145'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0001-docusaurus-on-github-pages',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0001-docusaurus-on-github-pages', '85c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0002-justify-subdomains-before-creating-them',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0002-justify-subdomains-before-creating-them', '2d9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/adrs/ADR-0003-separate-public-api-from-webhook-services',
                component: ComponentCreator('/docs/architecture/adrs/ADR-0003-separate-public-api-from-webhook-services', '6c3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/apis-integrations',
                component: ComponentCreator('/docs/architecture/apis-integrations', '826'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/automation-workflows',
                component: ComponentCreator('/docs/architecture/automation-workflows', '7fa'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/content-platform',
                component: ComponentCreator('/docs/architecture/content-platform', '658'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/domain-model',
                component: ComponentCreator('/docs/architecture/domain-model', '8a4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/environments',
                component: ComponentCreator('/docs/architecture/environments', 'b31'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/media-assets-cdn',
                component: ComponentCreator('/docs/architecture/media-assets-cdn', 'a98'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/observability-status',
                component: ComponentCreator('/docs/architecture/observability-status', 'ced'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/overview',
                component: ComponentCreator('/docs/architecture/overview', '963'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/roadmap',
                component: ComponentCreator('/docs/architecture/roadmap', '590'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/security-privacy-access',
                component: ComponentCreator('/docs/architecture/security-privacy-access', 'e3d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/standards',
                component: ComponentCreator('/docs/architecture/standards', '8ae'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/subdomain-catalogue',
                component: ComponentCreator('/docs/architecture/subdomain-catalogue', '662'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/contributing/writing-docs',
                component: ComponentCreator('/docs/contributing/writing-docs', 'e8a'),
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
                path: '/docs/services',
                component: ComponentCreator('/docs/services', 'e5f'),
                exact: true
              },
              {
                path: '/docs/services/architecture/customer-journeys',
                component: ComponentCreator('/docs/services/architecture/customer-journeys', 'c64'),
                exact: true
              },
              {
                path: '/docs/services/architecture/overview',
                component: ComponentCreator('/docs/services/architecture/overview', 'fc6'),
                exact: true
              },
              {
                path: '/docs/services/integrations/calcom',
                component: ComponentCreator('/docs/services/integrations/calcom', '5f4'),
                exact: true
              },
              {
                path: '/docs/services/integrations/hubspot',
                component: ComponentCreator('/docs/services/integrations/hubspot', '338'),
                exact: true
              },
              {
                path: '/docs/services/integrations/stripe',
                component: ComponentCreator('/docs/services/integrations/stripe', '344'),
                exact: true
              },
              {
                path: '/docs/services/launch-checklist',
                component: ComponentCreator('/docs/services/launch-checklist', '89c'),
                exact: true
              },
              {
                path: '/docs/services/reference/client-delivery',
                component: ComponentCreator('/docs/services/reference/client-delivery', 'b68'),
                exact: true
              },
              {
                path: '/docs/services/reference/configuration',
                component: ComponentCreator('/docs/services/reference/configuration', '22a'),
                exact: true
              },
              {
                path: '/docs/services/reference/data-model',
                component: ComponentCreator('/docs/services/reference/data-model', 'cfc'),
                exact: true
              },
              {
                path: '/docs/services/reference/events',
                component: ComponentCreator('/docs/services/reference/events', 'aa9'),
                exact: true
              },
              {
                path: '/docs/services/reference/http-contracts',
                component: ComponentCreator('/docs/services/reference/http-contracts', '31a'),
                exact: true
              },
              {
                path: '/docs/services/runbooks/secret-rotation',
                component: ComponentCreator('/docs/services/runbooks/secret-rotation', '6c8'),
                exact: true
              },
              {
                path: '/docs/services/runbooks/webhook-failures',
                component: ComponentCreator('/docs/services/runbooks/webhook-failures', '098'),
                exact: true
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
