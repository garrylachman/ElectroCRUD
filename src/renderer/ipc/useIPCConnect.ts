import { ConnectRequest, ConnectResponse } from 'shared';
import { useBaseRequest } from './baseRequest';

export const useIPCConnect = (req: ConnectRequest) => {
  return useBaseRequest<ConnectResponse>(req);
};
