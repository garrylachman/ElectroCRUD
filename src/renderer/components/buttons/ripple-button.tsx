import { Button, ButtonProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';

type RippleButtonProperties = ButtonProps & {
  bgColor?: {
    step1: string;
    step2: string;
    step3: string;
  };
};

export const RippleButton: FC<RippleButtonProperties> = ({
  children,
  size,
  key,
  bgColor = { step1: 'brand.150', step2: 'brand.600', step3: 'brand.600' },
  ...properties
}) => (
  <Button
    as={motion.div}
    bgColor={bgColor.step1}
    color="white"
    fontWeight="medium"
    rounded="lg"
    shadow="base"
    size={size}
    style={{
      outlineOffset: 0,
      outlineStyle: 'solid',
    }}
    outline="0px"
    _focus={{
      outline: 'none',
    }}
    cursor="pointer"
    key={key}
    backgroundPosition="center"
    whileHover={{
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineOffset: '0px',
      scale: 1.01,
      transition: 'duration 0.3s, type: spring, bounce: 0.8',
    }}
    _hover={{
      bgColor: `${bgColor.step2}`,
      bgGradient: `radial(circle, transparent 1%, ${bgColor.step2} 1%)`,
      bgPos: 'center',
      outlineColor: `${bgColor.step2}`,
    }}
    _active={{
      bgColor: `${bgColor.step3}`,
      backgroundSize: '10%',
      outlineWidth: '0px',
      outlineStyle: 'double',
      outlineColor: `white`,
      outlineOffset: '8px',
      transition: 'background 0s, outline 0.8s, outline-offset 0.5s',
    }}
    {...properties}
  >
    {children}
  </Button>
);
