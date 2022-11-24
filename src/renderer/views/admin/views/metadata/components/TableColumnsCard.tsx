import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  HStack,
  Tag,
  TagLeftIcon,
  Switch,
  Heading,
  Highlight,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { NestedPartial, TableInfoRow } from 'shared';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import ReactTimeAgo from 'react-time-ago';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { DatabaseIcon } from 'renderer/components/icons/DatabaseIcon';
import { TableCardHeader } from 'renderer/containers/cards';
import { MdDone, MdClose, MdVpnKey } from 'react-icons/md';
import { TableBooleanCell } from 'renderer/components/tables/customCells';

type TableColumnsCardProps = {
  initialState?: ColumnRO[];
  update: (data: ColumnRO[]) => void;
  table: string;
  isLoaded?: boolean;
};

export const TableColumnsCard: FC<TableColumnsCardProps> = ({
  initialState = [],
  update,
  table,
  isLoaded = true,
}) => {
  const [data, setData] = useState<ColumnRO[]>(initialState);
  useEffect(() => {
    setData(initialState);
  }, [initialState]);

  const updateColumn = useCallback(
    (column: ColumnRO, changes: Partial<ColumnRO>) => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          ...(item.name === column.name ? changes : {}),
        }))
      );
    },
    [setData]
  );

  useEffect(() => {
    update(data);
  }, [data]);

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
          <SkeletonText isLoaded={isLoaded} noOfLines={2} spacing={3}>
            <Highlight
              query={table}
              styles={{ px: 2, py: '1', rounded: 'full', bg: 'brand.100' }}
            >
              {`Columns of ${table} table`}
            </Highlight>
          </SkeletonText>
        </Heading>
        <Box px={isLoaded ? 0 : 5}>
          <ElectroCRUDTable<ColumnRO>
            isLoaded={isLoaded}
            data={data}
            columns={tableColumns}
            customCell={(info) => {
              if (info.column.id === 'key' && info.getValue() === 'PRI') {
                return (
                  <Tag variant="subtle" colorScheme="cyan">
                    <TagLeftIcon as={MdVpnKey} me={0} />
                  </Tag>
                );
              }
              if (info.column.id === 'nullable') {
                return <TableBooleanCell value={info.getValue()} />;
              }
              if (
                info.column.id === 'enabled' ||
                info.column.id === 'searchable'
              ) {
                return (
                  <Switch
                    size="sm"
                    defaultChecked={info.getValue()}
                    onChange={() =>
                      updateColumn(info.row.original, {
                        [info.column.id]: !info.getValue(),
                      })
                    }
                  />
                );
              }
              return undefined;
            }}
          />
        </Box>
      </Card>
    </>
  );
};
