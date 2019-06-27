import { AccountServer, AccountSSH } from '../interfaces/accounts.interface';
import { IPCBaseMessage } from './base.ipc'

export const IPC_CHANNEL_CHECK_CONNECTION: string = "channel_check_connection";

export interface IIPCCheckConnectionRequestMessage {
    server: AccountServer;
    ssh: AccountSSH;
};

export interface IIPCCheckConnectionResponsePartial {
    valid: boolean;
    error?: string;
}

export interface IIPCCheckConnectionResponseMessage {
    server: IIPCCheckConnectionResponsePartial;
    ssh: IIPCCheckConnectionResponsePartial;
}

export class IPCCheckConnectionResponseMessage extends IPCBaseMessage<IIPCCheckConnectionResponseMessage> {

}

export class IPCCheckConnectionRequestMessage extends IPCBaseMessage<IIPCCheckConnectionRequestMessage> {

}