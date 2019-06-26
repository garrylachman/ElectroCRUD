import { AccountServer, AccountSSH } from '../interfaces/accounts.interface';

export const CHANNEL_CHECK_CONNECTION: string = "channel_check_connection";

export interface CheckConnectionRequestMessage {
    server: AccountServer;
    ssh: AccountSSH;
};

export interface CheckConnectionResponsePartial {
    valid: boolean;
    error?: string;
}

export interface CheckConnectionResponseMessage {
    server: CheckConnectionResponsePartial;
    ssh: CheckConnectionResponsePartial;
}