import { FC } from 'react';
import { Flex, Text, HStack, Button, MenuItemProps, Input } from '@chakra-ui/react';
import { TableCardHeaderSearchBar } from './TableCardHeaderSearchBar';
import { TableCardHeaderActions } from './TableCardHeaderActions';

export type TableCardHeaderProps = {
  title: string;
  actionItems?: { props: MenuItemProps; text: string }[];
};

export const TableCardHeader: FC<TableCardHeaderProps> = ({
  title,
  actionItems = [],
}) => {
  return (
    <Flex
      px="25px"
      justifyContent="space-between"
      align="center"
      height="70px"
      alignItems="center"
    >
      <Text fontSize="22px" fontWeight="700" lineHeight="100%">
        {title}
      </Text>
      <HStack>
        <TableCardHeaderSearchBar />
        <TableCardHeaderActions menuName="Actions" items={actionItems} />
      </HStack>
    </Flex>
  );
};
