import { IPCBaseMessage } from './base.ipc'

// List of tables
export const IPC_CHANNEL_LIST_OF_TABLES: string = "channel_list_of_tables";

export interface IIPCListOfTablesRequestMessage { }

export interface IIPCListOfTablesResponseMessage {
    valid: boolean;
    error?: string;
    tables?: string[]
}

export class IPCListOfTablesResponseMessage extends IPCBaseMessage<IIPCListOfTablesResponseMessage> { }

export class IPCListOfTablesRequestMessage extends IPCBaseMessage<IIPCListOfTablesRequestMessage> { }


// Table info
export const IPC_CHANNEL_TABLE_INFO: string = "channel_table_info";

export interface IIPCTableInfoRequestMessage {
    table: string;
}

export interface IIPCTableInfoColumn {
    name: string;
    default: string;
    nullable: boolean;
    type: string;
    length: number;
    key: string;
    extra: string;
}

export interface IIPCTableInfoResponseMessage {
    valid: boolean;
    error?: string;
    columns?: IIPCTableInfoColumn[]
}

export class IPCTableInfoResponseMessage extends IPCBaseMessage<IIPCTableInfoResponseMessage> { }

export class IPCTableInfoRequestMessage extends IPCBaseMessage<IIPCTableInfoRequestMessage> { }

// Table read data
export const IPC_CHANNEL_READ_DATA: string = "channel_read_data";

export interface IIPCReadDataRequestMessage {
    table: string;
    limit: IIPCReadDataLimit;
    columns: string[];
    search?: IIPCReadDataSearch;
    where?: IIPCReadDataWhere[]
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
    opr: IIPCReadDataWhereOpr;
    value: any;
    or: boolean;
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


// Table update data
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


// Table insert data
export const IPC_CHANNEL_INSERT_DATA: string = "channel_insert_data";

export interface IIPCInsertDataRequestMessage {
    table: string;
    data: IIPCInsertData;
}

export interface IIPCInsertData {
    [key: string]: any;
}

export interface IIPCInsertDataResponseMessage {
    valid: boolean;
    error?: string;
}

export class IPCInsertDataResponseMessage extends IPCBaseMessage<IIPCInsertDataResponseMessage> { }

export class IPCInsertDataRequestMessage extends IPCBaseMessage<IIPCInsertDataRequestMessage> { }
