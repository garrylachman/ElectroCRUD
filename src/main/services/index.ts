import 'reflect-metadata';

import { registry, delay, container } from 'tsyringe';

import DatabaseService from './database.service';
import RequestFactory from '../ipc/base.ipc';
import IPCService from './ipc.service';
import LogService from './log.service';
import TunnelService from './tunnel.service';
import CheckTunnelIPC from '../ipc/check-tunnel.ipc';

@registry([
  { token: 'IDatabaseService', useToken: delay(() => DatabaseService) },
  { token: 'IRequestFactory', useToken: delay(() => RequestFactory) },
  { token: 'CheckTunnelIPC', useToken: delay(() => CheckTunnelIPC) },
  { token: 'IIPCService', useToken: delay(() => IPCService) },
  { token: 'ILogService', useToken: delay(() => LogService) },
  { token: 'ITunnelService', useToken: delay(() => TunnelService) },
])
export class ServiceRegistery {}

export const InitServices = () => {
  container.afterResolution(
    'IIPCService',
    (_t, result: IPCService | IPCService[]) => {
      console.log("afterResolution", result);
      (result as IPCService).listen();
    },
    { frequency: 'Once' }
  );

  container.resolve('IIPCService');
};
