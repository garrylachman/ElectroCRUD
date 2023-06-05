import { Flex, Text } from '@chakra-ui/react';
import * as R from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Element, ElementType } from './elements';
import { getGridDefualt, getGridToolbox } from './grid';
import { getLabelToolbox, Label } from './label';
import { GridProperty, LabelProperty, TextProperty } from './properties';

export type TextElementRO = Element<
  ElementType.TEXT,
  LabelProperty | TextProperty | GridProperty
>;

export type TextElementProperties = {
  item: TextElementRO;
  row: Record<string, any>;
};

export const getNewTextElement = (): TextElementRO => ({
  type: ElementType.TEXT,
  id: v4(),
  properties: {
    label: { enabled: true, text: 'Label' },
    text: { columnName: 'column' },
    ...getGridDefualt(),
  },
});

export const getTextElementToolbox = () => ({
  ...getLabelToolbox(),
  ...getGridToolbox(),
  text: [
    { label: 'Column', field: 'columnName', type: 'column' },
    {
      label: 'Font Size',
      field: 'fontSize',
      type: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    {
      label: 'Color',
      field: 'color',
      type: [
        'black',
        'gray.400',
        'red.400',
        'orange.400',
        'yellow.400',
        'green.400',
        'teal.400',
        'blue.400',
        'cyan.400',
        'purple.400',
        'pink.400',
      ],
    },
    {
      label: 'Font Weight',
      field: 'fontWeight',
      type: [
        'medium',
        'normal',
        'hairline',
        'thin',
        'light',
        'semibold',
        'extrabold',
        'black',
      ],
    },
  ],
});

export const TextElement: FC<TextElementProperties> = ({ item, row }) => {
  const { label, text } = item.properties;
  const {
    fontSize = 'md',
    fontWeight = 'normal',
    columnName,
    color = 'black',
  } = text;
  const { direction = 'row', alignItems = 'unset' } = label;

  return (
    <Flex flexDirection={direction} alignItems={alignItems} gap={2} my={2}>
      <Label label={label} />
      <Flex>
        <Text {...{ fontSize, fontWeight, color }}>
          {R.propOr('N/A', columnName, row)}
        </Text>
      </Flex>
    </Flex>
  );
};
