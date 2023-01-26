import { ResponseFactoryType } from 'main/helpers';
import DatabaseService from '../services/database.service';
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
    return ResponseFactoryType<InsertResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, e as Error);
  }
};
