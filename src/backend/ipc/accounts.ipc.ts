import { 
    IPC_CHANNEL_CHECK_CONNECTION, 
    IPCCheckConnectionRequestMessage, 
    IPCCheckConnectionResponseMessage 
} from '../../shared/ipc/accounts.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';

export class AccountsIPC {

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(IPC_CHANNEL_CHECK_CONNECTION, this.checkConnection);
    }

    public async checkConnection(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCCheckConnectionRequestMessage = new IPCCheckConnectionRequestMessage(req);

        let resMessage: IPCCheckConnectionResponseMessage = new IPCCheckConnectionResponseMessage({
            server: {
                valid: true
            },
            ssh: {
                valid: false,
                error: 'no ssh'
            }
        });
        
        return Promise.resolve(resMessage.toJsonValue());
    }

}