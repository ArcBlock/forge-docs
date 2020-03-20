require('dotenv').config();

const path = require('path');
const { version } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/www'),
    },
    {
      resolve: require.resolve('@arcblock/gatsby-theme-docs'),
      options: {
        version: `v${version}`,
        official: true,
        disableI18n: false,
        sourceDirs: [path.resolve(__dirname, 'src')],
        siteMetadata: {
          title: 'Documentation',
          description: 'Forge SDK Documentation',
          logoUrl: '/docs/intro',
          sidebarWidth: 320,
        },
        algoliaSearch: {
          enabled: process.env.NODE_ENV === 'production',
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          adminKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
          searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
          indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        },
        navItems: [],
        extraPlugins: [],
      },
    },
  ],
};
