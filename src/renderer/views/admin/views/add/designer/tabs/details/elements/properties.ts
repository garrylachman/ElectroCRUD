import * as CSS from 'csstype';

import { PropertyEntry } from './elements';

export type LabelProperty = PropertyEntry<
  'label',
  {
    enabled: boolean;
    text?: string;
    direction?: CSS.Property.FlexDirection;
    alignItems?: CSS.Property.AlignItems;
  }
>;

export type GridProperty = PropertyEntry<
  'grid',
  {
    colSpan: number;
    borderBottomWidth: string;
    borderBottomStyle: CSS.Property.BorderStyle;
  }
>;

export type TextProperty = PropertyEntry<
  'text',
  {
    fontSize?: string;
    fontWeight?: string;
    color?: string[];
    columnName: string;
  }
>;

export type StaticTextProperty = PropertyEntry<
  'text',
  {
    fontSize?: string;
    fontWeight?: string;
    color?: string[];
    text: string;
  }
>;

export type BoolProperty = PropertyEntry<
  'bool',
  {
    columnName: string;
    size?: string;
  }
>;

export type ImageProperty = PropertyEntry<
  'image',
  {
    columnName: string;
    width: CSS.Property.Width;
    height: CSS.Property.Height;
    borderRadius?: string;
  }
>;
