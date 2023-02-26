import { ReactNode, FC } from 'react';

type PaneOptions = {
    leftPaneCloseSize: number | string;
    leftPaneOpenSize: number | string;
    toggleButton?: boolean;
    isDraggble?: boolean;
    isOpen?: boolean;
};
type PaneProperties = {
    leftComponent: ReactNode;
    rightComponent: ReactNode;
};
declare const Pane: FC<PaneProperties>;

export { Pane, PaneOptions, PaneProperties };
