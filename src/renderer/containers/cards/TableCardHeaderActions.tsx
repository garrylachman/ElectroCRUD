import { FC } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemProps,
  MenuButton,
  Button,
  MenuList,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

export type TableCardHeaderActionsProps = {
  menuName?: string;
  items?: { props: MenuItemProps; text: string }[];
};

export const TableCardHeaderActions: FC<TableCardHeaderActionsProps> = ({
  menuName = 'Actions',
  items = [],
}) => {
  return (
    <Menu offset={[0,0]} matchWidth>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            borderBottomRightRadius={isOpen ? 0 : 10}
            borderBottomLeftRadius={isOpen ? 0 : 10}
            as={Button}
            variant={"brand"}
            rightIcon={<Icon as={MdArrowDropDown} />}
          >
            {menuName}
          </MenuButton>
          <MenuList
            minWidth="auto"
            borderRadius={10}
            borderTopLeftRadius={isOpen ? 0 : 10}
            borderTopRightRadius={isOpen ? 0 : 10}
          >
            {items.map((item) => (
              <MenuItem {...item.props} p={2}>{item.text}</MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
