import 'reflect-metadata';
import 'sqlite3';
import 'better-sqlite3';
import sqlFormatter from '@sqltools/formatter';
import { Config as SQLFormatterConfig } from '@sqltools/formatter/lib/core/types';
import getCurrentLine from 'get-current-line';
import * as Knex from 'knex';
import knexHooks from 'knex-hooks';
import { whereFilter } from 'knex-json-filter';
import { SchemaInspector } from 'knex-schema-inspector';
import { isArray, mapKeys, omit, size } from 'lodash';
import { autoInjectable, delay, inject, singleton } from 'tsyringe';

import {
  ConnectArgs as ConnectArguments,
  ConnectionConfig,
  DeleteDataArgs as DeleteDataArguments,
  ErrorType,
  InsertDataArgs as InsertDataArguments,
  IPCError,
  QueryAggregate,
  QueryJoin,
  QueryOrder,
  QueryWhere,
  ReadDataArgs as ReadDataArguments,
  ReadDataResult,
  ReadWidgetDataArgs as ReadWidgetDataArguments,
  ReadWidgetDataResult,
  ServerConnectionConfig,
  ServerType,
  TableInfoRow,
  UpdateDataArgs as UpdateDataArguments,
} from '../../shared/defenitions';
import { QueryAggregateEnum, ServerTypeEnum } from '../../shared/enums';
import { heartBeatQueries, tablesListQueries } from '../data/queries';
import { NoActiveClientError } from '../exceptions';
import { LogService } from './log.service';

const formatterParameters: SQLFormatterConfig = {
  reservedWordCase: 'upper',
  indent: '    ',
  language: 'sql',
};

@singleton()
@autoInjectable()
export default class DatabaseService {
  private config?: Knex.Knex.Config;

  private connection?: Knex.Knex;

  private inspector?: SchemaInspector;

  constructor(
    @inject(delay(() => LogService)) private logService?: LogService
  ) {}

