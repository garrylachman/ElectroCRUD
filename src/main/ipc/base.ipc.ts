import { injectable, delay, inject, singleton } from 'tsyringe';
import { DatabaseService } from '../services/database.service';
import {
  ErrorResponse,
  IPCError,
  RequestType,
  ResponseTypeSuccess,
} from '../../shared/defenitions';
import { ResponseFactoryType } from '../helpers';

type Func = (...args: any[]) => unknown;

type Primitive =
  | string
  | number
  | boolean
  | symbol
  | undefined
  | null
  | void
  | Func;

export type PickMatching<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
export type ExtractMethods<T> = PickMatching<T, (...args: any[]) => unknown>;
export type DatabaseServiceMethods = Extract<
  keyof ExtractMethods<DatabaseService>,
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

@singleton()
@injectable()
export class RequestFactory {
  constructor(
    @inject(delay(() => DatabaseService))
    private db: DatabaseService
  ) {}

  async createRequest<T extends RequestType>(
    request: T,
    invoke: DatabaseServiceMethods
  ): Promise<ResponseTypeSuccess | ErrorResponse> {
    const { channel, body } = request;
    try {
      const result = await this.db[invoke](body as any);
      return ResponseFactoryType(channel, result);
    } catch (e) {
      return ResponseFactoryType(channel, {
        type: (e as IPCError).type,
        message: (e as IPCError).message,
      });
    }
  }
}
