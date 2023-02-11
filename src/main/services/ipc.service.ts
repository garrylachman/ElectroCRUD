import 'reflect-metadata';

import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import * as hash from 'object-hash';
import Container, { Service } from 'typedi';
import {
  ErrorResponse,
  ErrorType,
  IPCChannel,
  RequestType,
  ResponseType,
  IPCChannelEnum
} from '@electrocrud/shared';
import { IRequestFactory } from '../ipc/base.ipc';
import { IIPCService } from './interfaces/iipc.service';
import { mainWindow } from 'main/index';

const ipcCache = new CacheContainer(new MemoryStorage());

@Service({ global: true, id: 'service.ipc' })
class IPCService implements IIPCService {
  private rFactory = Container.get<IRequestFactory>('request.factory');

  public listen(): void {
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) => {
      ipcMain.removeHandler(channel);
      try {
        ipcMain.handle(channel, this.onRequest.bind(this));
      } catch {
        /* empty */
      }
    });
  }

  public disconnect(): void {
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) =>
      ipcMain.removeHandler(channel)
    );
  }

  @Cache(ipcCache, { ttl: 10, calculateKey: (data) => hash.sha1(data) })
  private onRequest(
    event: IpcMainInvokeEvent,
    request: RequestType
  ): Promise<ResponseType> | ResponseType {
    switch (request.channel) {
      case IPCChannelEnum.CONNECT: {
        return this.rFactory.createRequest(request, 'connectWithProps');
      }
      case IPCChannelEnum.TABLES_LIST: {
        return this.rFactory.createRequest(request, 'listTablesWithProps');
      }
      case IPCChannelEnum.TABLE_INFO: {
        return this.rFactory.createRequest(request, 'tableInfoWithProps');
      }
      case IPCChannelEnum.READ_DATA: {
        return this.rFactory.createRequest(request, 'readDataWithProps');
      }
      case IPCChannelEnum.READ_WIDGET_DATA: {
        return this.rFactory.createRequest(request, 'readWidgetDataWithProps');
      }
      case IPCChannelEnum.INSERT_DATA: {
        return this.rFactory.createRequest(request, 'insertDataWithProps');
      }
      case IPCChannelEnum.DELETE_DATA: {
        return this.rFactory.createRequest(request, 'deleteDataWithProps');
      }
      case IPCChannelEnum.UPDATE_DATA: {
        return this.rFactory.createRequest(request, 'updateDataWithProps');
      }
      default: {
        return {
          channel: request.channel,
          error: {
            type: ErrorType.GENERIC,
            message: 'Unexpected Error',
          },
        } as ErrorResponse;
      }
    }
  }

  public send(response: ResponseType): void {
    // eslint-disable-next-line no-restricted-syntax
    mainWindow?.webContents.send(response.channel, response);
  }
}

export default IPCService;
