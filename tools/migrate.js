/* eslint-disable no-console */

/*
title: 'Dummy Markdown Post'
description: 'Dummy Markdown Post'
keywords: 'dummy, post'
robots: 'index,follow'
category: '' | Tutorials | Video
layout: 'documentation'
tags:
  - Tools
*/

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const processFolder = folder => {
  if (folder.indexOf('.error_code') > 0) {
    return;
  }
  console.log('migrate folder', folder);
  const allFiles = fs.readdirSync(folder);
  const mdFiles = allFiles.filter(x => x.endsWith('.md')).map(x => path.resolve(folder, x));

  mdFiles.forEach(file => processFile(folder, file));

  const subFolders = allFiles
    .filter(x => !x.endsWith('md') && !mdFiles.includes(x))
    .filter(x => !['assets', 'status_code', 'images'].includes(x))
    .map(x => path.resolve(folder, x));
  subFolders.forEach(x => processFolder(x));
};

const processFile = (folder, file) => {
  if (file.indexOf('.error_code') > 0) {
    return;
  }
  console.log('migrate file', file);
  try {
    const content = fs.readFileSync(file).toString();
    const result = matter(content);
    if (result.data.title) {
      console.log('skip markdown with front matter', file);
      return;
    }

    const tag1 = path.basename(folder);
    const tag2 = path.basename(file).replace(/\.md$/, '');
    const lines = content.split('\n');
    const [heading] = lines.filter(x => x.trim()).filter(Boolean);
    const title = heading ? heading.replace('#', '').trim() : tag2;
    const description = title;

    const frontMatter = [
      '---',
      `title: '${title}'`,
      `description: '${description}'`,
      `keywords: ''`,
      `robots: 'index,follow'`,
      `category: ''`,
      `layout: 'documentation'`,
      `tags: \n  - '${tag1}'\n  - '${tag2}'`,
      '---',
      '\n',
    ];
    console.log('migrate markdown file', file);

    const newContent = frontMatter.concat(lines.filter(x => x !== heading));
    fs.writeFileSync(file, newContent.join('\n'));
  } catch (err) {
    console.error('error migrating markdown file', file, err);
  }
};

const root = path.resolve(__dirname, '../src');
const folders = fs
  .readdirSync(root)
  .filter(x => x.startsWith('.') === false)
  .filter(x => !['assets', 'status_code'].includes(x))
  .map(x => path.resolve(root, x))
  .filter(x => fs.statSync(x).isDirectory());

console.log(folders);
folders.forEach(x => processFolder(x));
