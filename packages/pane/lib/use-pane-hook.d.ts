import { BoxProps } from '@chakra-ui/react';
import { SetStateAction } from 'react';

type UsePaneHookReturnType = {
    togglePane: () => void;
    setLeftPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
    setRightPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
};
declare const usePaneHook: (leftProperties: Partial<BoxProps>, rightProperties: Partial<BoxProps>) => UsePaneHookReturnType;

export { UsePaneHookReturnType, usePaneHook };
