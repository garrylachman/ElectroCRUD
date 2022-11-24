import { useState, useEffect } from 'react';
import { IPCChannel } from 'shared';
import { ErrorResponse, ResponseType, RequestType } from 'shared/defenitions';

const ipcRenderer = window.electron.ipcRenderer;

export const BaseRequest = async <TT extends ResponseType>(
  channel: IPCChannel,
  req: RequestType
): Promise<TT | ErrorResponse> => {
  return ipcRenderer.invoke(channel, req) as Promise<TT | ErrorResponse>;
};

export const useBaseRequest = <T extends ResponseType>(req: RequestType) => {
  const [result, setResult] = useState<T | ErrorResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExecuted, setIsExecuted] = useState<boolean>(false);

  const execute = () => {
    setIsLoading(true);
    setIsExecuted(false);

    BaseRequest<T>(req.channel, req)
      .then((value) => setResult(value))
      .catch((e) => {});
  };

  useEffect(() => {
    setIsLoading(false);
    setIsExecuted(true);
  }, [result]);

  return {
    result,
    isLoading,
    isExecuted,
    execute,
  };
};
