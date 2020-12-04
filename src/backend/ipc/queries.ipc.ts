import "reflect-metadata";
import { fluentProvide } from "inversify-binding-decorators";

import { 
    IPCQuery
} from '../../shared/ipc/queries.ipc';

import { ipcMain } from 'electron-better-ipc';

import { JsonValue } from 'type-fest';
import { DatabaseService } from '../services/db.service';

@fluentProvide(QueriesIPC).inSingletonScope().done()
export class QueriesIPC {

    private _database: DatabaseService;

    constructor(
        database: DatabaseService 
    ) {
        this._database = database;
    }
    
    public listen() {
        ipcMain.handle(IPCQuery.CHANNEL, async (event, req: JsonValue) => this.execute(req));
    }

    public async execute(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCQuery.Request = new IPCQuery.Request(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        console.log("execute", req)
        let res = await this._database.executeQuery(reqMessage.toMessage().query)

        console.log("res", res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCQuery.Response = new IPCQuery.Response({
            valid: isValid,
            error: dbError,
            data: dbRes,
            count: 0
        });
        
        console.log("resMessage - ", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}