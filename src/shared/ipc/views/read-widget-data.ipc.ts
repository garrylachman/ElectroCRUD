import { IWidget } from "../../interfaces/widgets.interface";
import { IPCBaseMessage } from "../base.ipc";

export namespace IPCReadWidgetData {
    /**
     * Interface that represent a request message sent to IPC
     * The structure is same like IWidget, we just extends it
     */
    export interface IRequest extends IWidget {
        // Table is missing in IWidget, we have to provide it
        table: string;
    }
    /**
     * Interface that represent a response message 
     */
    export interface IResponse {
        // Is the result valid
        valid: boolean;
        // In case of error, the error message
        error?: string;
        // The result in case that all works
        data?: number;
    }
    export class Request extends IPCBaseMessage<IRequest> {}
    export class Response extends IPCBaseMessage<IResponse> {}
    export const CHANNEL: string = "channel_read_widget_data";
}