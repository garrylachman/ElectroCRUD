import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Element, ElementType } from './elements';
import { StaticTextProperty } from './properties';

export type StaticTextElementRO = Element<
  ElementType.STATIC_TEXT,
  StaticTextProperty
>;

export type StaticTextElementProperties = {
  item: StaticTextElementRO;
};

export const getNewStaticTextElement = (): StaticTextElementRO => ({
  type: ElementType.STATIC_TEXT,
  id: v4(),
  properties: {
    text: { text: '' },
  },
});

export const getStaticTextElementToolbox = () => ({
  text: [
    { label: 'Text', field: 'text', type: 'text' },
    {
      label: 'Font Size',
      field: 'fontSize',
      type: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
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

export const StaticTextElement: FC<StaticTextElementProperties> = ({ item, row }) => {
  const {
    fontSize = 'md',
    fontWeight = 'normal',
    text,
    color = 'black',
  } = item.properties.text;

  return (
    <Flex flexDirection="row" gap={2} my={2}>
      <Text {...{ fontSize, fontWeight, color }}>{text}</Text>
    </Flex>
  );
};
