import { IPCBaseMessage } from "../base.ipc";

export namespace IPCTableInfo {
    export interface IRequest {
        table: string;
    }
    export interface TableInfoColumn {
        name: string;
        default: string;
        nullable: boolean;
        type: string;
        length: number;
        key: string;
        extra: string;
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
        columns?: TableInfoColumn[]
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_table_info";
}