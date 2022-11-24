import { QueryAggregateEnum, ServerTypeEnum } from '../enums';

export type ServerType =
  | ServerTypeEnum.MYSQL
  | ServerTypeEnum.MSSQL
  | ServerTypeEnum.ORACEL
  | ServerTypeEnum.POSTGRES
  | ServerTypeEnum.SQLITE;

export type TablesListRow = Record<string, any> & {
  table_name: string;
};

export type TableInfoRow = Record<string, any> & {
  col_id?: number | string;
  name: string;
  type: string;
  length: number;
  key?: string;
  default?: number | string;
  nullable?: boolean;
  extra?: string;
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

export type ServerConnectionConfig = {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
};

export type FileConnectionConfig = {
  filename: string;
};

export type ConnectionConfig = ServerConnectionConfig | FileConnectionConfig;

export type ReadDataArgs = {
  table: string;
  columns: string[];
  limit: number;
  offset: number;
  searchColumns?: string[];
  searchText?: string;
  where?: QueryWhere[];
  join?: QueryJoin[];
};

export type UpdateDataArgs = {
  table: string;
  update: Record<string, any>;
  where?: QueryWhere[];
};

export type InsertDataArgs = {
  table: string;
  data: Record<string, any> | Record<string, any>[];
};

export type DeleteDataArgs = {
  table: string;
  where?: QueryWhere[];
};

export type ReadWidgetDataArgs = {
  table: string;
  column: string;
  func: QueryAggregate;
  where?: QueryWhere[];
};

export type ConnectArgs = {
  client: ServerType;
  connection: ConnectionConfig;
};
