/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HStack, Icon, IconButton, VStack } from '@chakra-ui/react';
import { isEqual, size } from 'underscore';
import { FC, useMemo } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { TemporaryFilterRulesReducer } from 'renderer/store/reducers';

import { FilterBuilderWhere } from './filter-builder-where';

export type FilterBuilderWheresProperties = {
  filterId: string;
};

const getNewItem = () => ({
  column: undefined,
  opr: undefined,
  value: undefined,
});

export const FilterBuilderWheres: FC<FilterBuilderWheresProperties> = ({
  filterId,
}) => {
  const distpatch = useAppDispatch();
  const allFilterRulesState = useAppSelector(
    (state) => state.temporaryFilterRules
  );
  const filterRulesState = useMemo(
    () =>
      TemporaryFilterRulesReducer.getSelectors()
        // @ts-ignore
        .selectAll(allFilterRulesState)
        .filter((item) => item.filterId === filterId),
    [allFilterRulesState, filterId]
  );

  return (
    <VStack flexDirection="column">
      {filterRulesState.map((item, index, array) => (
        <FilterBuilderWhere
          key={`filter-rule-${String(item.id)}`}
          initialState={item}
        >
          <HStack display="flex" justifyContent="flex-end">
            {isEqual(index + 1, size(array)) && (
              <IconButton
                variant="solid"
                colorScheme="primary"
                size="sm"
                icon={<Icon as={MdOutlineAdd} />}
                aria-label=""
                onClick={() =>
                  distpatch(
                    TemporaryFilterRulesReducer.actions.upsertOne({
                      filterId,
                      ...getNewItem(),
                    })
                  )
                }
              />
            )}
            <IconButton
              variant="solid"
              colorScheme="red"
              size="sm"
              aria-label=""
              onClick={() => {
                if (item.id) {
                  distpatch(
                    TemporaryFilterRulesReducer.actions.removeOne(item.id)
                  );
                }
              }}
              icon={<Icon as={HiOutlineTrash} />}
            />
          </HStack>
        </FilterBuilderWhere>
      ))}
    </VStack>
  );
};
