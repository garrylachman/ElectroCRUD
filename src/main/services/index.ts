import 'reflect-metadata';

import { registry, delay, container } from 'tsyringe';

import DatabaseService from './database.service';
import RequestFactory from '../ipc/base.ipc';
import IPCService from './ipc.service';
import LogService from './log.service';

@registry([
  { token: 'IDatabaseService', useToken: delay(() => DatabaseService) },
  { token: 'IRequestFactory', useToken: delay(() => RequestFactory) },
  { token: 'IIPCService', useToken: delay(() => IPCService) },
  { token: 'ILogService', useToken: delay(() => LogService) },
])
export class ServiceRegistery {}

export const InitServices = () => {
  container.afterResolution(
    'IIPCService',
    (_t, result: IPCService) => {
      console.log("afterResolution", result);
      result.listen();
    },
    { frequency: 'Once' }
  );

  container.resolve('IIPCService');
};
