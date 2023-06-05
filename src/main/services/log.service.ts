import 'reflect-metadata';
import _ from 'lodash';
import { Inject, Service } from 'typedi';
import {
  IPCChannelEnum,
  LogItemSourceEnum,
  LogItemTypeEnum,
  LogItem,
  LogItemType,
} from '@electrocrud/shared';
import { IIPCService } from './interfaces/iipc.service';
import { ILogService } from './interfaces/ilog.service';

@Service({ global: true, id: 'service.log' })
class LogService implements ILogService {
  @Inject('service.ipc')
  private ipcService: IIPCService;

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

export default LogService;
