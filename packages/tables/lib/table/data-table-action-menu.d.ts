import { MenuItemProps } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { O } from 'ts-toolbelt';

type DataTableActionMenuItem = O.Merge<{
    menuIcon: IconType;
    label: string;
    onClick: (row: any) => any;
    tooltip?: string;
}, MenuItemProps>;
type DataTableActionMenuProperties = {
    items: DataTableActionMenuItem[];
    row?: any;
};
declare const DataTableActionMenu: FC<DataTableActionMenuProperties>;

export { DataTableActionMenu, DataTableActionMenuItem, DataTableActionMenuProperties };
