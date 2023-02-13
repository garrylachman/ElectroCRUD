import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Portal,
  Text,
} from '@chakra-ui/react';
import { omit } from 'underscore';
import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons';
import { MdOutlineMoreVert } from 'react-icons/md';
import { O } from 'ts-toolbelt';
import { Tooltip } from '@electrocrud/feedback';

export type DataTableActionMenuItem = O.Merge<
  {
    menuIcon: IconType;
    label: string;
    onClick: (row: any) => any;
    tooltip?: string;
  },
  MenuItemProps
>;

export type DataTableActionMenuProperties = {
  items: DataTableActionMenuItem[];
  row?: any;
};

export const DataTableActionMenu: FC<DataTableActionMenuProperties> = ({
  items,
  row,
}) => (
  <Menu offset={[-15, -5]} isLazy strategy="absolute">
    <MenuButton as={Button} variant="link" _hover={{ color: 'black' }}>
      <Icon as={MdOutlineMoreVert} boxSize={6} mr={3} />
    </MenuButton>
    <Portal>
      <MenuList
        rounded="lg"
        boxShadow="lg"
        py={0}
        overflow="hidden"
        bgColor="whiteAlpha.500"
        backdropFilter="blur(10px) contrast(100%) saturate(190%)"
      >
        {items.map((item) => {
          return (
            <Tooltip
              // @ts-ignore
              label={item.tooltip}
              placement="left"
              key={`tooltip-${item.label}`}
            >
              <MenuItem
                // @ts-ignore
                key={`menuitem-${item.label}`}
                {...omit(item, ['menuIcon', 'label'])}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick(row);
                  }
                }}
                py={3}
                alignItems="center"
                fontSize="sm"
                textTransform="uppercase"
                gap={3}
                iconSpacing={0}
                _hover={{ fontWeight: 'bold', bgColor: 'blackAlpha.200' }}
                icon={<Icon display="flex" as={item.menuIcon} boxSize={4} />}
                bgColor="transparent"
              >
                {item.label}
              </MenuItem>
            </Tooltip>
          );
        })}
      </MenuList>
    </Portal>
  </Menu>
);
