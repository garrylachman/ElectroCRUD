import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'renderer/store/hooks';
import { ToastReducer } from 'renderer/store/reducers';
import { IPCChannel } from 'shared';
import { RequestType, ResponseType } from 'shared/defenitions';

const { ipcRenderer } = window.electron;

export const BaseRequest = async <TT extends ResponseType>(
  channel: IPCChannel,
  request: RequestType
): Promise<TT> => {
  return ipcRenderer.invoke(channel, request) as Promise<TT>;
};

export const useBaseRequest = <T extends ResponseType>(
  request: RequestType
) => {
  const dispatch = useAppDispatch();
  const [result, setResult] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExecuted, setIsExecuted] = useState<boolean>(false);

  const execute = useCallback(() => {
    setResult();
    setIsLoading(true);
    setIsExecuted(false);

    console.log("request", request);

    BaseRequest<T>(request.channel, request)
      .then((value) => {
        console.log("value", value);
        if (value.error) {
          dispatch(
            ToastReducer.actions.setToast({
              status: 'error',
              title: `IPC Error on channel: ${value.channel}`,
              description: value.error.message,
            })
          );
        }
        setIsLoading(false);
        return setResult(value);
      })
      .catch((error) => {
        dispatch(
          ToastReducer.actions.setToast({
            status: 'error',
            title: (error as Error).name,
            description: (error as Error).message,
          })
        );
        setIsLoading(false);
      });
  }, [request]);

  useEffect(() => {
    setIsLoading(false);
    setIsExecuted(true);
  }, [result]);

  return {
    result: result as T,
    isLoading,
    isExecuted,
    execute,
  };
};