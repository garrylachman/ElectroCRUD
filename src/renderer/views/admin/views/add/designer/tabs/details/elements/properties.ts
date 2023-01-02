import { PropertyEntry } from './elements';

export type LabelProperty = PropertyEntry<
  'label',
  {
    enabled: boolean;
    text?: string;
    direction?: string;
    alignItems?: string;
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
    width: number;
    height: number;
    borderRadius?: string;
  }
>;
