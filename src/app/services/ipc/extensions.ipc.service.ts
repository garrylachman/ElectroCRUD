import { Injectable } from '@angular/core';
import { IPCExtensionsList } from '../../../shared/ipc/extensions.ipc';
import { ipcRenderer } from 'electron-better-ipc';
import { IExtensionPackage, IExtensionContentScriptView } from '../../../shared/interfaces/extension.interface';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsIPCService {
  
  constructor() { }

  public async list(): Promise<IPCExtensionsList.IResponse> {
    const req: IPCExtensionsList.Request = new IPCExtensionsList.Request({});
    const rawRes:any = await ipcRenderer.invoke(IPCExtensionsList.CHANNEL, req.toJsonValue());
    console.log("rawRes", rawRes);
    return new IPCExtensionsList.Response(rawRes).toMessage()
  }

  public async getViewsScripts(): Promise<IExtensionContentScriptView[]> {
    let items =  await this.list();
    console.log("extensions", items)
    return items.extensions
      .filter(item => item.content.scripts.view && item.content.scripts.view.length > 0)
      .reduce((acc, curr) => {
        return [...acc, ...curr.content.scripts.view]
      }, []);


      //.map(item => item.content.scripts.view) as IExtensionContentScriptView[];
  }

}
