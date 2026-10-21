const path = require('node:path');
const redirects = require('../../data/legacy-doc-routes.json');

/**
 * Creates lightweight client-side redirects for documentation routes moved during
 * the information-architecture migration. Keep data/legacy-doc-routes.json explicit.
 */
module.exports = function legacyRedirectsPlugin() {
  return {
    name: 'rjmlaird-docs-legacy-redirects',
    async allContentLoaded({ actions }) {
      const component = path.resolve(__dirname, 'Redirect.js');
      for (const redirect of redirects) {
        actions.addRoute({
          path: redirect.from,
          component,
          exact: true,
          props: { to: redirect.to },
        });
      }
    },
  };
};
