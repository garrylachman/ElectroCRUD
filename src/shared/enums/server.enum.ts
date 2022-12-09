export enum ServerTypeEnum {
  MYSQL = 'mysql',
  MYSQL2 = 'mysql2',
  POSTGRES = 'pg',
  SQLITE = 'sqlite3',
  BETTER_SQLITE = 'better-sqlite3',
  MSSQL = 'mssql',
  ORACEL = 'oracledb',
}

export enum QueryAggregateEnum {
  SUM_DISTINCT = 'sumDistinct',
  SUM = 'sum',
  AVG = 'avg',
  AVG_DISTINCT = 'avgDistinct',
  MIN = 'min',
  MAX = 'max',
  COUNT_DISTINCT = 'countDistinct',
  COUNT = 'count',
}
