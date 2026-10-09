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
    component: ComponentCreator('/docs', '259'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '83e'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '86d'),
            routes: [
              {
                path: '/docs/api/overview',
                component: ComponentCreator('/docs/api/overview', '393'),
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
