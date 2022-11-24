import { container } from 'tsyringe';

import { DatabaseService } from './database.service';
import { IPCService } from './ipc.service';
import { LogService } from './log.service';

export * from './database.service';
export * from './ipc.service';
export * from './log.service';

export const initServices = () => {
  container.resolve(LogService);
  container.resolve(DatabaseService);
  const ipcService = container.resolve(IPCService);

  ipcService.listen();
};
