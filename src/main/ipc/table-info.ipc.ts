import { ResponseFactory } from '../helpers';
import { DatabaseService } from '../services/database.service';
import {
  TableInfoRequest,
  ResponseType,
  TableInfoResponse,
} from '../../shared/defenitions';

export const TableInfoIPC = async (
  db: DatabaseService,
  request: TableInfoRequest
): Promise<ResponseType> => {
  try {
    const result = await db.tableInfo(request.body);
    return ResponseFactory<TableInfoResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
