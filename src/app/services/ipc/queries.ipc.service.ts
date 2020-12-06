import { Injectable } from '@angular/core';
import { 
  IPCQuery
} from '../../../shared/ipc/queries.ipc';
import { ipcRenderer } from 'electron-better-ipc';

@Injectable({
  providedIn: 'root'
})
export class QueriesIPCService {
  
  constructor() { }

  public async executeQuery(query: string): Promise<IPCQuery.IResponse> {
    const req: IPCQuery.Request = new IPCQuery.Request({
      query: query
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.invoke(IPCQuery.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCQuery.Response(rawRes).toMessage()
  }

}
