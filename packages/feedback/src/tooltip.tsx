import { Tooltip as OriginalTooltip, TooltipProps } from '@chakra-ui/react';
import chroma from 'chroma-js';
import { FC } from 'react';

export const Tooltip: FC<TooltipProps> = ({ children, ...rest }) => (
  <OriginalTooltip
    hasArrow
    color="white"
    borderRadius="xl"
    boxShadow="lg"
    py={2}
    px={3}
    {...rest}
    bgColor={`linear-gradient(135deg, #7434db 0%, ${chroma('#7434db')
      .brighten(1)
      .hex()} 100%)`}
    borderColor="primary.400"
  >
    {children}
  </OriginalTooltip>
);
