import { IPCBaseMessage } from "../base.ipc";

export namespace IPCDeleteData {
    export interface IIPCDeleteDataWhere {
        column: string;
        opr: IIPCDeleteDataWhereOpr;
        value: any;
        or: boolean;
    }
    
    export enum IIPCDeleteDataWhereOpr {
        EQ = "=",
        GT = ">",
        LT = "<"
    }
    export interface IRequest {
        table: string;
        where?: IIPCDeleteDataWhere[]
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_delete_data";
}