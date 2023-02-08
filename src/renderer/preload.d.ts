import { ipcRenderer } from 'electron';
import { IPCChannel as Channels } from 'shared/defenitions';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}

export {};
