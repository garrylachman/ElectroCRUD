import { ResponseType } from '@electrocrud/shared';

export interface IIPCService {
  listen(): void;
  disconnect(): void;
  send(response: ResponseType): void;
};
