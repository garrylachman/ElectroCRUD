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
    port?: number;
}

export interface IIPCCheckConnectionResponseMessage {
    server: IIPCCheckConnectionResponsePartial;
    ssh: IIPCCheckConnectionResponsePartial;
}

export class IPCCheckConnectionResponseMessage extends IPCBaseMessage<IIPCCheckConnectionResponseMessage> {
    public set sshValid(valid: boolean) {
        this.message.ssh.valid = valid;
    }
    public set sshError(error: string) {
        this.message.ssh.error = error;
    }
}

export class IPCCheckConnectionRequestMessage extends IPCBaseMessage<IIPCCheckConnectionRequestMessage> {

}