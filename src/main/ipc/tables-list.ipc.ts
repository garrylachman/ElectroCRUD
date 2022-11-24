import { ResponseFactory } from '../helpers';
import { DatabaseService } from '../services/database.service';
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
    return ResponseFactory<TablesListResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
