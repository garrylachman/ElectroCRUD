import { BoxProps } from '@chakra-ui/react';
import {
  createContext,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { O } from 'ts-toolbelt';

import { PaneOptions } from './pane';

type StrictPaneProperties = O.Required<
  PaneOptions,
  'isOpen' | 'isDraggble' | 'toggleButton'
>;

export type PaneContextType = {
  leftPaneProperties: BoxProps;
  rightPaneProperties: BoxProps;
  togglePane: () => void;
  options: StrictPaneProperties;
  setLeftPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
  setRightPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
  isOpen: boolean;
};

const initial: PaneContextType = {
  leftPaneProperties: {},
  rightPaneProperties: {},
  togglePane: () => {},
  options: {
    toggleButton: true,
    isDraggble: false,
    isOpen: true,
    leftPaneCloseSize: 0,
    leftPaneOpenSize: 0,
  },
  isOpen: true,
  setLeftPaneProperties: () => {
    throw new Error('Function not implemented.');
  },
  setRightPaneProperties: () => {
    throw new Error('Function not implemented.');
  },
};

export type PaneContextProviderProperties = {
  userOptions: PaneOptions;
};

export const PaneContext = createContext<PaneContextType>(initial);

export const PaneContextProvider: FC<
  PropsWithChildren<PaneContextProviderProperties>
> = ({ userOptions, children }) => {
  const options = {
    toggleButton: true,
    isDraggble: false,
    isOpen: true,
    ...userOptions,
  } as StrictPaneProperties;

  const [isOpen, setIsOpen] = useState<boolean>(options.isOpen);

  const [leftPaneProperties, setLeftPaneProperties] = useState<BoxProps>({
    width: isOpen ? options.leftPaneOpenSize : options.leftPaneCloseSize,
  });

  const [rightPaneProperties, setRightPaneProperties] = useState<BoxProps>({
    width: '100%',
  });

  const togglePane = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <PaneContext.Provider
      value={{
        leftPaneProperties,
        rightPaneProperties,
        setLeftPaneProperties,
        setRightPaneProperties,
        togglePane,
        isOpen,
        options,
      }}
    >
      {children}
    </PaneContext.Provider>
  );
};
