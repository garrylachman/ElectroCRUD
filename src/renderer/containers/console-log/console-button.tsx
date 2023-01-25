import { Button, Icon, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { TbTerminal2 } from 'react-icons/tb';

export const ConsoleButton: FC<ButtonProps> = ({ ...properties }) => {
  return (
    <Button
      {...properties}
      bgColor="blackAlpha.800"
      color="white"
      position="fixed"
      _hover={{ bgColor: 'blackAlpha.700' }}
      right={0}
      bottom="168px"
      borderRadius="2xl"
      borderBottomRightRadius={0}
      borderTopRightRadius={0}
      p={0}
      pl={1}
    >
      <Icon as={TbTerminal2} boxSize={5} />
    </Button>
  );
};
