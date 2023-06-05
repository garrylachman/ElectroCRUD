/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { filter, map } from 'underscore';
import { FC, useEffect } from 'react';
import { MdHdrAuto, MdOutline1XMobiledata, MdVpnKey } from 'react-icons/md';
import { RxTextNone } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { DataTable, TableIconCell } from '@electrocrud/tables';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { useIPCTableInfo } from 'renderer/ipc';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import { ViewSelectors } from 'renderer/store/selectors';
import { IPCChannelEnum } from '@electrocrud/shared';
import { RootState } from 'renderer/store/store';

type TableColumnsCardProperties = {
  viewId: string;
};

export const TableColumnsCard: FC<TableColumnsCardProperties> = ({
  viewId,
}) => {
  const viewState = useSelector((state: RootState) =>
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
      const names = new Set(map(viewState.columns, 'name'));
      const missingColumns = filter(
        result.body,
        (item) => !names.has(item.name)
      );
      if (missingColumns.length > 0) {
        dispatch(
          ColumnsReducer.actions.upsertMany(
            // @ts-ignore
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
    key: keyof ColumnRO | 'properties';
    label: string;
    group?: string;
  }[] = [
    { key: 'name', label: 'Name', group: 'Database' },
    { key: 'data_type', label: 'Type', group: 'Database' },
    { key: 'max_length', label: 'Length', group: 'Database' },
    { key: 'numeric_precision', label: 'precision', group: 'Database' },
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
      </Card>
    );
  }

  return (
    <>
      <Card variant="elevated">
        <CardHeader>
          Columns
          <Text
            display="flex"
            as="kbd"
            fontSize="sm"
            fontWeight="normal"
            color="gray.500"
          >
            of "{viewState.table}" table
          </Text>
        </CardHeader>
        <CardBody px={0}>
          <DataTable<ColumnRO>
            isLoaded={isExecuted}
            // @ts-ignore
            data={viewState.columns}
            columns={tableColumns}
            customCell={(row) => {
              if (row.column.id === 'data_type') {
                const dataType = findType(row.getValue());
                return (
                  <>
                    {dataType && (
                      <HStack>
                        <Text>{dataType.name || row.getValue()}</Text>
                        <TableIconCell
                          icon={dataType.icon}
                          tooltip={dataType.name}
                        />
                      </HStack>
                    )}
                  </>
                );
              }
              if (row.column.id === 'properties') {
                return (
                  <HStack>
                    {row.row.original.is_nullable && (
                      <TableIconCell icon={RxTextNone} tooltip="nullable" />
                    )}
                    {row.row.original.is_primary_key && (
                      <TableIconCell icon={MdVpnKey} tooltip="primary key" />
                    )}
                    {row.row.original.is_unique && (
                      <TableIconCell
                        icon={MdOutline1XMobiledata}
                        tooltip="unique"
                      />
                    )}
                    {row.row.original.has_auto_increment && (
                      <TableIconCell
                        icon={MdHdrAuto}
                        tooltip="auto increment"
                      />
                    )}
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
