import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemProps,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

export type ActionsDropdownMenuProperties = {
  menuName?: string;
  items?: { props: MenuItemProps; text?: string; isDivider?: boolean }[];
};

export const ActionsDropdownMenu: FC<ActionsDropdownMenuProperties> = ({
  menuName = 'Actions',
  items = [],
}) => {
  return (
    <Box position="relative" right={0}>
      <Menu offset={[0, 0]} strategy="fixed">
        {({ isOpen }) => (
          <Box>
            <MenuButton
              isActive={isOpen}
              borderBottomRightRadius={isOpen ? 0 : 10}
              borderBottomLeftRadius={isOpen ? 0 : 10}
              as={Button}
              variant="solid"
              colorScheme="primary"
              rightIcon={<Icon as={MdArrowDropDown} fontSize="2xl" />}
            >
              {menuName}
            </MenuButton>
            <MenuList
              rounded="lg"
              boxShadow="lg"
              py={0}
              overflow="hidden"
              borderTopRightRadius={0}
            >
              {items.map((item, index) =>
                item.isDivider ? (
                  <Box
                    textAlign="center"
                    height="12px"
                    key={`m-${index}`}
                    width="90%"
                    m="auto"
                  >
                    <MenuDivider borderColor="gray.300" />
                    <Text
                      as="span"
                      position="relative"
                      top="-25px"
                      bgColor="white"
                      px={5}
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {item.text}
                    </Text>
                  </Box>
                ) : (
                  <MenuItem
                    key={`m-${index}`}
                    {...item.props}
                    py={3}
                    alignItems="center"
                    fontSize="sm"
                    textTransform="uppercase"
                    gap={3}
                    iconSpacing={0}
                    _hover={{ fontWeight: 'bold', bgColor: 'blackAlpha.200' }}
                  >
                    {item.text}
                  </MenuItem>
                )
              )}
            </MenuList>
          </Box>
        )}
      </Menu>
    </Box>
  );
};
