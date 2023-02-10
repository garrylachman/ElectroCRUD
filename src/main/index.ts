import 'reflect-metadata';
import { app, BrowserWindow } from 'electron';
import * as Splashscreen from '@trodi/electron-splashscreen';
import path from 'node:path';
import MenuBuilder from './menu';
import { RegisterServices, InitServices } from './services';

declare const SPLASH_SCREEN_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

RegisterServices();

if (require('electron-squirrel-startup')) {
  app.quit();
}

// eslint-disable-next-line import/no-mutable-exports, unicorn/no-null
export let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
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

  const RESOURCES_PATH = isDebug
    ? path.join(__dirname, '../../assets')
    : path.join(process.resourcesPath, 'assets');

  const getAssetPath = (paths: string): string => {
    return path.join(RESOURCES_PATH, paths);
  };

  const mainOptions: Electron.BrowserWindowConstructorOptions = {
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  };

  const config: Splashscreen.Config = {
    windowOpts: mainOptions,
    templateUrl: SPLASH_SCREEN_WEBPACK_ENTRY.replace("file://", ""),
    minVisible: 5000,
    delay: 0,
    splashScreenOpts: {
      center: true,
      width: 720,
      height: 405,
      transparent: true,
      resizable: false,
      alwaysOnTop: true,
      titleBarStyle: 'hidden',
    },
  };

  mainWindow = Splashscreen.initSplashScreen(config);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('ready-to-show', () => {
    InitServices();
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

app.on('ready', createWindow);
