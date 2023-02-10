// @ts-nocheck
import { Flex, Tag, TagLabel } from '@chakra-ui/react';
import { chakraComponents } from 'chakra-react-select';
import { ReactElement } from 'react';
import { findType } from 'renderer/defenitions/record-object/data-types';

export const ReactSelectColumnOption = {
  Option: ({
    children,
    ...properties
  }: {
    children: ReactElement;
    data: { type: string };
  }) => (
    <chakraComponents.Option {...properties}>
      <Flex justifyContent="space-between" w="100%">
        {children}
        {properties.data && properties.data.type && (
          <Tag
            variant="subtle"
            colorScheme="primary"
            size="sm"
            textTransform="uppercase"
          >
            <TagLabel>{findType(properties.data.type).name}</TagLabel>
          </Tag>
        )}
      </Flex>
    </chakraComponents.Option>
  ),
};
