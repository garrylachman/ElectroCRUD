import 'reflect-metadata';

import sqlFormatter from '@sqltools/formatter';
import {
  Config as SQLFormatterConfig,
} from '@sqltools/formatter/lib/core/types';
import { TypedKnex } from '@wwwouter/typed-knex';
import getCurrentLine from 'get-current-line';
import * as Knex from 'knex';
import knexHooks from 'knex-hooks';
import { whereFilter } from 'knex-json-filter';
import { SchemaInspector } from 'knex-schema-inspector';
import _, { omit } from 'lodash';
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
  ServerType,
  TableInfoRow,
  TablesListRow,
  UpdateDataArgs as UpdateDataArguments,
} from '../../shared/defenitions';
import { QueryAggregateEnum, ServerTypeEnum } from '../../shared/enums';
import {
  heartBeatQueries,
  primaryKeyQueries,
  tablesListQueries,
} from '../data/queries';
import { NoActiveClientError } from '../exceptions';
import { LogService } from './log.service';

const formatterParameters: SQLFormatterConfig = {
  reservedWordCase: 'upper',
  indent: '    ',
  language: 'sql',
};

@singleton()
@autoInjectable()
export class DatabaseService {
  private config?: Knex.Knex.Config;

  private connection?: Knex.Knex;

  private typedConnection?: TypedKnex;

  private inspector?: SchemaInspector;

  constructor(
    @inject(delay(() => LogService)) private logService?: LogService
  ) {}

  public async connect(
    client: ServerType,
    connection: ConnectionConfig
  ): Promise<boolean | IPCError> {
    await this.disconnect();

    this.config = {
      client,
      connection,
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
      this.typedConnection = new TypedKnex(this.connection);
      this.inspector = SchemaInspector(this.connection);
      this.connectHooks();
      console.log("client", this.connection.client.constructor.name)
      this.logService?.success(`Connection Success`, getCurrentLine().method);
      return await this.heartbeat();
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.NOT_CONNECTED,
        ...error,
      };
    }
  }

  private connectHooks() {
    knexHooks(this.connection);

    this.connection?.addHook(
      '*',
      '*',
      '*',
      (when, method, table, parameters) => {
        this.logService?.info(
          JSON.stringify({
            when,
            method,
            table,
            params: parameters.query.toString(),
          }),
          getCurrentLine().method
        );
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
        ...error,
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
      if (_.isArray(result) && _.size(result) === 2) {
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
      const response = await this.connection.raw(query);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return extractResult(response);
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      const res = await this.connection?.raw(listTablesQuery, bindings);
      if (this.activeClient === ServerTypeEnum.MYSQL) {
        return res[0].map((row: TablesListRow) => row.table_name);
      }
      if (this.activeClient === ServerTypeEnum.POSTGRES) {
        return res.rows.map((row: TablesListRow) => row.table_name);
      }
      return res.map((row: TablesListRow) => row.table_name);
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      console.log(this.inspector);
      const response = await this.inspector?.columnInfo(tableName) as TableInfoRow[];
      if (!response) {
        console.error(response);
        throw new Error('Cannot inspect table');
      }
      return response;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
    filter?: any,
  ): Promise<ReadDataResult<any> | IPCError> {
    try {
      const selectColumns = [...columns].map((col) =>
        col.includes('.') ? `${col}` : `${table}.${col}`
      );

      const q = this.getConnection()
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
        q?.whereWrapped((wq) => {
          searchColumns.forEach((sCol: string) => {
            const columnName = sCol.includes('.') ? sCol : `${table}.${sCol}`;
            wq.orWhere(columnName, 'like', `%${searchText}%`);
          });
          return wq;
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

      console.log(filter);
      if (filter) {
        q?.where((wq) => {
          return wq.where(whereFilter(filter));
        });
        console.log(q?.toQuery());
        this.logService?.success(
          sqlFormatter.format(q?.toQuery() || ''),
          getCurrentLine().method
        );
      }

      q.modify((qb) => {
        if (order && order.column) {
          qb.orderBy(order.column, order.order);
        }
        return qb;
      });

      const countResponse = await q
        ?.clone()
        .clearSelect()
        .count({ count: '*' });

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
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      filter
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
      const q = this.getConnection().table(table);

      q?.where((qw) => {
        if (where)
          for (const col of where) {
            const whereFunction = col.or ? 'orWhere' : 'andWhere';
            qw[whereFunction](col.column, col.opr, col.value);
          }
        return qw;
      });

      q?.update(update);
      await q;

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      const q = this.getConnection().table(table);

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
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      const q = this.getConnection().table(table);

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
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
      const q = this.getConnection().table(table);
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
        type: ErrorType.EXECUTE_ERROR,
        ...error,
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
