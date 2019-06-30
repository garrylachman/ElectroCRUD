import { 
    IPC_CHANNEL_LIST_OF_TABLES,
    IPCListOfTablesRequestMessage,
    IPCListOfTablesResponseMessage,
    IPC_CHANNEL_TABLE_INFO,
    IPCTableInfoRequestMessage,
    IPCTableInfoResponseMessage
} from '../../shared/ipc/views.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { TunnelService } from '../services/tunnel.service';
import { DatabaseService } from '../services/db.service';

export class ViewsIPC {

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_LIST_OF_TABLES, (req: JsonValue) => this.listOfTables(req));
        ipcMain.answerRenderer(IPC_CHANNEL_TABLE_INFO, (req: JsonValue) => this.tableInfo(req));
    }

    public async listOfTables(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCListOfTablesRequestMessage = new IPCListOfTablesRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().listTables();
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCListOfTablesResponseMessage = new IPCListOfTablesResponseMessage({
            valid: isValid,
            error: dbError,
            tables: dbRes
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async tableInfo(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCTableInfoRequestMessage = new IPCTableInfoRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().tableInfo(reqMessage.toMessage().table)
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCTableInfoResponseMessage = new IPCTableInfoResponseMessage({
            valid: isValid,
            error: dbError,
            columns: dbRes
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}