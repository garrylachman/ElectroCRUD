export * from './server.define';
export * from './log.define';
export * from './ipc.define';
export * from './response.define';
export * from './request.define';
export * from './error.define';

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};
