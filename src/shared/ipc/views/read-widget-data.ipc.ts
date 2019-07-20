import { IPCBaseMessage } from "../base.ipc";
import { IWidget } from "../../interfaces/widgets.interface";

export const IPC_CHANNEL_READ_WIDGET_DATA: string = "channel_read_widget_data";

/**
 * Interface that represent a request message sent to IPC
 * The structure is same like IWidget, we just extends it
 */
export interface IIPCReadWidgetDataRequestMessage extends IWidget {
    // Table is missing in IWidget, we have to provide it
    table: string;
 }

/**
 * Interface that represent a response message 
 */
export interface IIPCReadWidgetDataResponseMessage {
    // Is the result valid
    valid: boolean;
    // In case of error, the error message
    error?: string;
    // The result in case that all works
    data?: number;
}

/**
 * The request message class, implements IIPCReadWidgetDataResponseMessage
 */
export class IPCReadWidgetDataResponseMessage extends IPCBaseMessage<IIPCReadWidgetDataResponseMessage> { }

/**
 * The response message class, implements IIPCReadWidgetDataRequestMessage
 */
export class IPCReadWidgetDataRequestMessage extends IPCBaseMessage<IIPCReadWidgetDataRequestMessage> { }