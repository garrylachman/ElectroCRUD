import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FormLayout } from '@saas-ui/forms';
import { FC } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import SetUp from 'renderer/components/actions/set-up';
import { AccountRO } from 'renderer/defenitions/record-object';
import { O } from 'ts-toolbelt';

import { AddAccountWizardStepProperties } from '../add-account-wizard';
import { UseAccountsWizardReturn } from '../use-connection-test';

export type AccountsWizardTestProperties = O.Merge<
  AddAccountWizardStepProperties<AccountRO>,
  {
    connctionTest: UseAccountsWizardReturn;
  }
>;

export const AccountsWizardTest: FC<AccountsWizardTestProperties> = ({
  next,
  back,
  connctionTest,
}) => {
  const { execute, status, error } = connctionTest;

  return (
    <Flex flexDirection="column">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} my={5}>
        <SetUp
          name="Test Connection"
          value={status}
          actionName="Test"
          action={execute}
        />
        {error && status === 'FAILED' && (
          <Alert
            status="error"
            variant="top-accent"
            mt={3}
            display="block"
            textAlign="center"
          >
            <AlertIcon margin="auto" w={10} h={10} mt={4} mb={4} />
            <AlertTitle fontSize="3xl" mt={3} mb={3}>
              ERROR
            </AlertTitle>
            <AlertDescription fontSize="sm">
              <Text noOfLines={2}>{error.message}</Text>
            </AlertDescription>
          </Alert>
        )}
      </Box>
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
          isDisabled={status !== 'SUCCESS'}
          onClick={() => next()}
        >
          Finish
          <Icon as={MdArrowForward} />
        </Button>
      </FormLayout>
    </Flex>
  );
};
