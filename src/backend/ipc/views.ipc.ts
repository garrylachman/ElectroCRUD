import "reflect-metadata";
import { fluentProvide } from "inversify-binding-decorators";

import {
    IPCListOfTables,
    IPCTableInfo,
    IPCReadData,
    IPCUpdateData,
    IPCInsertData,
    IPCDeleteData,
    IPCReadWidgetData
} from '../../shared/ipc/views.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { DatabaseService } from '../services/db.service';

@fluentProvide(ViewsIPC).inSingletonScope().done()
export class ViewsIPC {

    private _database: DatabaseService;

    constructor(
        database: DatabaseService 
    ) {
        this._database = database;
    }
    
    public listen() {
        ipcMain.handle(IPCListOfTables.CHANNEL,  async (event, req: JsonValue) => this.listOfTables(req));
        ipcMain.handle(IPCTableInfo.CHANNEL,  async (event, req: JsonValue) => this.tableInfo(req));
        ipcMain.handle(IPCReadData.CHANNEL, async (event, req: JsonValue) => this.readData(req));
        ipcMain.handle(IPCUpdateData.CHANNEL,  async (event, req: JsonValue) => this.updateData(req));
        ipcMain.handle(IPCInsertData.CHANNEL,  async (event, req: JsonValue) => this.insertData(req));
        ipcMain.handle(IPCDeleteData.CHANNEL,  async (event, req: JsonValue) => this.deleteData(req));
        ipcMain.handle(IPCReadWidgetData.CHANNEL,  async (event, req: JsonValue) => this.readWidgetData(req));
    }

    public async listOfTables(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCListOfTables.Request = new IPCListOfTables.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.listTables();
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCListOfTables.Response = new IPCListOfTables.Response({
            valid: isValid,
            error: dbError,
            tables: dbRes
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async tableInfo(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCTableInfo.Request = new IPCTableInfo.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.tableInfo(reqMessage.toMessage().table)
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCTableInfo.Response = new IPCTableInfo.Response({
            valid: isValid,
            error: dbError,
            columns: dbRes
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async readData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCReadData.Request = new IPCReadData.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.readData(
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

        let resMessage: IPCReadData.Response = new IPCReadData.Response({
            valid: isValid,
            error: dbError,
            data: dbRes.data,
            count: dbRes.count
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async updateData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCUpdateData.Request = new IPCUpdateData.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.updateData(
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

        let resMessage: IPCUpdateData.Response = new IPCUpdateData.Response({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async insertData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCInsertData.Request = new IPCInsertData.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.insertData(
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

        let resMessage: IPCInsertData.Response = new IPCInsertData.Response({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async deleteData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCDeleteData.Request = new IPCDeleteData.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.deleteData(
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

        let resMessage: IPCDeleteData.Response = new IPCDeleteData.Response({
            valid: isValid,
            error: dbError
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

    public async readWidgetData(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCReadWidgetData.Request = new IPCReadWidgetData.Request(req);
        console.log("reqMessage", reqMessage);
        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        let res = await this._database.readWidgetData(
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

        let resMessage: IPCReadWidgetData.Response = new IPCReadWidgetData.Response({
            valid: isValid,
            error: dbError,
            data: dbRes.data,
            count: dbRes.count
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}