import { 
    CHANNEL_CHECK_CONNECTION, 
    CheckConnectionRequestMessage, 
    CheckConnectionResponseMessage 
} from '../../shared/ipc/accounts.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';

export class AccountsIPC {

    constructor() {}
    
    public listen() {
        ipcMain.answerRenderer(CHANNEL_CHECK_CONNECTION, this.checkConnection);
    }

    public async checkConnection(req: JsonValue): Promise<JsonValue> {
        let reqMessage: CheckConnectionRequestMessage = {
            server: req['server'],
            ssh: req['ssh']
        };
        let resMessage: CheckConnectionResponseMessage = {
            server: {
                valid: true
            },
            ssh: {
                valid: false,
                error: 'no ssh'
            }
        }
        return Promise.resolve(resMessage as any);
    }

}