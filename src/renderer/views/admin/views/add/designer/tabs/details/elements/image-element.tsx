import { Flex, Image } from '@chakra-ui/react';
import * as R from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Element, ElementType } from './elements';
import { getLabelToolbox } from './label';
import { ImageProperty } from './properties';

export type ImageElementRO = Element<ElementType.IMAGE, ImageProperty>;

export type ImageElementProperties = {
  item: ImageElementRO;
  row: Record<string, any>;
};

export const getNewImageElement = (): ImageElementRO => ({
  type: ElementType.IMAGE,
  id: v4(),
  properties: {
    image: { columnName: '', width: 150, height: 150, borderRadius: 'base' },
  },
});

export const getImageElementToolbox = () => ({
  image: [
    { label: 'Column', field: 'columnName', type: 'column' },
    { label: 'Width (px)', field: 'width', type: 'text' },
    { label: 'Height (px)', field: 'height', type: 'text' },
    {
      label: 'Round',
      field: 'borderRadius',
      type: ['none', 'base', 'md', 'lg', 'full'],
    },
  ],
});

export const ImageElement: FC<ImageElementProperties> = ({ item, row }) => {
  const {
    columnName,
    width = 150,
    height = 150,
    borderRadius = 'base',
  } = item.properties.image;
  const wh = { width: `${width}px`, height: `${height}px` };
  return (
    <Flex gap={2} my={2} alignItems="center">
      <Image
        {...{ ...wh, borderRadius }}
        src={R.prop(columnName, row)}
        fallbackSrc={`https://via.placeholder.com/${width}x${height}`}
      />
    </Flex>
  );
};
