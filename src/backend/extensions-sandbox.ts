import { ExtensionsService } from "./services/extensions.service";
import "reflect-metadata";
import { fluentProvide } from "inversify-binding-decorators";
import { IExtensionPackage } from "../shared/interfaces/extension.interface";

@fluentProvide(ExtensionsSandbox).inSingletonScope().done()
export class ExtensionsSandbox {

    private _extensions: ExtensionsService;
    constructor(
        extensions: ExtensionsService
    ) {
        this._extensions = extensions
    }

    public async load() {
        (await this._extensions.list()).forEach((extension:IExtensionPackage) => this.loadExtension(extension))
    }

    private loadExtension(extension:IExtensionPackage) {

    }

}