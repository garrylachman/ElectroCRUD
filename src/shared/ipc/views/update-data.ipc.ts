import { IPCBaseMessage } from "../base.ipc";

export namespace IPCUpdateData {
    export interface IIPCUpdateDataUpdate {
        [key: string]: any;
    }
    export interface IIPCUpdateDataWhere {
        column: string;
        opr: IIPCUpdateDataWhereOpr;
        value: any;
        or: boolean;
    }
    export enum IIPCUpdateDataWhereOpr {
        EQ = "=",
        GT = ">",
        LT = "<"
    }
    export interface IRequest {
        table: string;
        update: IIPCUpdateDataUpdate;
        where?: IIPCUpdateDataWhere[]
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_update_data";
}