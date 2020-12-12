import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConsoleLogItem, ConsoleLogItemType, ConsoleLogItemSource } from '../../shared/interfaces/log-console.interface';

import { ipcRenderer } from 'electron-better-ipc';
import { IPCConsoleLog } from '../../shared/ipc/console-log.ipc';

@Injectable({
  providedIn: 'root'
})
export class LogConsoleService {

  logItems$: Subject<ConsoleLogItem & { source: ConsoleLogItemSource }> = new Subject();

  constructor() {
    console.log("LogConsoleService::constructor")
    ipcRenderer.on(IPCConsoleLog.CHANNEL, (event: any, data: any) => this.addItem(data.message.type, data.message.message, ConsoleLogItemSource.Backend))  
  }

  addItem(type: ConsoleLogItemType, message: string, source: ConsoleLogItemSource = ConsoleLogItemSource.UI): void {
    console.log("addItem", type, message, source)
    this.logItems$.next({
      type: type,
      message: `${message}`,
      source: source
    })
  }
}
