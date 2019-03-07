module.exports = {

  ga: '',
  dest: '../dist/forge',
  base: '/forge/',
  markdown: {
    lineNumbers: true,
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'ArcBlock Forge Framework Documentation',
      description: 'Documentation for Forge framework.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'ArcBlock Forge 框架文档',
      description: 'ArcBlock Forge 框架相关文档。',
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        lastUpdated: 'Last Updated',
        nav: [{
            text: 'Developer Console',
            link: 'https://console.arcblock.io'
          },
          {
            text: 'ArcBlock',
            link: 'https://www.arcblock.io'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/ArcBlock'
          },
        ],
        sidebar: [{
            title: 'Introduction',
            collapsable: false,
            children: ['/intro/', '/intro/quick-start', '/intro/inside-forge'],
          },
          {
            title: 'Forge SDK',
            collapsable: false,
            children: [
              '/sdk/javascript',
              '/sdk/python',
              '/sdk/elixir',
              '/sdk/others'
            ],
          },
          {
            title: 'Tools',
            collapsable: false,
            children: ['/tools/simulator'],
          },
          {
            title: 'Architecture',
            collapsable: false,
            children: [
              '/arch/overview',
            ],
          },
        ],
      }
    },
  }
};
