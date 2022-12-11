import { Button, ButtonProps } from '@chakra-ui/react';
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
  bgColor = { step1: 'brand.150', step2: 'brand.600', step3: 'brand.100' },
  ...properties
}) => (
  <Button
    bgColor={bgColor.step1}
    color="white"
    fontWeight="medium"
    rounded="lg"
    shadow="base"
    size={size}
    _focus={{
      outline: 'none',
    }}
    key={key}
    transition="background 0.8s"
    backgroundPosition="center"
    _hover={{
      bgColor: `${bgColor.step2}`,
      bgGradient: `radial(circle, transparent 1%, ${bgColor.step2} 1%)`,
      bgPos: 'center',
      backgroundSize: '15000%',
    }}
    _active={{
      bgColor: `${bgColor.step3}`,
      backgroundSize: '100%',
      transition: 'background 0s',
    }}
    {...properties}
  >
    {children}
  </Button>
);
