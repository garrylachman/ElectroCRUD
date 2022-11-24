export * from './server.def';
export * from './log.def';
export * from './ipc.def';
export * from './response.def';
export * from './request.def';

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};
