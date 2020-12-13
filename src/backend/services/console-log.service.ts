import "reflect-metadata";

import { fluentProvide } from "inversify-binding-decorators";
import { ipcMain } from 'electron-better-ipc';
import { ConsoleLogItemType } from "../../shared/interfaces/log-console.interface";
import { IPCConsoleLog } from "../../shared/ipc/console-log.ipc";

@fluentProvide(ConsoleLogService).inSingletonScope().done()
export class ConsoleLogService {


    constructor()  {

    }
    
    addItem(type: ConsoleLogItemType, message: string, method?: string): void {
        ipcMain.sendToRenderers<IPCConsoleLog.Request>(IPCConsoleLog.CHANNEL, new IPCConsoleLog.Request({
            type: type,
            message: message,
            method: method
        }))
    }
}