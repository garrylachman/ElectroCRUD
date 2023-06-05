import { HStack, MenuItemProps } from '@chakra-ui/react';
import { FC } from 'react';

import { ActionsDropdownMenu } from '@electrocrud/buttons';

export type TableCardHeaderProperties = {
  actionItems?: { props: MenuItemProps; text: string }[];
};

export const TableCardHeader: FC<TableCardHeaderProperties> = ({
  actionItems = [],
}) => {
  return (
    <HStack>
      <ActionsDropdownMenu menuName="Actions" items={actionItems} />
    </HStack>
  );
};
