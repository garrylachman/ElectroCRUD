import { HStack, Icon, IconButton, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';

import {
  FilterBuilderWhere,
  FilterBuilderWheresGroupCondProperties,
} from './filter-builder-where';

export type FilterBuilderWheresProperties = {
  conds: FilterBuilderWheresGroupCondProperties[];
};

const getNewItem = () => ({
  column: undefined,
  opr: undefined,
  value: undefined,
});

export const FilterBuilderWheres: FC<FilterBuilderWheresProperties> = ({
  conds,
}) => {
  const [condsState, setCondsState] =
    useState<FilterBuilderWheresGroupCondProperties[]>(conds);

  return (
    <VStack flexDirection="column">
      {condsState.map((item, index, array) => (
        <FilterBuilderWhere
          // eslint-disable-next-line react/no-array-index-key
          key={`filter-cond-${index}`}
          {...item}
        >
          <HStack display="flex" justifyContent="flex-end">
            {_.isEqual(index + 1, _.size(array)) && (
              <IconButton
                variant="solid"
                colorScheme="brand"
                size="sm"
                icon={<Icon as={MdOutlineAdd} />}
                aria-label=""
                onClick={() =>
                  setCondsState((previous) => [...previous, getNewItem()])
                }
              />
            )}
            <IconButton
              variant="solid"
              colorScheme="red"
              size="sm"
              aria-label=""
              icon={<Icon as={HiOutlineTrash} />}
            />
          </HStack>
        </FilterBuilderWhere>
      ))}
    </VStack>
  );
};
