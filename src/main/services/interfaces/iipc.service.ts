import { ResponseType } from 'shared/index';

export interface IIPCService {
  listen(): void;
  disconnect(): void;
  send(response: ResponseType): void;
};
