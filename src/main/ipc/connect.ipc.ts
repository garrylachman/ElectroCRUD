import { DatabaseService } from '../services/database.service';
import {
  ConnectRequest,
  ResponseType,
  ConnectResponse,
} from '../../shared/defenitions';
import { ResponseFactory } from '../helpers';

export const ConnectIPC = async (
  db: DatabaseService,
  request: ConnectRequest
): Promise<ResponseType> => {
  try {
    const result = await db.connect(
      request.body?.client,
      request.body.connection
    );
    return ResponseFactory<ConnectResponse>(request.channel, result);
  } catch (e) {
    return ResponseFactory(request.channel, e as Error);
  }
};
