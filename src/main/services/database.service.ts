import 'reflect-metadata';
import { omit } from 'lodash';
import { singleton, autoInjectable, delay, inject } from 'tsyringe';
import * as Knex from 'knex';
import { TypedKnex } from '@wwwouter/typed-knex';
import getCurrentLine from 'get-current-line';
import sqlFormatter from '@sqltools/formatter';
import { Config as SQLFormatterConfig } from '@sqltools/formatter/lib/core/types';
import { NoActiveClientError } from '../exceptions';
import {
  heartBeatQueries,
  primaryKeyQueries,
  tablesListQueries,
} from '../data/queries';
import {
  ConnectArgs,
  ConnectionConfig,
  DeleteDataArgs,
  ErrorType,
  InsertDataArgs,
  IPCError,
  QueryAggregate,
  QueryJoin,
  QueryWhere,
  ReadDataArgs,
  ReadDataResult,
  ReadWidgetDataArgs,
  ReadWidgetDataResult,
  ServerType,
  TableInfoRow,
  TablesListRow,
  UpdateDataArgs,
} from '../../shared/defenitions';
import { QueryAggregateEnum, ServerTypeEnum } from '../../shared/enums';
import { LogService } from './log.service';

const formatterParams: SQLFormatterConfig = {
  reservedWordCase: 'upper',
  indent: '    ',
  language: 'sql',
};

@singleton()
@autoInjectable()
export class DatabaseService {
  private connection?: Knex.Knex;

  private typedConnection?: TypedKnex;

  constructor(
    @inject(delay(() => LogService)) private logService?: LogService
  ) {}

