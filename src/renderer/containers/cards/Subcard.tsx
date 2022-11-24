import { Box, useColorModeValue } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import Card, { CustomCardProps } from 'renderer/components/card/Card';

type SubCardProps = CustomCardProps & {};

export const SubCard: FC<PropsWithChildren<SubCardProps>> = ({
  children,
  ...rest
}) => {
  const bg = useColorModeValue('white', 'navy.700');
  const bgBrand = useColorModeValue('gradient.perper.100', 'brand.400');
  return (
    <Card
      {...rest}
      bg={rest.variant === "brand" ? bgBrand : bg}
      p="15px"
      style={{ overflow: 'hidden' }}
      shadow="lg"
      rounded="lg"
      color={rest.variant === "brand" ? "white" : undefined}
    >
      <Box>{children}</Box>
    </Card>
  );
};
