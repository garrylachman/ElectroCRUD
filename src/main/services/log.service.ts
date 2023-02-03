import 'reflect-metadata';
import _ from 'lodash';
import { autoInjectable, inject, singleton } from 'tsyringe';
import { LogItem, LogItemType } from '../../shared/defenitions';
import {
  IPCChannelEnum,
  LogItemSourceEnum,
  LogItemTypeEnum,
} from '../../shared/enums';
import { IIPCService } from './interfaces/iipc.service';
import { ILogService } from './interfaces/ilog.service';

@singleton()
@autoInjectable()
export default class LogService implements ILogService {
  constructor(@inject('IIPCService') private ipcService: IIPCService) {}

  [LogItemTypeEnum.ERROR](message: string, method?: string) {
    this.addItem(LogItemTypeEnum.ERROR, message, method);
  }

  [LogItemTypeEnum.INFO](message: string, method?: string) {
    this.addItem(LogItemTypeEnum.INFO, message, method);
  }

  [LogItemTypeEnum.SUCCESS](message: string, method?: string) {
    this.addItem(LogItemTypeEnum.SUCCESS, message, method);
  }

  [LogItemTypeEnum.WARNING](message: string, method?: string) {
    this.addItem(LogItemTypeEnum.WARNING, message, method);
  }

  addItem(type: LogItemType, message: string, method?: string): void {
    const item: LogItem = {
      type,
      message,
      method,
      source: LogItemSourceEnum.Backend,
      ts: Date.now(),
      id: _.uniqueId('logitem_'),
    };
    this.ipcService?.send({ channel: IPCChannelEnum.LOG_CHANNEL, body: item });
  }
}
