import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Proposed sidebar for the platform-services restructure.
// Every document ID below was derived from a file in docs/ and checked by a build.
// Merge with your existing sidebars.ts; do not paste over it blindly.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      items: ['getting-started/installation', 'getting-started/quickstart'],
    },
    {
      type: 'category',
      label: 'Architecture',
      link: {type: 'doc', id: 'architecture/overview'},
      items: [
        'architecture/domain-model',
        'architecture/subdomain-catalogue',
        'architecture/generated/subdomain-catalogue',
        'architecture/subdomain-planning-inventory',
        'architecture/apis-integrations',
        'architecture/automation-workflows',
        'architecture/content-platform',
        'architecture/media-assets-cdn',
        'architecture/security-privacy-access',
        'architecture/observability-status',
        'architecture/environments',
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
      label: 'Platform services',
      link: {type: 'doc', id: 'services/platform/overview'},
      items: [
        {
          type: 'category',
          label: 'Public services',
          items: [
            'services/platform/web',
            'services/platform/docs',
            'services/platform/data',
            'services/platform/api',
            'services/platform/status',
          ],
        },
        {
          type: 'category',
          label: 'Assets and content',
          items: ['services/platform/cdn', 'services/platform/dam', 'services/platform/upload'],
        },
        {
          type: 'category',
          label: 'Developer surfaces',
          items: [
            'services/platform/dev',
            'services/platform/apps',
            'services/platform/tools',
            'services/platform/labs',
          ],
        },
        {
          type: 'category',
          label: 'Integration services',
          items: [
            'services/platform/auth',
            'services/platform/mcp',
            'services/platform/hooks',
            'services/platform/booking',
            'services/platform/dav',
          ],
        },
        {
          type: 'category',
          label: 'Control plane',
          items: ['services/platform/master'],
        },
      ],
    },
    {
      type: 'category',
      label: 'API reference',
      items: ['api/overview'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/configuration',
        'guides/deployment',
        'guides/adding-a-service',
        'guides/publishing-data',
        'guides/incident-response',
      ],
    },
    {
      type: 'category',
      label: 'Service delivery',
      link: {type: 'doc', id: 'services/index'},
      items: [
        'services/launch-checklist',
        {
          type: 'category',
          label: 'Architecture',
          items: ['services/architecture/overview', 'services/architecture/customer-journeys'],
        },
        {
          type: 'category',
          label: 'Integrations',
          items: [
            'services/integrations/stripe',
            'services/integrations/calcom',
            'services/integrations/hubspot',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          items: [
            'services/reference/http-contracts',
            'services/reference/events',
            'services/reference/data-model',
            'services/reference/configuration',
            'services/reference/client-delivery',
          ],
        },
        {
          type: 'category',
          label: 'Runbooks',
          items: ['services/runbooks/webhook-failures', 'services/runbooks/secret-rotation'],
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
      label: 'Contributing',
      items: ['contributing/writing-docs'],
    },
  ],
};

export default sidebars;
