import 'reflect-metadata';
import { container } from 'tsyringe';

import DatabaseService from './database.service';
import RequestFactory from '../ipc/base.ipc';
import IPCService from './ipc.service';
import LogService from './log.service';

//export * from './database.service';
//export * from './ipc.service';
//export * from './log.service';

export default function Services() {
  console.log("container", LogService);

  container.resolve(LogService);
  container.resolve(IPCService);
  container.resolve(RequestFactory);
  container.resolve(DatabaseService);
  /*container.afterResolution(
    IPCService,
    (_t, result) => {
      try {
        (result as IPCService).listen();
      } catch (error) {
        console.log(error);
      }
    },
    { frequency: 'Once' }
  );*/
  //container.resolve(IPCService);
}
