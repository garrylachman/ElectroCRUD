import { 
    IPC_CHANNEL_LIST_OF_TABLES,
    IPCListOfTablesRequestMessage,
    IPCListOfTablesResponseMessage,

    IPC_CHANNEL_TABLE_INFO,
    IPCTableInfoRequestMessage,
    IPCTableInfoResponseMessage,

    IPC_CHANNEL_READ_DATA,
    IPCReadDataRequestMessage,
    IPCReadDataResponseMessage
} from '../../shared/ipc/views.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { DatabaseService } from '../services/db.service';

export class ViewsIPC {

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_LIST_OF_TABLES, (req: JsonValue) => this.listOfTables(req));
        ipcMain.answerRenderer(IPC_CHANNEL_TABLE_INFO, (req: JsonValue) => this.tableInfo(req));
        ipcMain.answerRenderer(IPC_CHANNEL_READ_DATA, (req: JsonValue) => this.readData(req));
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

    public async readData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCReadDataRequestMessage = new IPCReadDataRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().readData(
            reqMessage.toMessage().table,
            reqMessage.toMessage().columns,
            reqMessage.toMessage().limit.limit,
            reqMessage.toMessage().limit.offset,
            reqMessage.toMessage().search.columns,
            reqMessage.toMessage().search.text
            )
        console.log(res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCReadDataResponseMessage = new IPCReadDataResponseMessage({
            valid: isValid,
            error: dbError,
            data: dbRes.data,
            count: dbRes.count
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}