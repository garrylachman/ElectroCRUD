import * as CSS from 'csstype';

import { GridProperty } from './properties';

export const getGridToolbox = () => ({
  grid: [
    { label: 'Col Span', field: 'colSpan', type: [1, 2] },
    {
      label: 'Border Bottom',
      field: 'borderBottomWidth',
      type: ['0px', '1px', '2px', '3px', '4px', '5px', '6px'],
    },
    {
      label: 'Border Style',
      field: 'borderBottomStyle',
      type: [
        'solid',
        'dashed',
        'dotted',
        'double',
        'groove',
        'hidden',
        'inset',
        'none',
        'outset',
        'ridge',
      ],
    },
  ],
});

export const getGridDefualt = (): GridProperty => ({
  grid: { colSpan: 2, borderBottomWidth: '0px', borderBottomStyle: 'solid' },
});
