import { Box, Center, Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC, ReactNode, useContext, useMemo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { RippleButton } from '../buttons/ripple-button';
import { PaneContext } from './pane-context';

export type PaneOptions = {
  leftPaneCloseSize: number | string;
  leftPaneOpenSize: number | string;
  toggleButton?: boolean;
  isDraggble?: boolean;
  isOpen?: boolean;
};

export type PaneProperties = {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
};

export const Pane: FC<PaneProperties> = ({ leftComponent, rightComponent }) => {
  const {
    leftPaneProperties,
    rightPaneProperties,
    setLeftPaneProperties,
    setRightPaneProperties,
    togglePane,
    isOpen,
    options,
  } = useContext(PaneContext);

  const icon = useMemo(
    () => (isOpen ? MdKeyboardArrowLeft : MdKeyboardArrowRight),
    [isOpen]
  );

  const variants = {
    open: {
      width: options.leftPaneOpenSize,
      transition: { duration: 0.8, type: 'spring', bounce: 0.6 },
    },
    close: {
      width: options.leftPaneCloseSize,
      transition: { duration: 0.8, type: 'spring', bounce: 0.6 },
    },
  };

  return (
    <Stack spacing={2} direction="row">
      <Box
        as={motion.div}
        {...leftPaneProperties}
        variants={variants}
        animate={isOpen ? 'open' : 'close'}
      >
        {leftComponent}
      </Box>
      <Center margin={0} padding={0} display="flex" position="relative">
        <RippleButton
          colorScheme="brand"
          size="md"
          rounded={60}
          position="absolute"
          onClick={() => togglePane()}
          aria-label=""
          cursor="pointer"
          p={0}
          top="100px"
        >
          <Icon fontSize={30} as={icon} />
        </RippleButton>
      </Center>
      <Box {...rightPaneProperties}>{rightComponent}</Box>
    </Stack>
  );
};
