import { ResponseFactory } from '../helpers';
import { DatabaseService } from '../services/database.service';
import {
  InsertRequest,
  ResponseType,
  InsertResponse,
} from '../../shared/defenitions';

export const InsertDataIPC = async (
  db: DatabaseService,
  request: InsertRequest
): Promise<ResponseType> => {
  try {
    const { table, data } = request.body;
    const result = await db.insertData(table, data);
    return ResponseFactory<InsertResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
