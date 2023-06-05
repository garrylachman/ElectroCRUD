/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  Badge,
  Box,
  BoxProps,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC, useContext, useEffect, useState } from 'react';
import { HiViewColumns } from 'react-icons/hi2';
import { PaneContext } from '@electrocrud/pane';
import { ScopeContext } from 'renderer/contexts/scope-context';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';

export type ColumnsListPaneProperties = BoxProps;

export const ColumnsListPane: FC<ColumnsListPaneProperties> = ({
  ...properties
}) => {
  const { isOpen } = useContext(PaneContext);
  const { viewState } = useContext(ViewScopedContext);
  const { setValue } = useContext(ScopeContext);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (viewState?.columns[selected]) {
      setValue('columnId', viewState?.columns[selected].id as string);
    }
  }, [selected]);

  const variants = {
    open: {
      left: 0,
      width: '100%',
      transition: { duration: 0.6, type: 'spring', bounce: 0.6 },
    },
    close: {
      left: -51,
      width: '150%',
      transition: { duration: 0.6, type: 'spring', bounce: 0.6 },
    },
  };

  return (
    <Box py={3} px={3} {...properties}>
      <Heading
        borderColor="primary.100"
        borderBottomWidth={2}
        backgroundColor="whiteAlpha.800"
        p={3}
        mb={1}
        w="100%"
        size="sm"
        as={Badge}
      >
        Columns
      </Heading>
      <List spacing={0} overflowX="hidden">
        {viewState?.columns.map((column, index) => (
          <ListItem
            key={`list-column-${column.id as string}`}
            position="relative"
            whiteSpace="nowrap"
            overflowX="hidden"
            textOverflow="ellipsis"
            borderColor="primary.100"
            as={motion.div}
            variants={variants}
            animate={isOpen ? 'open' : 'close'}
            whileHover={{
              backgroundColor: '#E9E3FF',
              borderRadius: 20,
              scaleY: 1.1,
              marginLeft: 3,
              fontWeight: 600,
              borderLeft: '2px solid #422AFB',
            }}
            whileTap={{
              borderLeft: '5px solid #422AFB',
            }}
            my={2}
            py={0}
            cursor="pointer"
            onClick={() => setSelected(index)}
          >
            <Badge colorScheme="primary" rounded={8} size="xs">
              <ListIcon
                as={HiViewColumns}
                color="primary.200"
                boxSize={4}
                m={0}
              />
            </Badge>
            <Text
              as="span"
              pl={4}
              fontSize={15}
              fontWeight={selected === index ? 900 : 500}
            >
              {(column as any).name}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
