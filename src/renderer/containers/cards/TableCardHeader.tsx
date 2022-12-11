import { FC } from 'react';
import { Flex, Text, HStack, Button, MenuItemProps, Input } from '@chakra-ui/react';
import { TableCardHeaderSearchBar } from './TableCardHeaderSearchBar';
import { ActionsDropdownMenu } from '../../components/buttons/actions-dropdown-menu';

export type TableCardHeaderProps = {
  actionItems?: { props: MenuItemProps; text: string }[];
};

export const TableCardHeader: FC<TableCardHeaderProps> = ({
  actionItems = [],
}) => {
  return (
    <HStack>
      <ActionsDropdownMenu menuName="Actions" items={actionItems} />
    </HStack>
  );
};
