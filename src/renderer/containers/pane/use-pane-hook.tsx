import { BoxProps } from '@chakra-ui/react';
import { SetStateAction, useContext, useEffect } from 'react';

import { PaneContext } from './pane-context';

export type UsePaneHookReturnType = {
  togglePane: () => void;
  setLeftPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
  setRightPaneProperties: React.Dispatch<SetStateAction<BoxProps>>;
};

export const usePaneHook = (
  leftProperties: Partial<BoxProps>,
  rightProperties: Partial<BoxProps>
): UsePaneHookReturnType => {
  const paneContext = useContext(PaneContext);

  useEffect(
    () =>
      paneContext.setLeftPaneProperties((previous) => ({
        ...previous,
        ...leftProperties,
      })),
    []
  );

  useEffect(
    () =>
      paneContext.setRightPaneProperties((previous) => ({
        ...previous,
        ...rightProperties,
      })),
    []
  );

  return {
    togglePane: paneContext.togglePane,
    setLeftPaneProperties: paneContext.setLeftPaneProperties,
    setRightPaneProperties: paneContext.setRightPaneProperties,
  };
};
