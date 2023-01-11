import {
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Spinner,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useEffect } from 'react';
import { MdHdrAuto, MdOutline1XMobiledata, MdVpnKey } from 'react-icons/md';
import { RxTextNone } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { TableIconCell } from 'renderer/components/tables/customCells';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { useIPCTableInfo } from 'renderer/ipc';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ViewSelectors } from 'renderer/store/selectors';
import { IPCChannelEnum } from 'shared';

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

  const { result, execute, isExecuted, isLoading } = useIPCTableInfo({
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
      console.log(result)
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
    { key: 'data_type', label: 'Type', group: 'Database' },
    { key: 'max_length', label: 'Max Length', group: 'Database' },
    { key: 'numeric_precision', label: 'Num. precision', group: 'Database' },
    { key: 'default_value', label: 'Default', group: 'Database' },
    { key: 'properties', label: 'Properties', group: 'Database' },
    { key: 'enabled', label: 'Enabled', group: 'View' },
    { key: 'searchable', label: 'Searchable', group: 'View' },
  ];

  if (isLoading) {
    return (
      <Card variant="elevated">
        <CardBody>
        <Center>
          <VStack>
              <Spinner size="xl" thickness="6px" color="primary.300" />
              <Text fontSize="lg">Analyzing "{viewState?.table}" table...</Text>
          </VStack>
        </Center>
      </CardBody>
    </Card>);
  }

  return (
    <>
      <Card variant="elevated">
        <CardHeader>
          Columns
          <Text display="flex" as="kbd" fontSize="sm" fontWeight="normal" color="gray.500">
          of "{viewState.table}" table
          </Text>
        </CardHeader>
        <CardBody px={0}>
          <ElectroCRUDTable<ColumnRO>
            isLoaded={isExecuted}
            data={viewState.columns}
            columns={tableColumns}
            customCell={(row) => {
              if (row.column.id === 'data_type') {
                const dataType = findType(row.getValue());
                return (
                  <>
                    {dataType && (
                      <HStack>
                        <Text>{row.getValue() || dataType.name}</Text>
                        <TableIconCell icon={dataType.icon} tooltip={dataType.name} />
                      </HStack>
                    )}
                  </>
                );
              }
              if (row.column.id === 'properties') {
                return (
                  <HStack>
                    {row.row.original.is_nullable && (<TableIconCell icon={RxTextNone} tooltip='nullable' />)}
                    {row.row.original.is_primary_key && (<TableIconCell icon={MdVpnKey} tooltip='primary key' />)}
                    {row.row.original.is_unique && (<TableIconCell icon={MdOutline1XMobiledata} tooltip='unique' />)}
                    {row.row.original.has_auto_increment && (<TableIconCell icon={MdHdrAuto} tooltip='auto increment' />)}
                  </HStack>
                );
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
        </CardBody>
      </Card>
    </>
  );
};