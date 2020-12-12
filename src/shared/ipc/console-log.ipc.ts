import { ConsoleLogItem, ConsoleLogItemType } from "../interfaces/log-console.interface";
import { IPCBaseMessage } from "./base.ipc";


export namespace IPCConsoleLog {
    export interface IRequest extends ConsoleLogItem{
        method?: string;
    }

    export class Request extends IPCBaseMessage<IRequest> {}
    export const CHANNEL: string = "channel_console_log";
}