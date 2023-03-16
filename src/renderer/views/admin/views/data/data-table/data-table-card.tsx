/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-nocheck
import { Box, CardBody, CardHeader, Center, Flex } from '@chakra-ui/react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeSortInfo } from '@inovua/reactdatagrid-community/types';
import {
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TbListDetails, TbTrash } from 'react-icons/tb';
import { TabsAPI } from '@electrocrud/tabs';
import { ViewScopedContext } from 'renderer/contexts';
import { usePolicy, useUpdateEffect } from 'renderer/hooks';
import { IPCChannelEnum, QueryOrder } from '@electrocrud/shared';
import { useDebounce } from 'usehooks-ts';

import { ConfirmPromiseDeleteModal } from 'renderer/components/modals';
import { useAppDispatch } from 'renderer/store/hooks';
import { useIPCDeleteData, useIPCUpdateData } from 'renderer/ipc';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { ToastReducer, ViewFiltersReducer } from 'renderer/store/reducers';
import { delay, get, head, isArray, isEqual, omit } from 'underscore';
import { useColumnsForTable } from '.';
import {
  DataTableActionMenu,
  DataTableActionMenuItem,
} from '@electrocrud/tables';
import { DataDetailsCard } from '../details';
import { DataTableHeader } from './data-table-header';
import { ConfirmPromiseFiltersModal } from 'renderer/components/modals';
import { InlineSpinner } from 'renderer/components/icons';
import { C } from 'ts-toolbelt';

type DataTableCardProperties = {
  tabsReference?: MutableRefObject<TabsAPI | undefined>;
};

