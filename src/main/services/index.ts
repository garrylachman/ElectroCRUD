import { BrowserWindow } from 'electron';

import { container } from 'tsyringe';

import { DatabaseService } from './database.service';
import { RequestFactory } from '../ipc';
import { IPCService } from './ipc.service';
import { LogService } from './log.service';

export * from './database.service';
export * from './ipc.service';
export * from './log.service';

export const initServices = () => {
  container.resolve(LogService);
  container.resolve(DatabaseService);
  container.resolve(RequestFactory);
  container.afterResolution(
    IPCService,
    // Callback signature is (token: InjectionToken<T>, result: T | T[], resolutionType: ResolutionType)
    (_t, result) => {
      try {
        (result as IPCService).listen();
      } catch (error) {
        console.log(error);
      }
    },
    { frequency: 'Once' }
  );
  container.resolve(IPCService);
};
