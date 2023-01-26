import { ResponseFactoryType } from 'main/helpers';
import DatabaseService from '../services/database.service';
import {
  UpdateRequest,
  ResponseType,
  UpdateResponse,
} from '../../shared/defenitions';

export const UpdateDataIPC = async (
  db: DatabaseService,
  request: UpdateRequest
): Promise<ResponseType> => {
  try {
    const { table, where, update } = request.body;
    const result = await db.updateData(table, update, where);
    return ResponseFactoryType<UpdateResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, e as Error);
  }
};
