import { Box } from '@chakra-ui/react';
import {
  Layout,
  LayoutCardSection,
  LayoutSection,
  LayoutWidgetsSection,
} from '@electrocrud/layouts';
import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { WithErrorComponent } from 'renderer/containers/error';
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
    <WithErrorComponent>
      <Layout
        sections={[
          <LayoutWidgetsSection name="stats">
            <ViewsListStats viewsState={viewsState} />
          </LayoutWidgetsSection>,
          <LayoutSection name="views">
            <ViewsListTable viewsState={viewsState} />
          </LayoutSection>,
        ]}
      />
    </WithErrorComponent>
  );
};

export default ManageViews;
