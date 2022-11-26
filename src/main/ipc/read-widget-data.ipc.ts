import ResponseFactory from '../helpers';
import { DatabaseService } from '../services/database.service';
import {
  ReadWidgetDataRequest,
  ResponseType,
  ReadWidgetDataResponse,
} from '../../shared/defenitions';

export const ReadWidgetDataIPC = async (
  db: DatabaseService,
  request: ReadWidgetDataRequest
): Promise<ResponseType> => {
  try {
    const { table, column, func, where } = request.body;
    const result = await db.readWidgetData(table, column, func, where);
    return ResponseFactory<ReadWidgetDataResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
