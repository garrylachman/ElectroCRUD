import { useState, useEffect } from 'react';
import { useAppDispatch } from 'renderer/store/hooks';
import { ToastReducer } from 'renderer/store/reducers';
import { IPCChannel } from 'shared';
import { ResponseType, RequestType } from 'shared/defenitions';

const { ipcRenderer } = window.electron;

export const BaseRequest = async <TT extends ResponseType>(
  channel: IPCChannel,
  req: RequestType
): Promise<TT> => {
  return ipcRenderer.invoke(channel, req) as Promise<TT>;
};

export const useBaseRequest = <T extends ResponseType>(req: RequestType) => {
  const dispatch = useAppDispatch();
  const [result, setResult] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExecuted, setIsExecuted] = useState<boolean>(false);

  const execute = () => {
    setIsLoading(true);
    setIsExecuted(false);

    BaseRequest<T>(req.channel, req)
      .then((value) => {
        if (value.error) {
          dispatch(
            ToastReducer.actions.setToast({
              status: 'error',
              title: `IPC Error on channel: ${value.channel}`,
              description: value.error.message,
            })
          );
        }
        return setResult(value);
      })
      .catch((e) => {
        dispatch(
          ToastReducer.actions.setToast({
            status: 'error',
            title: (e as Error).name,
            description: (e as Error).message,
          })
        );
      });
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
