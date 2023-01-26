/**
 * @jest-environment node
 */
/* eslint-disable jest/no-conditional-expect */

import 'reflect-metadata';
import { container } from 'tsyringe';
import DatabaseService from 'main/services/database.service';
import { QueryAggregateEnum, ServerTypeEnum } from 'shared/enums';
import { ReadDataResult, ReadWidgetDataResult } from 'shared/defenitions';
import { NoActiveClientError, NoConnectionError } from 'main/exceptions';

const db = container.resolve(DatabaseService);

afterAll(() => db.disconnect());

describe('Database Service', () => {
  test('is instance of DatabaseService', () => {
    expect(db).toBeInstanceOf(DatabaseService);
  });

  test('is DatabaseService singelton', () => {
    const db2 = container.resolve(DatabaseService);
    expect(db).toEqual(db2);
  });
});

describe('Before connected', () => {
  test('no connection exception', () => {
    expect(() => db.getConnection).toThrowError(new NoConnectionError());
  });

  test('no active client exception', () => {
    expect(() => db.activeClient).toThrowError(new NoActiveClientError());
  });

  type Payload = {
    func: (...args: any[]) => Promise<any> | Error;
    payload: any;
  };

  test.each([
    { func: db.tableInfo, payload: ['generes'] },
    { func: db.heartbeat, payload: [] },
    { func: db.listTables, payload: [] },
    { func: db.executeQuery, payload: ['select 1'] },
    { func: db.readData, payload: ['generes', ['*'], 0, 1] },
    { func: db.readWidgetData, payload: ['a', '*', QueryAggregateEnum.COUNT] },
    { func: db.insertData, payload: ['select 1', { a: 'b' }] },
    { func: db.updateData, payload: ['select 1', { a: 'b' }] },
    { func: db.deleteData, payload: ['select 1'] },
  ])(
    'execute $func - expect "No active client" exception',
    async ({ func, payload }: Payload) => {
      try {
        await func.call(db, ...payload);
      } catch (e) {
        expect(e as Error).toBeInstanceOf(NoActiveClientError);
      }
    }
  );
});

