import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { TbEdit, TbLayout2, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { AddButton } from '@electrocrud/buttons';
import { ConfirmPromiseDeleteModal } from 'renderer/components/modals';
import {
  DataTable,
  DataTableActionMenu,
  DataTableActionMenuItem,
} from '@electrocrud/tables';
import { StrictViewRO, ViewRO } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ViewsReducer } from 'renderer/store/reducers';

import { AddPromiseModal } from './add-modal';

export type ViewsListTableProperties = {
  viewsState: StrictViewRO[];
};

export const ViewsListTable: FC<ViewsListTableProperties> = ({
  viewsState,
}) => {
  const sessionState = useAppSelector((state) => state.session);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const tableColumns: {
    key: keyof ViewRO | 'actions';
    label: string;
    group?: string;
    style?: any;
    width?: string;
  }[] = [
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'creationDate', label: 'Created', width: '25%' },
    { key: 'modificationDate', label: 'Modification', width: '25%' },
    {
      key: 'actions',
      label: '',
      width: 'auto',
      style: { justifyContent: 'end', width: 'auto' },
    },
  ];

  const handleDelete = (row: StrictViewRO) => {
    ConfirmPromiseDeleteModal({ entityName: row.name })
      .then(() => dispatch(ViewsReducer.actions.removeOne(row.id)))
      .catch(() => {});
  };

  const handleEdit = (row: StrictViewRO) =>
    navigate(`/admin/views/${row.id}/edit`);

  const handleView = (row: StrictViewRO) =>
    navigate(`/admin/views/${row.id}/dashboard`);

  const handleAdd = () => {
    AddPromiseModal()
      .then((data) => {
        if (sessionState.account) {
          const result = dispatch(
            ViewsReducer.actions.addOne({
              ...data,
              accountId: sessionState.account?.id,
              terminology: {
                singular: data.name,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                plural: `${data.name}s`,
              },
              permissions: {
                create: true,
                read: true,
                delete: true,
                update: true,
              },
            })
          );
          navigate(`/admin/views/${result.payload.id}/edit`);
        }
        // eslint-disable-next-line no-useless-return
        return;
      })
      .catch(() => {});
  };

  const actionMenuActions: DataTableActionMenuItem[] = [
    {
      menuIcon: TbTrash,
      label: 'Delete',
      onClick: (row: StrictViewRO) => handleDelete(row),
    },
    {
      menuIcon: TbEdit,
      label: 'Edit',
      onClick: (row: StrictViewRO) => handleEdit(row),
    },
    {
      menuIcon: TbLayout2,
      label: 'View',
      onClick: (row: StrictViewRO) => handleView(row),
    },
  ];

  return (
    <Card variant="elevated" flex={1}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>Views</Text>
          <AddButton onClick={handleAdd} />
        </Flex>
      </CardHeader>
      <CardBody px={0}>
        <DataTable<ViewRO>
          data={viewsState}
          columns={tableColumns}
          hasScroll
          customCell={(info) => {
            if (info.column.id === 'creationDate') {
              return <ReactTimeAgo date={info.getValue()} />;
            }
            if (info.column.id === 'modificationDate') {
              return <ReactTimeAgo date={info.getValue()} />;
            }
            if (info.column.id === 'actions') {
              return (
                <Box>
                  <DataTableActionMenu
                    items={actionMenuActions}
                    row={info.row.original}
                  />
                </Box>
              );
            }
            // eslint-disable-next-line unicorn/no-useless-undefined
            return undefined;
          }}
        />
      </CardBody>
    </Card>
  );
};
