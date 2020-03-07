import { IPCBaseMessage } from "./base.ipc";

export const IPC_CHANNEL_QUERY: string = "channel_query";

export interface IIPQueriesRequestMessage {
    query: string;
}

export interface IIPCQueriesResponseMessage {
    valid: boolean;
    error?: string;
    data?: {
        [key: string]: any
    }[],
    count?: number;
}

export class IPCQueriesResponseMessage extends IPCBaseMessage<IIPCQueriesResponseMessage> { }

export class IPCQueriesRequestMessage extends IPCBaseMessage<IIPQueriesRequestMessage> { }