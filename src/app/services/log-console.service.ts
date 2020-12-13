import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConsoleLogItem, ConsoleLogItemType, ConsoleLogItemSource } from '../../shared/interfaces/log-console.interface';

import { ipcRenderer } from 'electron-better-ipc';
import { IPCConsoleLog } from '../../shared/ipc/console-log.ipc';
import { JsonValue } from 'type-fest';
import * as stringifyObject from 'stringify-object'

@Injectable({
  providedIn: 'root'
})
export class LogConsoleService {

  logItems$: Subject<ConsoleLogItem & { source: ConsoleLogItemSource, method?: string }> = new Subject();

  constructor() {
    console.log("LogConsoleService::constructor")
    ipcRenderer.on(IPCConsoleLog.CHANNEL, (event: any, data: any) => this.addItem(data.message.type, data.message.message, data.message.method, ConsoleLogItemSource.Backend))  
  }

  addItem(type: ConsoleLogItemType, message: string | JsonValue, method?: string, source: ConsoleLogItemSource = ConsoleLogItemSource.UI): void {
    console.log("addItem", type, message, source)
    
    if (typeof message == "object") {
      message = stringifyObject(message)
    }

    this.logItems$.next({
      type: type,
      message: `${message}`,
      source: source,
      method: method
    })
  }
}
