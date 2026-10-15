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
    component: ComponentCreator('/docs', 'cd6'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '457'),
        routes: [
          {
            path: '/docs/tags',
            component: ComponentCreator('/docs/tags', 'fce'),
            exact: true
          },
          {
            path: '/docs/tags/access',
            component: ComponentCreator('/docs/tags/access', '9b4'),
            exact: true
          },
          {
            path: '/docs/tags/api',
            component: ComponentCreator('/docs/tags/api', '0eb'),
            exact: true
          },
          {
            path: '/docs/tags/apps',
            component: ComponentCreator('/docs/tags/apps', '190'),
            exact: true
          },
          {
            path: '/docs/tags/assets',
            component: ComponentCreator('/docs/tags/assets', '4ea'),
            exact: true
          },
          {
            path: '/docs/tags/booking',
            component: ComponentCreator('/docs/tags/booking', 'd2f'),
            exact: true
          },
          {
            path: '/docs/tags/catalogue',
            component: ComponentCreator('/docs/tags/catalogue', '820'),
            exact: true
          },
          {
            path: '/docs/tags/concept',
            component: ComponentCreator('/docs/tags/concept', 'a14'),
            exact: true
          },
          {
            path: '/docs/tags/control-plane',
            component: ComponentCreator('/docs/tags/control-plane', 'fe5'),
            exact: true
          },
          {
            path: '/docs/tags/data',
            component: ComponentCreator('/docs/tags/data', 'c69'),
            exact: true
          },
          {
            path: '/docs/tags/developer',
            component: ComponentCreator('/docs/tags/developer', 'f4e'),
            exact: true
          },
          {
            path: '/docs/tags/documentation',
            component: ComponentCreator('/docs/tags/documentation', 'a92'),
            exact: true
          },
          {
            path: '/docs/tags/experimental',
            component: ComponentCreator('/docs/tags/experimental', '486'),
            exact: true
          },
          {
            path: '/docs/tags/governance',
            component: ComponentCreator('/docs/tags/governance', '811'),
            exact: true
          },
          {
            path: '/docs/tags/identity',
            component: ComponentCreator('/docs/tags/identity', 'fd3'),
            exact: true
          },
          {
            path: '/docs/tags/ingestion',
            component: ComponentCreator('/docs/tags/ingestion', '875'),
            exact: true
          },
          {
            path: '/docs/tags/integration',
            component: ComponentCreator('/docs/tags/integration', '42d'),
            exact: true
          },
          {
            path: '/docs/tags/labs',
            component: ComponentCreator('/docs/tags/labs', '939'),
            exact: true
          },
          {
            path: '/docs/tags/mcp',
            component: ComponentCreator('/docs/tags/mcp', '615'),
            exact: true
          },
          {
            path: '/docs/tags/protocol',
            component: ComponentCreator('/docs/tags/protocol', '8f0'),
            exact: true
          },
          {
            path: '/docs/tags/public',
            component: ComponentCreator('/docs/tags/public', '87a'),
            exact: true
          },
          {
            path: '/docs/tags/read-only',
            component: ComponentCreator('/docs/tags/read-only', 'db7'),
            exact: true
          },
          {
            path: '/docs/tags/reserved',
            component: ComponentCreator('/docs/tags/reserved', '45f'),
            exact: true
          },
          {
            path: '/docs/tags/restricted',
            component: ComponentCreator('/docs/tags/restricted', '168'),
            exact: true
          },
          {
            path: '/docs/tags/service',
            component: ComponentCreator('/docs/tags/service', 'd15'),
            exact: true
          },
          {
            path: '/docs/tags/status',
            component: ComponentCreator('/docs/tags/status', '684'),
            exact: true
          },
          {
            path: '/docs/tags/storage',
            component: ComponentCreator('/docs/tags/storage', '86d'),
            exact: true
          },
          {
            path: '/docs/tags/tools',
            component: ComponentCreator('/docs/tags/tools', '669'),
            exact: true
          },
          {
            path: '/docs/tags/webdav',
            component: ComponentCreator('/docs/tags/webdav', '233'),
            exact: true
          },
          {
            path: '/docs/tags/webhooks',
            component: ComponentCreator('/docs/tags/webhooks', 'c0b'),
            exact: true
          },
          {
            path: '/docs/tags/website',
            component: ComponentCreator('/docs/tags/website', '8e4'),
            exact: true
          },
          {
            path: '/docs/tags/write',
            component: ComponentCreator('/docs/tags/write', '754'),
            exact: true
          },
          {
            path: '/docs/tags/zotero',
            component: ComponentCreator('/docs/tags/zotero', '982'),
            exact: true
          },
          {
            path: '/docs',
            component: ComponentCreator('/docs', '15f'),
            routes: [
              {
                path: '/docs/api/overview',
                component: ComponentCreator('/docs/api/overview', '9f1'),
                exact: true
              },
              {
                path: '/docs/architecture/adrs',
                component: ComponentCreator('/docs/architecture/adrs', '7d5'),
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
                component: ComponentCreator('/docs/architecture/apis-integrations', 'c4a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/automation-workflows',
                component: ComponentCreator('/docs/architecture/automation-workflows', '334'),
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
                path: '/docs/architecture/generated/subdomain-catalogue',
                component: ComponentCreator('/docs/architecture/generated/subdomain-catalogue', 'd83'),
                exact: true
              },
              {
                path: '/docs/architecture/media-assets-cdn',
                component: ComponentCreator('/docs/architecture/media-assets-cdn', 'a98'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/observability-status',
                component: ComponentCreator('/docs/architecture/observability-status', '388'),
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
                component: ComponentCreator('/docs/architecture/security-privacy-access', 'aee'),
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
                component: ComponentCreator('/docs/architecture/subdomain-catalogue', '033'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/subdomain-planning-inventory',
                component: ComponentCreator('/docs/architecture/subdomain-planning-inventory', '6b5'),
                exact: true
              },
              {
                path: '/docs/contributing/writing-docs',
                component: ComponentCreator('/docs/contributing/writing-docs', '63a'),
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
                path: '/docs/guides/adding-a-service',
                component: ComponentCreator('/docs/guides/adding-a-service', 'ffc'),
                exact: true
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
                path: '/docs/guides/incident-response',
                component: ComponentCreator('/docs/guides/incident-response', 'd1b'),
                exact: true
              },
              {
                path: '/docs/guides/publishing-data',
                component: ComponentCreator('/docs/guides/publishing-data', 'c63'),
                exact: true
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '980'),
                exact: true
              },
              {
                path: '/docs/services',
                component: ComponentCreator('/docs/services', '829'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/architecture/customer-journeys',
                component: ComponentCreator('/docs/services/architecture/customer-journeys', 'a41'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/architecture/overview',
                component: ComponentCreator('/docs/services/architecture/overview', '0ba'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/integrations/calcom',
                component: ComponentCreator('/docs/services/integrations/calcom', '0a6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/integrations/hubspot',
                component: ComponentCreator('/docs/services/integrations/hubspot', '1ec'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/integrations/stripe',
                component: ComponentCreator('/docs/services/integrations/stripe', '9b7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/launch-checklist',
                component: ComponentCreator('/docs/services/launch-checklist', '430'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/api',
                component: ComponentCreator('/docs/services/platform/api', '5dd'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/apps',
                component: ComponentCreator('/docs/services/platform/apps', '841'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/auth',
                component: ComponentCreator('/docs/services/platform/auth', '0d6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/booking',
                component: ComponentCreator('/docs/services/platform/booking', 'c34'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/cdn',
                component: ComponentCreator('/docs/services/platform/cdn', '9bb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/dam',
                component: ComponentCreator('/docs/services/platform/dam', 'ab4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/data',
                component: ComponentCreator('/docs/services/platform/data', '483'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/dav',
                component: ComponentCreator('/docs/services/platform/dav', 'd98'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/dev',
                component: ComponentCreator('/docs/services/platform/dev', 'b68'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/docs',
                component: ComponentCreator('/docs/services/platform/docs', '43b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/hooks',
                component: ComponentCreator('/docs/services/platform/hooks', '759'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/labs',
                component: ComponentCreator('/docs/services/platform/labs', 'cd6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/master',
                component: ComponentCreator('/docs/services/platform/master', '4c4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/mcp',
                component: ComponentCreator('/docs/services/platform/mcp', '54f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/overview',
                component: ComponentCreator('/docs/services/platform/overview', '532'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/status',
                component: ComponentCreator('/docs/services/platform/status', '097'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/tools',
                component: ComponentCreator('/docs/services/platform/tools', 'c52'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/upload',
                component: ComponentCreator('/docs/services/platform/upload', 'cff'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/platform/web',
                component: ComponentCreator('/docs/services/platform/web', 'b81'),
                exact: true
              },
              {
                path: '/docs/services/reference/client-delivery',
                component: ComponentCreator('/docs/services/reference/client-delivery', 'ba9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/reference/configuration',
                component: ComponentCreator('/docs/services/reference/configuration', '21e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/reference/data-model',
                component: ComponentCreator('/docs/services/reference/data-model', 'b2e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/reference/events',
                component: ComponentCreator('/docs/services/reference/events', '32f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/reference/http-contracts',
                component: ComponentCreator('/docs/services/reference/http-contracts', '91f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/runbooks/secret-rotation',
                component: ComponentCreator('/docs/services/runbooks/secret-rotation', 'c29'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/services/runbooks/webhook-failures',
                component: ComponentCreator('/docs/services/runbooks/webhook-failures', 'a3b'),
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
