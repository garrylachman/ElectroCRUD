import 'reflect-metadata';
import 'sqlite3';
import sqlFormatter from '@sqltools/formatter';
import { Config as SQLFormatterConfig } from '@sqltools/formatter/lib/core/types';
import getCurrentLine from 'get-current-line';
import { Knex } from 'knex';
import { whereFilter } from 'knex-json-filter';
import SchemaInspector from 'knex-schema-inspector';
import { SchemaInspector as ISchemaInspector } from 'knex-schema-inspector/lib/types/schema-inspector';
import _ from 'lodash';
import { Overwrite } from 'ts-toolbelt/out/Object/Overwrite';
import { Inject, Service } from 'typedi';
import {
  ConnectArguments,
  ConnectionConfig,
  DeleteDataArguments,
  ErrorType,
  InsertDataArguments,
  IPCError,
  QueryAggregate,
  QueryJoin,
  QueryOrder,
  QueryWhere,
  ReadDataArguments,
  ReadDataResult,
  ReadWidgetDataArguments,
  ReadWidgetDataResult,
  ServerConnectionConfig,
  ServerType,
  SSHTunnelConfig,
  TableInfoRow,
  UpdateDataArguments,
  QueryAggregateEnum,
  ServerTypeEnum,
} from '@electrocrud/shared';
import { heartBeatQueries } from '../data/queries';
import { NoActiveClientError, NoConnectionError } from '../exceptions';
import { configurationNegotiation, connect } from '../helpers/database';
import { IDatabaseService } from './interfaces/idatabase.service';
import { ILogService } from './interfaces/ilog.service';
import {
  ITunnelService,
  TunnelProxyConfig,
} from './interfaces/itunnel.service';

const formatterParameters: SQLFormatterConfig = {
  reservedWordCase: 'upper',
  indent: '    ',
  language: 'sql',
};

type KnexConfigType = Overwrite<
  Knex.Config,
  {
    connection: ConnectionConfig;
  }
>;

@Service({ global: true, id: 'service.database' })
class DatabaseService implements IDatabaseService {
  private config?: KnexConfigType;

  private connection?: Knex;

  private inspector?: ISchemaInspector;

  @Inject('service.log')
  private logService: ILogService;

  @Inject('service.tunnel')
  private tunnelService: ITunnelService;

  public async connect(
    client: ServerTypeEnum,
    connection: ConnectionConfig,
    tunnel?: SSHTunnelConfig
  ): Promise<boolean | IPCError> {
    await this.disconnect();

    let connectionOverride = {};

    try {
      if (tunnel && tunnel.enabled) {
        this.tunnelService.init(
          tunnel.host,
          tunnel.port,
          tunnel.username,
          tunnel.password
        );

        const tunnelLink: TunnelProxyConfig | undefined =
          await this.tunnelService.start(
            (connection as ServerConnectionConfig).host as string,
            (connection as ServerConnectionConfig).port
          );

        if (tunnelLink && tunnelLink.localPort) {
          this.logService.success(
            `SSH Tunnel: ${JSON.stringify(tunnelLink)}`,
            getCurrentLine().method
          );
          connectionOverride = {
            port: tunnelLink.localPort,
            host: tunnel.host,
          };
        }
      }

      this.config = {
        client,
        connection: configurationNegotiation(client, {
          ...connection,
          ...connectionOverride,
        }),
        useNullAsDefault: true,
      };
      this.logService.info(
        `Connecting (${this.config.client}): ${JSON.stringify(
          _.omit(this.config.connection, ['password', 'user'])
        )}`,
        getCurrentLine().method
      );

      this.connection = connect(this.config, {
        warn(message) {
          this.logService.warning(message);
        },
        error(message) {
          this.logService.error(message);
        },
        debug(message) {
          this.logService.debug(message);
        },
      });
      this.inspector = SchemaInspector(this.connection);
      if (
        this.inspector &&
        (this.config.connection as ServerConnectionConfig).schema
      ) {
        // @ts-ignore
        this.inspector.withSchema(
          // @ts-ignore
          (this.config.connection as ServerConnectionConfig).schema
        );
      }
      const result = await this.heartbeat();
      this.logService.success(`Connection Success`, getCurrentLine().method);
      return result;
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      this.logService.error(JSON.stringify(error));
      // eslint-disable-next-line no-throw-literal
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }
  }

