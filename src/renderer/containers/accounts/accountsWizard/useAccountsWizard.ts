import { useState, useMemo, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import {
  AccountRO,
  ValidateAccountsWizardFileStep2,
  ValidateAccountsWizardStep1,
  ValidateAccountsWizardStep2,
} from 'renderer/defenitions/record-object';
import { useIPCConnect } from 'renderer/ipc';
import {
  ConnectResponse,
  ErrorResponse,
  IPCChannelEnum,
  NestedPartial,
  ServerTypeEnum,
} from 'shared';

export type UseAccountsWizardType = {
  isPrev: boolean;
  isNext: boolean;
  isDone: boolean;
  completedStep: number;
  state: NestedPartial<AccountRO>;
  setState: Dispatch<SetStateAction<NestedPartial<AccountRO>>>;
  testConnection: () => void;
  connectionStatus: 'NOT_TESTED' | 'FAILED' | 'SUCCESS' | 'TESTING';
  connectionError?: string;
};

export const useAccountsWizard = (
  initialValue: NestedPartial<AccountRO>,
  currentStep: number
): UseAccountsWizardType => {
  const [state, setState] = useState<NestedPartial<AccountRO>>(initialValue);
  const [error, setError] = useState<string>();
  const [connectionStatus, setConnectionStatus] = useState<
    'NOT_TESTED' | 'FAILED' | 'SUCCESS' | 'TESTING'
  >('NOT_TESTED');
  const [completedStep, setCompletedStep] = useState<number>(-1);
  const isPrev = useMemo<boolean>(() => currentStep > 0, [currentStep]);
  const isNext = useMemo<boolean>(
    () => currentStep <= completedStep && currentStep < 2,
    [currentStep, completedStep]
  );
  const isDone = useMemo<boolean>(
    () => connectionStatus === 'SUCCESS',
    [connectionStatus]
  );

  const {
    result: connectState,
    isLoading,
    execute,
  } = useIPCConnect({
    body: {
      client: state?.client,
      connection: state.connection,
    },
    channel: IPCChannelEnum.CONNECT,
  });

  const testConnection = useCallback(() => {
    execute();
  }, []);

  const isEdit = useMemo(() => state.id, [state]);
  useEffect(() => {
    setConnectionStatus('NOT_TESTED');
    if (state.client === ServerTypeEnum.SQLITE) {
      if (!ValidateAccountsWizardFileStep2.validate(state).error) {
        setCompletedStep(1);
        testConnection();
        return;
      }
    }
    if (state.client !== ServerTypeEnum.SQLITE) {
      if (!ValidateAccountsWizardStep2.validate(state).error) {
        setCompletedStep(1);
        testConnection();
        return;
      }
    }
    if (!ValidateAccountsWizardStep1.validate(state).error) {
      setCompletedStep(0);
      return;
    }
    setCompletedStep(-1);
    return;
  }, [isEdit]);

  useEffect(() => {
    if (isDone) {
      setCompletedStep(2);
    }
  }, [isDone]);

  useEffect(() => {
    setConnectionStatus('NOT_TESTED');
    if (state.client === ServerTypeEnum.SQLITE) {
      if (!ValidateAccountsWizardFileStep2.validate(state).error) {
        return setCompletedStep(1);
      }
    }
    if (state.client !== ServerTypeEnum.SQLITE) {
      if (!ValidateAccountsWizardStep2.validate(state).error) {
        return setCompletedStep(1);
      }
    }
    if (!ValidateAccountsWizardStep1.validate(state).error) {
      return setCompletedStep(0);
    }
    return setCompletedStep(-1);
  }, [state]);

  useEffect(
    () => (isLoading ? setConnectionStatus('TESTING') : undefined),
    [isLoading]
  );

  useEffect(() => {
    if (connectState) {
      if ((connectState as ConnectResponse).body) {
        setConnectionStatus('SUCCESS');
      } else if ((connectState as ErrorResponse).error) {
        setConnectionStatus('FAILED');
        setError((connectState as ErrorResponse).error.message);
      } else {
        setConnectionStatus('FAILED');
      }
    }
  }, [connectState]);

  return {
    completedStep,
    isPrev,
    isNext,
    testConnection,
    isDone,
    state,
    setState,
    connectionStatus,
    connectionError: error,
  };
};
