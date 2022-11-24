import { PropsWithChildren } from 'react';
import { NestedPartial } from 'shared';

export type ModalProps<T> = PropsWithChildren & {
  onModalClose?: (result: NestedPartial<T> | null) => void;
  isModalOpenState: readonly [
    boolean,
    {
      on: () => void;
      off: () => void;
      toggle: () => void;
    }
  ];
  title?: string;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'full'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
};
