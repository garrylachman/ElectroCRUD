import { CardHeader, CardHeaderProps } from '@chakra-ui/react';
import { FC } from 'react';

export type CardHeaderBetterProps = CardHeaderProps & {
  topBoderColor?: string;
  isTopBorder?: boolean;
};

export const CardHeaderBetter: FC<CardHeaderBetterProps> = ({
  children,
  topBoderColor = 'primary.200',
  isTopBorder = false,
  ...properties
}) => (
  <CardHeader
    {...properties}
    borderTopColor={topBoderColor}
    borderTopWidth={isTopBorder ? 4 : 0}
    borderRadius="6px;"
  >
    {children}
  </CardHeader>
);
