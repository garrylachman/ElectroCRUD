import { DatabaseService } from '../services/database.service';
import { ConnectRequest, ErrorType } from '../../shared/defenitions';
import { ResponseFactoryType } from '../helpers';

export const ConnectIPC = async (
  db: DatabaseService,
  request: ConnectRequest
) => {
  try {
    const result = await db.connect(
      request.body?.client,
      request.body.connection
    );
    return ResponseFactoryType(request.channel, result);
  } catch (e) {
    return ResponseFactoryType(request.channel, {
      type: ErrorType.NOT_CONNECTED,
      message: (e as Error).message,
    });
  }
};
