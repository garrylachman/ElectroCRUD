/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Icon,
  Kbd,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import memoize from 'proxy-memoize';
import { useCallback, useContext, useMemo } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  AddButton,
  DeleteIconButton,
  EditIconButton,
} from '@electrocrud/buttons';
import { ConfirmPromiseDeleteModal } from 'renderer/components/modals/confirm-promise-delete-modal';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';
import {
  ColumnReferanceRO,
  ColumnRO,
  StrictColumnReferanceWithViewsAndCoumnsRO,
} from 'renderer/defenitions/record-object/view.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReferanceReducer } from 'renderer/store/reducers';
import {
  ColumnReferenceSelectors,
  ColumnSelectors,
} from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

import { RelationsModal } from './relations-modal/relations-modal';

export const ColumnReletions = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);
  const { viewState } = useContext(ViewScopedContext);

  const columnState = useSelector<RootState, ColumnRO>(
    useCallback(
      memoize((state) =>
        ColumnSelectors.createColumnSelector(state)(memState.columnId)
      ),
      [memState]
    )
  );

  const columnReferanceState = useSelector<RootState, ColumnReferanceRO[]>(
    useCallback(
      memoize((state) =>
        ColumnReferenceSelectors.createColumnReferanceByFromColumnSelector(
          state
        )(memState.columnId)
      ),
      [memState]
    )
  );

  const columnReferanceIds = useMemo(
    () => columnReferanceState.map((item) => item?.id) as string[],
    [columnReferanceState]
  );

  const columnReferanceWithNamesState = useSelector<
    RootState,
    StrictColumnReferanceWithViewsAndCoumnsRO[]
  >(
    useCallback(
      memoize((state) =>
        ColumnReferenceSelectors.createColumnReferanceWithNames(state)(
          columnReferanceIds
        ).sort((a, b) => b?.modificationDate - a?.modificationDate)
      ),
      [columnReferanceIds]
    )
  );

  const save = (data: ColumnReferanceRO) =>
    dispatch(ColumnsReferanceReducer.actions.upsertOne(data));

  const addModal = () => {
    RelationsModal({
      fromViewId: viewState?.id,
      from: memState.columnId,
    })
      .then(save)
      .catch(() => {});
  };

  const editModal = (id: string) => {
    RelationsModal({
      columnRelationId: id,
    })
      .then(save)
      .catch(() => {});
  };

  const handleDelete = (item: StrictColumnReferanceWithViewsAndCoumnsRO) =>
    ConfirmPromiseDeleteModal({
      // @ts-ignore
      entityName: `${item.from.name} - ${item.to.name}`,
    })
      .then(() => {
        dispatch(ColumnsReferanceReducer.actions.removeOne(item.id));
        return true;
      })
      .catch(() => {});

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="primary.200" />
      </Center>
    );
  }

  return (
    <Box px={4} key={`column-ref--${columnState?.id}`}>
      <Heading size="md">Reletions</Heading>
      <Flex pb={4} gap={4}>
        <Flex flexDirection="row">
          <Text>
            You can map columns to columns between all columns in your database.
            You can map ids to thier parent tables.
          </Text>
        </Flex>
        <AddButton size="md" onClick={addModal} />
      </Flex>

      <Box maxHeight="385px" overflowY="auto">
        <List spacing={3}>
          {columnReferanceWithNamesState.map((row) => (
            <ListItem key={row.id}>
              <Card
                variant="outline"
                boxShadow={0}
                rounded={10}
                _hover={{ boxShadow: 'lg' }}
              >
                <CardBody>
                  <Flex justifyContent="space-between">
                    <Flex flex={1}>
                      <VStack flex={1} alignItems="flex-start">
                        <Flex alignItems="center">
                          <Kbd fontSize="md" lineHeight="unset">
                            {row?.fromView?.name}.{(row?.from as any)?.name}
                          </Kbd>
                          <Icon
                            as={MdArrowForward}
                            fontSize={20}
                            mx={2}
                            my={2}
                          />
                          <Kbd fontSize="md" lineHeight="unset">
                            {row?.toView?.name}.{(row?.to as any)?.name}
                          </Kbd>
                        </Flex>
                        <Flex w="100%">
                          <Text fontSize="sm" as="span">
                            {row.description || 'N/A'}
                          </Text>
                        </Flex>
                      </VStack>
                    </Flex>
                    <Flex gap={2}>
                      <EditIconButton onClick={() => editModal(row.id)} />
                      <DeleteIconButton onClick={() => handleDelete(row)} />
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
