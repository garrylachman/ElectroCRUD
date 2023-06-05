import { ipcRenderer } from 'electron';
import { IPCChannel as Channels } from '@electrocrud/shared';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, arguments_: unknown[]): void;
        on(
          channel: Channels,
          function_: (...arguments_: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, function_: (...arguments_: unknown[]) => void): void;
        invoke(channel: string, ...arguments_: any[]): Promise<any>;
      };
    };
  }
}

export {};
