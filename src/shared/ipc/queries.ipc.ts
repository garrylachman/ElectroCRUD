import { IPCBaseMessage } from "./base.ipc";


export namespace IPCQuery {
    export interface IRequest {
        query: string;
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
        data?: {
            [key: string]: any
        }[],
        count?: number;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_query";
}