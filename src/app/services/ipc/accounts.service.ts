import { Injectable } from '@angular/core';
import { 
  IPC_CHANNEL_CHECK_CONNECTION, 
  IPCCheckConnectionRequestMessage,
  IIPCCheckConnectionResponseMessage,
  IPCCheckConnectionResponseMessage,
  IPC_CHANNEL_CONNECT, 
  IPCConnectRequestMessage,
  IIPCConnectResponseMessage,
  IPCConnectResponseMessage 
} from '../../../shared/ipc/accounts.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { IAccount } from '../../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsIPCService {
  
  constructor() { }

  public async checkConnection(account: IAccount): Promise<IIPCCheckConnectionResponseMessage> {
    const req: IPCCheckConnectionRequestMessage = new IPCCheckConnectionRequestMessage({
      server: account.server,
      ssh: account.ssh
    });
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_CHECK_CONNECTION, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCCheckConnectionResponseMessage(rawRes).toMessage()
  }

  public async connect(account: IAccount): Promise<IIPCConnectResponseMessage> {
    console.log("connect: ", account)
    const req: IPCConnectRequestMessage = new IPCConnectRequestMessage({
      server: account.server,
      ssh: account.ssh
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_CONNECT, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCConnectResponseMessage(rawRes).toMessage()
  }

}
