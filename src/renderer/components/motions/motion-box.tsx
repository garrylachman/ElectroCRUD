/* eslint-disable unicorn/prevent-abbreviations */
import { Box, forwardRef } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

// Here we have used framer-motion package for animations
export const MotionBox = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);
