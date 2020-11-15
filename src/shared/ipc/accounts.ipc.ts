import { IAccountServer, IAccountSSH} from '../interfaces/accounts.interface';
import { IPCBaseMessage } from './base.ipc'

// Check Connection
export const IPC_CHANNEL_CHECK_CONNECTION: string = "channel_check_connection";

export interface IIPCCheckConnectionRequestMessage {
    server: IAccountServer;
    ssh: IAccountSSH;
}

export interface IIPCCheckConnectionResponsePartial {
    valid: boolean;
    error?: string;
    port?: number;
}

export interface IIPCCheckConnectionResponseMessage {
    server: IIPCCheckConnectionResponsePartial;
    ssh: IIPCCheckConnectionResponsePartial;
}

export class IPCCheckConnectionResponseMessage extends IPCBaseMessage<IIPCCheckConnectionResponseMessage> {

}

export class IPCCheckConnectionRequestMessage extends IPCBaseMessage<IIPCCheckConnectionRequestMessage> {

}

// Connect
export const IPC_CHANNEL_CONNECT: string = "channel_connect";

export interface IIPCConnectRequestMessage {
    server: IAccountServer;
    ssh: IAccountSSH;
}

export interface IIPCConnectResponseMessage {
    valid: boolean;
    error?: string;
}

export class IPCConnectResponseMessage extends IPCBaseMessage<IIPCConnectResponseMessage> {

}

export class IPCConnectRequestMessage extends IPCBaseMessage<IIPCConnectRequestMessage> {

}
