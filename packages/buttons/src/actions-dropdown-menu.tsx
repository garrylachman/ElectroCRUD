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
import { uniqueId } from 'underscore';
import { FC, ReactElement, useMemo } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

export type ActionsDropdownMenuItem = {
  props?: MenuItemProps;
  text?: string | ReactElement;
  isDivider?: boolean;
};

export type ActionsDropdownMenuProperties = {
  menuName?: string;
  items?: ActionsDropdownMenuItem[];
};

export const ActionsDropdownMenu: FC<ActionsDropdownMenuProperties> = ({
  menuName = 'Actions',
  items = [],
}) => {
  const cachedItems = useMemo(
    () =>
      items.map((item, itemIndex) => {
        return {
          ...item,
          key: uniqueId('Actions-Menu-Item-'),
        };
      }),
    [items]
  );

  return (
    <Box position="relative" right={0}>
      <Menu offset={[0, 0]} strategy="fixed" placement="bottom-end" isLazy>
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
              {cachedItems.map((item) =>
                item.isDivider ? (
                  <Box
                    textAlign="center"
                    height="12px"
                    key={item.key}
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
                    key={item.key}
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
