import { O } from 'ts-toolbelt';

export type BaseRO = {
  id?: string;
  creationDate?: number;
  modificationDate?: number;
};

export type StrictBaseRO = O.Required<
  BaseRO,
  'id' | 'creationDate' | 'modificationDate'
>;

export const demote = <
  T extends O.Unionize<BaseRO, StrictBaseRO>,
  TT extends StrictBaseRO
>(
  value: T,
  keys: O.IntersectKeys<TT, T, 'default'>[]
): TT =>
  ({
    ...value,
    ...Object.fromEntries(
      keys.map((item) => [item, (value[item] as any).id || undefined])
    ),
  } as TT);
