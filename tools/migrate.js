/* eslint-disable no-console */

/*
title: 'Dummy Markdown Post'
description: 'Dummy Markdown Post'
keywords: 'dummy, post'
robots: 'index,follow'
category: Docs | Tutorials | Video
layout: 'documentation'
tags:
  - Tools
*/

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const root = path.resolve(__dirname, '../src');
const folders = fs
  .readdirSync(root)
  .filter(x => x.startsWith('.') === false)
  .map(x => path.resolve(root, x))
  .filter(x => x !== 'assets')
  .filter(x => fs.statSync(x).isDirectory());

folders.forEach((folder) => {
  const files = fs
    .readdirSync(folder)
    .filter(x => x.endsWith('.md') && x !== 'README.md')
    .map(x => path.resolve(folder, x));

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file).toString();
      const result = matter(content);
      if (result.data.title) {
        console.log('skip markdown with front matter', file);
        return;
      }

      const lines = content.split('\n').filter(x => x.trim());
      const [heading] = lines;
      const title = heading.replace('#', '').trim();
      const description = title;
      const tag1 = path.basename(folder);
      const tag2 = path.basename(file).replace(/\.md$/, '');

      const frontMatter = [
        '---',
        `title: "${title}"`,
        `description: "${description}"`,
        `keywords: ""`,
        `robots: "index,follow"`,
        `category: "docs"`,
        `layout: "documentation"`,
        `tags: \n  - "${tag1}"\n  - "${tag2}"`,
        '---',
        '\n'
      ];
      console.log('migrate markdown file', file, frontMatter);

      const newContent = frontMatter.concat(lines);
      fs.writeFileSync(file, newContent.join('\n'));
      process.exit();
    } catch (err) {
      console.error('error migrating markdown file', file, err);
    }
  });
});
