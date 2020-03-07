import { 
    IPC_CHANNEL_QUERY,
    IPCQueriesRequestMessage,
    IPCQueriesResponseMessage
} from '../../shared/ipc/queries.ipc';


import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { DatabaseService } from '../services/db.service';

export class QueriesIPC {

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_QUERY, (req: JsonValue) => this.execute(req));
    }

    public async execute(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCQueriesRequestMessage = new IPCQueriesRequestMessage(req);

        let isValid: boolean;
        let dbError: string;
        let dbRes: any;
       
        console.log("execute", req)
        let res = await DatabaseService.getInstance().executeQuery(reqMessage.toMessage().query)

        console.log("res", res);
        if (res instanceof Error) {
            dbError = res.toString();
            isValid = false;
        } else {
            isValid = true;
            dbRes = res;
        }

        let resMessage: IPCQueriesResponseMessage = new IPCQueriesResponseMessage({
            valid: isValid,
            error: dbError,
            data: dbRes,
            count: 0
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

}