  public async connect(
    client: ServerType,
    connection: ConnectionConfig
  ): Promise<boolean | IPCError> {
    await this.disconnect();

    const config: Knex.Knex.Config = {
      client,
      connection,
      useNullAsDefault: true,
    };
    this.logService?.info(
      `Connecting: ${JSON.stringify(
        omit(config.connection as Knex.Knex.ConnectionConfigProvider, [
          'password',
          'user',
        ])
      )}`,
      getCurrentLine().method
    );
    try {
      this.connection = Knex.knex(config);
      this.typedConnection = new TypedKnex(this.connection);
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

  public async connectWithProps(
    props: ConnectArgs
  ): Promise<boolean | IPCError> {
    const { client, connection } = props;
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
      if (!this.connection?.client?.config?.client) {
        throw new NoActiveClientError();
      }
      return this.connection?.client.config.client;
    } catch (error) {
      throw new NoActiveClientError();
    }
  }

  public async heartbeat(): Promise<boolean | IPCError> {
    const heartbeatQuery = heartBeatQueries[this.activeClient];

    try {
      await this.connection?.raw(heartbeatQuery);
      return true;
    } catch (error: any) {
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
    const findResult = ((result: any) => result[0]) as (
      result: any
    ) => string | undefined;
    const findResultPG = ((result: any) => result.rows) as (
      result: any
    ) => string | undefined;
    const findResultSQLite = ((result: any) => result) as (
      result: any
    ) => string | undefined;

    this.logService?.info(
      sqlFormatter.format(query, formatterParams),
      getCurrentLine().method
    );

    try {
      this.logService?.success(
        sqlFormatter.format(query, formatterParams),
        getCurrentLine().method
      );
      const res = await this.connection?.raw(query);
      if (this.activeClient === ServerTypeEnum.POSTGRES) {
        return findResultPG(res);
      }
      if (this.activeClient === ServerTypeEnum.SQLITE) {
        return findResultSQLite(res);
      }
      return findResult(res);
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
      sqlFormatter.format(listTablesQuery, formatterParams),
      getCurrentLine().method
    );
    try {
      this.logService?.success(
        sqlFormatter.format(listTablesQuery, formatterParams),
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
    const tableInfoQuery = primaryKeyQueries[this.activeClient];
    let bindings: string[] = [tableName];
    if (this.activeClient === ServerTypeEnum.MYSQL) {
      bindings = [this.connection?.client.database(), tableName];
    }
    if (this.activeClient === ServerTypeEnum.POSTGRES) {
      bindings = [
        this.connection?.client.database(),
        tableName,
        tableName,
        tableName,
      ];
    }
    const findResult = (result: any) => result[0] as TableInfoRow[];
    const findResultPG = (result: any) => result.rows as TableInfoRow[];

    this.logService?.info(
      sqlFormatter.format(tableInfoQuery, formatterParams),
      getCurrentLine().method
    );

    try {
      this.logService?.info(
        sqlFormatter.format(tableInfoQuery, formatterParams),
        getCurrentLine().method
      );
      const res = await this.connection?.raw(tableInfoQuery, bindings);
      if (this.activeClient === ServerTypeEnum.SQLITE) {
        return res.map((row: TableInfoRow) => ({
          ...row,
          key: String(row.key) === '1' ? 'PRI' : undefined,
          nullable: Boolean(row.nullable),
        }));
      }
      if (this.activeClient === ServerTypeEnum.POSTGRES) {
        return findResultPG(res);
      }
      return findResult(res);
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw {
        type: ErrorType.EXECUTE_ERROR,
        ...error,
      };
    }
  }

  public async tableInfoWithProps(
    props: string
  ): Promise<TableInfoRow[] | IPCError> {
    return this.tableInfo(props);
  }

  public async readData(
    table: string,
    columns: string[],
    limit: number,
    offset: number,
    searchColumns?: string[],
    searchText?: string,
    where?: QueryWhere[],
    join?: QueryJoin[]
  ): Promise<ReadDataResult<any> | IPCError> {
    try {
      const selectColumns = [...columns].map((col) =>
        !col.includes('.') ? `${table}.${col}` : `${col}`
      );

      const q = this.connection?.select(...selectColumns).from(table);
      if (join) {
        join.forEach((j) => {
          q?.leftJoin(
            j.table,
            `${table}.${j.on.local}`,
            j.on.opr,
            `${j.table}.${j.on.target}`
          );
        });
      }

      if (searchColumns && searchText) {
        q?.whereWrapped((wq) => {
          searchColumns.forEach((sCol: string) => {
            const columnName = !sCol.includes('.') ? `${table}.${sCol}` : sCol;
            wq.orWhere(columnName, 'like', `%${searchText}%`);
          });
          return wq;
        });
      }
      if (where) {
        q?.where((wq) => {
          where.forEach((col) => {
            const columnName = !col.column.includes('.')
              ? `${table}.${col.column}`
              : col.column;

            const whereFunc = col.or ? 'orWhere' : 'andWhere';
            wq[whereFunc](col.column, col.opr, col.value);
          });
          return wq;
        });
      }
      const countRes = await q?.clone().clearSelect().count({ count: '*' });

      const res = await q?.limit(limit).offset(offset);

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParams),
        getCurrentLine().method
      );

      return {
        data: res || [],
        count: countRes ? Number(countRes[0].count) : 0,
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
    props: ReadDataArgs
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
    } = props;
    return this.readData(
      table,
      columns,
      limit,
      offset,
      searchColumns,
      searchText,
      where,
      join
    );
  }

  public async updateData(
    table: string,
    update: Record<string, any>,
    where?: QueryWhere[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.connection?.table(table);

      q?.where((qw) => {
        where?.forEach((col) => {
          const whereFunc = col.or ? 'orWhere' : 'andWhere';
          qw[whereFunc](col.column, col.opr, col.value);
        });
        return qw;
      });

      q?.update(update);
      await q;

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParams),
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
    props: UpdateDataArgs
  ): Promise<boolean | IPCError> {
    const { table, update, where } = props;
    return this.updateData(table, update, where);
  }

  public async insertData(
    table: string,
    data: Record<string, any> | Record<string, any>[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.connection?.table(table);

      q?.insert(data);
      await q;

      this.logService?.info(
        sqlFormatter.format(q?.toQuery() || '', formatterParams),
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
    props: InsertDataArgs
  ): Promise<boolean | IPCError> {
    const { table, data } = props;
    return this.insertData(table, data);
  }

  public async deleteData(
    table: string,
    where?: QueryWhere[]
  ): Promise<boolean | IPCError> {
    try {
      const q = this.connection?.table(table);

      q?.where((qw) => {
        where?.forEach((col) => {
          const whereFunc = col.or ? 'orWhere' : 'andWhere';
          qw[whereFunc](col.column, col.opr, col.value);
        });
        return qw;
      });

      await q?.delete();
      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParams),
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
    props: DeleteDataArgs
  ): Promise<boolean | IPCError> {
    const { table, where } = props;
    return this.deleteData(table, where);
  }

  public async readWidgetData(
    table: string,
    column: string,
    func: QueryAggregate,
    where?: QueryWhere[]
  ): Promise<ReadWidgetDataResult<number> | IPCError> {
    try {
      const q = this.connection?.table(table);
      if (q) {
        if (
          func === QueryAggregateEnum.COUNT ||
          func === QueryAggregateEnum.COUNT_DISTINCT
        ) {
          q[func]({
            a: column,
          });
        } else {
          q[func]({
            a: column,
          });
        }
      }

      q?.where((qw) => {
        where?.forEach((col) => {
          const whereFunc = col.or ? 'orWhere' : 'andWhere';
          qw[whereFunc](col.column, col.opr, col.value);
        });
        return qw;
      });

      const res = await q;

      this.logService?.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParams),
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
    props: ReadWidgetDataArgs
  ): Promise<ReadWidgetDataResult<number> | IPCError> {
    const { table, column, func, where } = props;
    return this.readWidgetData(table, column, func, where);
  }
}
