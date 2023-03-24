import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSnap } from '@electron-forge/maker-snap';
import { PublisherGithub } from '@electron-forge/publisher-github';
import { MakerFlatpak } from '@electron-forge/maker-flatpak';
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
    new MakerSquirrel({
      authors: 'Garry Lachman',
    }),
    new MakerZIP({}, ['darwin']),
    /*   new MakerRpm({
      options: {
        homepage: 'https://github.com/garrylachman/ElectroCRUD',
      },
    }),
    new MakerDeb({
      options: {
        categories: ['Utility'],
        maintainer: 'Garry Lachman',
        homepage: 'https://github.com/garrylachman/ElectroCRUD',
      },
    }),
    */
    new MakerSnap({
      options: {
        features: {
          audio: true,
          mpris: 'org.electrocrud',
          webgl: true,
        },
        summary: 'ElectroCRUD v3',
      },
    }),
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: 'garrylachman',
        name: 'electrocrud',
      },
      prerelease: true,
    }),
  ],
  plugins: [
    new WebpackPlugin({
      devServer: {
        liveReload: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: { verbose: true },
      },
      // @ts-ignore
      devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data: ws:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: http: ws:`,
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            // @ts-ignore
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
