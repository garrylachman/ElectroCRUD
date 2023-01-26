import 'reflect-metadata';

import { app, BrowserWindow, shell } from 'electron';
import * as Splashscreen from '@trodi/electron-splashscreen';
// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path';

import MenuBuilder from './menu';
import Services from './services';
import { resolveHtmlPath } from './util';

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */


// eslint-disable-next-line import/no-mutable-exports, unicorn/no-null
export let mainWindow: BrowserWindow | null = null;

// if (process.env.NODE_ENV === 'production') {
const sourceMapSupport = require('source-map-support');

sourceMapSupport.install();
// }

/*const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
*/
const isDebug = !app.isPackaged;

if (!isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const mainOptions: Electron.BrowserWindowConstructorOptions = {
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  };

  const config: Splashscreen.Config = {
    windowOpts: mainOptions,
    templateUrl: getAssetPath('splash.html'),
    minVisible: 2000,
    delay: 0,
    splashScreenOpts: {
      width: 720,
      height: 405,
      transparent: true,
      resizable: false,
      alwaysOnTop: true,
      titleBarStyle: 'hidden',
    },
  };

  mainWindow = Splashscreen.initSplashScreen(config);

  mainWindow.loadFile(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    Services();
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
