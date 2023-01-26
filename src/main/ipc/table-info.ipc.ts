import { ResponseFactoryType } from 'main/helpers';
import DatabaseService from '../services/database.service';
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
    return ResponseFactoryType<TableInfoResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, e as Error);
  }
};
