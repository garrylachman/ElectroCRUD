import { WizardModalStepContentProps } from 'renderer/components/modals';
import { AccountRO } from 'renderer/defenitions/record-object';

export type AccountsWizardStep = WizardModalStepContentProps<AccountRO>;

export * from './accounts-wizard-details';
export * from './accounts-wizard-server-connection';
export * from './accounts-wizard-test';
export * from './accounts-wizard-file-connection';
