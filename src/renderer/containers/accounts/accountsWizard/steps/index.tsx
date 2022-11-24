import { WizardModalStepContentProps } from 'renderer/components/modals';
import { AccountRO } from 'renderer/defenitions/record-object';

export type AccountsWizardStep = WizardModalStepContentProps<AccountRO>;

export * from './AccountsWizardDetails';
export * from './AccountsWizardServerConnection';
export * from './AccountsWizardTest';
export * from './AccountsWizardFileConnection';