  public async connect(
    client: ServerType,
    connection: ConnectionConfig
  ): Promise<boolean | IPCError> {
    await this.disconnect();

    const connectionConfig =
      client === ServerTypeEnum.MSSQL
        ? {
            ...connection,
            server: (connection as ServerConnectionConfig).host,
            port: Number((connection as ServerConnectionConfig).port),
          }
        : connection;

    this.config = {
      client,
      connection: connectionConfig,
      useNullAsDefault: true,
    };
    this.logService?.info(
      `Connecting: ${JSON.stringify(
        omit(this.config.connection as Knex.Knex.ConnectionConfigProvider, [
          'password',
          'user',
        ])
      )}`,
      getCurrentLine().method
    );
    try {
      this.connection = Knex.knex(this.config);
      this.inspector = SchemaInspector(this.connection);
      if (this.config.connection?.schema) {
        this.inspector.withSchema(this.config.connection?.schema);
      }
      this.connectHooks();
      const result = await this.heartbeat();
      this.logService?.success(`Connection Success`, getCurrentLine().method);
      return result;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  private connectHooks() {
    knexHooks(this.connection);

    this.connection?.addHook(
      'before',
      '*',
      '*',
      (when, method, table, parameters) => {
        this.logService?.info(parameters.query.toString(), when);
      }
    );
  }

  public async connectWithProps(
    properties: ConnectArguments
  ): Promise<boolean | IPCError> {
    const { client, connection } = properties;
    return this.connect(client, connection);
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy();
    }
  }

  public get getConnection(): Knex.Knex | IPCError {
    if (!this.connection) {
      return {
        type: ErrorType.NOT_CONNECTED,
        message: 'Not Connected',
      } as IPCError;
    }
    return this.connection;
  }

  public get activeClient(): ServerType {
    try {
      if (!this.config?.client) {
        throw new NoActiveClientError();
      }
      return this.config.client;
    } catch {
      throw new NoActiveClientError();
    }
  }

  public async heartbeat(): Promise<boolean | IPCError> {
    const heartbeatQuery = heartBeatQueries[this.activeClient];

    try {
      await this.connection?.raw(heartbeatQuery);
      return true;
    } catch (error: unknown) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async heartbeatWithProps(): Promise<boolean | IPCError> {
    return this.heartbeat();
  }

  public async executeQuery(query: string): Promise<any | IPCError> {
    const extractResult = (result: any): any => {
      if (result?.rows) {
        return result.rows;
      }
      if (isArray(result) && size(result) === 2) {
        return result[0];
      }
      return result;
    };

    this.logService?.info(
      sqlFormatter.format(query, formatterParameters),
      getCurrentLine().method
    );

    try {
      this.logService?.success(
        sqlFormatter.format(query, formatterParameters),
        getCurrentLine().method
      );
      const response = await this.connection
        .withSchema(this.config.connection?.schema || '')
        .raw(query);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return extractResult(response);
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async listTables(): Promise<string[] | IPCError> {
    const listTablesQuery = tablesListQueries[this.activeClient];
    let bindings: string[] = [this.connection?.client.database()];
    if (this.activeClient === ServerTypeEnum.SQLITE) {
      bindings = [];
    }
    this.logService?.info(
      sqlFormatter.format(listTablesQuery, formatterParameters),
      getCurrentLine().method
    );
    try {
      this.logService?.success(
        sqlFormatter.format(listTablesQuery, formatterParameters),
        getCurrentLine().method
      );
      const tables = (await this.inspector?.tables()) as string[];
      return tables;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async listTablesWithProps(): Promise<string[] | IPCError> {
    return this.listTables();
  }

  public async tableInfo(
    tableName: string
  ): Promise<TableInfoRow[] | IPCError> {
    this.getConnection();

    try {
      const response = (await this.inspector?.columnInfo(
        tableName
      )) as TableInfoRow[];
      if (!response) {
        throw new Error('Cannot inspect table');
      }
      return response;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async tableInfoWithProps(
    properties: string
  ): Promise<TableInfoRow[] | IPCError> {
    return this.tableInfo(properties);
  }

  public async readData(
    table: string,
    columns: string[],
    limit: number,
    offset: number,
    searchColumns?: string[],
    searchText?: string,
    where?: QueryWhere[],
    join?: QueryJoin[],
    order?: QueryOrder,
    filter?: any
  ): Promise<ReadDataResult<any> | IPCError> {
    try {
      const selectColumns = [...columns].map((col) =>
        col.includes('.') ? `${col}` : `${table}.${col}`
      );

      const q = this.getConnection()
        .withSchema(
          this.config.connection?.schema || ''
        )
        .select(...selectColumns)
        .from(table);

      if (join) {
        for (const index of join) {
          q?.leftJoin(
            index.table,
            `${table}.${index.on.local}`,
            index.on.opr,
            `${index.table}.${index.on.target}`
          );
        }
      }

      if (searchColumns && searchText) {
        q?.where((wq) => {
          const lWhere: string[] = [];
          const lWhereValues: string[] = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const col of searchColumns) {
            const columnName = col.includes('.') ? col : `${table}.${col}`;
            if (this.activeClient === ServerTypeEnum.POSTGRES) {
              lWhere.push(`CAST(${columnName} as TEXT) ilike ?`);
            } else {
              lWhere.push(`${columnName} like ?`);
            }
            lWhereValues.push(`%${searchText}%`);
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return wq.whereRaw(lWhere.join(' or '), lWhereValues);
        });
      }
      if (where) {
        q?.where((wq) => {
          for (const col of where) {
            const columnName = col.column.includes('.')
              ? col.column
              : `${table}.${col.column}`;

            const whereFunction = col.or ? 'orWhere' : 'andWhere';
            wq[whereFunction](col.column, col.opr, col.value);
          }
          return wq;
        });
      }
      if (filter) {
        q?.where((wq) => {
          return wq.where(whereFilter(filter));
        });
        this.logService?.success(
          sqlFormatter.format(q?.toQuery() || ''),
          getCurrentLine().method
        );
      }

      const countResponse = await q
        ?.clone()
        .clearSelect()
        .count({ count: '*' });

      q.modify((qb) => {
        if (order && order.column) {
          qb.orderBy(order.column, order.order);
        }
        return qb;
      });

      const response = await q?.limit(limit).offset(offset);

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );

      return {
        data: response || [],
        count: countResponse ? Number(countResponse[0].count) : 0,
      };
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async readDataWithProps(
    properties: ReadDataArguments
  ): Promise<ReadDataResult<any> | IPCError> {
    const {
      table,
      columns,
      limit,
      offset,
      searchColumns,
      searchText,
      where,
      join,
      order,
      filter,
    } = properties;
    return this.readData(
      table,
      columns,
      limit,
      offset,
      searchColumns,
      searchText,
      where,
      join,
      order,
      filter
    );
  }

  public async updateData(
    table: string,
    update: Record<string, any>,
    where?: QueryWhere[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.getConnection()
        .withSchema(this.config.connection?.schema || '')
        .table(table);

      q?.where((qw) => {
        if (where)
          for (const col of where) {
            const whereFunction = col.or ? 'orWhere' : 'andWhere';
            qw[whereFunction](`${table}.${col.column}`, col.opr, col.value);
          }
        return qw;
      });

      q?.update(mapKeys(update, (value, key) => `${table}.${key}`));
      await q;

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async updateDataWithProps(
    properties: UpdateDataArguments
  ): Promise<boolean | IPCError> {
    const { table, update, where } = properties;
    return this.updateData(table, update, where);
  }

  public async insertData(
    table: string,
    data: Record<string, any> | Record<string, any>[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.getConnection().withSchema(
        this.config.connection?.schema || ''
      ).table(table);

      q?.insert(data);
      await q;

      this.logService?.info(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async insertDataWithProps(
    properties: InsertDataArguments
  ): Promise<boolean | IPCError> {
    const { table, data } = properties;
    return this.insertData(table, data);
  }

  public async deleteData(
    table: string,
    where?: QueryWhere[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.getConnection().withSchema(
        this.config.connection?.schema || ''
      ).table(table);

      q?.where((qw) => {
        if (where)
          for (const col of where) {
            const whereFunction = col.or ? 'orWhere' : 'andWhere';
            qw[whereFunction](col.column, col.opr, col.value);
          }
        return qw;
      });
      await q?.delete();
      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async deleteDataWithProps(
    properties: DeleteDataArguments
  ): Promise<boolean | IPCError> {
    const { table, where } = properties;
    return this.deleteData(table, where);
  }

  public async readWidgetData(
    table: string,
    column: string,
    function_: QueryAggregate,
    where?: QueryWhere[]
  ): Promise<ReadWidgetDataResult<number> | IPCError> {
    try {
      const q = this.getConnection().withSchema(
        this.config.connection?.schema || ''
      ).table(table);
      if (q) {
        if (
          function_ === QueryAggregateEnum.COUNT ||
          function_ === QueryAggregateEnum.COUNT_DISTINCT
        ) {
          q[function_]({
            a: column,
          });
        } else {
          q[function_]({
            a: column,
          });
        }
      }

      q?.where((qw) => {
        if (where)
          for (const col of where) {
            const whereFunction = col.or ? 'orWhere' : 'andWhere';
            qw[whereFunction](col.column, col.opr, col.value);
          }
        return qw;
      });

      const res = await q;

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );

      return {
        data: res ? res[0].a : 0,
      };
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async readWidgetDataWithProps(
    properties: ReadWidgetDataArguments
  ): Promise<ReadWidgetDataResult<number> | IPCError> {
    const { table, column, func, where } = properties;
    return this.readWidgetData(table, column, func, where);
  }
}
