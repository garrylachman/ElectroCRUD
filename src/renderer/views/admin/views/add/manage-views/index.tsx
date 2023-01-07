import { Box } from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { StrictViewRO, ViewRO } from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { ViewsListStats } from './views-list-stats';
import { ViewsListTable } from './views-list-table';

export const ManageViews = () => {
  const sessionState = useAppSelector((state) => state.session);

  const viewsState = useSelector<RootState, StrictViewRO[]>(
    useCallback(
      memoize((memoState: RootState) =>
        ViewsReducer.getSelectors()
          .selectAll(memoState.views)
          .filter((view) => view.accountId === sessionState.account?.id)
      ),
      [sessionState.account?.id]
    )
  );

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <ViewsListStats viewsState={viewsState} />
      <ViewsListTable viewsState={viewsState} />
    </Box>
  );
};
