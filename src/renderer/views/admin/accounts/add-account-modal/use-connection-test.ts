import { useEffect, useMemo, useState } from 'react';
import { AccountRO } from 'renderer/defenitions/record-object';
import { useIPCConnect } from 'renderer/ipc';
import {
  ConnectArguments,
  ErrorResponse,
  IPCChannelEnum,
  IPCError,
} from '@electrocrud/shared';

export type UseAccountsWizardReturn = {
  execute: () => void;
  status: 'NOT_TESTED' | 'TESTING' | 'SUCCESS' | 'FAILED';
  error?: IPCError;
};

export const useConnectionTest = (
  account: Partial<AccountRO>
): UseAccountsWizardReturn => {
  const [status, setStatus] = useState<
    'NOT_TESTED' | 'TESTING' | 'SUCCESS' | 'FAILED'
  >('NOT_TESTED');
  const { result, isLoading, execute, isExecuted } = useIPCConnect({
    body: account as ConnectArguments,
    channel: IPCChannelEnum.CONNECT,
  });

  useEffect(() => {
    setStatus('NOT_TESTED');
  }, [account]);

  useEffect(() => {
    setStatus('TESTING');
  }, [isLoading]);

  useEffect(() => {
    if (!isExecuted || !result) {
      setStatus('NOT_TESTED');
    }
    if (result && result.body) {
      setStatus('SUCCESS');
    } else {
      setStatus('FAILED');
    }
  }, [result, isExecuted]);

  const error = useMemo<IPCError | undefined>(() => {
    if (result && (result as ErrorResponse).error) {
      return (result as ErrorResponse).error;
    }
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }, [result]);

  return { execute, status, error };
};
