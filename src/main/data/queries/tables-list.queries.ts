import { ServerType } from '../../../shared/defenitions';
import { ServerTypeEnum } from '../../../shared/enums';

export const tablesListQueries: Record<ServerType, string> = {
  [ServerTypeEnum.ORACEL]: 'SELECT table_name FROM user_tables',
  [ServerTypeEnum.MYSQL]:
    'SELECT table_name as table_name FROM information_schema.tables WHERE table_schema = ?',
  [ServerTypeEnum.POSTGRES]:
    'SELECT concat(table_schema, ".", table_name) as table_name FROM information_schema.tables WHERE table_type = "BASE TABLE" AND table_catalog = ?',
  [ServerTypeEnum.MSSQL]:
    'SELECT table_name FROM information_schema.tables WHERE table_schema = "public" AND table_catalog = ?',
  [ServerTypeEnum.SQLITE]:
    'SELECT name AS table_name FROM sqlite_master WHERE type="table"',
};
