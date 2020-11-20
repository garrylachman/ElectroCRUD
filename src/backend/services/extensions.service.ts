import "reflect-metadata";
import { fluentProvide  } from "inversify-binding-decorators";
import { IExtensionPackage } from '../../shared/interfaces/extension.interface'
import { app } from 'electron';
import * as fs from 'fs';

@fluentProvide(ExtensionsService).inSingletonScope().done()
export class ExtensionsService {

    private extensionsDir:string = `${app.getPath("userData")}/extensions`

    private _list: IExtensionPackage[] = [];
    private isInitialized:Boolean = false;

    constructor() {

    }
   
    public async list(): Promise<IExtensionPackage[]> {
        if ( ! this.isInitialized) {
            await this.reloadFromDisk()
        }
        return this._list;
    }

    private async reloadFromDisk() {
        try {
            fs.mkdirSync(this.extensionsDir);
        } catch(er) {}

        const dir = await fs.promises.opendir(this.extensionsDir);
        for await (const dirent of dir) {
          console.log(dirent.name);
          try {
            this._list.push(require(`${this.extensionsDir}/${dirent.name}/package.json`))
          } catch(er) {}
        }
        this.isInitialized = true;
    }

    

}