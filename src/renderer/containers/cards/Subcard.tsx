import { Box, useColorModeValue } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import Card, { CustomCardProps } from 'renderer/components/card/Card';

type SubCardProps = CustomCardProps & { overflow?: string };

export const SubCard: FC<PropsWithChildren<SubCardProps>> = ({
  children,
  overflow = 'hidden',
  ...rest
}) => {
  const bg = useColorModeValue('white', 'navy.700');
  const bgBrand = useColorModeValue('gradient.perper.100', 'primary.400');
  return (
    <Card
      {...rest}
      bg={rest.variant === "brand" ? bgBrand : bg}
      p="15px"
      style={{ overflow }}
      shadow="lg"
      rounded="lg"
      color={rest.variant === "brand" ? "white" : undefined}
    >
      <Box>{children}</Box>
    </Card>
  );
};
