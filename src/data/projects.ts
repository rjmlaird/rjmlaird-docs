export type Project = {
  name: string;
  summary: string;
  docsPath: string;
  status: 'stable' | 'beta' | 'planned';
};

// Add one entry per project. Each project gets its own section under /docs.
export const projects: Project[] = [
  {
    name: 'Project template',
    summary:
      'Placeholder section showing the structure every project follows: install, quickstart, architecture, API, config, deploy.',
    docsPath: '/docs/intro',
    status: 'planned',
  },
];
