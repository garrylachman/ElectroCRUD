import { Injectable } from '@angular/core';
import { 
  IPC_CHANNEL_LIST_OF_TABLES,
  IPCListOfTablesRequestMessage,
  IPCListOfTablesResponseMessage,

  IIPCListOfTablesResponseMessage,
  IIPCTableInfoResponseMessage,
  IPCTableInfoRequestMessage,

  IPC_CHANNEL_TABLE_INFO,
  IIPCReadDataResponseMessage,
  IPCReadDataRequestMessage,
  IPC_CHANNEL_READ_DATA,
  IPCReadDataResponseMessage,
  IIPCReadDataWhere,

  IPC_CHANNEL_UPDATE_DATA,
  IIPCUpdateDataWhere,
  IIPCUpdateDataUpdate,
  IIPCUpdateDataResponseMessage,
  IPCUpdateDataRequestMessage,
  IPCUpdateDataResponseMessage,
} from '../../../shared/ipc/views.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { IAccount } from '../../../shared/interfaces/accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class ViewsIPCService {
  
  constructor() { }

  public async listOfTables(): Promise<IIPCListOfTablesResponseMessage> {
    const req: IPCListOfTablesRequestMessage = new IPCListOfTablesRequestMessage({});
    console.log("req", req);
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_LIST_OF_TABLES, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCListOfTablesResponseMessage(rawRes).toMessage()
  }

  public async tableInfo(table: string): Promise<IIPCTableInfoResponseMessage> {
    const req: IPCTableInfoRequestMessage = new IPCTableInfoRequestMessage({
      table: table
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_TABLE_INFO, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCListOfTablesResponseMessage(rawRes).toMessage()
  }

  public async readData(
      table: string, 
      columns: string[], 
      limit: number, 
      offset: number, 
      searchColumns?: string[], 
      searchText?: string,
      where?: IIPCReadDataWhere[]
    ): Promise<IIPCReadDataResponseMessage> {
    const req: IPCReadDataRequestMessage = new IPCReadDataRequestMessage({
      table: table,
      columns: columns,
      limit: {
        limit: limit,
        offset: offset
      },
      search: {
        columns: searchColumns,
        text: searchText
      },
      where: where
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_READ_DATA, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCReadDataResponseMessage(rawRes).toMessage()
  }

  public async updateData(
    table: string, 
    update: IIPCUpdateDataUpdate, 
    where?: IIPCUpdateDataWhere[]
  ): Promise<IIPCUpdateDataResponseMessage> {
  const req: IPCUpdateDataRequestMessage = new IPCUpdateDataRequestMessage({
    table: table,
    update: update,
    where: where
  });
  console.log("req", req);
  const rawRes:any = await ipcRenderer.callMain(IPC_CHANNEL_UPDATE_DATA, req.toJsonValue());
  console.log("rawRes", rawRes);
  return new IPCUpdateDataResponseMessage(rawRes).toMessage()
}

}
