import { Button, ButtonProps, keyframes, useToken } from '@chakra-ui/react';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { O } from 'ts-toolbelt';

export type RippleButtonProperties = O.Merge<
  ButtonProps,
  {
    bgColor?: {
      step1: string;
      step2: string;
      step3: string;
    };
    bgColorScheme?: string;
  }
>;

const pulse = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0)',
  },
  '33%': {
    opacity: 1,
    transform: 'scale(5)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(30)',
  },
});

export const RippleButton: FC<RippleButtonProperties> = ({
  children,
  size,
  key,
  bgColorScheme = 'primary',
  bgColor = {
    step1: `${bgColorScheme}.400`,
    step2: `${bgColorScheme}.600`,
    step3: `${bgColorScheme}.700`,
  },
  ...properties
}) => {
  const [step1, step2, step3] = useToken('colors', [
    bgColor.step1,
    bgColor.step2,
    bgColor.step3,
  ]);

  return (
    <Button
      variant="solid"
      as={motion.button}
      py={3}
      px={4}
      color="white"
      fontWeight="medium"
      rounded="lg"
      shadow="none"
      size={size}
      cursor="pointer"
      overflow="hidden"
      key={key}
      backgroundPosition="center"
      style={{
        background: `linear-gradient(60deg, ${step1} 0%, ${chroma(step1)
          .brighten(0.1)
          .hex()} 100%)`,
      }}
      sx={{
        '&::before': {
          content: "' '",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,.4)',
          borderRadius: '50%',
          width: '10px',
          height: '10px',
          margin: 'auto',
          opacity: 0,
        },
      }}
      whileHover={{
        background: [
          `linear-gradient(60deg, ${step2} 0%, ${chroma(step2)
            .brighten(0.1)
            .hex()} 100%)`,
          `linear-gradient(60deg, ${step2} 0%, ${chroma(step2)
            .brighten(1)
            .hex()} 100%)`,
          `linear-gradient(60deg, ${chroma(step2)
            .brighten(1.3)
            .hex()} 0%, ${step2} 100%)`,
          `linear-gradient(60deg, ${chroma(step2)
            .brighten(0.1)
            .hex()} 0%, ${step2} 100%)`,
        ],
        transition: {
          duration: 3,
          type: 'spring',
          repeat: Number.POSITIVE_INFINITY,
        },
      }}
      _active={{
        bgColor: `${bgColor.step3}`,
        '&::before': {
          animation: `${pulse} 0.8s linear`,
        },
      }}
      {...properties}
    >
      {children}
    </Button>
  );
};
