import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Pane, usePaneHook } from 'renderer/components/pane';
import { PaneContextProvider } from 'renderer/components/pane/pane-context';
import { ScopeContextProvider } from 'renderer/contexts/scope-context';
import { O } from 'ts-toolbelt';

import { ColumnsListPane } from './components/columns-list-pane';
import { DetailsPane } from './components/details-pane';

export type MetaColumnsProperties = O.Merge<BoxProps, {}>;

const MetaColumns: FC<MetaColumnsProperties> = ({ ...rest }) => {
  const paneHook = usePaneHook(
    {
      bg: 'gradient.white.600',
      borderRadius: 'lg',
      borderRight: '4px solid',
      borderColor: 'gray.200',
      minH: '35rem',
    },
    {
      bg: 'white',
      borderRadius: 'sm',
      borderLeft: '3px solid',
      borderColor: 'gray.300',
      minH: '35rem',
    }
  );

  return (
    <Box px={5}>
      <Pane
        leftComponent={<ColumnsListPane />}
        rightComponent={<DetailsPane />}
      />
    </Box>
  );
};

export const MetaColumnsWithContext = () => (
  <ScopeContextProvider name="meta-columns">
    <PaneContextProvider
      userOptions={{ leftPaneCloseSize: 150, leftPaneOpenSize: 400 }}
    >
      <MetaColumns />
    </PaneContextProvider>
  </ScopeContextProvider>
);
