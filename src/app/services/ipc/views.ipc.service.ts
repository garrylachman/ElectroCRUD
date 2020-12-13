import { Injectable } from '@angular/core';
import { 
  IPCListOfTables,
  IPCTableInfo,
  IPCUpdateData,
  IPCInsertData,
  IPCDeleteData,
  IPCReadWidgetData,
  IPCReadData
} from '../../../shared/ipc/views.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { LogConsoleService } from '../log-console.service';
import { ConsoleLogItemType } from '../../../shared/interfaces/log-console.interface';
import getCurrentLine from 'get-current-line'

@Injectable({
  providedIn: 'root'
})
export class ViewsIPCService {
  
  constructor(private logConsoleService:LogConsoleService) { }

  public async listOfTables(): Promise<IPCListOfTables.IResponse> {
    const req: IPCListOfTables.Request = new IPCListOfTables.Request({});
    console.log("req", req);
    const rawRes:any = await ipcRenderer.invoke(IPCListOfTables.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      rawRes, 
      getCurrentLine().method
    )

    return new IPCListOfTables.Response(rawRes).toMessage()
  }

  public async tableInfo(table: string): Promise<IPCTableInfo.IResponse> {
    const req: IPCTableInfo.Request = new IPCTableInfo.Request({
      table: table
    });
    console.log("req", req);

    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCTableInfo.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);

    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      rawRes, 
      getCurrentLine().method
    )

    return new IPCTableInfo.Response(rawRes).toMessage()
  }

  public async readData(
      table: string, 
      columns: string[], 
      limit: number, 
      offset: number, 
      searchColumns?: string[], 
      searchText?: string,
      where?: IPCReadData.IIPCReadDataWhere[],
      join?: IPCReadData.IIPCReadDataJoin[]
    ): Promise<IPCReadData.IResponse> {
    const req: IPCReadData.Request = new IPCReadData.Request({
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
      where: where,
      join: join
    });
    console.log("req", req);
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCReadData.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCReadData.Response(rawRes).toMessage()
  }

  public async updateData(
    table: string, 
    update: IPCUpdateData.IIPCUpdateDataUpdate, 
    where?: IPCUpdateData.IIPCUpdateDataWhere[]
  ): Promise<IPCUpdateData.IResponse> {
    const req: IPCUpdateData.Request = new IPCUpdateData.Request({
      table: table,
      update: update,
      where: where
    });
    console.log("req", req);
    
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCUpdateData.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCUpdateData.Response(rawRes).toMessage()
  }

  public async insertData(
    table: string, 
    data: IPCInsertData.IIPCInsertData, 
  ): Promise<IPCInsertData.IResponse> {
    const req: IPCInsertData.Request = new IPCInsertData.Request({
      table: table,
      data: data
    });
    console.log("req", req);
    
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCInsertData.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCInsertData.Response(rawRes).toMessage()
  }

  public async deleteData(
    table: string, 
    where?: IPCDeleteData.IIPCDeleteDataWhere[]
  ): Promise<IPCDeleteData.IResponse> {
    const req: IPCDeleteData.Request = new IPCDeleteData.Request({
      table: table,
      where: where
    });
    console.log("req", req);
    
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCDeleteData.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCDeleteData.Response(rawRes).toMessage()
  }

  public async readWidgetData(
    table: string, 
    column: string, 
    distinct: boolean, 
    func: string, 
    where?: { 
        column: string, 
        opr: string, 
        value: string,
        or: boolean
    }[]
  ): Promise<IPCReadWidgetData.IResponse> {
    const req: IPCReadWidgetData.Request = new IPCReadWidgetData.Request({
      table: table,
      column: column,
      distinct: distinct,
      function: func,
      where: where
    });
    console.log("req", req);
    
    this.logConsoleService.addItem(
      ConsoleLogItemType.info, 
      req.toJsonValue(), 
      getCurrentLine().method
    )

    const rawRes:any = await ipcRenderer.invoke(IPCReadWidgetData.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCReadWidgetData.Response(rawRes).toMessage()
  }

}
