import {
  Badge,
  Box,
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
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { GridColumn } from '@glideapps/glide-data-grid';
import { Column } from '@wwwouter/typed-knex';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import moment from 'moment';
import { useContext, useEffect, useMemo } from 'react';
import { MdOutlineCollections } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { AnimateComponent, FlipOverOnHover } from 'renderer/components/motions';
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
import { DataTableCard } from './data-table';
import { faker } from '@faker-js/faker';

export const Dashboard = () => {
  const { viewState } = useContext(ViewScopedContext);
  const { status, data, control } = useContext(DashboardContext);
  const [isLoading, isExecuted] = status;

  useEffect(() => control[0](), []);

  const columnsForTable = useMemo(() =>
    (viewState.columns as ColumnRO[]).map((column: ColumnRO) => ({
      id: column.id,
      metadata: column.metadata,
      name: column.metadata.title || column.name,
      selector: (row) => row[column.name],
      format: (row, index) => findType(column.data_type).formatter(row[column.name]),
      type: _.pick(findType(column.data_type), ['icon', 'name']),
      sortable: true,
      sortField: column.name,
      reorder: true,
      width: findType(column.data_type).name === "datetime" ? "159px" : undefined,
      grow: findType(column.data_type).name === "number" ? 1 : 2,
      right: (findType(column.data_type).name === "datetime"),
      omit: !column.enabled,
      cell: (row, index, column, id) => {
        let value = row[column.sortField];
        let isMasked: boolean = false;

        if (column.metadata.tags.find((tags: TagRO) => tags.label === 'PII - MASK')) {
          value = _.repeat("#", Math.min(_.size(_.toString(value)), 8));
          isMasked = true;
        }

        if (column.metadata.tags.find((tags: TagRO) => tags.label === 'PII - FAKE FIRST NAME')) {
          value = faker.name.firstName();
          isMasked = true;
        }

        if (column.metadata.tags.find((tags: TagRO) => tags.label === 'PII - FAKE LAST NAME')) {
          value = faker.name.lastName();
          isMasked = true;
        }

        if (column.metadata.tags.find((tags: TagRO) => tags.label === 'PII - FAKE FULL NAME')) {
          value = faker.name.fullName();
          isMasked = true;
        }

        if (
          column.type.name === 'datetime' &&
          moment(row[column.sortField]).isValid()
        ) {
          return (
              <>
                <ReactTimeAgo date={moment(row[column.sortField]).toDate().getTime()} />
                <Spacer m={2} flex={0} />
                <Tooltip label={moment(row[column.sortField]).toDate().toLocaleString()}>
                  <Tag variant="subtle" colorScheme="brand">
                    <TagRightIcon as={column.type.icon} m={0} />
                  </Tag>
                </Tooltip>
              </>
          );
        }

        return (
          <Tooltip bg={isMasked ? 'brand.500' : 'gray.500'} hasArrow label={isMasked ? 'Masked Value' : value}>
            <Text noOfLines={1}>{value}</Text>
          </Tooltip>
        );
      },
    }))
  , [viewState.columns]);

  useEffect(() => console.log(columnsForTable), [columnsForTable]);

  return (
    <>
      <Spacer pt="60px" />
      <Tabs isLazy colorScheme="brandTabs" pt="10px">
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
        <TabPanels>
          <TabPanel px={0} pb={0}>
            {columnsForTable ? (
              <DataTableCard
                columns={columnsForTable}
                dataItems={data.rows}
                meta={data.meta}
                control={control}
              />
            ) : (
              <Center>
                <Spinner />
              </Center>
            )}
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
