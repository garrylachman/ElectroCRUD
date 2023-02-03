/* eslint-disable @typescript-eslint/no-explicit-any */
import createIPCMock from 'electron-mock-ipc';
import { jest } from '@jest/globals';

const mocked = createIPCMock();
const { ipcMain } = mocked;
const { ipcRenderer } = mocked;

const webContents = {
  send: ipcMain.send,
  getFocusedWebContents: () => ({
    send: (channel: string, ...rest: any[]) => ipcMain.send(channel, ...rest),
  }),
};

//export { ipcMain, ipcRenderer, webContents };

jest.mock('electron', () => {
  return {
    __esModule: true,
    ipcMain,
    ipcRenderer,
    webContents,
    Menu: jest.fn(),
  };
});
