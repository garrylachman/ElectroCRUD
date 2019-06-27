import { Injectable } from '@angular/core';
import { 
  IPC_CHANNEL_CHECK_CONNECTION, 
  IPCCheckConnectionRequestMessage,
  IIPCCheckConnectionResponseMessage,
  IPCCheckConnectionResponseMessage 
} from '../../../shared/ipc/accounts.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { Account } from '../../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsIPCService {
  
  constructor() { }

  public async checkConnection(account: Account): Promise<IIPCCheckConnectionResponseMessage> {
    const req: IPCCheckConnectionRequestMessage = new IPCCheckConnectionRequestMessage({
      server: account.server,
      ssh: account.ssh
    });
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_CHECK_CONNECTION, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCCheckConnectionResponseMessage(rawRes).toMessage()
  }

}
