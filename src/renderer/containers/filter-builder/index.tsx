import { Text, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';

import {
  FilterBuilderWheresGroup,
  FilterBuilderWheresGroupProperties,
} from './filter-builder-wheres-group';

type FilterBuilderProperties = {
  groups: FilterBuilderWheresGroupProperties[];
};

export const FilterBuilder: FC<FilterBuilderProperties> = ({ groups }) => {
  const [state, setState] =
    useState<FilterBuilderWheresGroupProperties[]>(groups);

  return (
    <VStack alignItems="flex-start" w="100%">
      <Text fontWeight="bold" fontSize="xl">
        Where Groups
      </Text>
      {state.map((item, index) => (
        <FilterBuilderWheresGroup key={`filter-builder-${index}`} {...item} />
      ))}
    </VStack>
  );
};
