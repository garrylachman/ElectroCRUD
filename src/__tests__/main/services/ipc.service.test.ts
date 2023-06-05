/**
 * @jest-environment node
 */
/* eslint-disable jest/no-conditional-expect */
// @ts-nocheck

import { ipcRenderer } from 'electron';
import DatabaseService from 'main/services/database.service';
import IPCService from 'main/services/ipc.service';
import 'reflect-metadata';
import {
  ConnectArguments,
  ConnectRequest,
  ConnectResponse,
  DeleteRequest,
  DeleteResponse,
  InsertRequest,
  InsertResponse,
  ReadDataRequest,
  ReadDataResponse,
  ReadWidgetDataRequest,
  ReadWidgetDataResponse,
  TableInfoRequest,
  TablesListRequest,
  TablesListResponse,
  UpdateRequest,
  UpdateResponse,
} from '@electrocrud/shared';
import {
  IPCChannelEnum,
  QueryAggregateEnum,
  ServerTypeEnum,
} from 'shared/enums';
import { container } from 'tsyringe';

const ipc = container.resolve(IPCService);
const database = container.resolve(DatabaseService);

beforeAll(() => ipc.listen());

afterAll(async () => {
  ipc.disconnect();
  await database.disconnect();
});

describe('Main IPC Service', () => {
  test('connect', async () => {
    const body: ConnectArguments = {
      client: ServerTypeEnum.SQLITE,
      connection: {
        filename: 'src/__tests__/data/database.db',
      },
    };
    const response: ConnectResponse = await ipcRenderer.invoke(
      IPCChannelEnum.CONNECT,
      {
        channel: IPCChannelEnum.CONNECT,
        body,
      } as ConnectRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.CONNECT);
    expect(response.body).toBeTruthy();
  });

  test('tables list', async () => {
    const response: TablesListResponse = await ipcRenderer.invoke(
      IPCChannelEnum.TABLES_LIST,
      {
        channel: IPCChannelEnum.TABLES_LIST,
      } as TablesListRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.TABLES_LIST);
    expect(response.body).toEqual([
      'albums',
      'sqlite_sequence',
      'artists',
      'customers',
      'employees',
      'genres',
      'invoices',
      'invoice_items',
      'media_types',
      'playlists',
      'playlist_track',
      'tracks',
      'sqlite_stat1',
    ]);
  });

  test('table info', async () => {
    const response: TablesListResponse = await ipcRenderer.invoke(
      IPCChannelEnum.TABLE_INFO,
      {
        channel: IPCChannelEnum.TABLE_INFO,
        body: 'albums',
      } as TableInfoRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.TABLE_INFO);
    expect(response.body).toEqual([
      {
        col_id: 0,
        name: 'AlbumId',
        table_name: 'albums',
        type: 'INTEGER',
        key: 1,
        default: null,
        nullable: 1,
        length: 0,
        extra: '',
      },
      {
        col_id: 1,
        name: 'Title',
        table_name: 'albums',
        type: 'NVARCHAR(160)',
        key: 0,
        default: null,
        nullable: 1,
        length: 0,
        extra: '',
      },
      {
        col_id: 2,
        name: 'ArtistId',
        table_name: 'albums',
        type: 'INTEGER',
        key: 0,
        default: null,
        nullable: 1,
        length: 0,
        extra: '',
      },
    ]);
  });

  test('read data', async () => {
    const response: ReadDataResponse = await ipcRenderer.invoke(
      IPCChannelEnum.READ_DATA,
      {
        channel: IPCChannelEnum.READ_DATA,
        body: {
          table: 'genres',
          columns: ['GenreId', 'Name'],
          limit: 1,
          offset: 0,
        },
      } as ReadDataRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.READ_DATA);
    expect(response.body.count).toEqual(25);
    expect(response.body.data).toEqual([{ GenreId: 1, Name: 'Rock' }]);
  });

  test.each([
    { column: '*', func: QueryAggregateEnum.COUNT, data: 25 },
    { column: 'GenreId', func: QueryAggregateEnum.COUNT_DISTINCT, data: 25 },
    { column: 'GenreId', func: QueryAggregateEnum.SUM, data: 325 },
    { column: 'GenreId', func: QueryAggregateEnum.SUM_DISTINCT, data: 325 },
    { column: 'GenreId', func: QueryAggregateEnum.MIN, data: 1 },
    { column: 'GenreId', func: QueryAggregateEnum.MAX, data: 25 },
    { column: 'GenreId', func: QueryAggregateEnum.AVG, data: 13 },
    { column: 'GenreId', func: QueryAggregateEnum.AVG_DISTINCT, data: 13 },
  ])(
    'read data widget data, column $column, function $func',
    async ({ column, func, data }) => {
      const response: ReadWidgetDataResponse = await ipcRenderer.invoke(
        IPCChannelEnum.READ_WIDGET_DATA,
        {
          channel: IPCChannelEnum.READ_WIDGET_DATA,
          body: {
            table: 'genres',
            column,
            func,
          },
        } as ReadWidgetDataRequest
      );
      expect(response.body.data).toEqual(data);
    }
  );

  test('insert data', async () => {
    await database.executeQuery('delete from albums');
    const response: InsertResponse = await ipcRenderer.invoke(
      IPCChannelEnum.INSERT_DATA,
      {
        channel: IPCChannelEnum.INSERT_DATA,
        body: {
          table: 'albums',
          data: { AlbumId: 10, ArtistId: 10, Title: 'test 2' },
        },
      } as InsertRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.INSERT_DATA);
    expect(response.body).toBeTruthy();
  });

  test('insert data (multiple)', async () => {
    const response: InsertResponse = await ipcRenderer.invoke(
      IPCChannelEnum.INSERT_DATA,
      {
        channel: IPCChannelEnum.INSERT_DATA,
        body: {
          table: 'albums',
          data: [
            { AlbumId: 11, ArtistId: 11, Title: 'test 4' },
            { AlbumId: 12, ArtistId: 12, Title: 'test 5' },
          ],
        },
      } as InsertRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.INSERT_DATA);
    expect(response.body).toBeTruthy();
  });

  test('update data', async () => {
    const response: UpdateResponse = await ipcRenderer.invoke(
      IPCChannelEnum.UPDATE_DATA,
      {
        channel: IPCChannelEnum.UPDATE_DATA,
        body: {
          table: 'albums',
          update: { Title: 'test 3' },
          where: [{ column: 'AlbumId', value: 10, opr: '=', or: false }],
        },
      } as UpdateRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.UPDATE_DATA);
    expect(response.body).toBeTruthy();
  });

  test('delete data', async () => {
    const response: DeleteResponse = await ipcRenderer.invoke(
      IPCChannelEnum.DELETE_DATA,
      {
        channel: IPCChannelEnum.DELETE_DATA,
        body: {
          table: 'albums',
          where: [{ column: 'AlbumId', value: 10, opr: '=', or: false }],
        },
      } as DeleteRequest
    );
    expect(response.channel).toEqual(IPCChannelEnum.DELETE_DATA);
    expect(response.body).toBeTruthy();
  });
});
