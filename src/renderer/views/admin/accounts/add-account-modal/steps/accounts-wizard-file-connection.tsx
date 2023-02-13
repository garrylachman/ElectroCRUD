import { Box, Button, Icon, Input, InputGroup } from '@chakra-ui/react';
import {
  Form,
  FormLayout,
  InputFieldProps,
  registerFieldType,
} from '@saas-ui/react';
import { FC, forwardRef } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { ValidateSqliteConnection } from 'renderer/defenitions/record-object';
import { FileConnectionConfig } from '@electrocrud/shared';

import { AddAccountWizardStepProperties } from '../add-account-wizard';

type InputFileProperties = InputFieldProps;

export const FileField = registerFieldType<InputFileProperties>(
  'file',
  forwardRef(
    ({ type = 'file', leftAddon, rightAddon, size, ...rest }, reference) => {
      // @ts-ignore
      const input = <Input type={type} size={size} {...rest} ref={reference} />;
      if (leftAddon || rightAddon) {
        return (
          <InputGroup size={size}>
            {leftAddon}
            {input}
            {rightAddon}
          </InputGroup>
        );
      }
      return input;
    }
  )
);

type FormData = FileConnectionConfig;

export const AccountsWizardFileConnection: FC<
  AddAccountWizardStepProperties<FormData>
> = ({ next, back, initialValue = { filename: '' } }) => {
  const onSubmit = (data: FormData) => {
    if (
      data.filename &&
      data.filename[0] &&
      (data.filename[0] as unknown as File).path
    ) {
      next({ filename: (data.filename[0] as unknown as File).path });
    }
  };

  return (
    <Box>
      <Form<FormData>
        defaultValues={initialValue}
        onSubmit={onSubmit}
        schema={ValidateSqliteConnection}
        mode="all"
        reValidateMode="onChange"
      >
        <FormLayout gap={5} px={5} py={3}>
          <FileField
            name="filename"
            label="SQLite file"
            isRequired
            variant="flushed"
            accept=".db,.sqlite,.sqlite3,.db-wal,.sqlite-wal,.db-shm,.sqlite-shm"
            sx={{
              height: 12,
              '::file-selector-button': {
                background: 'var(--chakra-colors-primary-400)',
                color: 'white',
                border: 0,
                padding: 2,
                borderRadius: 10,
                transition: '1s',
                cursor: 'pointer',
                marginRight: 4,
              },
              '::file-selector-button:hover': {
                background: 'var(--chakra-colors-primary-700)',
              },
            }}
          />
        </FormLayout>
        <FormLayout py={2} px={5} display="flex" justifyContent="space-between">
          <Button
            variant="solid"
            colorScheme="red"
            size="md"
            gap={2}
            onClick={back}
          >
            <Icon as={MdArrowBack} />
            Back
          </Button>
          <Button
            type="submit"
            variant="solid"
            colorScheme="green"
            size="md"
            gap={2}
          >
            Save & Continue
            <Icon as={MdArrowForward} />
          </Button>
        </FormLayout>
      </Form>
    </Box>
  );
};
