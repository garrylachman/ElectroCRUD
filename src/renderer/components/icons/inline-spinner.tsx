import { Spinner, Center } from '@chakra-ui/react';
import { Loader } from '@saas-ui/react';

export const InlineSpinner = (
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  properties: { text?: string }
) => (
  <Center>
    <Loader
      spinner={
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.500"
          size="xl"
        />
      }
    >
      {properties?.text || 'Loading...'}
    </Loader>
  </Center>
);
