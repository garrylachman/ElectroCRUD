import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  ColorMode,
  ColorModeScript,
  ColorProps,
  Colors,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useDimensions,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DataTable, {
  createTheme,
  defaultThemes,
} from 'react-data-table-component';
import { FaSortDown } from 'react-icons/fa';
import {
  MdFilterAlt,
  MdOutlineDirectionsBoatFilled,
  MdSearch,
} from 'react-icons/md';
import {
  ActionsDropdownMenu,
} from 'renderer/components/buttons/actions-dropdown-menu';
import { CardHeaderBetter } from 'renderer/components/card/CardHeader';
import { AnimateComponent } from 'renderer/components/motions';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { FilterBuilder } from 'renderer/containers/filter-builder';
import { ViewScopedContext } from 'renderer/contexts';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { globalStyles } from 'renderer/theme/styles';
import { useDebounce } from 'usehooks-ts';
import { v4 } from 'uuid';

import {
  DashboardContextControlType,
  DashboardContextDataMetaType,
} from '../dashboard-context';

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
  }, [debouncedSearchValue]);

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

  const actions = useMemo(
    () => [
      {
        props: {
          onClick: () => {},
          fontSize: 'md',
          icon: <Icon as={MdFilterAlt} w={6} h={6} display="flex" />,
        },
        text: 'New Filter',
      },
    ],
    []
  );

  return (
    <>
      <Card variant="solid">
        <CardHeader>
          <VStack>
            <HStack justifyContent="space-between" width="100%">
              <Box>
                {viewState?.name}
                <Text
                  display="flex"
                  as="kbd"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.500"
                >
                  Displaying results from "{viewState.table}" table
                </Text>
              </Box>
              <HStack gap={5}>
                <InputGroup w="auto">
                  <Input
                    type="search"
                    placeholder="Search..."
                    variant="flushed"
                    size="md"
                    width="300px"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <InputRightElement children={<Icon as={MdSearch} />} />
                </InputGroup>
                <ActionsDropdownMenu menuName="Filters" items={actions} />
              </HStack>
            </HStack>
          </VStack>
        </CardHeader>

        <CardBody px={0}>
          <Box px={5} pb={5}>
            <FilterBuilder
              groups={[
                {
                  id: v4(),
                  conds: [
                    {
                      id: v4(),
                      column: undefined,
                      opr: undefined,
                      value: undefined,
                    },
                  ],
                  and: true,
                  groups: [],
                },
              ]}
            />
          </Box>
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
      </Card>
    </>
  );
};
