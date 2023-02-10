import 'reflect-metadata';
import Container from 'typedi';
import DatabaseService from './database.service';
import RequestFactory from '../ipc/base.ipc';
import IPCService from './ipc.service';
import LogService from './log.service';
import TunnelService from './tunnel.service';
import { IIPCService } from './interfaces/iipc.service';

export const RegisterServices = () => {
  Container.set([
    { id: 'request.factory', value: new RequestFactory() },
    { id: 'service.ipc', value: new IPCService() },
    { id: 'service.log', value: new LogService() },
    { id: 'service.database', value: new DatabaseService() },
    { id: 'service.tunnel', value: new TunnelService() },
  ]);
};

export const InitServices = () => {
  if (Container.has('service.ipc')) {
    const instance = Container.get<IIPCService>('service.ipc');
    instance.listen();
  }
};
