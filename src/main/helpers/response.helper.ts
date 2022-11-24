import {
  IPCChannel,
  ResponseType,
  ErrorResponse,
} from '../../shared/defenitions';

export const ResponseFactory = <T extends ResponseType>(
  channel: IPCChannel,
  body: Error | any
): ResponseType => {
  if (body instanceof Error) {
    return { channel, error: body } as ErrorResponse;
  }

  return { channel, body } as T;
};
