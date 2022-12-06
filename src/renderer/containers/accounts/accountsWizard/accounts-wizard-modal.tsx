import _ from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';
import { ModalProps, WizardModal } from 'renderer/components/modals';
import { AccountRO } from 'renderer/defenitions/record-object';
import { NestedPartial, ServerTypeEnum } from 'shared';
import {
  AccountsWizardServerConnection,
  AccountsWizardDetails,
  AccountsWizardTest,
  AccountsWizardFileConnection,
} from './steps';
import { useAccountsWizard } from './use-accounts-wizard';

type AccountsWizardModalProperties = ModalProps<AccountRO> & {
  initialValue: NestedPartial<AccountRO>;
};

export const AccountsWizardModal: FC<AccountsWizardModalProperties> = ({
  initialValue,
  onModalClose,
  isModalOpenState,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const {
    isDone,
    isNext,
    isPrev,
    connectionStatus,
    connectionError,
    testConnection,
    state,
    setState,
    completedStep,
  } = useAccountsWizard(initialValue, currentStep);

  const [internalState, setInternalState] = useState<NestedPartial<AccountRO>>({
    ...initialValue,
  });

  const updateState = (data: NestedPartial<AccountRO>) => {
    setState((previous) => ({ ...previous, ...data }));
  };

  const AccountsWizardConnection = useCallback(() => {
    if (state.client === ServerTypeEnum.SQLITE) {
      return (
        <AccountsWizardFileConnection
          initialValue={_.pick(state, ['connection'])}
          onUpdate={updateState}
        />
      );
    }
    return (
      <AccountsWizardServerConnection
        initialValue={_.pick(state, ['connection'])}
        onUpdate={updateState}
      />
    );
  }, [state]);

  const steps = useMemo(
    () => [
      {
        label: 'General',
        description: 'Account basic details',
        StepComponent: (
          <AccountsWizardDetails
            initialValue={_.pick(state, ['client', 'name'])}
            onUpdate={updateState}
          />
        ),
      },
      {
        label: 'Database',
        description: 'Database connections details',
        StepComponent: <AccountsWizardConnection />,
      },
      {
        label: 'Test',
        description: 'Test database connection',
        StepComponent: (
          <AccountsWizardTest
            {...{ connectionStatus, connectionError, testConnection }}
          />
        ),
      },
    ],
    [state, connectionStatus, connectionError, testConnection]
  );

  const properties = useMemo(
    () => ({
      setCurrentStep,
      isDone,
      isNext: true,
      isNextEnabled: isNext,
      isPrev: true,
      isPrevEnabled: isPrev,
      completedStep,
      isModalOpenState,
      steps,
      state,
    }),
    [
      isDone,
      isNext,
      isPrev,
      completedStep,
      isModalOpenState,
      steps,
      state,
      setCurrentStep,
    ]
  );

  return useMemo(
    () => (
      <WizardModal<AccountRO>
        onModalClose={onModalClose}
        {...properties}
        size="6xl"
      />
    ),
    [onModalClose, properties]
  );
};
