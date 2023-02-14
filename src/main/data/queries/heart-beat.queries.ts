import { ServerType, ServerTypeEnum } from '@electrocrud/shared';

export const heartBeatQueries: Record<ServerType, string> = {
  [ServerTypeEnum.ORACEL]: 'select 1 from DUAL',
  [ServerTypeEnum.MYSQL]: 'SELECT 1',
  [ServerTypeEnum.MYSQL2]: 'SELECT 1',
  [ServerTypeEnum.POSTGRES]: 'SELECT 1',
  [ServerTypeEnum.MSSQL]: 'SELECT 1',
  [ServerTypeEnum.SQLITE]: 'SELECT 1',
};
