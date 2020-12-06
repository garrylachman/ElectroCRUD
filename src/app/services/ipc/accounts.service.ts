import { Injectable } from '@angular/core';
import { 
  IPCConnect,
  IPCCheckConnection
} from '../../../shared/ipc/accounts.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { IAccount } from '../../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsIPCService {
  
  constructor() { }

  public async checkConnection(account: IAccount): Promise<IPCCheckConnection.IResponse> {
    const req: IPCCheckConnection.Request = new IPCCheckConnection.Request({
      server: account.server,
      ssh: account.ssh
    });
    const rawRes:any = await ipcRenderer.invoke(IPCCheckConnection.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCCheckConnection.Response(rawRes).toMessage()
  }

  public async connect(account: IAccount): Promise<IPCConnect.IResponse> {
    console.log("connect: ", account)
    const req: IPCConnect.Request = new IPCConnect.Request({
      server: account.server,
      ssh: account.ssh
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.invoke(IPCConnect.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCConnect.Response(rawRes).toMessage()
  }

}
