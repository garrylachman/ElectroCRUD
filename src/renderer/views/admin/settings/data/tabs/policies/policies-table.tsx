import { Badge, Box } from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import ReactTimeAgo from 'react-time-ago';
import {
  DataTableActionMenu,
  DataTableActionMenuItem,
} from 'renderer/components/tables/data-table-action-menu';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import {
  PolicyRuleTemplates,
  StrictPolicyRuleRO,
} from 'renderer/defenitions/record-object';
import { PoliciesReducer } from 'renderer/store/reducers';

type PoliciesTableProperties = {
  policyState: EntityState<StrictPolicyRuleRO>;
  handleEdit: (policy: StrictPolicyRuleRO) => Promise<any>;
  handleDelete: (policy: StrictPolicyRuleRO) => Promise<any>;
};

export const PoliciesTable: FC<PoliciesTableProperties> = ({
  policyState,
  handleEdit,
  handleDelete,
}) => {
  const data = useMemo(
    () =>
      PoliciesReducer.getSelectors()
        .selectAll(policyState)
        .map((item) => ({
          ...item,
          name: item.name,
          type: PolicyRuleTemplates.find(
            (policyType) => policyType.type === item.type
          )?.name,
          associated_tags: _.size(item.tags || []),
        })),
    [policyState, PolicyRuleTemplates]
  );

  const tableColumns: {
    key: string;
    label: string;
    style?: any;
    width?: string;
  }[] = [
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'type', label: 'Type', width: '20%' },
    { key: 'associated_tags', label: '# of Tags', width: '15%' },
    { key: 'creationDate', label: 'Creation', width: '15%' },
    { key: 'modificationDate', label: 'Modification', width: '15%' },
    {
      key: 'actions',
      label: '',
      style: { justifyContent: 'end', width: 'auto' },
    },
  ];

  const actionMenuActions: DataTableActionMenuItem[] = [
    {
      menuIcon: TbTrash,
      label: 'Delete',
      onClick: (row: StrictPolicyRuleRO) => handleDelete(row),
    },
    {
      menuIcon: TbEdit,
      label: 'Edit',
      onClick: (row: StrictPolicyRuleRO) => handleEdit(row),
    },
  ];

  return (
    <ElectroCRUDTable
      data={data}
      columns={tableColumns}
      hasScroll
      customCell={(row) => {
        if (row.column.id === 'associated_tags') {
          return (
            <Badge variant="subtle" colorScheme="primary">
              {row.getValue()}
            </Badge>
          );
        }
        if (row.column.id === 'creationDate') {
          return <ReactTimeAgo date={row.getValue()} />;
        }
        if (row.column.id === 'modificationDate') {
          return <ReactTimeAgo date={row.getValue()} />;
        }
        if (row.column.id === 'actions') {
          return (
            <Box>
              <DataTableActionMenu
                items={actionMenuActions}
                row={row.row.original}
              />
            </Box>
          );
        }
        // eslint-disable-next-line unicorn/no-useless-undefined
        return undefined;
      }}
    />
  );
};
