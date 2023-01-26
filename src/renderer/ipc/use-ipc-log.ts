import { uniq } from 'underscore';
import { useState } from 'react';
import { IPCChannelEnum } from 'shared';
import { LogItem } from 'shared/defenitions';

const { ipcRenderer } = window.electron;
export const useIPCLogs = () => {
  const [state, setState] = useState<LogItem[]>([]);
  ipcRenderer.on(IPCChannelEnum.LOG_CHANNEL, (item: LogItem) => {
    setState((previous) => uniq([...previous, item], (o) => o.body.id));
  });

  const reset = () => setState([]);

  return [state, reset];
};
