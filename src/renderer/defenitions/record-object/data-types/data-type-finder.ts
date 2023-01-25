/* eslint-disable no-restricted-syntax */
import {
  DataType,
  DateTimeDataType,
  NADataType,
  NumberDataType,
  StringDataType,
} from '.';

export const findType = (
  type: string
):
  | DataType<number>
  | DataType<string>
  | DataType<Date>
  | DataType<undefined> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const dataType of [NumberDataType, StringDataType, DateTimeDataType]) {
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const variants of dataType.variants) {
      if (variants === type || new RegExp(variants, 'i').test(type)) {
        return dataType;
      }
    }
  }
  return NADataType;
};
