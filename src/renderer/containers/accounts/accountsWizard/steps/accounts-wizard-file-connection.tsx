import { FC } from 'react';
import { Box, Grid, Badge, Flex, Icon, Button } from '@chakra-ui/react';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import { InputField } from 'renderer/components/fields';
import { FileConnectionConfig } from 'shared/defenitions';
import { MdSave } from 'react-icons/md';
import { AccountsWizardStep } from '.';

type FormData = FileConnectionConfig;

export const AccountsWizardFileConnection: FC<AccountsWizardStep> = ({
  initialValue = {
    connection: {
      filename: undefined,
    },
  },
  onUpdate = (...args: any[]) => {},
}) => {
  const formContext = useForm<FormData>({
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: { ...initialValue.connection },
  });
  const { handleSubmit, control } = formContext;
  const { isValid } = useFormState({ control });

  const onSubmit = (data: FormData) =>
    onUpdate({
      connection: {
        filename: data.filename[0] ? data.filename[0].path : undefined,
      },
    });

  return (
    <Box>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(1, 1fr)" gap={5}>
            <InputField
              id="filename"
              label="File"
              extra={
                <Badge variant="subtle" colorScheme="cyan" fontSize="8px">
                  SQLite Database File
                </Badge>
              }
              placeholder="Please select database file"
              type="file"
              size="lg"
              isRequired
              inSubCard
              helpText="Please select your database file"
            />
          </Grid>
          <Flex pt="25px">
            <Button
              type="submit"
              variant="solid"
              colorScheme="green"
              size="lg"
              isDisabled={!sValid}
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
