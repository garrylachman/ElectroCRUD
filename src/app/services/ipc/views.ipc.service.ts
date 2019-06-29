import { Injectable } from '@angular/core';
import { 
  IPCListOfTablesRequestMessage,
  IPCListOfTablesResponseMessage,
  IPC_CHANNEL_LIST_OF_TABLES,
  IIPCListOfTablesResponseMessage
} from '../../../shared/ipc/views.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { IAccount } from '../../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class ViewsIPCService {
  
  constructor() { }

  public async listOfTables(account: IAccount): Promise<IIPCListOfTablesResponseMessage> {
    const req: IPCListOfTablesRequestMessage = new IPCListOfTablesRequestMessage({});
    console.log("req", req);
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_LIST_OF_TABLES, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCListOfTablesResponseMessage(rawRes).toMessage()
  }

}
