import { IPCBaseMessage } from "../base.ipc";

export const IPC_CHANNEL_READ_DATA: string = "channel_read_data";

export interface IIPCReadDataRequestMessage {
    table: string;
    limit: IIPCReadDataLimit;
    columns: string[];
    search?: IIPCReadDataSearch;
    where?: IIPCReadDataWhere[];
    join?: IIPCReadDataJoin[];
}

export interface IIPCReadDataLimit {
    limit: number;
    offset: number;
}

export interface IIPCReadDataSearch {
    columns: string[],
    text: string
}

export interface IIPCReadDataWhere {
    column: string;
    opr: IIPCReadDataWhereOpr | string;
    value: any;
    or: boolean;
}

export interface IIPCReadDataJoin {
    table: string;
    on: {
        local: string,
        target: string,
        opr: IIPCReadDataWhereOpr
    }
}

export enum IIPCReadDataWhereOpr {
    EQ = "=",
    GT = ">",
    LT = "<"
}

export interface IIPCReadDataResponseMessage {
    valid: boolean;
    error?: string;
    data?: {
        [key: string]: any
    }[],
    count?: number;
}

export class IPCReadDataResponseMessage extends IPCBaseMessage<IIPCReadDataResponseMessage> { }

export class IPCReadDataRequestMessage extends IPCBaseMessage<IIPCReadDataRequestMessage> { }