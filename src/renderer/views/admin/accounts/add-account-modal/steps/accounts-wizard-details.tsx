import { Box, Button, Icon } from '@chakra-ui/react';
import { Field, Form, FormLayout, SelectField } from '@saas-ui/react';
import { pick } from 'underscore';
import { FC } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import {
  AccountRO,
  ValidateAccountsWizardStep1,
} from 'renderer/defenitions/record-object';
import { ServerTypeEnum } from '@electrocrud/shared';

import { AddAccountWizardStepProperties } from '../add-account-wizard';

type FormData = Pick<AccountRO, 'name' | 'client'>;

export const AccountsWizardDetails: FC<
  AddAccountWizardStepProperties<FormData>
> = ({
  next,
  back,
  initialValue = { name: '', client: ServerTypeEnum.SQLITE },
}) => {
  const onSubmit = (data: FormData) => next(pick(data, ['name', 'client']));

  return (
    <Box>
      <Form<FormData>
        defaultValues={initialValue}
        onSubmit={onSubmit}
        schema={ValidateAccountsWizardStep1}
        mode="all"
        reValidateMode="onChange"
      >
        <FormLayout columns={2} gap={5} px={5} py={3}>
          <Field
            type="text"
            name="name"
            label="Name"
            isRequired
            variant="flushed"
          />
          <SelectField
            name="client"
            label="Client"
            isRequired
            variant="flushed"
            options={[
              { value: ServerTypeEnum.MYSQL, label: 'MySQL' },
              { value: ServerTypeEnum.MSSQL, label: 'MS SQL' },
              { value: ServerTypeEnum.ORACEL, label: 'Oracel' },
              { value: ServerTypeEnum.POSTGRES, label: 'Postgres' },
              { value: ServerTypeEnum.SQLITE, label: 'SQLite' },
            ]}
            strategy="fixed"
            colorScheme="primary"
            matchWidth
          />
        </FormLayout>
        <FormLayout py={2} px={5} display="flex" justifyContent="space-between">
          <Button
            variant="solid"
            colorScheme="red"
            size="md"
            gap={2}
            onClick={back}
            isDisabled
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
