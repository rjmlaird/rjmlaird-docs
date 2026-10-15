import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Getting started",
      collapsed: false,
      items: [
        "getting-started/installation",
        "getting-started/quickstart"
      ]
    },

    {
      type: "category",
      label: "Architecture",
      link: {
        type: "doc",
        id: "architecture/overview"
      },
      items: [
        "architecture/domain-model",
        "architecture/subdomain-catalogue",
        "architecture/environments",
        "architecture/content-platform",
        "architecture/media-assets-cdn",
        "architecture/apis-integrations",
        "architecture/automation-workflows",
        "architecture/security-privacy-access",
        "architecture/observability-status",
        "architecture/standards",
        "architecture/roadmap",

        {
          type: "category",
          label: "Decision records",
          link: {
            type: "doc",
            id: "architecture/adrs/index"
          },
          items: [
            "architecture/adrs/ADR-0001-docusaurus-on-github-pages",
            "architecture/adrs/ADR-0002-justify-subdomains-before-creating-them",
            "architecture/adrs/ADR-0003-separate-public-api-from-webhook-services"
          ]
        }
      ]
    },

    {
      type: "category",
      label: "Platform services",
      link: {
        type: "doc",
        id: "services/platform/overview"
      },
      items: [
        {
          type: "category",
          label: "Public services",
          items: [
            "services/platform/docs",
            "services/platform/data",
            "services/platform/api",
            "services/platform/status"
          ]
        },

        {
          type: "category",
          label: "Assets and content",
          items: [
            "services/platform/cdn",
            "services/platform/dam",
            "services/platform/upload"
          ]
        },

        {
          type: "category",
          label: "Developer surfaces",
          items: [
            "services/platform/dev",
            "services/platform/apps",
            "services/platform/tools",
            "services/platform/labs"
          ]
        },

        {
          type: "category",
          label: "Integration services",
          items: [
            "services/platform/auth",
            "services/platform/mcp",
            "services/platform/hooks",
            "services/platform/booking",
            "services/platform/dav"
          ]
        },

        {
          type: "category",
          label: "Control plane",
          items: ["services/platform/master"]
        }
      ]
    },

    {
      type: "category",
      label: "Guides",
      items: [
        "guides/configuration",
        "guides/deployment"
      ]
    },

    {
      type: "category",
      label: "Service delivery",
      link: {
        type: "doc",
        id: "services/index"
      },
      items: [
        {
          type: "category",
          label: "Architecture",
          link: {
            type: "doc",
            id: "services/architecture/overview"
          },
          items: ["services/architecture/customer-journeys"]
        },

        {
          type: "category",
          label: "Integrations",
          items: [
            "services/integrations/calcom",
            "services/integrations/hubspot",
            "services/integrations/stripe"
          ]
        },

        {
          type: "category",
          label: "Reference",
          items: [
            "services/reference/client-delivery",
            "services/reference/configuration",
            "services/reference/data-model",
            "services/reference/events",
            "services/reference/http-contracts"
          ]
        },

        {
          type: "category",
          label: "Runbooks",
          items: [
            "services/runbooks/secret-rotation",
            "services/runbooks/webhook-failures"
          ]
        },

        "services/launch-checklist"
      ]
    },

    {
      type: "category",
      label: "Tutorials",
      items: ["tutorials/first-tutorial"]
    },

    {
      type: "category",
      label: "Contributing",
      items: ["contributing/writing-docs"]
    }
  ]
};

export default sidebars;