export const DataTableCard: FC<DataTableCardProperties> = ({
  tabsReference,
}) => {
  const {
    dataGridColumns: columns,
    status,
    data,
    control,
    primaryKeyColumn,
    rawColumns,
  } = useColumnsForTable();
  const { rows: dataItems, meta } = data;
  const [isLoading, isExecuted] = status;

  const [
    execute,
    setLimit,
    setPage,
    setOrder,
    setSearch,
    setInternalFilter,
    setInited,
  ] = control;
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const gridReference = useRef();

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 1000);

  const setFilter = (name: string, value: string, close = false) => {
    setInternalFilter(value);
  };

  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleRowSelected = (selected) => {
    setSelectedRows(selected.selectedRows);
  };

  const handleDetails = (row) => {
    if (tabsReference) {
      tabsReference.current?.addTab({
        name: `Details #${row.remoteRowIndex}`,
        icon: TbListDetails,
        element: <DataDetailsCard data={row.data} />,
        closeable: true,
      });
    }
  };

  const [rowForDelete, setRowForDelete] = useState();

  const { execute: executeDelete, isExecuted: isDeleteExecuted } =
    useIPCDeleteData({
      channel: IPCChannelEnum.DELETE_DATA,
      body: {
        table: viewState?.table as string,
        where: [
          {
            column: get(primaryKeyColumn, 'name'),
            opr: '=',
            value: rowForDelete
              ? rowForDelete[primaryKeyColumn?.name]
              : undefined,
            or: false,
          },
        ],
      },
    });

  useUpdateEffect(() => {
    if (rowForDelete !== undefined) {
      delay(executeDelete, 250);
    }
  }, [rowForDelete]);

  useEffect(() => {
    if (isDeleteExecuted === true && rowForDelete !== undefined) {
      setRowForDelete();
      delay(execute, 1000);
      dispatch(
        ToastReducer.actions.setToast({
          status: 'success',
          title: `Delete success`,
          description: `Row has been deleted`,
        })
      );
    }
  }, [isDeleteExecuted]);

  const handleDelete = async (row: Record<string, any>) => {
    const pk = get(primaryKeyColumn, 'name');
    if (!pk) {
      return;
    }
    if (row) {
      try {
        const result = await ConfirmPromiseDeleteModal({
          entityName: `Row ID: ${get(row.data, pk) as string | number}`,
        });
        if (result) {
          setRowForDelete(row.data);
        }
      } catch {
        dispatch(
          ToastReducer.actions.setToast({
            status: 'error',
            title: `Delete success`,
            description: `Error while delete row`,
          })
        );
      }
    }
  };

  const [rowForUpdate, setRowForUpdate] = useState<Record<string, any>>();

  const { execute: executeUpdate, isExecuted: isUpdateExecuted } =
    useIPCUpdateData({
      channel: IPCChannelEnum.UPDATE_DATA,
      body: {
        table: viewState?.table as string,
        update: omit(rowForUpdate, [get(primaryKeyColumn, 'name')]),
        where: [
          {
            column: get(primaryKeyColumn, 'name'),
            opr: '=',
            value: rowForUpdate
              ? rowForUpdate[primaryKeyColumn?.name]
              : undefined,
            or: false,
          },
        ],
      },
    });

  useEffect(() => {
    if (rowForUpdate !== undefined) {
      delay(executeUpdate, 250);
    }
  }, [rowForUpdate]);

  useEffect(() => {
    if (isUpdateExecuted === true && rowForUpdate !== undefined) {
      setRowForUpdate();
      dispatch(
        ToastReducer.actions.setToast({
          status: 'success',
          title: `Update success`,
          description: `The column has been updated`,
        })
      );
      delay(execute, 1000);
    }
  }, [isUpdateExecuted]);

  const onEditComplete = useCallback(
    ({ value, columnId, rowId, data }) => {
      const pk = get(primaryKeyColumn, 'name');
      const row = dataItems.find((r) => r[pk] === rowId);
      const oldValue = get(row, columnId);
      if (isEqual(oldValue, value)) {
        return;
      }
      setRowForUpdate({
        ...row,
        [columnId]: value,
      });
    },
    [dataItems]
  );

  const dataTableActionMenuActions: DataTableActionMenuItem[] = [
    {
      menuIcon: TbListDetails,
      label: 'Details',
      onClick: handleDetails,
      tooltip: 'Row Details Page',
    },
    {
      menuIcon: TbTrash,
      label: 'Delete',
      onClick: handleDelete,
      isDisabled: !viewState?.permissions.delete,
      tooltip: viewState?.permissions.delete
        ? 'Delete Row'
        : 'No Delete Permissions',
    },
  ];

  const columnsWithMenu = useMemo(
    () => [
      ...columns,
      {
        render: (value: Record<string, any>) => (
          <DataTableActionMenu items={dataTableActionMenuActions} row={value} />
        ),
        name: '__actions__',
        header: '',
        sortable: false,
        showInContextMenu: false,
        editable: false,
        cellSelectable: false,
        width: 60,
        resizable: false,
        textAlign: 'center',
      },
    ],
    [columns, tabsReference]
  );

  const maskedData = usePolicy(rawColumns as unknown as ColumnRO[], dataItems);

  const loadData = async ({ skip, limit, sortInfo }) => {
    return { data: maskedData, count: meta.totalCount };
  };

  const dataSource = useCallback(loadData, [maskedData]);

  const filtersModal = () => {
    ConfirmPromiseFiltersModal(viewState)
      .then((v: { action: string; value: Record<string, string> }) => {
        switch (v.action) {
          case 'apply': {
            setFilter(v.value.name, JSON.parse(v.value.value));
            return;
          }
          case 'save-and-apply': {
            const newFilter = dispatch(
              ViewFiltersReducer.actions.upsertOne({
                name: v.value.name,
                viewId: viewState?.id,
                knexFilter: v.value.value,
              })
            );
            console.log(newFilter);
            if (newFilter && newFilter.payload.knexFilter) {
              setFilter(
                newFilter.payload.name,
                JSON.parse(newFilter.payload.knexFilter)
              );
            }
            return;
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 1500);
  }, []);

  return (
    <Box p={0} m={0} flex={1} display="flex" flexDirection="column" h="100%">
      <CardHeader py={0}>
        <DataTableHeader
          setInternalFilter={setInternalFilter}
          setSearchValue={setSearchValue}
          openFiltersModal={filtersModal}
        />
      </CardHeader>

      <CardBody px={0} pb={0}>
        {!isExecuted && (
          <Flex flexDirection="column" h="100%" justifyContent="space-around">
            <InlineSpinner />
          </Flex>
        )}
        {isExecuted && dataItems && (
          <ReactDataGrid
            idProperty={primaryKeyColumn?.name}
            useNativeFlex
            checkboxColumn={primaryKeyColumn !== undefined}
            virtualized
            enableColumnAutosize
            scrollProps={{
              alwaysShowTrack: true,
              hideNativeScrollbarIfPossible: true,
              resizer: true,
              usePassiveScroll: false,
              showScrollbarsOnOver: true,
              showScrollbars: true,
              autoHide: true,
              scrollThumbRadius: '10px',
              scrollThumbStyle: {
                opacity: 1,
              },
            }}
            nativeScroll={false}
            onReady={(reference) => {
              // @ts-ignore
              gridReference.current = reference;
            }}
            loading={isLoading}
            pagination="remote"
            limit={meta.limit}
            skip={Math.max((meta.page - 1) * meta.limit, 0)}
            onLimitChange={setLimit}
            onSkipChange={(skip) => setPage(Math.max(skip / meta.limit, 0) + 1)}
            defaultLimit={meta.limit}
            style={{ position: 'relative', height: '100%' }}
            editable={
              primaryKeyColumn !== undefined && viewState?.permissions.update
            }
            onEditComplete={onEditComplete}
            dataSource={dataSource}
            columns={columnsWithMenu}
            rowStyle={{
              zIndex: 0,
            }}
            onSortInfoChange={(sortInfo: TypeSortInfo) => {
              const sort = isArray(sortInfo) ? head(sortInfo) : sortInfo;
              if (sortInfo) {
                setOrder({
                  column: `${viewState?.table as string}.${sort?.name}`,
                  order: sort?.dir === 1 ? 'asc' : 'desc',
                } as QueryOrder);
              } else {
                // @ts-ignore
                setOrder();
              }
            }}
          />
        )}
      </CardBody>
    </Box>
  );
};
