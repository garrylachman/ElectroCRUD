import { Center } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { LayoutGroup, motion } from 'framer-motion';
import { FC, ReactElement } from 'react';

const sideOne = {
  rest: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
      repeatType: 'reverse',
      ease: 'circIn',
    },
  },
  hover: {
    opacity: 0,
    scale: 0.2,
    transition: {
      duration: 0.4,
      type: 'tween',
      repeatType: 'reverse',
      ease: 'circOut',
    },
  },
};

const sideTwo = {
  rest: {
    opacity: 0,
    scale: 0.2,
    ease: 'circOut',
    duration: 0.4,
    type: 'tween',
    repeatType: 'reverse',
  },
  hover: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
      repeatType: 'reverse',
      ease: 'circIn',
    },
  },
};

export type FlipOverOnHoverProperties = {
  SideOne: ReactElement;
  SideTwo: ReactElement;
};

const Container = styled(motion.div)`
  position: relative;
  max-width: 200px;
  cursor: pointer;
`;

export const FlipOverOnHover: FC<FlipOverOnHoverProperties> = ({
  SideOne,
  SideTwo,
}) => {
  return (
    <LayoutGroup>
      <Container
        initial="rest"
        whileHover="hover"
        animate="rest"
        style={{ flex: 1 }}
      >
        <Center position="relative" flexDirection="column">
          <motion.div
            style={{ position: 'relative' }}
            // @ts-ignore
            variants={sideTwo}
            layout="size"
          >
            {SideTwo}
          </motion.div>
          <motion.div
            style={{ position: 'absolute' }}
            // @ts-ignore
            variants={sideOne}
            layout="size"
          >
            {SideOne}
          </motion.div>
        </Center>
      </Container>
    </LayoutGroup>
  );
};
