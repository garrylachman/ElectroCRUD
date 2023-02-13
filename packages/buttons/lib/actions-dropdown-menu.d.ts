import { MenuItemProps } from '@chakra-ui/react';
import { ReactElement, FC } from 'react';

type ActionsDropdownMenuItem = {
    props?: MenuItemProps;
    text?: string | ReactElement;
    isDivider?: boolean;
};
type ActionsDropdownMenuProperties = {
    menuName?: string;
    items?: ActionsDropdownMenuItem[];
};
declare const ActionsDropdownMenu: FC<ActionsDropdownMenuProperties>;

export { ActionsDropdownMenu, ActionsDropdownMenuItem, ActionsDropdownMenuProperties };
