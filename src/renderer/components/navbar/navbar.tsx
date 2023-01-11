import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import AnimatedText from 'react-animated-text-content';

export const Navbar: FC<{ brandText: string }> = ({ brandText }) => {
  return (
    <Box py={2} px={2} mx={1} overflow="hidden">
      <Heading>
        <AnimatedText
          type="chars"
          includeWhiteSpaces
          className="animated-paragraph"
          animationType="bounce"
          threshold={0.5}
          duration={0.3}
        >
          {brandText}
        </AnimatedText>
      </Heading>
    </Box>
  );
};
