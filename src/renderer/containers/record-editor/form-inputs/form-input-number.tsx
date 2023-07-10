import { Box, Icon, InputRightAddon } from '@chakra-ui/react';
import { Field } from '@saas-ui/forms';
import { FC } from 'react';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';

export type FormInputTypeNumber = {
  column: ColumnWithMetadataAndTags;
};

export const FormInputNumber: FC<FormInputTypeNumber> = ({ column }) => {
  const type = findType(column.data_type);
  return (
    <Field
      variant="flushed"
      type="number"
      name={column.name}
      label={`${column.name} (${column.alias || column.name})`}
      defaultValue={column.default_value}
      isDisabled={column.has_auto_increment}
      isRequired={!column.is_nullable && !column.has_auto_increment}
      max={column.max_length || Number.POSITIVE_INFINITY}
      help={column.comment}
      rules={{
        required:
          column.is_nullable || column.has_auto_increment
            ? false
            : `${column.name} is required.`,
      }}
      rightAddon={
        <Box flex={1} display="flex" alignItems="center">
          <Icon as={type.icon} />
        </Box>
      }
    />
  );
};
