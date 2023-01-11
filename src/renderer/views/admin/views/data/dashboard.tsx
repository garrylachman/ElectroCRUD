import {
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { WithErrorComponent } from 'renderer/containers/error';
import {
  ViewScopedContext,
  ViewScopedContextProvider,
} from 'renderer/contexts';

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

