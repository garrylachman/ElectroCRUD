import { FC } from 'react';

declare enum ActionButtonType {
    SAVE = "SaveActionButton",
    CANCEL = "CancelActionButton",
    APPLY_FILTER = "ApplyFilterActionButton",
    SAVE_AND_APPLY_FILTER = "SaveAndApplyFilterActionButton"
}
type ActionButtonFactoryProperties = {
    actionType: ActionButtonType;
    onClick?: (...arguments_: any) => void;
    isDisabled?: boolean;
};
declare const ActionButtonsFactory: FC<ActionButtonFactoryProperties>;

export { ActionButtonFactoryProperties, ActionButtonType, ActionButtonsFactory };
