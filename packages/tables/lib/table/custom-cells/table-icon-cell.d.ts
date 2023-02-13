import { FC } from 'react';
import { IconType } from 'react-icons';

type TableIconCellProperties = {
    icon: IconType;
    tooltip: string;
};
declare const TableIconCell: FC<TableIconCellProperties>;

export { TableIconCell };
