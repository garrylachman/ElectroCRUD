import { 
    IPC_CHANNEL_LIST_OF_TABLES,
    IPCListOfTablesRequestMessage,
    IPCListOfTablesResponseMessage
} from '../../shared/ipc/views.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';
import { TunnelService } from '../services/tunnel.service';
import { DatabaseService, serverTypeIdAsEnum } from '../services/db.service';

export class ViewsIPC {

    private tunnel:TunnelService;

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_LIST_OF_TABLES, (req: JsonValue) => this.connect(req));
    }

    public async connect(req: JsonValue): Promise<JsonValue> {
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

}