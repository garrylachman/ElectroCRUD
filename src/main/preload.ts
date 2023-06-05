// @ts-nocheck
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCChannel } from '@electrocrud/shared';

export type Channels = IPCChannel;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, arguments_: unknown[]) {
      ipcRenderer.send(channel, arguments_);
    },
    on(channel: Channels, function_: (...arguments_: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...arguments_: unknown[]) =>
        function_(...arguments_);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, function_: (...arguments_: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...arguments_) => function_(...arguments_));
    },
    invoke(channel: Channels, ...arguments_: any[]) {
      return ipcRenderer.invoke(channel, ...arguments_);
    },
  },
});
