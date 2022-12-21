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
    outlineOffset="0px"
    outlineStyle="solid"
    outline="0px"
    _focus={{
      outline: 'none',
    }}
    key={key}
    transition="background 0.8s, outline 0.8s, outline-offset 0.8s"
    backgroundPosition="center"
    _hover={{
      bgColor: `${bgColor.step2}`,
      bgGradient: `radial(circle, transparent 1%, ${bgColor.step2} 1%)`,
      bgPos: 'center',
      outlineStyle: 'solid',
      outlineWidth: '3px',
      outlineColor: `${bgColor.step2}`,
      outlineOffset: '0px',
      backgroundSize: '50000%',
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
