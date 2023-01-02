import { O, U } from 'ts-toolbelt';

export enum ElementType {
  TEXT,
  STATIC_TEXT,
  BOOL,
  IMAGE,
}

export type PropertyEntry<
  TType extends string,
  TProperties extends Record<string, any> = Record<string, any>
> = Record<TType, TProperties>;

export type Element<
  TElement extends ElementType,
  TProperties extends PropertyEntry<any>
> = {
  id: string;
  type: TElement;
  order?: number;
  properties: U.Merge<TProperties>;
};
