import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  HStack,
  Icon,
  Input,
  InputElementProps,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import _ from 'lodash';
import memoize from 'proxy-memoize';
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { FaSortDown } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import {
  MdDeleteForever,
  MdFilterAlt,
  MdFilterList,
  MdReplay,
  MdSearch,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  ActionsDropdownMenu,
} from 'renderer/components/buttons/actions-dropdown-menu';
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import {
  ConfirmPromiseDeleteModal,
} from 'renderer/components/modals/confirm-promise-delete-modal';
import {
  ConfirmPromiseModal,
} from 'renderer/components/modals/confirm-promise-modal';
import { FilterBuilder } from 'renderer/containers/filter-builder';
import { ViewScopedContext } from 'renderer/contexts';
import { ViewFilterRO } from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { ViewFiltersReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';
import { globalStyles } from 'renderer/theme/styles';
import { useDebounce } from 'usehooks-ts';

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
  const [execute, setLimit, setPage, setOrder, setSearch, setInternalFilter] =
    control;
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();
  const [addFilterBox, setAddFilterBox] = useState<boolean>(false);

  const viewFilterState = useSelector<RootState, ViewFilterRO[]>((state) =>
    memoize((viewFiltersState: EntityState<ViewFilterRO>) =>
      ViewFiltersReducer.getSelectors().selectAll(viewFiltersState)
    )(state.viewsFilter)
  );

  const thisViewFilters = useMemo(
    () => viewFilterState.filter((f) => f.viewId === viewState?.id),
    [viewState?.id, viewFilterState]
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

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

  const contextActions = useMemo(() => {
    const handleDelete = () => {};

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'red' }}
      >
        Delete
      </Button>
    );
  }, [data, selectedRows]);

  const actions = useMemo(
    () => [
      {
        props: {
          onClick: () => setAddFilterBox(true),
          fontSize: 'md',
          icon: <Icon as={MdFilterAlt} w={6} h={6} display="flex" />,
        },
        text: 'New Filter',
      },
      ...thisViewFilters.map((vFilter) => ({
        props: {
          onClick: () => setInternalFilter(JSON.parse(vFilter.knexFilter)),
          fontSize: 'sm',
          icon: <Icon as={MdFilterList} w={5} h={5} display="flex" />,
          pl: 5,
        },
        text: (
          <HStack justifyContent="space-between" pointerEvents="all">
            <Text fontWeight="bold">{vFilter.name}</Text>
            <RippleButton
              bgColor={{
                step1: 'red.300',
                step2: 'red.600',
                step3: 'red.900',
              }}
              onClick={(e) => {
                e.stopPropagation();
                ConfirmPromiseDeleteModal({ entityName: vFilter.name })
                  .then((value) => {
                    if (value && vFilter?.id) {
                      dispatch(
                        ViewFiltersReducer.actions.removeOne(vFilter?.id)
                      );
                    }
                    // eslint-disable-next-line unicorn/no-useless-undefined
                    setInternalFilter(undefined);
                    return true;
                  })
                  .catch(() => {});
                // ;
              }}
              size="xs"
              rounded={50}
              boxSize={8}
            >
              <Icon as={MdDeleteForever} boxSize={5} />
            </RippleButton>
          </HStack>
        ),
      })),
      {
        props: {
          onClick: () => setInternalFilter(),
          fontSize: 'md',
          icon: <Icon as={MdReplay} w={6} h={6} display="flex" />,
        },
        text: 'Clear Selected',
      },
    ],
    [thisViewFilters]
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
          {addFilterBox && (
            <Box px={5} pb={5}>
              <FilterBuilder setFilter={setFilter} />
            </Box>
          )}
          <DataTable
            columns={columns}
            data={data}
            selectableRows
            contextActions={contextActions}
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
              colorScheme: 'brand',
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
      </Card>
    </>
  );
};
