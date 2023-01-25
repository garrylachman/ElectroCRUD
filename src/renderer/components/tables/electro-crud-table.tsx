import {
  Checkbox,
  CheckboxProps,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import CSS from 'csstype';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ElectroCRUDTableHeader = {
  key: string;
  label: string;
  group?: string;
};

type CustomCellReturn = ReactElement;

type ElectroCRUDTableProperties<T> = {
  data: T[];
  columns: ElectroCRUDTableHeader[];
  customCell?: (
    info: CellContext<T, any>
  ) => CustomCellReturn | void | undefined;
  onSelectedItems?: (items: T[]) => void;
  isLoaded?: boolean;
  hasScroll?: boolean;
};

const hasScrollBodyProperties = {
  overflow: 'scroll',
  position: 'absolute',
  height: '-webkit-fill-available',
  width: '-webkit-fill-available',
};

const hasScrollHeadProperties = {
  paddingRight: '18px',
};

const TableHeader: FC<PropsWithChildren<{ style?: any }>> = ({
  children,
  ...rest
}) => (
  <Text
    justifyContent="space-between"
    fontSize={{ sm: '10px', lg: '12px' }}
    color="gray.400"
    as="div"
    {...rest}
  >
    {children}
  </Text>
);

const TableCell: FC<PropsWithChildren & { textColor: CSS.Property.Color }> = ({
  children,
  textColor,
  ...rest
}) => (
  <Flex alignItems="center" {...rest}>
    <Text color={textColor} fontSize="sm" fontWeight="700" as="div">
      {children}
    </Text>
  </Flex>
);

const IndeterminateCheckbox: FC<CheckboxProps> = ({ ...rest }) => (
  <Flex alignItems="center">
    <Checkbox colorScheme="primary" size="lg" {...rest} />
  </Flex>
);

export const ElectroCRUDTable = <TT extends Record<string, any>>(
  properties: ElectroCRUDTableProperties<TT>
) => {
  const {
    data,
    columns,
    customCell,
    onSelectedItems,
    isLoaded = true,
    hasScroll = false,
  } = properties;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const columnHelper = createColumnHelper<TT>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  useEffect(() => {
    if (onSelectedItems) {
      onSelectedItems(
        Object.keys(rowSelection).map((value) => data[Number(value)])
      );
    }
  }, [rowSelection, data, onSelectedItems]);

  const tableColumns = useMemo<ColumnDef<TT>[]>(() => {
    return [
      ...(onSelectedItems
        ? [
            columnHelper.accessor('select' as any, {
              id: 'select',
              enableSorting: false,
              header: ({ table }) => (
                <IndeterminateCheckbox
                  {...{
                    isChecked: table.getIsAllPageRowsSelected(),
                    isIndeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                  }}
                />
              ),
              cell: ({ row }) => (
                <IndeterminateCheckbox
                  {...{
                    isChecked: row.getIsSelected(),
                    isIndeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              ),
            }),
          ]
        : []),
    ].concat(
      columns.map((col, colIndex) => {
        return columnHelper.accessor(col.key as any, {
          id: col.key,
          meta: col.group || '',
          header: () => (
            <TableHeader
              style={
                colIndex === columns.length - 1 ? hasScrollHeadProperties : {}
              }
            >
              <Text color="gray.700">{col.label}</Text>
            </TableHeader>
          ),
          cell: (info) => (
            <TableCell textColor={textColor} {...col?.style}>
              <Text fontWeight="normal">
                {customCell === undefined ? (
                  <>{info.getValue()}</>
                ) : (
                  customCell(info) || <>{info.getValue()}</>
                )}
              </Text>
            </TableCell>
          ),
        });
      })
    );
  }, [onSelectedItems, columnHelper, columns, textColor, customCell]);

  const groupedTableColumns = useMemo(() => {
    if (_.uniq(columns.map((col) => col.group)).length === 1) {
      return tableColumns;
    }
    const group = _.groupBy(tableColumns, 'meta');
    return _.reduce(
      group,
      (result: unknown[], value, key) => {
        result.push({ header: key, columns: value });
        return result;
      },
      []
    );
  }, [columns, tableColumns]);

  const table = useReactTable({
    data,
    columns: groupedTableColumns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  return (
    <Table variant="unstyled" color="gray.500">
      <Thead {...hasScrollHeadProperties}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr
            key={`hear-${headerGroup.id}`}
            color="gray.400"
            backgroundColor={
              table.getHeaderGroups().length - 1 === headerGroup.depth
                ? 'primary.50'
                : ''
            }
            boxShadow={
              table.getHeaderGroups().length - 1 === headerGroup.depth
                ? 'inset 0 1px 0 0 var(--chakra-colors-primary-200),inset 0-1px 0 0 var(--chakra-colors-primary-200);'
                : ''
            }
          >
            {headerGroup.headers.map((header) => {
              return (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  borderColor={borderColor}
                  borderRightWidth={header.subHeaders.length > 0 ? 1 : 0}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                  fontSize={{ sm: '10px', lg: '12px' }}
                  color="gray.600"
                  fontWeight="normal"
                  width={columns[header.index]?.width}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: '',
                    desc: '',
                  }[header.column.getIsSorted() as string] ?? null}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody {...(hasScroll ? hasScrollBodyProperties : {})}>
        {table.getRowModel().rows.map((row, rowIndex) => {
          return (
            <Tr
              key={row.id}
              as={motion.tr}
              boxShadow={
                rowIndex === table.getRowModel().rows.length - 1
                  ? ''
                  : 'inset 0-1px 0 0 #DFE5EB'
              }
              initial={{ opacity: 0, y: -1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1 }}
              transition={{
                duration: 1,
                type: 'spring',
              }}
            >
              {row.getVisibleCells().map((cell, cellIndex) => {
                return (
                  <Td
                    key={`cell-${cell.id}`}
                    fontSize={{ sm: '14px' }}
                    borderColor="transparent"
                    width={columns[cellIndex]?.width}
                    fontWeight="normal"
                    pe="0px"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};