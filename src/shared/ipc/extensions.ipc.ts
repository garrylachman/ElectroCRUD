import { IExtensionPackage } from '../interfaces/extension.interface'
import { IPCBaseMessage, IExportIPC } from './base.ipc'

export namespace IPCExtensionsList {
    export interface IRequest {}
    export interface IResponse {
        extensions: IExtensionPackage[]
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_extensions_list";
}