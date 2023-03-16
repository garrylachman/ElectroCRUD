import { Spinner, Center } from "@chakra-ui/react";

export const InlineSpinner = () => (
  <Center>
    <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='primary.500'
        size='xl'
    />
  </Center>
);
