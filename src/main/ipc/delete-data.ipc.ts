import { ResponseFactoryType } from 'main/helpers';
import DatabaseService from '../services/database.service';
import {
  DeleteRequest,
  ResponseType,
  DeleteResponse,
} from '../../shared/defenitions';

export const DeleteDataIPC = async (
  db: DatabaseService,
  request: DeleteRequest
): Promise<ResponseType> => {
  try {
    const { table, where } = request.body;
    const result = await db.deleteData(table, where);
    return ResponseFactoryType<DeleteResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, e as Error);
  }
};
