import {
  IPCChannel,
  ErrorResponse,
  IPCError,
  ResponseTypeSuccess,
} from '../../shared/defenitions';

export type SuccessOrError<T extends ResponseTypeSuccess['body'] | IPCError> =
  T extends ResponseTypeSuccess['body'] ? ResponseTypeSuccess : ErrorResponse;

export function ResponseFactoryType<
  T extends ResponseTypeSuccess['body'] | IPCError
>(channel: IPCChannel, body: T): SuccessOrError<T> {
  if (body.message) {
    return { channel, error: { ...body } } as ErrorResponse;
  }
  return { channel, body } as SuccessOrError<T>;
}
