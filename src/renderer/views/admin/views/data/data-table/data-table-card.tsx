import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  ColorModeScript,
  Icon,
  useDimensions,
  ColorMode,
  ColorProps,
  Colors,
  useColorModeValue,
  Box,
  CardHeader,
  Text,
  VStack,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { AnimateComponent } from 'renderer/components/motions';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { ViewScopedContext } from 'renderer/contexts';
import DataTable, {
  createTheme,
  defaultThemes,
} from 'react-data-table-component';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { FaSortDown } from 'react-icons/fa';
import { MdOutlineDirectionsBoatFilled, MdSearch } from 'react-icons/md';
import { globalStyles } from 'renderer/theme/styles';
import {
  DashboardContextControlType,
  DashboardContextDataMetaType,
} from '../dashboard-context';
import _ from 'lodash';
import { useDebounce } from 'usehooks-ts';

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
        borderBottomColor: globalStyles.colors.brand[200],
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
  columns: any[];
  dataItems: any[];
  meta: DashboardContextDataMetaType;
  control: DashboardContextControlType;
};

export const DataTableCard: FC<DataTableCardProperties> = ({
  columns,
  dataItems,
  meta,
  control,
}) => {
  const [execute, setLimit, setPage, setOrder, setSearch] = control;
  const { viewState } = useContext(ViewScopedContext);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 1000);

  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue])

  const data = useMemo(() => dataItems, [dataItems]);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {};

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'red' }}
        icon
      >
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <>
      <Card variant="solid">
        <CardHeader>
          <HStack justifyContent="space-between">
            <Box>
            {viewState?.name}
            <Text display="flex" as="kbd" fontSize="sm" fontWeight="normal" color="gray.500">
              Displaying results from "{viewState.table}" table
            </Text>
          </Box>
          <Box>
            <InputGroup>
              <Input type='search' placeholder='Search...' variant="flushed" size="md" width="300px" onChange={(e) => setSearchValue(e.target.value)} />
              <InputRightElement children={<Icon as={MdSearch} />} />
            </InputGroup>
          </Box>
          </HStack>
        </CardHeader>
        <CardBody  px={0}>
          <DataTable
            columns={columns}
            data={data}
            selectableRows
            contextActions={contextActions}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{
              size: 'lg',
              colorScheme: 'brand',
            }}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
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
              setOrder({ column: selectedColumn.sortField, order: sortDirection })
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
      </Card>
    </>
  );
};
