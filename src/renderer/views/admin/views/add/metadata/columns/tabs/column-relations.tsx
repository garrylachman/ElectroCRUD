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
  useBoolean,
} from '@chakra-ui/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import memoize from 'proxy-memoize';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MdArrowForward, MdEdit, MdPreview } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  DeleteIconButton,
} from 'renderer/components/buttons/delete-icon-button';
import { SaveButton } from 'renderer/components/buttons/save-button';
import {
  ConfirmPromiseSaveModal,
} from 'renderer/components/modals/confirm-promise-save-modal';
import {
  ElectroCRUDTabProperties,
  ElectroCRUDTabs,
} from 'renderer/components/tabs/tabs';
import { ScopeContext } from 'renderer/contexts/scope-context';
import {
  ColumnReferanceRO,
  ColumnRO,
  StrictColumnReferanceWithViewsAndCoumnsRO,
} from 'renderer/defenitions/record-object/view.define';
import { useAppDispatch } from 'renderer/store/hooks';
import { ColumnsReducer } from 'renderer/store/reducers';
import {
  ColumnReferenceSelectors,
  ColumnSelectors,
} from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

export const ColumnReletions = () => {
  const dispatch = useAppDispatch();
  const { memState } = useContext(ScopeContext);

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
        )
      ),
      [columnReferanceIds]
    )
  );

  if (!columnState) {
    return (
      <Center>
        <Spinner size="xl" color="brand.200" />
      </Center>
    );
  }

  return (
    <Box px={4} key={`column-ref--${columnState.id}`}>
      <Heading size="md">Reletions</Heading>
      <Box pb={4}>
        <Text>
          You can map columns to columns between all columns in your database.
          You can map ids to thier parent tables.
        </Text>
      </Box>

      <Box maxHeight="385px" overflowY="scroll">
        <List spacing={3}>
          {columnReferanceWithNamesState.map((row) => (
            <ListItem>
              <Card variant="outline" boxShadow={0} rounded={10}>
                <CardBody>
                  <Flex justifyContent="space-between">
                    <Flex alignItems="center">
                      <Kbd fontSize="md" lineHeight="unset">
                        {row?.fromView?.name}.{row?.from?.name}
                      </Kbd>
                      <Icon as={MdArrowForward} fontSize={20} mx={2} my={2} />
                      <Kbd fontSize="md" lineHeight="unset">
                        {row?.toView?.name}.{row?.to?.name}
                      </Kbd>
                    </Flex>
                    <Flex>
                      <DeleteIconButton />
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
