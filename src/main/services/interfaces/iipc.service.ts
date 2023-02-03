import { ResponseType } from '../../../shared';

export interface IIPCService {
  listen(): void;
  disconnect(): void;
  send(response: ResponseType): void;
};
