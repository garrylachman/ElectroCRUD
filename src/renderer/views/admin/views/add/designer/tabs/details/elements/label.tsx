import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { LabelProperty } from './properties';

export const getLabelToolbox = () => ({
  label: [
    { label: 'Enabled', field: 'enabled', type: 'bool' },
    { label: 'Label', field: 'text', type: 'text' },
    {
      label: 'Direction',
      field: 'direction',
      type: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    {
      label: 'Align',
      field: 'alignItems',
      type: ['baseline', 'center', 'end', 'start'],
    },
  ],
});

export const Label: FC<LabelProperty> = ({ label }) => {
  const { enabled, text } = label;

  return <>{enabled && <Flex fontWeight="bold">{text}</Flex>}</>;
};
