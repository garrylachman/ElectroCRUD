import { DatabaseService } from '../services/database.service';
import { ConnectRequest, ErrorType } from '../../shared/defenitions';
import { ResponseFactoryType } from '../helpers';

export const ConnectIPC = async (
  database: DatabaseService,
  request: ConnectRequest
) => {
  try {
    const result = await database.connect(
      request.body?.client,
      request.body.connection
    );
    return ResponseFactoryType(request.channel, result);
  } catch (error) {
    return ResponseFactoryType(request.channel, {
      type: ErrorType.NOT_CONNECTED,
      message: (error as Error).message,
    });
  }
};
