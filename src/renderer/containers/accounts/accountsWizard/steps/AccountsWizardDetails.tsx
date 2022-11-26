import { FC } from 'react';
import { Box, Badge, Grid, Button, Flex, Icon } from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import {
  AccountRO,
  ValidateAccountsWizardStep1,
} from 'renderer/defenitions/record-object';
import { ServerTypeEnum } from 'shared';
import { InputField } from 'renderer/components/fields';
import { MdSave } from 'react-icons/md';
import { AccountsWizardStep } from '.';

type FormData = Pick<AccountRO, 'name' | 'client'>;

export const AccountsWizardDetails: FC<AccountsWizardStep> = ({
  initialValue = { name: undefined, client: undefined },
  onUpdate = (...args: any[]) => {},
}) => {
  const formContext = useForm<FormData>({
    resolver: joiResolver(ValidateAccountsWizardStep1),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: { ...initialValue },
  });
  const { handleSubmit, control } = formContext;
  const { isValid } = useFormState({ control });

  return (
    <Box>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <InputField
              id="name"
              label="Name"
              placeholder="Enter account name"
              type="text"
              size="lg"
              isRequired
              helpText="Use friendly name for your account"
              inSubCard
            />
            <InputField
              id="client"
              label="Client"
              extra={
                <Badge variant="subtle" colorScheme="cyan" fontSize="8px">
                  Database Type
                </Badge>
              }
              type="select"
              size="lg"
              isRequired
              helpText="Please select your database software"
              inSubCard
            >
              <option value={ServerTypeEnum.MYSQL}>MySQL</option>
              <option value={ServerTypeEnum.MSSQL}>MS SQL</option>
              <option value={ServerTypeEnum.ORACEL}>Oracel</option>
              <option value={ServerTypeEnum.POSTGRES}>Postgres</option>
              <option value={ServerTypeEnum.SQLITE}>SQLite</option>
            </InputField>
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
