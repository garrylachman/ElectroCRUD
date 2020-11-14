import { Injectable } from '@angular/core';
import { 
  IPC_CHANNEL_QUERY,
  IPCQueriesResponseMessage,
  IPCQueriesRequestMessage,
  IIPCQueriesResponseMessage
} from '../../../shared/ipc/queries.ipc';
import { ipcRenderer } from 'electron-better-ipc';

@Injectable({
  providedIn: 'root'
})
export class QueriesIPCService {
  
  constructor() { }

  public async executeQuery(query: string): Promise<IIPCQueriesResponseMessage> {
    const req: IPCQueriesRequestMessage = new IPCQueriesRequestMessage({
      query: query
    });
    console.log("req", req);
    const rawRes:any = await ipcRenderer.invoke(IPC_CHANNEL_QUERY, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCQueriesResponseMessage(rawRes).toMessage()
  }

}
