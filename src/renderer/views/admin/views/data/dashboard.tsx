import {
  Center,
  Flex,
  Icon,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagRightIcon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import moment from 'moment';
import { useContext, useEffect, useMemo } from 'react';
import { MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import {
  ViewScopedContext,
  ViewScopedContextProvider,
} from 'renderer/contexts';
import { ColumnRO, TagRO } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';

import {
  DashboardContext,
  DashboardContextProvider,
} from './dashboard-context';
import { DatasetCoordinator } from './dataset-coordinator';

export const Dashboard = () => {
  const { viewState } = useContext(ViewScopedContext);
  const { status, data, control } = useContext(DashboardContext);
  const [isLoading, isExecuted] = status;

  useEffect(() => control[0](), []);

  return (
    <>
      <Tabs
        isLazy
        colorScheme="primary"
        height="100%"
        display="flex"
        flexDirection="column"
        flex="1"
        mt={0}
      >
        <TabList>
          <Tab>
            <Flex align="center">
              <Icon as={MdOutlineCollections} w="20px" h="20px" me="8px" />
              <Text fontSize="lg" fontWeight="500">
                Dataset
              </Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex align="center">
              <Icon as={MdOutlineCollections} w="20px" h="20px" me="8px" />
              <Text fontSize="lg" fontWeight="500">
                Metadata
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels height="100%">
          <TabPanel px={0} pb={0} height="100%" mt={0}>
            <DatasetCoordinator />
          </TabPanel>
          <TabPanel px={0} pb={0}>
            SOON
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const DashboardWithContext = () => {
  const { viewId } = useParams();

  return (
    <ViewScopedContextProvider viewId={viewId}>
      <DashboardContextProvider viewId={viewId}>
        <Dashboard />
      </DashboardContextProvider>
    </ViewScopedContextProvider>
  );
};
