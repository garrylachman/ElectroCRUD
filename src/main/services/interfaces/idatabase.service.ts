import { Knex } from 'knex';
import {
  ConnectArguments,
  DeleteDataArguments,
  InsertDataArguments,
  ReadDataArguments,
  UpdateDataArguments,
  ReadWidgetDataArguments,
  ConnectionConfig,
  IPCError,
  QueryAggregate,
  QueryJoin,
  QueryOrder,
  QueryWhere,
  ReadDataResult,
  ReadWidgetDataResult,
  ServerType,
  TableInfoRow,
  SSHTunnelConfig,
} from '@electrocrud/shared';

export interface IDatabaseService {
  connect(
    client: ServerType,
    connection: ConnectionConfig,
    tunnel?: SSHTunnelConfig
  ): Promise<boolean | IPCError>;
  connectWithProps(properties: ConnectArguments): Promise<boolean | IPCError>;
  disconnect(): Promise<void>;
  getConnection(): Knex;
  get activeClient(): ServerType;
  heartbeat(): Promise<boolean | IPCError>;
  heartbeatWithProps(): Promise<boolean | IPCError>;
  executeQuery(query: string): Promise<any | IPCError>;
  listTables(): Promise<string[] | IPCError>;
  listTablesWithProps(): Promise<string[] | IPCError>;
  tableInfoWithProps(properties: string): Promise<TableInfoRow[] | IPCError>;
  readData(
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
  ): Promise<ReadDataResult<any> | IPCError>;
  readDataWithProps(
    properties: ReadDataArguments
  ): Promise<ReadDataResult<any> | IPCError>;
  updateData(
    table: string,
    update: Record<string, any>,
    where?: QueryWhere[]
  ): Promise<boolean | IPCError>;
  updateDataWithProps(
    properties: UpdateDataArguments
  ): Promise<boolean | IPCError>;
  insertData(
    table: string,
    data: Record<string, any> | Record<string, any>[]
  ): Promise<boolean | IPCError>;
  insertDataWithProps(
    properties: InsertDataArguments
  ): Promise<boolean | IPCError>;
  deleteData(table: string, where?: QueryWhere[]): Promise<boolean | IPCError>;
  deleteDataWithProps(
    properties: DeleteDataArguments
  ): Promise<boolean | IPCError>;
  readWidgetData(
    table: string,
    column: string,
    function_: QueryAggregate,
    where?: QueryWhere[]
  ): Promise<ReadWidgetDataResult<number> | IPCError>;
  readWidgetDataWithProps(
    properties: ReadWidgetDataArguments
  ): Promise<ReadWidgetDataResult<number> | IPCError>;
}
