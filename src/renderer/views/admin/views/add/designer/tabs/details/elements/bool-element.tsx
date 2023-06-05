import { Flex, Switch } from '@chakra-ui/react';
import * as R from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Element, ElementType } from './elements';
import { getGridDefualt, getGridToolbox } from './grid';
import { getLabelToolbox, Label } from './label';
import { BoolProperty, GridProperty, LabelProperty } from './properties';

export type BoolElementRO = Element<
  ElementType.BOOL,
  LabelProperty | BoolProperty | GridProperty
>;

export type BoolElementProperties = {
  item: BoolElementRO;
  row: Record<string, any>;
};

export const getNewBoolElement = (): BoolElementRO => ({
  type: ElementType.BOOL,
  id: v4(),
  properties: {
    label: { enabled: true, text: 'Label' },
    bool: { columnName: '' },
    ...getGridDefualt(),
  },
});

export const getBoolElementToolbox = () => ({
  ...getLabelToolbox(),
  ...getGridToolbox(),
  bool: [
    { label: 'Column', field: 'columnName', type: 'column' },
    { label: 'Size', field: 'size', type: ['sm', 'md', 'lg'] },
  ],
});

export const BoolElement: FC<BoolElementProperties> = ({ item, row }) => {
  const { label, bool } = item.properties;
  const { columnName, size = 'sm' } = bool;
  const { direction = 'row', alignItems = 'unset' } = label;

  return (
    <Flex gap={2} my={2} alignItems={alignItems} flexDirection={direction}>
      <Label label={label} />
      <Flex>
        <Switch isReadOnly isChecked={R.prop(columnName, row)} size={size} />
      </Flex>
    </Flex>
  );
};
