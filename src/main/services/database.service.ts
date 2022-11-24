import 'reflect-metadata';
import { omit } from 'lodash';
import { singleton, autoInjectable, delay, inject } from 'tsyringe';
import { knex, Knex } from 'knex';
import getCurrentLine from 'get-current-line';
import sqlFormatter from '@sqltools/formatter';
import { Config as SQLFormatterConfig } from '@sqltools/formatter/lib/core/types';
import { NoActiveClientError, NoConnectionError } from '../exceptions';
import {
  heartBeatQueries,
  primaryKeyQueries,
  tablesListQueries,
} from '../data/queries';
import {
  ConnectionConfig,
  QueryAggregate,
  QueryJoin,
  QueryWhere,
  ReadDataResult,
  ReadWidgetDataResult,
  ServerType,
  TableInfoRow,
  TablesListRow,
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
  private connection: Knex | null = null;

  constructor(
    @inject(delay(() => LogService)) private logService?: LogService
  ) {}

  public async connect(
    client: ServerType,
    connection: ConnectionConfig
  ): Promise<boolean | Error> {
    await this.disconnect();

    const config: Knex.Config = {
      client,
      connection,
      useNullAsDefault: true,
    };
    this.logService?.info(
      `Connecting: ${JSON.stringify(
        omit(config.connection as Knex.ConnectionConfigProvider, [
          'password',
          'user',
        ])
      )}`,
      getCurrentLine().method
    );
    try {
      this.connection = knex(config);
      this.logService?.success(`Connection Success`, getCurrentLine().method);
      return await this.heartbeat();
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw error;
    }
  }

  public async disconnect() {
    if (this.connection) {
      await this.connection.destroy();
    }
  }

  public get getConnection(): Knex | NoConnectionError {
    if (!this.connection) {
      throw new NoConnectionError();
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

  public async heartbeat(): Promise<boolean | Error> {
    const heartbeatQuery = heartBeatQueries[this.activeClient];

    try {
      await this.connection?.raw(heartbeatQuery);
      return true;
    } catch (error: any) {
      this.logService?.error(error.message, getCurrentLine().method);
      throw error;
    }
    return false;
  }

  public async executeQuery(query: string): Promise<any | Error> {
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
      throw error;
    }
  }

  public async listTables(): Promise<string[] | Error> {
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
      throw error;
    }
  }

  public async tableInfo(tableName: string): Promise<TableInfoRow[] | Error> {
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
      throw error;
    }
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
  ): Promise<ReadDataResult<any> | Error> {
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
      throw error;
    }
  }

  public async updateData(
    table: string,
    update: Record<string, any>,
    where?: QueryWhere[]
  ): Promise<boolean | Error> {
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
      throw error;
    }
  }

  public async insertData(
    table: string,
    data: Record<string, any> | Record<string, any>[]
  ): Promise<boolean | Error> {
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
      throw error;
    }
  }

  public async deleteData(
    table: string,
    where?: QueryWhere[]
  ): Promise<boolean | Error> {
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
      throw error;
    }
  }

  public async readWidgetData(
    table: string,
    column: string,
    func: QueryAggregate,
    where?: QueryWhere[]
  ): Promise<ReadWidgetDataResult<number> | Error> {
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
      throw error;
    }
  }
}
