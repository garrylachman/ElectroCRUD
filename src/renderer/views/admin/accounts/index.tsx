import { Box } from '@chakra-ui/react';
import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@saas-ui/react';
import memoize from 'proxy-memoize';
import { useSelector } from 'react-redux';
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
    <Box display="flex" flexDirection="column" flex={1}>
      <Banner status="info" mb={5} variant="subtle" motionPreset="scale">
        <BannerIcon />
        <BannerContent>
          <BannerTitle fontWeight="bold">How to use account</BannerTitle>
          <BannerDescription fontWeight="normal">
            After adding the account, please use the account action dropdown
            menu and click on use.
          </BannerDescription>
        </BannerContent>
      </Banner>
      <AccountsListTable accountsState={accountsState} />
    </Box>
  );
};
