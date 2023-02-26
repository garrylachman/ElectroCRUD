import * as react from 'react';
import { SetStateAction, FC, PropsWithChildren } from 'react';
import { BoxProps } from '@chakra-ui/react';
import { O } from 'ts-toolbelt';
import { PaneOptions } from './pane.js';

type StrictPaneProperties = O.Required<PaneOptions, 'isOpen' | 'isDraggble' | 'toggleButton'>;
type PaneContextType = {
    leftPaneProperties: BoxProps;
    rightPaneProperties: BoxProps;
    togglePane: () => void;
    options: StrictPaneProperties;
    setLeftPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
    setRightPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
    isOpen: boolean;
};
type PaneContextProviderProperties = {
    userOptions: PaneOptions;
};
declare const PaneContext: react.Context<PaneContextType>;
declare const PaneContextProvider: FC<PropsWithChildren<PaneContextProviderProperties>>;

export { PaneContext, PaneContextProvider, PaneContextProviderProperties, PaneContextType };
