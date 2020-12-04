import { IAccountServer, IAccountSSH} from '../interfaces/accounts.interface';
import { IPCBaseMessage } from './base.ipc'


// Check Connection
export namespace IPCCheckConnection {
    export interface IRequest {
        server: IAccountServer;
        ssh: IAccountSSH;
    }
    export interface IResponsePartial {
        valid: boolean;
        error?: string;
        port?: number;
    }
    export interface IResponse {
        server: IResponsePartial;
        ssh: IResponsePartial;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_check_connection";
}


// Connect
export namespace IPCConnect {
    export interface IRequest {
        server: IAccountServer;
        ssh: IAccountSSH;
    }
    export interface IResponse {
        valid: boolean;
        error?: string;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_connect";
}
