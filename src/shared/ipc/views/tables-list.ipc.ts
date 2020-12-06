import { IPCBaseMessage } from '../base.ipc'

export namespace IPCListOfTables {
    export interface IRequest {
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
        tables?: string[]
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_list_of_tables";
}