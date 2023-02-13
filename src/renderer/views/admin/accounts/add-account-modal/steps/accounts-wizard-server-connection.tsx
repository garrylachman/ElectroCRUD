import { Box, Button, Icon } from '@chakra-ui/react';
import { Field, Form, FormLayout } from '@saas-ui/react';
import { FC } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { ValidateServerConnection } from 'renderer/defenitions/record-object';
import { ServerConnectionConfig } from '@electrocrud/shared';

import { AddAccountWizardStepProperties } from '../add-account-wizard';

type FormData = ServerConnectionConfig;

export const AccountsWizardServerConnection: FC<
  AddAccountWizardStepProperties<FormData>
> = ({
  next,
  back,
  initialValue = {
    host: undefined,
    port: undefined,
    user: undefined,
    password: undefined,
    database: undefined,
    schema: undefined,
  },
}) => {
  const onSubmit = (data: FormData) => next(data);

  return (
    <Box>
      <Form<FormData>
        defaultValues={initialValue}
        onSubmit={onSubmit}
        schema={ValidateServerConnection}
        mode="all"
        reValidateMode="onChange"
      >
        <FormLayout gap={5} px={5} py={3}>
          <FormLayout templateColumns="auto 25%">
            <Field
              name="host"
              label="Host"
              placeholder="localhost / 127.0.0.1"
              type="text"
              isRequired
              variant="flushed"
            />
            <Field
              name="port"
              label="Port"
              placeholder="3306"
              type="number"
              isRequired
              variant="flushed"
            />
          </FormLayout>
          <FormLayout templateColumns="50% 50%">
            <Field
              name="user"
              label="Username"
              placeholder="root"
              type="text"
              isRequired
              variant="flushed"
            />
            <Field
              name="password"
              label="Password"
              placeholder="12345"
              type="password"
              variant="flushed"
            />
          </FormLayout>
          <FormLayout templateColumns="50% 50%">
            <Field
              name="database"
              label="Database"
              placeholder="Database name"
              type="text"
              variant="flushed"
              isRequired
            />
            <Field
              name="schema"
              label="Schema"
              placeholder="Schema name"
              type="text"
              variant="flushed"
            />
          </FormLayout>
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
