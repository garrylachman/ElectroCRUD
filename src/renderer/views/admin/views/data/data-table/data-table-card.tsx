import {
  Box,
  Button,
  CardBody,
  CardHeader,
  Checkbox,
  Icon,
  InputElementProps,
  Text,
  withDelay,
} from '@chakra-ui/react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeSortInfo } from '@inovua/reactdatagrid-community/types';
import _, { delay } from 'lodash';
import * as R from 'ramda';
import {
  FC,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaSortDown } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { TbEdit, TbListDetails, TbTrash } from 'react-icons/tb';
import { ElectroCRUDTabsAPI } from 'renderer/components/tabs';
import { FilterBuilder } from 'renderer/containers/filter-builder';
import { ViewScopedContext } from 'renderer/contexts';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { usePolicy, useUpdateEffect } from 'renderer/hooks';
import { globalStyles } from 'renderer/theme/styles';
import { IPCChannelEnum, QueryOrder } from 'shared';
import { useDebounce } from 'usehooks-ts';

import { ConfirmPromiseDeleteModal } from 'renderer/components/modals';
import { useAppDispatch } from 'renderer/store/hooks';
import { useIPCDeleteData } from 'renderer/ipc';
import { useColumnsForTable } from '.';
import {
  DataTableActionMenu,
  DataTableActionMenuItem,
} from '../../../../../components/tables/data-table-action-menu';
import { DataDetailsCard } from '../details';
import { DataTableHeader } from './data-table-header';
import { ColumnRO } from 'renderer/defenitions/record-object';

type DataTableCardProperties = {
  tabsReference?: MutableRefObject<ElectroCRUDTabsAPI | undefined>;
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
  const [isLoading] = status;

  const [execute, setLimit, setPage, setOrder, setSearch, setInternalFilter] =
    control;
  const { viewState } = useContext(ViewScopedContext);
  const disoatch = useAppDispatch();
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
            column: _.get(primaryKeyColumn, 'name'),
            opr: '=',
            value: rowForDelete ? rowForDelete[primaryKeyColumn?.name] : undefined,
            or: false,
          },
        ],
      },
    });

  useUpdateEffect(() => {
    _.delay(executeDelete, 1000);
  }, [rowForDelete]);

  useUpdateEffect(() => {
    _.delay(execute, 1000);
  }, [isDeleteExecuted]);

  const handleDelete = async (row: Record<string, any>) => {
    const pk = _.get(primaryKeyColumn, 'name');
    if (!pk) {
      return;
    }
    if (row) {
      try {
        const result = await ConfirmPromiseDeleteModal({
          entityName: `Row ID: ${_.get(row.data, pk) as string | number}`,
        });
        if (result) {
          setRowForDelete(row.data);
        }
      } catch {
        /* empty */
      }
    }
  };

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
    {
      menuIcon: TbEdit,
      label: 'Edit',
      onClick: () => {},
      isDisabled: !viewState?.permissions.update,
      tooltip: viewState?.permissions.delete
        ? 'Edit Row'
        : 'No Update Permissions',
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

  return (
    <Box p={0} m={0} flex={1} display="flex" flexDirection="column" h="100%">
      <CardHeader py={0}>
        <DataTableHeader
          setInternalFilter={setInternalFilter}
          setSearchValue={setSearchValue}
          setAddFilterBox={setAddFilterBox}
        />
      </CardHeader>

      <CardBody px={0} pb={0}>
        {addFilterBox && (
          <Box px={5} pb={5}>
            <FilterBuilder setFilter={setFilter} />
          </Box>
        )}
        {dataItems && (
          <ReactDataGrid
            idProperty={primaryKeyColumn?.name}
            useNativeFlex
            checkboxColumn
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
            loading={isLoading}
            pagination="remote"
            limit={meta.limit}
            skip={Math.max((meta.page - 1) * meta.limit, 0)}
            onLimitChange={setLimit}
            onSkipChange={(skip) => setPage(Math.max(skip / meta.limit, 0) + 1)}
            defaultLimit={meta.limit}
            style={{ position: 'relative', height: '100%' }}
            dataSource={dataSource}
            columns={columnsWithMenu}
            rowStyle={{
              zIndex: 0,
            }}
            onSortInfoChange={(sortInfo: TypeSortInfo) => {
              const sort = _.isArray(sortInfo) ? _.head(sortInfo) : sortInfo;
              if (sortInfo) {
                setOrder({
                  column: sort?.name,
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
