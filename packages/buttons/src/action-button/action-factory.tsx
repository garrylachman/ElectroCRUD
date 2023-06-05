import { FC, useMemo } from 'react';
import { RippleButtonProperties } from '../ripple-button';

import { CancelActionButton } from './cancel-action-button';
import { SaveActionButton } from './save-action-button';
import { SaveAndApplyFilterActionButton } from './save-and-apply-filter-action-button';
import { ApplyFilterActionButton } from './apply-filter-action-button';

export enum ActionButtonType {
  SAVE = 'SaveActionButton',
  CANCEL = 'CancelActionButton',
  APPLY_FILTER = 'ApplyFilterActionButton',
  SAVE_AND_APPLY_FILTER = 'SaveAndApplyFilterActionButton',
}

type ActionButtonMappingType = Record<
  ActionButtonType,
  FC<RippleButtonProperties>
>;

const actionButtonMapping: ActionButtonMappingType = {
  [ActionButtonType.SAVE]: SaveActionButton,
  [ActionButtonType.CANCEL]: CancelActionButton,
  [ActionButtonType.APPLY_FILTER]: ApplyFilterActionButton,
  [ActionButtonType.SAVE_AND_APPLY_FILTER]: SaveAndApplyFilterActionButton,
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
