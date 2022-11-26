import { FC } from 'react';
import {
  Box,
  Grid,
  Badge,
  Flex,
  Icon,
  Button,
  GridItem,
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import { ValidateServerConnection } from 'renderer/defenitions/record-object';
import { ServerConnectionConfig } from 'shared';
import { InputField } from 'renderer/components/fields';
import { MdSave } from 'react-icons/md';
import { AccountsWizardStep } from '.';

type FormData = ServerConnectionConfig;

export const AccountsWizardServerConnection: FC<AccountsWizardStep> = ({
  initialValue = {
    connection: {
      host: undefined,
      port: undefined,
      user: undefined,
      password: undefined,
      database: undefined,
    },
  },
  onUpdate = (...args: any[]) => {}
}) => {
  const formContext = useForm<FormData>({
    resolver: joiResolver(ValidateServerConnection),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: { ...initialValue.connection },
  });

  const { handleSubmit, control } = formContext;
  const { isValid } = useFormState({ control });

  const onSubmit = (data: FormData) => onUpdate({ connection: data });

  return (
    <Box>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            <InputField
              id="host"
              label="Host"
              extra={
                <Badge variant="subtle" colorScheme="cyan" fontSize="8px">
                  Server Hostname/IP
                </Badge>
              }
              placeholder="localhost / 127.0.0.1"
              type="text"
              size="lg"
              isRequired
              inSubCard
              helpText="Your server hostname or IP address"
            />
            <InputField
              id="port"
              label="Port"
              extra={
                <Badge variant="subtle" colorScheme="cyan" fontSize="8px">
                  Database Server Port
                </Badge>
              }
              placeholder="3306"
              type="number"
              size="lg"
              isRequired
              inSubCard
              helpText="Your database software port"
            />
            <InputField
              id="user"
              label="Username"
              placeholder="root"
              type="text"
              size="lg"
              isRequired
              inSubCard
              helpText="Username with permissions to connect"
            />
            <InputField
              id="password"
              label="Password"
              placeholder="12345"
              type="password"
              size="lg"
              helpText="Your password for selected username"
              inSubCard
            />
            <GridItem colSpan={2}>
              <InputField
                id="database"
                label="Database"
                placeholder="Enter database name"
                type="text"
                size="lg"
                isRequired
                inSubCard
                helpText="Which database you want to add, db per account"
              />
            </GridItem>
          </Grid>
          <Flex pt="25px">
            <Button
              type="submit"
              variant="solid"
              colorScheme="green"
              size="lg"
              isDisabled={!isValid}
            >
              <Icon mr={2} as={MdSave} />
              Save
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};
