import { Box, Center, Icon, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FC,
  MouseEvent,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { RippleButton } from '@electrocrud/buttons';
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
    togglePane,
    isOpen,
    options,
  } = useContext(PaneContext);
  const [mouseState, setMouseState] =
    useState<MouseEvent<HTMLDivElement, globalThis.MouseEvent>>();
  const y = useMemo(() => {
    if (!mouseState?.target || !(mouseState as MouseEvent).pageY) return 0;
    return (
      (mouseState as MouseEvent).pageY -
      (mouseState?.target as any).offsetParent.getClientRects()[0].top -
      60
    );
  }, [mouseState]);

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
    <Stack spacing={0} direction="row">
      <Box
        as={motion.div}
        {...leftPaneProperties}
        variants={variants}
        animate={isOpen ? 'open' : 'close'}
      >
        {leftComponent}
      </Box>
      <Box>
        <Center
          margin={0}
          padding={0}
          display="flex"
          position="relative"
          width="13px"
          height="100%"
          onMouseMove={(event_) => {
            if ((event_.target as any)?.id === 'track') {
              setMouseState(event_);
            }
          }}
          id="track"
          borderLeft="3px solid transparent"
        >
          <RippleButton
            bgColorScheme="primary"
            size="3xs"
            rounded={60}
            position="absolute"
            onClick={() => togglePane()}
            aria-label=""
            cursor="pointer"
            p={0}
            top={`${y}px`}
          >
            <Icon fontSize={30} as={icon} />
          </RippleButton>
        </Center>
      </Box>
      <Box {...rightPaneProperties}>{rightComponent}</Box>
    </Stack>
  );
};
