import { IconType } from 'react-icons/lib';

export type DataType<T> = {
  name: string;
  icon: IconType;
  examples?: {
    short: T;
    medium: T;
    long: T;
  };
  variants: string[];
  validationFuction?: (value: any) => boolean;
  formatter?: (value: T) => any;
};
