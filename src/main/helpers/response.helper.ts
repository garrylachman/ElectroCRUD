import {
  IPCChannel,
  ErrorResponse,
  IPCError,
  ResponseTypeSuccess,
} from '@electrocrud/shared';

export type SuccessOrError<T extends ResponseTypeSuccess['body'] | IPCError> =
  T extends ResponseTypeSuccess['body'] ? ResponseTypeSuccess : ErrorResponse;

export function ResponseFactoryType<
  T extends ResponseTypeSuccess['body'] | IPCError
>(channel: IPCChannel, body: T): SuccessOrError<T> {
  if ((body as IPCError).message) {
    return { channel, error: body } as SuccessOrError<T>;
  }
  return { channel, body } as SuccessOrError<T>;
}
