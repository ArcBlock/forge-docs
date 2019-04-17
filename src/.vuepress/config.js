const configureWebpack = require('./webpack');
const markdown = require('./markdown');
const fs = require('fs');
const version = fs.readFileSync("../version", "utf-8").trim();

module.exports = {
  title: "Forge Framework Document",
  description: "Documentation for forge framework",
  configureWebpack,
  markdown,
  ga: '',
  dest: '../dist/forge',
  base: '/forge/',
  version: version,
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
            text: 'ABT Test Chain',
            link: 'http://abt-test.arcblock.co:8210/dashboard'
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
            children: ['/intro/', '/intro/transaction', '/intro/inside_forge'],
          },
          {
            title: 'Installation',
            collapsable: false,
            children: ['/install/', '/install/ubuntu', 'install/centos', 'install/macos'],
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
            title: 'Forge Tools',
            collapsable: false,
            children: ['/tools/forge_cli', 'tools/forge_web', '/tools/simulator', 'tools/forge_indexer'],
          },
          {
            title: 'Architecture',
            collapsable: false,
            children: [
              '/arch/overview',
            ],
          },
          {
            title: 'Forge Core',
            collapsable: false,
            children: [
              '/core/rpc',
              '/core/configuration',
              '/core/log',
              '/core/tx_protocol',
              '/core/code',
              '/core/bigint',
            ],
          },
          {
            title: 'Forge TX',
            collapsable: false,
            children: [
              '/txs/declare',
              '/txs/transfer',
              '/txs/exchange',
            ],
          },
          {
            title: 'Forge RPC',
            collapsable: false,
            children: [
              '/rpc/chain',
              '/rpc/event',
              '/rpc/state',
              '/rpc/stats',
              '/rpc/file',
            ],
          },
          {
            title: 'Forge Types',
            collapsable: false,
            children: [
              '/types/type',
              '/types/enum',
              '/types/state',
              '/types/trace_type',
            ],
          },
        ],
      }
    },
  }
};
