import { Box, Icon, InputRightAddon } from '@chakra-ui/react';
import { Field } from '@saas-ui/forms';
import { FC } from 'react';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';

export type FormInputTypeDateTime = {
  column: ColumnWithMetadataAndTags;
};

export const FormInputDateTime: FC<FormInputTypeDateTime> = ({ column }) => {
  const type = findType(column.data_type);
  return (
    <Field
      variant="flushed"
      type="datetime-local"
      name={column.name}
      label={`${column.name} (${column.alias || column.name})`}
      defaultValue={column.default_value}
      isDisabled={column.has_auto_increment}
      isRequired={!column.is_nullable}
      help={column.comment}
      rules={{
        required: column.is_nullable ? false : `${column.name} is required.`,
      }}
    />
  );
};
