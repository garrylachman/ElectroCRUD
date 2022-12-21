import {
  ReadDataRequest,
  ReadDataResponse,
  ResponseType,
} from '../../shared/defenitions';
import ResponseFactory from '../helpers';
import { DatabaseService } from '../services/database.service';

export const ReadDataIPC = async (
  db: DatabaseService,
  request: ReadDataRequest
): Promise<ResponseType> => {
  try {
    const {
      table,
      columns,
      limit,
      offset,
      searchColumns,
      searchText,
      where,
      join,
      filter,
    } = request.body;
    const result = await db.readData(
      table,
      columns,
      limit,
      offset,
      searchColumns,
      searchText,
      where,
      join,
      filter
    );
    return ResponseFactory<ReadDataResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
