import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import path from 'node:path';
import { mainConfig } from './config/webpack.main.config';
import { rendererConfig } from './config/webpack.renderer.config';
import { sourceMainPath, sourceRendererPath } from './config/webpack.paths';

const config: ForgeConfig = {
  packagerConfig: {
    asar: false,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      devServer: {
        liveReload: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: {
          verbose: true,
        },
      },
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            rhmr: 'react-hot-loader/patch',
            html: path.join(sourceRendererPath, 'index.html'),
            js: path.join(sourceRendererPath, 'index.tsx'),
            name: 'main_window',
            preload: {
              js: path.join(sourceMainPath, 'preload.ts'),
            },
          },
          {
            html: path.join(sourceRendererPath, 'splash-screen/index.html'),
            js: path.join(sourceRendererPath, 'splash-screen/index.tsx'),
            name: 'splash_screen',
          },
        ],
      },
    }),
  ],
};

export default config;
