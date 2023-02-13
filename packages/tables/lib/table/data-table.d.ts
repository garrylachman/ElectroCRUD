import { CellContext } from '@tanstack/react-table';
import React, { ReactElement } from 'react';

type DataTableHeader = {
    key: string;
    label: string;
    group?: string;
    style?: React.CSSProperties;
    width?: any;
};
type CustomCellReturn = ReactElement;
type DataTableProperties<T> = {
    data: T[];
    columns: DataTableHeader[];
    customCell?: (info: CellContext<T, any>) => CustomCellReturn | void | undefined;
    onSelectedItems?: (items: T[]) => void;
    isLoaded?: boolean;
    hasScroll?: boolean;
};
declare const DataTable: <TT extends Record<string, any>>(properties: DataTableProperties<TT>) => JSX.Element;

export { DataTable };
