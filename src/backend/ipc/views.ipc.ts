import { 
    IPC_CHANNEL_LIST_OF_TABLES,
    IPCListOfTablesRequestMessage,
    IPCListOfTablesResponseMessage,

    IPC_CHANNEL_TABLE_INFO,
    IPCTableInfoRequestMessage,
    IPCTableInfoResponseMessage,

    IPC_CHANNEL_READ_DATA,
    IPCReadDataRequestMessage,
    IPCReadDataResponseMessage,

    IPC_CHANNEL_UPDATE_DATA,
    IPCUpdateDataRequestMessage,
    IPCUpdateDataResponseMessage,

    IPC_CHANNEL_INSERT_DATA,
    IPCInsertDataRequestMessage,
    IPCInsertDataResponseMessage,

    IPC_CHANNEL_DELETE_DATA,
    IPCDeleteDataRequestMessage,
    IPCDeleteDataResponseMessage,

    IPC_CHANNEL_READ_WIDGET_DATA,
    IPCReadWidgetDataRequestMessage,
    IPCReadWidgetDataResponseMessage,
} from '../../shared/ipc/views.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { DatabaseService } from '../services/db.service';

export class ViewsIPC {

    constructor() {}
    
    public listen() {
        ipcMain.handle(IPC_CHANNEL_LIST_OF_TABLES,  async (event, req: JsonValue) => this.listOfTables(req));
        ipcMain.handle(IPC_CHANNEL_TABLE_INFO,  async (event, req: JsonValue) => this.tableInfo(req));
        ipcMain.handle(IPC_CHANNEL_READ_DATA, async (event, req: JsonValue) => this.readData(req));
        ipcMain.handle(IPC_CHANNEL_UPDATE_DATA,  async (event, req: JsonValue) => this.updateData(req));
        ipcMain.handle(IPC_CHANNEL_INSERT_DATA,  async (event, req: JsonValue) => this.insertData(req));
        ipcMain.handle(IPC_CHANNEL_DELETE_DATA,  async (event, req: JsonValue) => this.deleteData(req));
        ipcMain.handle(IPC_CHANNEL_READ_WIDGET_DATA,  async (event, req: JsonValue) => this.readWidgetData(req));
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
            reqMessage.toMessage().search.text,
            reqMessage.toMessage().where,
            reqMessage.toMessage().join
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

    public async updateData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCUpdateDataRequestMessage = new IPCUpdateDataRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().updateData(
            reqMessage.toMessage().table,
            reqMessage.toMessage().update,
            reqMessage.toMessage().where
            )
        console.log(res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCUpdateDataResponseMessage = new IPCUpdateDataResponseMessage({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async insertData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCInsertDataRequestMessage = new IPCInsertDataRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().insertData(
            reqMessage.toMessage().table,
            reqMessage.toMessage().data
        )
        console.log(res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCInsertDataResponseMessage = new IPCInsertDataResponseMessage({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async deleteData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCDeleteDataRequestMessage = new IPCDeleteDataRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().deleteData(
            reqMessage.toMessage().table,
            reqMessage.toMessage().where
            )
        console.log(res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCDeleteDataResponseMessage = new IPCDeleteDataResponseMessage({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async readWidgetData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCReadWidgetDataRequestMessage = new IPCReadWidgetDataRequestMessage(req);
        console.log("reqMessage", reqMessage);
        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await DatabaseService.getInstance().readWidgetData(
            reqMessage.toMessage().table,
            reqMessage.toMessage().column,
            reqMessage.toMessage().distinct,
            reqMessage.toMessage().function,
            reqMessage.toMessage().where
            )
        console.log(res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCReadWidgetDataResponseMessage = new IPCReadWidgetDataResponseMessage({
            valid: isValid,
            error: dbError,
            data: dbRes.data,
            count: dbRes.count
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}