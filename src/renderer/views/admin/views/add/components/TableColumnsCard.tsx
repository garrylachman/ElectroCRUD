import {
  Box,
  Tag,
  TagLeftIcon,
  Switch,
  Heading,
  Highlight,
  SkeletonText,
  TagLabel,
  Center,
  Divider,
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { FC, useEffect, useMemo } from 'react';
import { IPCChannelEnum } from 'shared';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { MdVpnKey } from 'react-icons/md';
import { TableBooleanCell } from 'renderer/components/tables/customCells';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ColumnsReducer, ViewsReducer } from 'renderer/store/reducers';
import _ from 'lodash';
import { useIPCTableInfo } from 'renderer/ipc';
import { ViewSelectors } from 'renderer/store/selectors';
import { useSelector } from 'react-redux';
import { findType } from 'renderer/defenitions/record-object/data-types';

type TableColumnsCardProperties = {
  viewId: string;
};

export const TableColumnsCard: FC<TableColumnsCardProperties> = ({
  viewId,
}) => {
  const columnsState = useAppSelector((state) => state.columns);
  const viewState = useSelector((state) =>
    ViewSelectors.createFullViewSelector(state)
  )(viewId);
  const dispatch = useAppDispatch();

  const { result, execute, isExecuted } = useIPCTableInfo({
    channel: IPCChannelEnum.TABLE_INFO,
    body: viewState?.table || '',
  });

  useEffect(() => {
    if (!isExecuted && viewState?.table) {
      execute();
    }
  }, [viewState?.table]);

  useEffect(() => {
    if (result) {
      const names = new Set(_.map(viewState.columns, 'name'));
      const missingColumns = _.filter(
        result.body,
        (item) => !names.has(item.name)
      );
      if (missingColumns.length > 0) {
        dispatch(
          ColumnsReducer.actions.upsertMany(
            missingColumns.map((item) => ({
              ...item,
              enabled: true,
              searchable: true,
            })),
            { viewId }
          )
        );
      }
    }
  }, [result]);

  const tableColumns: {
    key: keyof ColumnRO | 'actions';
    label: string;
    group?: string;
  }[] = [
    { key: 'name', label: 'Name', group: 'Database' },
    { key: 'type', label: 'Type', group: 'Database' },
    { key: 'default', label: 'Default', group: 'Database' },
    { key: 'extra', label: 'Extra', group: 'Database' },
    { key: 'key', label: 'Key', group: 'Database' },
    { key: 'nullable', label: 'Null', group: 'Database' },
    { key: 'enabled', label: 'Enabled', group: 'View' },
    { key: 'searchable', label: 'Searchable', group: 'View' },
  ];

  return (
    <>
      <Card px={0} flexDirection="column" w="100%" overflowX={{ sm: 'hidden' }}>
        <Heading p={5} pt={0} size="md">
          <SkeletonText isLoaded={isExecuted} noOfLines={2} spacing={3}>
            <Highlight
              query={viewState?.table || ''}
              styles={{ px: 2, py: '1', rounded: 'full', bg: 'brand.100' }}
            >
              {`Columns of ${viewState?.table} table`}
            </Highlight>
          </SkeletonText>
        </Heading>
        <Box px={isExecuted ? 0 : 5}>
          <ElectroCRUDTable<ColumnRO>
            isLoaded={isExecuted}
            data={viewState.columns}
            columns={tableColumns}
            customCell={(row) => {
              if (row.column.id === 'key' && row.getValue() === 'PRI') {
                return (
                  <Tag variant="subtle" colorScheme="cyan">
                    <TagLeftIcon as={MdVpnKey} me={0} />
                  </Tag>
                );
              }
              if (row.column.id === 'type') {
                const dataType = findType(row.getValue());
                return (
                  <Tag
                    variant="subtle"
                    colorScheme="brand"
                    display="inline-flex"
                    alignContent="center"
                  >
                    {dataType && (
                      <>
                        <TagLabel>{row.getValue() || dataType.name}</TagLabel>
                        <Center height='10px'>
                          <Divider orientation='vertical' mx={2} borderColor="brand.300" />
                        </Center>
                        <TagLeftIcon as={dataType.icon} fontSize={20} mr={0} />
                      </>
                    )}
                  </Tag>
                );
              }
              if (row.column.id === 'nullable') {
                return <TableBooleanCell value={row.getValue()} />;
              }
              if (
                row.column.id === 'enabled' ||
                row.column.id === 'searchable'
              ) {
                return (
                  <Switch
                    size="sm"
                    defaultChecked={row.getValue()}
                    onChange={() => {
                      dispatch(
                        ColumnsReducer.actions.upsertOne({
                          ...row.row.original,
                          [row.column.id]: !row.getValue(),
                        })
                      );
                    }}
                  />
                );
              }
            }}
          />
        </Box>
      </Card>
    </>
  );
};
