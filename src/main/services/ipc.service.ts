import { ipcMain, IpcMainInvokeEvent, webContents } from 'electron';
import { injectable, inject, delay } from 'tsyringe';
import {
  ConnectIPC,
  TableInfoIPC,
  TablesListIPC,
  ReadDataIPC,
  ReadWidgetDataIPC,
  InsertDataIPC,
  DeleteDataIPC,
  UpdateDataIPC,
} from '../ipc';
import 'reflect-metadata';
import {
  RequestType,
  ResponseType,
  IPCChannel,
  ErrorResponse,
  ConnectRequest,
  TablesListRequest,
  TableInfoRequest,
  ReadDataRequest,
  ReadWidgetDataRequest,
  InsertRequest,
  DeleteRequest,
  UpdateRequest,
} from '../../shared/defenitions';
import { IPCChannelEnum } from '../../shared/enums';
import { DatabaseService } from './database.service';

@injectable()
export class IPCService {
  constructor(
    @inject(delay(() => DatabaseService))
    private db: DatabaseService
  ) {}

  public listen() {
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) =>
      ipcMain.handle(channel, this.onRequest.bind(this))
    );
  }

  public disconnect() {
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) =>
      ipcMain.removeAllListeners(channel)
    );
  }

  private onRequest(
    event: IpcMainInvokeEvent,
    request: RequestType
  ): Promise<ResponseType> | ResponseType {
    switch (request.channel) {
      case IPCChannelEnum.CONNECT:
        return ConnectIPC(this.db, request as ConnectRequest);
      case IPCChannelEnum.TABLES_LIST:
        return TablesListIPC(this.db, request as TablesListRequest);
      case IPCChannelEnum.TABLE_INFO:
        return TableInfoIPC(this.db, request as TableInfoRequest);
      case IPCChannelEnum.READ_DATA:
        return ReadDataIPC(this.db, request as ReadDataRequest);
      case IPCChannelEnum.READ_WIDGET_DATA:
        return ReadWidgetDataIPC(this.db, request as ReadWidgetDataRequest);
      case IPCChannelEnum.INSERT_DATA:
        return InsertDataIPC(this.db, request as InsertRequest);
      case IPCChannelEnum.DELETE_DATA:
        return DeleteDataIPC(this.db, request as DeleteRequest);
      case IPCChannelEnum.UPDATE_DATA:
        return UpdateDataIPC(this.db, request as UpdateRequest);
      default:
        return {
          channel: request.channel,
          error: new Error(),
        } as ErrorResponse;
    }
  }

  send(response: ResponseType): void {
    webContents.getFocusedWebContents().send(response.channel, response);
  }
}
