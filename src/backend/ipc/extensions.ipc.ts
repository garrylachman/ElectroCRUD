import "reflect-metadata";

import { 
    IPCExtensionsList
} from '../../shared/ipc/extensions.ipc';

import { ipcMain } from 'electron-better-ipc';
import { JsonValue } from 'type-fest';

import { ExtensionsService } from '../services/extensions.service';
import { fluentProvide } from "inversify-binding-decorators";

@fluentProvide(ExtensionsIPC).inSingletonScope().done()
export class ExtensionsIPC {

    private _extensions: ExtensionsService;
    constructor(
        extensions: ExtensionsService
    ) {
        this._extensions = extensions

        console.log("ExtensionsIPC - ", this._extensions.list)
    }
    
    public listen() {
        ipcMain.handle(IPCExtensionsList.CHANNEL, async (event, req: JsonValue) => this.list(req));
    }

    public async list(req: JsonValue): Promise<JsonValue> {
        let reqMessage: IPCExtensionsList.Request = new IPCExtensionsList.Request(req);

        
        let resMessage: IPCExtensionsList.Response = new IPCExtensionsList.Response({
            extensions: await this._extensions.list()
        });
        
        console.log("resMessage", resMessage.toMessage());
        return Promise.resolve(resMessage.toJsonValue());
    }

  

}