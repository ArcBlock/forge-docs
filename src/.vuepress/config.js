const configureWebpack = require('./webpack');
const markdown = require('./markdown');
const fs = require('fs');
const version = fs.readFileSync("../version", "utf-8").trim();

const doc_version = process.env.DOC_VERSION;

module.exports = {
  title: "Forge Framework Document",
  description: "Documentation for forge framework",
  configureWebpack,
  markdown,
  ga: '',
  dest: `../dist/forge/${doc_version}`,
  base: `/forge/${doc_version}/`,
  version: version,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'ArcBlock Forge Framework Documentation',
      description: 'Documentation for Forge framework.',
    },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   title: 'ArcBlock Forge 框架文档',
    //   description: 'ArcBlock Forge 框架相关文档。',
    // }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        lastUpdated: 'Last Updated',
        nav: [{
          text: 'GitHub',
          link: 'https://github.com/ArcBlock'
        }, ],
        sidebar: [{
            title: 'Introduction',
            collapsable: false,
            children: ['/intro/', '/intro/concepts', '/intro/transaction', '/intro/inside_forge'],
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
              '/sdk/',
              '/sdk/javascript',
              '/sdk/python',
              '/sdk/elixir',
              '/sdk/others'
            ],
          },
          {
            title: 'Forge Tools',
            collapsable: false,
            children: ['/tools/forge_cli', 'tools/forge_web', 'tools/abt_chain_node', '/tools/simulator', 'tools/forge_indexer'],
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
              '/rpc/wallet',
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
