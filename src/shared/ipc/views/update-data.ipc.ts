import { IPCBaseMessage } from "../base.ipc";

export const IPC_CHANNEL_UPDATE_DATA: string = "channel_update_data";

export interface IIPCUpdateDataRequestMessage {
    table: string;
    update: IIPCUpdateDataUpdate;
    where?: IIPCUpdateDataWhere[]
}

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

export interface IIPCUpdateDataResponseMessage {
    valid: boolean;
    error?: string;
}

export class IPCUpdateDataResponseMessage extends IPCBaseMessage<IIPCUpdateDataResponseMessage> { }

export class IPCUpdateDataRequestMessage extends IPCBaseMessage<IIPCUpdateDataRequestMessage> { }