  public async connectWithProps(
    properties: ConnectArguments
  ): Promise<boolean | IPCError> {
    const { client, connection, tunnel } = properties;
    return this.connect(client, connection, tunnel);
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy();
    }
  }

  public getConnection(): Knex {
    if (!this.connection) {
      throw new NoConnectionError();
    }
    return this.connection;
  }

  public get activeClient(): ServerType {
    try {
      if (!this.config?.client) {
        throw new NoActiveClientError();
      }
      return this.config.client as ServerType;
    } catch {
      throw new NoActiveClientError();
    }
  }

  public async heartbeat(): Promise<boolean | IPCError> {
    const heartbeatQuery = heartBeatQueries[this.activeClient];

    try {
      await this.connection?.raw(heartbeatQuery);
      return true;
    } catch (error: any) {
      this.logService.error(error?.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
    this.logService.info(
      sqlFormatter.format(query, formatterParameters),
      getCurrentLine().method
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await this.getConnection()
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .where(this.getConnection().raw(query));
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
      throw {
        type: ErrorType.NOT_CONNECTED,
        message: JSON.stringify(error),
      };
    }

    return undefined;
  }

  public async listTables(): Promise<string[] | IPCError> {
    this.logService.info('listTables', getCurrentLine().method);
    try {
      this.logService.success('listTables', getCurrentLine().method);
      // @ts-ignore
      return await this.inspector?.tables();
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
    rows: number,
    page: number,
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

      const dictionary = _.reduce(
        columns,
        (result: Record<string, string>, value: string) => ({
          ...result,
          [value]: `${table}.${value}`,
          [`${table}.${value}`]: `${table}.${value}`,
        }),
        {}
      );

      const q = this.getConnection()
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .select(...selectColumns)
        .from(table)
        .modify((builder) => {
          if (searchText) {
            // @ts-ignore
            builder.metaFilter({
              filterBy: searchColumns,
              q: searchText,
              dictionary,
            });
          }
          if (order && order.column) {
            // @ts-ignore
            builder.metaSort({
              sort: order.order || 'asc',
              sortBy: order.column,
              dictionary: { ...dictionary, 1: 1 },
            });
          }
        });

      /* if (join) {
        for (const index of join) {
          q?.leftJoin(
            index.table,
            `${table}.${index.on.local}`,
            index.on.opr,
            `${index.table}.${index.on.target}`
          );
        }
      } */
      if (where) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q?.where((builder) => {
          _.each(where, (col) => {
            const whereFunction = col.or ? builder.orWhere : builder.andWhere;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            whereFunction(
              this.getConnection().ref(col.column),
              col.opr,
              col.value
            );
          });
        });
      }

      if (filter) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q?.where((builder) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          builder.where(whereFilter(filter));
        });
      }

      const countResponse = await q
        ?.clone()
        .clearSelect()
        .clearOrder()
        .count({ count: '*' });

      // @ts-ignore
      const response = await q.metaPage({ page, rows });

      this.logService.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );

      return {
        data: response || [],
        count: countResponse ? Number(countResponse[0].count) : 0,
      };
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
      rows,
      page,
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
      rows,
      page,
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
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .table(table);

      if (where) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q?.where((builder) => {
          _.each(where, (col) => {
            const whereFunction = col.or ? builder.orWhere : builder.andWhere;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            whereFunction(
              this.getConnection().ref(col.column),
              col.opr,
              col.value
            );
          });
        });
      }

      await q?.update(_.mapKeys(update, (_, key) => `${table}.${key}`));

      this.logService.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
      const q = this.getConnection()
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .table(table);

      await q?.insert(data);

      this.logService.info(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
      const q = this.getConnection()
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .table(table);

      if (where) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q?.where((builder) => {
          _.each(where, (col) => {
            const whereFunction = col.or ? builder.orWhere : builder.andWhere;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            whereFunction(
              this.getConnection().ref(col.column),
              col.opr,
              col.value
            );
          });
        });
      }

      await q?.delete();
      this.logService.success(
        sqlFormatter.format(q?.toQuery() || '', formatterParameters),
        getCurrentLine().method
      );
      return true;
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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
    agg: QueryAggregate,
    where?: QueryWhere[]
  ): Promise<ReadWidgetDataResult<any> | IPCError> {
    try {
      const q = this.getConnection()
        // @ts-ignore
        .withSchema((this.config?.connection as ServerConnectionConfig).schema)
        .table(table);

      if (
        agg === QueryAggregateEnum.COUNT ||
        agg === QueryAggregateEnum.COUNT_DISTINCT
      ) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q.modify((builder) => {
          const aggFunction = builder[agg];
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          aggFunction({ a: column });
        });
      }

      if (where) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        q?.where((builder) => {
          _.each(where, (col) => {
            const whereFunction = col.or ? builder.orWhere : builder.andWhere;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            whereFunction(
              this.getConnection().ref(col.column),
              col.opr,
              col.value
            );
          });
        });
      }

      // @ts-ignore
      return await q;
    } catch (error: any) {
      this.logService.error(error.message, getCurrentLine().method);
      // eslint-disable-next-line no-throw-literal
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

export default DatabaseService;
