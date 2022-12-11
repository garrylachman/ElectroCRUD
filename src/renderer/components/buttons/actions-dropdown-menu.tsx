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
  Box,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { RippleButton } from './ripple-button';
import { AnimateComponent } from '../motions/animate-component';

export type ActionsDropdownMenuProps = {
  menuName?: string;
  items?: { props: MenuItemProps; text: string }[];
};

export const ActionsDropdownMenu: FC<ActionsDropdownMenuProps> = ({
  menuName = 'Actions',
  items = [],
}) => {
  return (
    <Box position="relative" right={0}>
      <Menu offset={[0,0]}>
        {({ isOpen }) => (
          <Box>
            <MenuButton
              isActive={isOpen}
              borderBottomRightRadius={isOpen ? 0 : 10}
              borderBottomLeftRadius={isOpen ? 0 : 10}
              as={Button}
              variant={"brand"}
              rightIcon={<Icon as={MdArrowDropDown} fontSize="2xl" />}
            >
              {menuName}
            </MenuButton>
            <MenuList
              flexDirection="column"
              minWidth="3xs"
              borderRadius={10}
              borderTopRightRadius={isOpen ? 0 : 10}
              py={0}
              overflow="hidden"
              boxShadow="md"
              borderWidth={0}
            >
              {items.map((item, index) => (
                <MenuItem _hover={{bg: 'gray.200'}}  key={`m-${index}`} {...item.props} px={2} py={3}>{item.text}</MenuItem>
              ))}
            </MenuList>
          </Box>
        )}
      </Menu>
    </Box>
  );
};
