import { uniqueId } from 'lodash';
import 'reflect-metadata';

import { autoInjectable, delay, inject, singleton } from 'tsyringe';

import { LogItem, LogItemType } from '../../shared/defenitions';
import {
  IPCChannelEnum,
  LogItemSourceEnum,
  LogItemTypeEnum,
} from '../../shared/enums';
import { IPCService } from './ipc.service';

type ILogService = {
  [key in LogItemType]: (message: string, method?: string) => void;
};

@singleton()
@autoInjectable()
export default class LogService implements ILogService {
  constructor(
    @inject(delay(() => IPCService)) private ipcService?: IPCService
  ) {}

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
      id: uniqueId('logitem_'),
    };
    this.ipcService?.send({ channel: IPCChannelEnum.LOG_CHANNEL, body: item });
  }
}
