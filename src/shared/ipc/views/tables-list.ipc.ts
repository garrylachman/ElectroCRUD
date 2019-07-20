import { IPCBaseMessage } from '../base.ipc'

export const IPC_CHANNEL_LIST_OF_TABLES: string = "channel_list_of_tables";

export interface IIPCListOfTablesRequestMessage { }

export interface IIPCListOfTablesResponseMessage {
    valid: boolean;
    error?: string;
    tables?: string[]
}

export class IPCListOfTablesResponseMessage extends IPCBaseMessage<IIPCListOfTablesResponseMessage> { }

export class IPCListOfTablesRequestMessage extends IPCBaseMessage<IIPCListOfTablesRequestMessage> { }