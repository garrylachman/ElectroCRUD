import { IPCBaseMessage } from "../base.ipc";

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