import { Banner } from '@electrocrud/feedback';
import {
  Layout,
  LayoutSection,
  LayoutWidgetsSection,
} from '@electrocrud/layouts';
import memoize from 'proxy-memoize';
import { useSelector } from 'react-redux';
import { WithErrorComponent } from 'renderer/containers/error';
import { StrictAccountRO } from 'renderer/defenitions/record-object';
import { AccountsReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

import { AccountsListTable } from './accounts-list-table';

export const ManageAccounts = () => {
  const accountsState = useSelector<RootState, StrictAccountRO[]>(
    memoize((memoState: RootState) =>
      AccountsReducer.getSelectors().selectAll(memoState.accounts)
    )
  );

  return (
    <WithErrorComponent>
      <Layout
        sections={[
          <LayoutWidgetsSection name="stats">
            <Banner
              bannerProperties={{
                status: 'info',
                mb: 5,
                variant: 'subtle',
                motionPreset: 'scale',
              }}
              title="How to use account"
              body="After adding the account, please use the account action dropdown menu and click on use."
            />
          </LayoutWidgetsSection>,
          <LayoutSection name="views">
            <AccountsListTable accountsState={accountsState} />
          </LayoutSection>,
        ]}
      />
    </WithErrorComponent>
  );
};

export default ManageAccounts;
