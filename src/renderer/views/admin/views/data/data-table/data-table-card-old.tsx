import {
  Box,
  CardBody,
  CardHeader,
  Checkbox,
  Icon,
  InputElementProps,
  Text,
} from '@chakra-ui/react';
import _ from 'lodash';
import {
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { FaSortDown } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { TbEdit, TbListDetails, TbTrash } from 'react-icons/tb';
import { ElectroCRUDTabsAPI } from 'renderer/components/tabs';
import { FilterBuilder } from 'renderer/containers/filter-builder';
import { ViewScopedContext } from 'renderer/contexts';
import { globalStyles } from 'renderer/theme/styles';
import { useDebounce } from 'usehooks-ts';

import { useColumnsForTable } from '.';
import {
  DataTableActionMenu,
  DataTableActionMenuItem,
} from '../../../../../components/tables/data-table-action-menu';
import { DataTableHeader } from './data-table-header';

createTheme(
  'electrocrud',
  {
    head: {
      style: {
        color: {
          text: {
            primary: globalStyles.colors.gray['100'],
            secondary: globalStyles.colors.secondaryGray['100'],
          },
        },
        fontSize: '0.75em',
        fontWeight: 500,
      },
    },
    headRow: {
      style: {
        backgroundColor: globalStyles.colors.secondaryGray[400],
        minHeight: '40px',
        borderBottomWidth: '1px',
        borderBottomColor: globalStyles.colors.primary[200],
        borderBottomStyle: 'solid',
      },
      denseStyle: {
        minHeight: '32px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        fontSize: '0.75rem',
      },
      draggingStyle: {
        cursor: 'move',
      },
    },
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  },
  'light'
);

type DataTableCardProperties = {
  tabsReference?: MutableRefObject<ElectroCRUDTabsAPI | undefined>;
};

export const DataTableCard: FC<DataTableCardProperties> = ({
  tabsReference,
}) => {
  const { columns, status, data: data_, control } = useColumnsForTable();
  const { rows: dataItems, meta } = data_;

  const [execute, setLimit, setPage, setOrder, setSearch, setInternalFilter] =
    control;
  const { viewState } = useContext(ViewScopedContext);
  const [addFilterBox, setAddFilterBox] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 1000);

  const setFilter = (name: string, value: string, close = false) => {
    setInternalFilter(value);
    if (close) {
      setAddFilterBox(false);
    }
  };

  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const data = useMemo(() => dataItems, [dataItems]);

  const handleRowSelected = (selected) => {
    console.log('selected', selected);
    setSelectedRows(selected.selectedRows);
  };

  const handleDetails = (row) => {
    if (tabsReference) {
      tabsReference.current?.addTab({
        name: 'new tab',
        icon: TbListDetails,
        element: <Text>Details</Text>,
      });
    }
  };

  const dataTableActionMenuActions: DataTableActionMenuItem[] = [
    { menuIcon: TbListDetails, label: 'Details', onClick: handleDetails },
    { menuIcon: TbTrash, label: 'Delete' },
    { menuIcon: TbEdit, label: 'Edit' },
  ];

  const columnsWithMenu = useMemo(
    () => [
      ...columns,
      {
        cell: (row) => (
          <DataTableActionMenu items={dataTableActionMenuActions} row={row} />
        ),
        allowOverflow: true,
        button: true,
        width: '50px',
      },
    ],
    [columns, tabsReference]
  );

  return (
    <Box p={0} m={0}>
      <CardHeader>
        <DataTableHeader
          setInternalFilter={setInternalFilter}
          setSearchValue={setSearchValue}
          setAddFilterBox={setAddFilterBox}
        />
      </CardHeader>

      <CardBody px={0}>
        {addFilterBox && (
          <Box px={5} pb={5}>
            <FilterBuilder setFilter={setFilter} />
          </Box>
        )}
        <DataTable
          columns={columnsWithMenu}
          data={data}
          selectableRows
          keyField={columns[0].sortField}
          selectableRowsComponent={(
            properties: InputElementProps
          ): ReactNode => (
            <Checkbox
              {...properties}
              isChecked={properties.checked}
              isDisabled={properties.disabled}
              inputProps={{
                onChange: properties.onChange,
                onClick: properties.onClick,
              }}
            />
          )}
          selectableRowsComponentProps={{
            size: 'lg',
            colorScheme: 'primary',
            icon: <Icon as={GiCheckMark} boxSize={3.5} />,
          }}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows
          pagination
          progressPending={data === undefined}
          sortIcon={
            <Box mx={1}>
              <Icon as={FaSortDown} />
            </Box>
          }
          paginationServer
          paginationTotalRows={meta.totalCount}
          onChangeRowsPerPage={setLimit}
          onChangePage={setPage}
          highlightOnHover
          selectableRowsHighlight
          persistTableHead
          sortServer
          onSort={(selectedColumn, sortDirection, sortedRows) =>
            setOrder({
              column: selectedColumn.sortField,
              order: sortDirection,
            })
          }
          customStyles={{
            headCells: {
              style: {
                backgroundColor: '#F7FAFC',
                borderColor: globalStyles.colors.secondaryGray[50],
                borderTopWidth: '1px',
                borderBottomWidth: '0px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4a5568',
              },
            },
            rows: {
              style: {
                height: '73px',
                color: '#4a5568',
                fontSize: '0.80rem',
                borderColor: globalStyles.colors.secondaryGray[50],
              },
            },
          }}
        />
      </CardBody>
    </Box>
  );
};
