import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { FormInputDateTime } from './form-input-datetime';
import { FormInputNumber } from './form-input-number';
import { FormInputText } from './form-input-text';

export * from './form-input-text';

export const InputFormFactory = (column: ColumnWithMetadataAndTags) => {
  switch (findType(column.data_type).name) {
    case 'string': {
      return FormInputText;
      break;
    }
    case 'number': {
      return FormInputNumber;
      break;
    }
    case 'datetime': {
      return FormInputDateTime;
      break;
    }
  }
  return FormInputText;
};
