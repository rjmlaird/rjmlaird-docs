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
      items: [
        'architecture/overview',
        'architecture/domain-model',
        'architecture/subdomain-catalogue',
        'architecture/environments',
        'architecture/content-platform',
        'architecture/media-assets-cdn',
        'architecture/apis-integrations',
        'architecture/automation-workflows',
        'architecture/security-privacy-access',
        'architecture/observability-status',
        'architecture/standards',
        'architecture/roadmap',
        {
          type: 'category',
          label: 'Decision records',
          link: {type: 'doc', id: 'architecture/adrs/index'},
          items: [
            'architecture/adrs/ADR-0001-docusaurus-on-github-pages',
            'architecture/adrs/ADR-0002-justify-subdomains-before-creating-them',
            'architecture/adrs/ADR-0003-separate-public-api-from-webhook-services',
          ],
        },
      ],
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
