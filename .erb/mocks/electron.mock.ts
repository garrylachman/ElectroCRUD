/* eslint-disable @typescript-eslint/no-explicit-any */
import createIPCMock from 'electron-mock-ipc';

const mocked = createIPCMock();
const { ipcMain } = mocked;
const { ipcRenderer } = mocked;

const webContents = {
  send: ipcMain.send,
  getFocusedWebContents: () => ({
    send: (channel: string, ...rest: any[]) => ipcMain.send(channel, ...rest),
  }),
};

export { ipcMain, ipcRenderer, webContents };
