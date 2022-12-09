import { useState } from 'react';
import { IPCChannelEnum } from 'shared';
import { LogItem } from 'shared/defenitions';

const { ipcRenderer } = window.electron;

export const useIPCLogs = () => {
  const [state, setState] = useState<LogItem[]>([]);

  ipcRenderer.on(IPCChannelEnum.LOG_CHANNEL, (item: LogItem) =>
    setState((previous) => [...previous, item])
  );

  const reset = () => setState([]);

  return [state, reset];
};
