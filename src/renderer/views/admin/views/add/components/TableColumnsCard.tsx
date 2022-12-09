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
  Spinner,
  VStack,
  Text,
  CardBody,
  Card,
  CardHeader,
  HStack,
} from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { IPCChannelEnum } from 'shared';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { MdVpnKey, MdOutline1XMobiledata, MdHdrAuto } from 'react-icons/md';
import { TableBooleanCell, TableIconCell } from 'renderer/components/tables/customCells';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ColumnsReducer, ViewsReducer } from 'renderer/store/reducers';
import _, { size } from 'lodash';
import { useIPCTableInfo } from 'renderer/ipc';
import { ViewSelectors } from 'renderer/store/selectors';
import { useSelector } from 'react-redux';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { RxTextNone } from 'react-icons/rx';

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

  /*name: string;
  table: string;
  data_type: string;
  default_value?: string;
  max_length?: number;
  numeric_precision?: number;
  numeric_scale?: number;
  is_nullable: boolean;
  is_unique: boolean;
  is_primary_key: boolean;
  is_generated: boolean;
  generation_expression?: string;
  has_auto_increment: boolean;
  foreign_key_table?: string;
  foreign_key_column?: string;
  comment?: string;
  schema?: string;
  foreign_key_schema?: string;*/

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
      <Card variant="solid">
        <CardBody>
        <Center>
          <VStack>
            <Spinner size="xl" thickness='6px' color='brand.300' />
            <Text fontSize='lg'>Analyzing "{viewState?.table}" table...</Text>
          </VStack>
        </Center>
      </CardBody>
    </Card>);
  }

  return (
    <>
      <Card variant="solid">
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
