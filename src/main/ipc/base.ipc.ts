import {
  ErrorResponse,
  ErrorType,
  IPCError,
  RequestType,
  ResponseTypeSuccess,
} from '@electrocrud/shared';
import { Inject, Service } from 'typedi';
import { IDatabaseService } from '../services/interfaces/idatabase.service';
import { ResponseFactoryType } from '../helpers';

type Function1 = (...arguments_: unknown[]) => unknown;

type Primitive =
  | string
  | number
  | boolean
  | symbol
  | undefined
  | null
  | void
  | Function1;

export type PickMatching<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
export type ExtractMethods<T> = PickMatching<
  T,
  (...arguments_: any[]) => unknown
>;
export type DatabaseServiceMethods = Extract<
  keyof ExtractMethods<IDatabaseService>,
  `${string}WithProps`
>;

export type DeepOmitArray<T extends unknown[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP
          : TP extends any[]
          ? DeepOmitArray<TP, K>
          : DeepOmit<TP, K>
        : never;
    };

export interface IRequestFactory {
  createRequest<T extends RequestType>(
    request: T,
    invoke: DatabaseServiceMethods
  ): Promise<ResponseTypeSuccess | ErrorResponse>;
}

@Service({ global: true, id: 'request.factory' })
class RequestFactory implements IRequestFactory {
  @Inject('service.database')
  private databaseService: IDatabaseService;

  public async createRequest<T extends RequestType>(
    request: T,
    invoke: DatabaseServiceMethods
  ): Promise<ResponseTypeSuccess | ErrorResponse> {
    console.log(request)
    const { channel, body } = request;
    try {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      // @ts-ignore
      const result = await this.databaseService[invoke](body);
      return ResponseFactoryType(channel, result);
    } catch (error) {
      return ResponseFactoryType(channel, {
        type: (error as IPCError).type || ErrorType.GENERIC,
        message: (error as IPCError).message,
      });
    }
  }
}

export default RequestFactory;
