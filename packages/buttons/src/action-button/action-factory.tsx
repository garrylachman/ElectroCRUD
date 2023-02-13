import { FC, useMemo } from 'react';
import { RippleButtonProperties } from '../ripple-button';

import { CancelActionButton } from './cancel-action-button';
import { SaveActionButton } from './save-action-button';

export enum ActionButtonType {
  SAVE = 'SaveActionButton',
  CANCEL = 'CancelActionButton',
}

type ActionButtonMappingType = Record<
  ActionButtonType,
  FC<RippleButtonProperties>
>;

const actionButtonMapping: ActionButtonMappingType = {
  [ActionButtonType.SAVE]: SaveActionButton,
  [ActionButtonType.CANCEL]: CancelActionButton,
};

export type ActionButtonFactoryProperties = {
  actionType: ActionButtonType;
  onClick?: (...arguments_: any) => void;
  isDisabled?: boolean;
};

export const ActionButtonsFactory: FC<ActionButtonFactoryProperties> = ({
  actionType,
  ...rest
}) => {
  const TargetComponent = useMemo(
    () => actionButtonMapping[actionType],
    [actionType]
  );
  return <TargetComponent {...rest} />;
};
