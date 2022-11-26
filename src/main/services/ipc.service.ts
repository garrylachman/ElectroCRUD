import { ipcMain, IpcMainInvokeEvent, webContents } from 'electron';
import { injectable, inject, delay } from 'tsyringe';
import { RequestFactory } from '../ipc';
import 'reflect-metadata';
import {
  RequestType,
  ResponseType,
  IPCChannel,
  ErrorResponse,
  ErrorType,
  ConnectRequest,
} from '../../shared/defenitions';
import { IPCChannelEnum } from '../../shared/enums';
import { DatabaseService } from './database.service';

@injectable()
export class IPCService {
  constructor(
    @inject(delay(() => DatabaseService))
    private db: DatabaseService,
    @inject(delay(() => RequestFactory))
    private rFactory: RequestFactory
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
        return this.rFactory.createRequest(request, 'connectWithProps');
      case IPCChannelEnum.TABLES_LIST:
        return this.rFactory.createRequest(request, 'listTablesWithProps');
      case IPCChannelEnum.TABLE_INFO:
        return this.rFactory.createRequest(request, 'tableInfoWithProps');
      case IPCChannelEnum.READ_DATA:
        return this.rFactory.createRequest(request, 'readDataWithProps');
      case IPCChannelEnum.READ_WIDGET_DATA:
        return this.rFactory.createRequest(request, 'readWidgetDataWithProps');
      case IPCChannelEnum.INSERT_DATA:
        return this.rFactory.createRequest(request, 'insertDataWithProps');
      case IPCChannelEnum.DELETE_DATA:
        return this.rFactory.createRequest(request, 'deleteDataWithProps');
      case IPCChannelEnum.UPDATE_DATA:
        return this.rFactory.createRequest(request, 'updateDataWithProps');
      default:
        return {
          channel: request.channel,
          error: {
            type: ErrorType.GENERIC,
            message: 'Unexpected Error',
          },
        } as ErrorResponse;
    }
  }

  send(response: ResponseType): void {
    webContents
      .getFocusedWebContents()
      .send(response.channel as IPCChannel, response);
  }
}