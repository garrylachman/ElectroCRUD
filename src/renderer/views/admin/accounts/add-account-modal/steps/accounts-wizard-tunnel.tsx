import { Box, Button, DeepPartial, Icon } from '@chakra-ui/react';
import { Field, Form, FormLayout } from '@saas-ui/react';
import { FC, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { ValidateTunnel } from 'renderer/defenitions/record-object';
import { SSHTunnelConfig } from '@electrocrud/shared';

import { AddAccountWizardStepProperties } from '../add-account-wizard';

type FormData = SSHTunnelConfig;

export const AccountsWizardTunnel: FC<
  AddAccountWizardStepProperties<FormData>
> = ({
  next,
  back,
  initialValue = {
    enabled: false,
    host: undefined,
    port: undefined,
    username: undefined,
    password: undefined,
  },
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(initialValue.enabled);
  const onSubmit = (data: FormData) => next(data);
  const onChange = (data: DeepPartial<FormData>) =>
    setIsEnabled(data.enabled || false);

  return (
    <Box>
      <Form<FormData>
        defaultValues={initialValue}
        onSubmit={onSubmit}
        schema={ValidateTunnel}
        mode="all"
        reValidateMode="onChange"
        onChange={onChange}
      >
        <FormLayout gap={5} px={5} py={3}>
          <FormLayout>
            <Field
              name="enabled"
              label="Enable / Disable SSH Tunneling"
              type="switch"
            />
          </FormLayout>
          <FormLayout templateColumns="auto 25%">
            <Field
              name="host"
              label="SSH Hostname"
              placeholder="localhost / 127.0.0.1"
              type="text"
              isRequired={isEnabled}
              isDisabled={!isEnabled}
              variant="flushed"
            />
            <Field
              name="port"
              label="Port"
              placeholder="22"
              type="number"
              isRequired={isEnabled}
              isDisabled={!isEnabled}
              variant="flushed"
            />
          </FormLayout>
          <FormLayout templateColumns="50% 50%">
            <Field
              name="username"
              label="Username"
              placeholder="root"
              type="text"
              isRequired={isEnabled}
              isDisabled={!isEnabled}
              variant="flushed"
            />
            <Field
              name="password"
              label="Password"
              placeholder="12345"
              type="password"
              variant="flushed"
              isDisabled={!isEnabled}
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
