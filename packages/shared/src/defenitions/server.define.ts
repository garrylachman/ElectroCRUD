import { O } from 'ts-toolbelt';
import { QueryAggregateEnum, ServerTypeEnum } from '../enums';

export type ServerType =
  | ServerTypeEnum.MYSQL2
  | ServerTypeEnum.MYSQL
  | ServerTypeEnum.MSSQL
  | ServerTypeEnum.ORACEL
  | ServerTypeEnum.POSTGRES
  | ServerTypeEnum.SQLITE;

export type TablesListRow = Record<string, any> & {
  table_name: string;
};

export type TableInfoRow = {
  name: string;
  table: string;
  data_type: string;
  default_value?: string;
  max_length?: number;
  numeric_precision?: number;
  numeric_scale?: number;
  is_nullable: boolean;
  is_unique: boolean;
  is_primary_key: boolean;
  is_generated: boolean;
  generation_expression?: string;
  has_auto_increment: boolean;
  foreign_key_table?: string;
  foreign_key_column?: string;
  comment?: string;
  schema?: string;
  foreign_key_schema?: string;
};

export type QueryOrder = {
  column: string | number;
  order: 'asc' | 'desc';
};

export type QueryJoin = {
  table: string;
  on: {
    local: string;
    target: string;
    opr: string;
  };
};

export type QueryWhere = {
  column: string;
  opr: string;
  value: string | number;
  or: boolean;
};

export type ReadDataResult<T> = {
  data: T[];
  count: number;
};

export type ReadWidgetDataResult<T> = {
  data: T[] | T;
};

export type QueryAggregate =
  | QueryAggregateEnum.AVG
  | QueryAggregateEnum.AVG_DISTINCT
  | QueryAggregateEnum.COUNT
  | QueryAggregateEnum.COUNT_DISTINCT
  | QueryAggregateEnum.MAX
  | QueryAggregateEnum.MIN
  | QueryAggregateEnum.MIN
  | QueryAggregateEnum.SUM
  | QueryAggregateEnum.SUM_DISTINCT;

export type SSHTunnelConfig = {
  enabled: boolean;
  host: string;
  port: number;
  username: string;
  password?: string;
};

export type ServerConnectionConfig = O.Either<
  {
    host: string;
    server: string;
    port: number;
    user: string;
    password?: string;
    database: string;
    schema?: string;
  },
  'host' | 'server'
>;

export type FileConnectionConfig = {
  filename: string;
};

export type ConnectionConfig = ServerConnectionConfig | FileConnectionConfig;

export type ReadDataArguments = {
  table: string;
  columns: string[];
  rows: number;
  page: number;
  searchColumns?: string[];
  searchText?: string;
  where?: QueryWhere[];
  join?: QueryJoin[];
  order?: QueryOrder;
  filter?: any;
};

export type UpdateDataArguments = {
  table: string;
  update: Record<string, any>;
  where?: QueryWhere[];
};

export type DeleteDataArguments = {
  table: string;
  where?: QueryWhere[];
};

export type InsertDataArguments = {
  table: string;
  data: Record<string, any> | Record<string, any>[];
};

export type ReadWidgetDataArguments = {
  table: string;
  column: string;
  func: QueryAggregate;
  where?: QueryWhere[];
};

export type ConnectArguments = {
  client: ServerTypeEnum;
  connection: ConnectionConfig;
  tunnel?: SSHTunnelConfig;
};

export type TunnelArguments = {
  host: string;
  port: number;
  username: string;
  password?: string;
  destinationHostname: string;
  destinationPort: number;
};

export type ArgumentsType =
  | ConnectArguments
  | ReadWidgetDataArguments
  | DeleteDataArguments
  | InsertDataArguments
  | UpdateDataArguments
  | ReadDataArguments
  | TunnelArguments;
