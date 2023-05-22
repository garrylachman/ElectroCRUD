import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSnap } from '@electron-forge/maker-snap';
import { PublisherGithub } from '@electron-forge/publisher-github';
import { MakerAppImage } from '@reforged/maker-appimage';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import path from 'node:path';
import { mainConfig } from './config/webpack.main.config';
import { rendererConfig } from './config/webpack.renderer.config';
import {
  sourceMainPath,
  sourceRendererPath,
  assetsPath,
} from './config/webpack.paths';

const config: ForgeConfig = {
  packagerConfig: {
    asar: false,
    executableName: 'electrocrud',
    name: 'Electro CRUD',
    appBundleId: 'com.garrylachman.electrocrud',
    icon: path.resolve(assetsPath, 'icon'),
    appCategoryType: 'public.app-category.developer-tools',
    win32metadata: {
      CompanyName: 'Electro CRUD',
      OriginalFilename: 'Electro CRUD',
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel(
      {
        authors: 'Garry Lachman',
      },
      ['win32']
    ),
    new MakerZIP({}, ['darwin']),
    new MakerRpm(
      {
        options: {
          homepage: 'https://github.com/garrylachman/ElectroCRUD',
        },
      },
      ['linux']
    ),
    new MakerDeb(
      {
        options: {
          categories: ['Utility'],
          maintainer: 'Garry Lachman',
          homepage: 'https://github.com/garrylachman/ElectroCRUD',
        },
      },
      ['linux']
    ),
    /*
    new MakerAppImage({
      options: {
        categories: ['Utility'],
        bin: 'electrocrud',
        icon: 'assets/icon.png',
      },
    }),
    */
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: 'garrylachman',
        name: 'electrocrud',
      },
      prerelease: true,
      draft: true,
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
