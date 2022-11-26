import { FC, useMemo } from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from '@chakra-ui/react';
import SetUp from 'renderer/components/actions/SetUp';
import { AccountsWizardStep } from '.';

export const AccountsWizardTest: FC<AccountsWizardStep> = ({
  testConnection,
  connectionStatus = 'NOT_TESTED',
  connectionError,
}) => {
  const connectionStatusText = useMemo(() => {
    if (connectionStatus === 'FAILED') {
      return 'Faild';
    }
    if (connectionStatus === 'SUCCESS') {
      return 'Success';
    }
    if (connectionStatus === 'TESTING') {
      return 'Testing';
    }
    return 'Not Tested';
  }, [connectionStatus]);
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
      <SetUp
        name="Test Connection"
        value={connectionStatusText}
        actionName="Test"
        action={testConnection}
      />
      {connectionError && (
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
            <Text noOfLines={2}>{connectionError}</Text>
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
};