/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const processFolder = folder => {
  if (folder.indexOf('.error_code') > 0) {
    return;
  }
  console.log('merge folder', folder);
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
  const srcRoot = path.join(__dirname, '../src');
  const zhRoot = path.join(__dirname, '../src/zh');

  const relativePath = file.replace(srcRoot, '');
  const enSource = file;
  const zhSource = path.join(zhRoot, relativePath);

  const basename = path.basename(relativePath);
  const dirname = path.dirname(relativePath);
  if (basename === 'index.zh.md') {
    return;
  }

  let zhTarget = '';
  let enTarget = '';
  if (basename === 'index.md') {
    enTarget = enSource;
    zhTarget = path.join(srcRoot, dirname, 'index.zh.md');
  } else {
    const folderName = path.basename(relativePath, '.md');
    fs.mkdirSync(path.join(srcRoot, dirname, folderName));
    enTarget = path.join(srcRoot, dirname, folderName, 'index.md');
    zhTarget = path.join(srcRoot, dirname, folderName, 'index.zh.md');
  }

  console.log('merge file', {
    relativePath,
    enSource,
    zhSource,
    enTarget,
    zhTarget,
  });

  if (enSource !== enTarget) {
    fs.renameSync(enSource, enTarget);
    fixImageLinks(enTarget);
  }
  if (fs.existsSync(zhSource) === false) {
    return;
  }
  if (zhSource !== zhTarget) {
    fs.renameSync(zhSource, zhTarget);
    fixImageLinks(zhTarget);
  }
};

const fixImageLinks = file => {
  const content = fs.readFileSync(file).toString();
  fs.writeFileSync(file, content.replace(/\(\.\.\/assets\/images\//g, '(../../assets/images/'));
};

const root = path.resolve(__dirname, '../src');
const folders = fs
  .readdirSync(root)
  .filter(x => x !== 'zh')
  .filter(x => x.startsWith('.') === false)
  .filter(x => !['assets', 'status_code'].includes(x))
  .map(x => path.resolve(root, x))
  .filter(x => fs.statSync(x).isDirectory());

console.log(folders);
folders.forEach(x => processFolder(x));

// fixImageLinks(path.join(root, '../src/tools/forge_web.md'));
