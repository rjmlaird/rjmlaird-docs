import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: ['getting-started/installation', 'getting-started/quickstart'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/overview'],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: ['tutorials/first-tutorial'],
    },
    {
      type: 'category',
      label: 'API reference',
      items: ['api/overview'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/configuration', 'guides/deployment'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/writing-docs'],
    },
  ],
};

export default sidebars;
