import path from 'node:path';

// eslint-disable-next-line unicorn/prefer-module
const rootPath = path.resolve(path.join(__dirname, '..'));
const webpackConfigPath = path.join(rootPath, 'config');
const sourcePath = path.join(rootPath, 'src');
const sourceMainPath = path.join(sourcePath, 'main');
const sourceRendererPath = path.join(sourcePath, 'renderer');
const sourceSharedPath = path.join(sourcePath, 'shared');
const assetsPath = path.join(rootPath, 'assets');

export {
  rootPath,
  sourcePath,
  sourceMainPath,
  sourceRendererPath,
  sourceSharedPath,
  webpackConfigPath,
  assetsPath,
};
