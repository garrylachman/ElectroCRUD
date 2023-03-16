/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import { FC, useContext, useMemo } from 'react';
import { MdSearch } from 'react-icons/md';
import { TbFilter, TbFilterOff, TbPlaylistAdd, TbTrash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import {
  ActionsDropdownMenu,
  ActionsDropdownMenuItem,
  RippleButton,
} from '@electrocrud/buttons';
import { ConfirmPromiseDeleteModal } from 'renderer/components/modals/confirm-promise-delete-modal';
import { ViewScopedContext } from 'renderer/contexts';
import { StrictViewFilterRO } from 'renderer/defenitions/record-object';
import { useAppDispatch } from 'renderer/store/hooks';
import { ViewFiltersReducer } from 'renderer/store/reducers';
import { RootState } from 'renderer/store/store';

type DataTableHeaderProperties = {
  setInternalFilter: (any: any) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  openFiltersModal: () => void;
};

export const DataTableHeader: FC<DataTableHeaderProperties> = ({
  setInternalFilter,
  setSearchValue,
  openFiltersModal,
}) => {
  const { viewState } = useContext(ViewScopedContext);
  const dispatch = useAppDispatch();

  const viewFilterState = useSelector<RootState, StrictViewFilterRO[]>(
    (state) =>
      memoize((viewFiltersState: EntityState<StrictViewFilterRO>) =>
        ViewFiltersReducer.getSelectors().selectAll(viewFiltersState)
      )(state.viewsFilter)
  );

  const thisViewFilters = useMemo(
    () => viewFilterState.filter((f) => f.viewId === viewState?.id),
    [viewFilterState]
  );

  const actions = useMemo<ActionsDropdownMenuItem[]>(
    () => [
      {
        props: {
          onClick: () => openFiltersModal(),
          fontSize: 'sm',
          icon: <Icon as={TbPlaylistAdd} boxSize={4} display="flex" />,
        },
        text: 'New Filter',
      },
      {
        props: {
          // eslint-disable-next-line unicorn/no-useless-undefined
          onClick: () => setInternalFilter(undefined),
          fontSize: 'sm',
          icon: <Icon as={TbFilterOff} boxSize={4} display="flex" />,
        },
        text: 'Clear Filters',
      },
      {
        isDivider: true,
        text: 'Filters',
      },
      ...thisViewFilters.map((vFilter) => ({
        props: {
          onClick: () => setInternalFilter(JSON.parse(vFilter.knexFilter)),
          icon: <Icon as={TbFilter} boxSize={4} display="flex" />,
        },
        text: (
          <HStack justifyContent="space-between" pointerEvents="all">
            <Text fontSize="sm" isTruncated width="130px">
              {vFilter.name}
            </Text>
            <RippleButton
              bgColorScheme="red"
              onClick={(event) => {
                event.stopPropagation();
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
              }}
              size="xs"
              p={2}
            >
              <Icon as={TbTrash} boxSize={3} />
            </RippleButton>
          </HStack>
        ),
      })),
    ],
    [thisViewFilters]
  );

  return (
    <VStack pt={3}>
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
            Displaying results from "{viewState?.table}" table
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
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputRightElement>
              <Icon as={MdSearch} />
            </InputRightElement>
          </InputGroup>
          <ActionsDropdownMenu menuName="Filters" items={actions} />
        </HStack>
      </HStack>
    </VStack>
  );
};
