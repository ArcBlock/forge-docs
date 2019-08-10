require('dotenv').config();

const path = require('path');
const { version } = require('./package.json');

[
  'GATSBY_ALGOLIA_APP_ID',
  'GATSBY_ALGOLIA_SEARCH_KEY',
  'GATSBY_ALGOLIA_SEARCH_KEY',
  'GATSBY_ALGOLIA_ADMIN_KEY',
].forEach(x => {
  if (!process.env[x]) {
    throw new Error(`Algolia search config process.env.${x} is required`);
  }
});

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/gatsby-theme-docs'),
      options: {
        version: `v${version}`,
        sourceDirs: [path.resolve(__dirname, 'src')],
        siteMetadata: {
          title: 'ArcBlock',
          subtitle: 'Documentation',
          description: 'Forge SDK Documentation',
        },
        algoliaSearch: {
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          adminKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
          searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        },
        navItems: [
          {
            title: 'Versions',
            link: '/versions',
            subPages: {
              'https://github.com/ArcBlock': 'v0.36.1',
              'https://www.arcblock.io': 'v0.35.0',
            },
          },
          {
            title: 'Community',
            link: '/community',
            subPages: {
              'https://github.com/ArcBlock': 'GitHub',
              'https://www.arcblock.io': 'About',
              'https://gitter.im/ArcBlock/community': 'Gitter',
              'https://twitter.com/ArcBlock_io': 'Twitter',
              'https://youtube.com/channel/UC0pEW_GOrMJ23l8QcrGdKSw': 'YouTube',
            },
          },
        ],
        extraPlugins: [],
      },
    },
  ],
};
