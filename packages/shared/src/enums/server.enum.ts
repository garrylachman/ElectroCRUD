export enum ServerTypeEnum {
  MYSQL = 'mysql',
  MYSQL2 = 'mysql2',
  POSTGRES = 'pg',
  SQLITE = 'sqlite3',
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

export enum QueryWhereOprEnum {
  EQ = '=',
  NOT_EQ = '!=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  IN = 'in',
  NOT_IN = 'not in',
  LIKE = 'like',
}
