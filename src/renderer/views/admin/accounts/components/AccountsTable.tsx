import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  useBoolean,
  HStack,
} from '@chakra-ui/react';
import Card from 'renderer/components/card/Card';
import { FC, useMemo, useState } from 'react';
import { NestedPartial } from 'shared';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import ReactTimeAgo from 'react-time-ago';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { AccountsReducer, SessionReducer } from 'renderer/store/reducers';
import { AccountRO } from 'renderer/defenitions/record-object';
import { DatabaseIcon } from 'renderer/components/icons/DatabaseIcon';
import { AiFillDelete } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { ConfirmDeleteModal } from 'renderer/components/modals';
import { AccountsWizardModal } from 'renderer/containers/accounts/accountsWizard';
import { TableCardHeader } from 'renderer/containers/cards';

export const AccountsTable: FC<any> = () => {
  const accountsState = useAppSelector((state) => state.accounts);
  const sessionState = useAppSelector((state) => state.session);
  const [selected, setSelected] = useState<AccountRO[]>([]);

  const deleteModalOpenState = useBoolean(false);
  const [isDeleteModal, { on: deleteModalOpen }] = deleteModalOpenState;

  const addModalOpenState = useBoolean(false);
  const [isAddModal, { on: addModalOpen }] = addModalOpenState;

  const [editAccount, setEditAccount] = useState<AccountRO>();

  const dispatch = useAppDispatch();
  const accounts = useMemo(
    () => AccountsReducer.getSelectors().selectAll(accountsState),
    [accountsState]
  );

  const columns: { key: keyof AccountRO | 'actions'; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'client', label: 'Type' },
    { key: 'creationDate', label: 'Creation' },
    { key: 'modificationDate', label: 'Modification' },
    { key: 'actions', label: '' },
  ];

  const handleDeleteModal = (result: boolean | null) => {
    if (result) {
      dispatch(
        AccountsReducer.actions.removeMany(selected.map((item) => item.id))
      );
    }
  };

  const handleAddModal = (
    result: NestedPartial<AccountRO> | AccountRO | null
  ) => {
    if (result) {
      if (result.id) {
        dispatch(AccountsReducer.actions.updateOne(result as AccountRO));
      } else {
        dispatch(AccountsReducer.actions.addOne(result));
      }
    }
  };

  const handleConnect = (id: string) => {
    const account = AccountsReducer.getSelectors().selectById(
      accountsState,
      id
    );
    if (account) {
      dispatch(SessionReducer.actions.setAccount({ account }));
    }
  };

  const openEdit = (account: AccountRO) => {
    setEditAccount(account);
    addModalOpen();
  };

  const openAdd = () => {
    setEditAccount(undefined);
    addModalOpen();
  };

  return (
    <>
      <Card p={0} flexDirection="column" w="100%" overflowX={{ sm: 'hidden' }}>
        <TableCardHeader
          title="Account List"
          actionItems={[
            {
              props: {
                onClick: deleteModalOpen,
                isDisabled: selected.length === 0,
                fontSize: 'md',
                icon: <Icon as={AiFillDelete} w={5} h={5} display="flex" />,
              },
              text: 'Delete ',
            },
            {
              props: {
                onClick: openAdd,
                fontSize: 'md',
                icon: <Icon as={MdPersonAdd} w={5} h={5} display="flex" />,
              },
              text: 'Add ',
            },
          ]}
        />
        <Box>
          <ElectroCRUDTable<AccountRO>
            onSelectedItems={setSelected}
            data={accounts}
            columns={columns}
            customCell={(info) => {
              if (info.column.id === 'creationDate') {
                return <ReactTimeAgo date={info.getValue()} />;
              }
              if (info.column.id === 'modificationDate') {
                return <ReactTimeAgo date={info.getValue()} />;
              }
              if (info.column.id === 'client') {
                return (
                  <Badge variant="solid" colorScheme="brand">
                    <Flex alignItems="center">
                      <DatabaseIcon w={5} h={5} client={info.getValue()} />
                      <Text pl="10px" textTransform="uppercase">
                        {info.getValue()}
                      </Text>
                    </Flex>
                  </Badge>
                );
              }
              if (info.column.id === 'actions') {
                return (
                  <HStack>
                    <Button
                      variant="outline"
                      colorScheme="orange"
                      size="sm"
                      onClick={() => openEdit(info.row.original)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="brand"
                      size="sm"
                      onClick={() => handleConnect(info.row.original.id)}
                      isDisabled={
                        sessionState.account
                          ? sessionState.account.id === info.row.original.id &&
                            sessionState.isConnected
                          : false
                      }
                    >
                      Use
                    </Button>
                  </HStack>
                );
              }
              return undefined;
            }}
          />
        </Box>
      </Card>
      {isDeleteModal && (
        <ConfirmDeleteModal
          onModalClose={handleDeleteModal}
          entityName="Account/s"
          isModalOpenState={deleteModalOpenState}
        />
      )}
      {isAddModal && (
        <AccountsWizardModal
          onModalClose={handleAddModal}
          isModalOpenState={addModalOpenState}
          initialValue={editAccount || { connection: {} }}
        />
      )}
    </>
  );
};
