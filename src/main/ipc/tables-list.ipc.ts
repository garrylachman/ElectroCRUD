import { ResponseFactoryType } from 'main/helpers';
import DatabaseService from '../services/database.service';
import {
  TablesListRequest,
  ResponseType,
  TablesListResponse,
} from '../../shared/defenitions';

export const TablesListIPC = async (
  db: DatabaseService,
  request: TablesListRequest
): Promise<ResponseType> => {
  try {
    const result = await db.listTables();
    return ResponseFactoryType<TablesListResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, e as Error);
  }
};