describe('SQLite3', () => {
  test('connect to no exist db', async () => {
    expect.assertions(1);
    try {
      await db.connect(ServerTypeEnum.SQLITE, {
        filename: 'src/__tests__/_data_/no-found.db',
      });
    } catch (e) {
      expect((e as Error).message).toEqual(
        'SQLITE_CANTOPEN: unable to open database file'
      );
    }
  });

  test('connect to sample db', async () => {
    expect(
      await db.connect(ServerTypeEnum.SQLITE, {
        filename: 'src/__tests__/data/database.db',
      })
    ).toBeTruthy();
  });

  test('heart beat', async () => {
    expect(await db.heartbeat()).toBeTruthy();
  });

  test('tables list', async () => {
    expect(await db.listTables()).toEqual([
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
    expect(await db.tableInfo('genres')).toEqual([
      {
        col_id: 0,
        name: 'GenreId',
        table_name: 'genres',
        type: 'INTEGER',
        key: 1,
        default: null,
        nullable: 1,
        length: 0,
        extra: '',
      },
      {
        col_id: 1,
        name: 'Name',
        table_name: 'genres',
        type: 'NVARCHAR(120)',
        key: 0,
        default: null,
        nullable: 0,
        length: 0,
        extra: '',
      },
    ]);
  });

  test('read data', async () => {
    type Result = ReadDataResult<{ GenreId: number; Name: string }>;
    const res: Error | Result = await db.readData(
      'genres',
      ['GenreId', 'Name'],
      1,
      0
    );
    expect((res as Result).count).toEqual(25);
    expect((res as Result).data).toHaveLength(1);
    expect((res as Result).data).toEqual([{ GenreId: 1, Name: 'Rock' }]);
  });

  test('read data with where', async () => {
    type Result = ReadDataResult<{ GenreId: number; Name: string }>;
    const res: Error | Result = await db.readData(
      'genres',
      ['GenreId', 'Name'],
      1,
      0,
      undefined,
      undefined,
      [{ column: 'GenreId', value: '2', opr: '=', or: false }]
    );
    expect((res as Result).count).toEqual(1);
    expect((res as Result).data).toHaveLength(1);
    expect((res as Result).data).toEqual([{ GenreId: 2, Name: 'Jazz' }]);
  });

  test('read data with search', async () => {
    type Result = ReadDataResult<{ GenreId: number; Name: string }>;
    const res: Error | Result = await db.readData(
      'genres',
      ['GenreId', 'Name'],
      1,
      1,
      ['Name'],
      'A'
    );
    expect((res as Result).count).toEqual(17);
    expect((res as Result).data).toHaveLength(1);
    expect((res as Result).data).toEqual([{ GenreId: 3, Name: 'Metal' }]);
  });

  test('read data with search and where', async () => {
    type Result = ReadDataResult<{ GenreId: number; Name: string }>;
    const res: Error | Result = await db.readData(
      'genres',
      ['GenreId', 'Name'],
      1,
      0,
      ['Name'],
      'J',
      [{ column: 'GenreId', value: '2', opr: '=', or: false }]
    );
    expect((res as Result).count).toEqual(1);
    expect((res as Result).data).toHaveLength(1);
    expect((res as Result).data).toEqual([{ GenreId: 2, Name: 'Jazz' }]);
  });

  test('read data with join', async () => {
    type Result = ReadDataResult<{ GenreId: number; Name: string }>;
    const res: Error | Result = await db.readData(
      'genres',
      ['genres.*', 'tracks.*'],
      1,
      0,
      undefined,
      undefined,
      undefined,
      [
        {
          table: 'tracks',
          on: { local: 'GenreId', target: 'GenreId', opr: '=' },
        },
      ]
    );

    expect((res as Result).count).toEqual(3503);
    expect((res as Result).data).toHaveLength(1);
    expect((res as Result).data).toEqual([
      {
        GenreId: 1,
        Name: 'For Those About To Rock (We Salute You)',
        TrackId: 1,
        AlbumId: 1,
        MediaTypeId: 1,
        Composer: 'Angus Young, Malcolm Young, Brian Johnson',
        Milliseconds: 343719,
        Bytes: 11170334,
        UnitPrice: 0.99,
      },
    ]);
  });

  test('read data - table not exists', async () => {
    try {
      type Result = ReadDataResult<{ GenreId: number; Name: string }>;
      const res: Error | Result = await db.readData(
        'genres1',
        ['GenreId', 'Name'],
        1,
        0
      );
    } catch (e) {
      expect((e as Error).message).toEqual(
        'select count(*) as `count` from `genres1` - SQLITE_ERROR: no such table: genres1'
      );
    }
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
      type Result = ReadWidgetDataResult<number>;
      const res: Error | Result = await db.readWidgetData(
        'genres',
        column,
        func
      );
      expect((res as Result).data).toEqual(data);
      expect(res as Result).toEqual({ data });
    }
  );

  test.each([
    { column: '*', func: QueryAggregateEnum.COUNT, data: 1 },
    { column: 'GenreId', func: QueryAggregateEnum.COUNT_DISTINCT, data: 1 },
    { column: 'GenreId', func: QueryAggregateEnum.SUM, data: 10 },
    { column: 'GenreId', func: QueryAggregateEnum.SUM_DISTINCT, data: 10 },
    { column: 'GenreId', func: QueryAggregateEnum.MIN, data: 10 },
    { column: 'GenreId', func: QueryAggregateEnum.MAX, data: 10 },
    { column: 'GenreId', func: QueryAggregateEnum.AVG, data: 10 },
    { column: 'GenreId', func: QueryAggregateEnum.AVG_DISTINCT, data: 10 },
  ])(
    'read data widget data, column $column, function $func with where',
    async ({ column, func, data }) => {
      type Result = ReadWidgetDataResult<number>;
      const res: Error | Result = await db.readWidgetData(
        'genres',
        column,
        func,
        [{ column: 'GenreId', value: '10', opr: '=', or: false }]
      );
      expect((res as Result).data).toEqual(data);
      expect(res as Result).toEqual({ data });
    }
  );

  test('read data widget data - table not exists', async () => {
    try {
      type Result = ReadWidgetDataResult<number>;
      const res: Error | Result = await db.readWidgetData(
        'genres1',
        'GenreId',
        QueryAggregateEnum.COUNT,
        [{ column: 'GenreId', value: '10', opr: '=', or: false }]
      );
    } catch (e) {
      expect((e as Error).message).toEqual(
        "select count(`GenreId`) as `a` from `genres1` where (`GenreId` = '10') - SQLITE_ERROR: no such table: genres1"
      );
    }
  });

  test('execute query', async () => {
    type Result = { '1': number };
    const res: Result[] = await db.executeQuery('SELECT 1');

    expect(res).toHaveLength(1);
    expect(res).toEqual([{ '1': 1 }]);
  });

  test('insert data', async () => {
    await db.executeQuery('delete from albums');

    expect(
      await db.insertData('albums', {
        AlbumId: 1,
        ArtistId: 1,
        Title: 'test 1',
      })
    ).toBeTruthy();

    expect(
      await db.insertData('albums', [
        { AlbumId: 2, ArtistId: 2, Title: 'test 2' },
        { AlbumId: 3, ArtistId: 3, Title: 'test 3' },
      ])
    ).toBeTruthy();

    type Result = { AlbumId: number };
    const res: Result[] = await db.executeQuery('SELECT AlbumId from albums');
    expect(res).toHaveLength(3);
    expect(res).toEqual([{ AlbumId: 1 }, { AlbumId: 2 }, { AlbumId: 3 }]);
  });

  test('insert data - no table', async () => {
    try {
      await db.insertData('albums1', { x: 'y' });
    } catch (e) {
      expect((e as Error).message).toEqual(
        "insert into `albums1` (`x`) values ('y') - SQLITE_ERROR: no such table: albums1"
      );
    }
  });

  test('insert data - no column', async () => {
    try {
      await db.insertData('albums', { x: 'y' });
    } catch (e) {
      expect((e as Error).message).toEqual(
        "insert into `albums` (`x`) values ('y') - SQLITE_ERROR: table albums has no column named x"
      );
    }
  });

  test('delete data', async () => {
    await db.executeQuery('delete from albums');

    expect(
      await db.insertData('albums', [
        { AlbumId: 1, ArtistId: 1, Title: 'test 1' },
        { AlbumId: 2, ArtistId: 2, Title: 'test 2' },
        { AlbumId: 3, ArtistId: 3, Title: 'test 3' },
      ])
    ).toBeTruthy();

    type Result = { count: number };
    let res: Result[] = await db.executeQuery(
      'SELECT count(*) as count from albums'
    );
    expect(res[0].count).toEqual(3);

    expect(
      await db.deleteData('albums', [
        { column: 'AlbumId', value: 1, opr: '=', or: false },
      ])
    ).toBeTruthy();

    res = await db.executeQuery('SELECT count(*) as count from albums');
    expect(res[0].count).toEqual(2);

    expect(await db.deleteData('albums')).toBeTruthy();

    res = await db.executeQuery('SELECT count(*) as count from albums');
    expect(res[0].count).toEqual(0);
  });

  test('delete data - no table', async () => {
    try {
      await db.deleteData('albums1');
    } catch (e) {
      expect((e as Error).message).toEqual(
        'delete from `albums1` - SQLITE_ERROR: no such table: albums1'
      );
    }
  });

  test('update data', async () => {
    await db.executeQuery('delete from albums');

    expect(
      await db.insertData('albums', {
        AlbumId: 1,
        ArtistId: 1,
        Title: 'test 1',
      })
    ).toBeTruthy();

    expect(
      await db.updateData('albums', { Title: 'updated 1' }, [
        { column: 'AlbumId', value: 1, opr: '=', or: false },
      ])
    ).toBeTruthy();

    type Result = { Title: string };
    const res: Result[] = await db.executeQuery('SELECT Title from albums');
    expect(res).toHaveLength(1);
    expect(res).toEqual([{ Title: 'updated 1' }]);
  });

  test('update data - no table', async () => {
    try {
      await db.updateData('albums1', { x: 'y' });
    } catch (e) {
      expect((e as Error).message).toEqual(
        "update `albums1` set `x` = 'y' - SQLITE_ERROR: no such table: albums1"
      );
    }
  });

  test('update data - wrong column', async () => {
    try {
      await db.updateData('albums', { x: 'y' });
    } catch (e) {
      expect((e as Error).message).toEqual(
        "update `albums` set `x` = 'y' - SQLITE_ERROR: no such column: x"
      );
    }
  });
});
