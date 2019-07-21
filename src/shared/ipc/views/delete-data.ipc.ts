import { IPCBaseMessage } from "../base.ipc";

export const IPC_CHANNEL_DELETE_DATA: string = "channel_delete_data";

export interface IIPCDeleteDataRequestMessage {
    table: string;
    where?: IIPCDeleteDataWhere[]
}

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

export interface IIPCDeleteDataResponseMessage {
    valid: boolean;
    error?: string;
}

export class IPCDeleteDataResponseMessage extends IPCBaseMessage<IIPCDeleteDataResponseMessage> { }

export class IPCDeleteDataRequestMessage extends IPCBaseMessage<IIPCDeleteDataRequestMessage> { }