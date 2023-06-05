import { FC, useEffect, useRef } from 'react';
import { Card, CardBody } from '@chakra-ui/card';
import { motion } from 'framer-motion';
import { useIPCLogs } from 'renderer/ipc/use-ipc-log';
import { ListItem, UnorderedList, Badge, Text } from '@chakra-ui/react';
import { LogItem } from '@electrocrud/shared';
import ReactTimeAgo from 'react-time-ago';
import { statusToColor } from 'renderer/helpers';

const motionVariations = {
  hidden: {
    y: 200,
    x: 1000,
    opacity: 0.7,
    scaleX: 0.1,
    scaleY: 0.1,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: 200,
    x: 1000,
    opacity: 0.7,
    scaleX: 0.1,
    scaleY: 0.1,
    transition: {
      duration: 0.2,
    },
  },
};

export type ConsoleLogWindowProperties = {
  isOpen: boolean;
};

export const ConsoleLogWindow: FC<ConsoleLogWindowProperties> = ({
  isOpen,
}) => {
  const [log] = useIPCLogs();
  const logReference = useRef<HTMLOListElement | undefined>();
  useEffect(() => {
    if (logReference.current) {
      // eslint-disable-next-line unicorn/numeric-separators-style
      logReference.current?.scrollTo(0, 10000000);
    }
  }, [log]);

  useEffect(() => {
    if (logReference.current) {
      // eslint-disable-next-line unicorn/numeric-separators-style
      logReference.current?.scrollTo(0, 10000000);
    }
  }, [isOpen]);

  return (
    <Card
      as={motion.div}
      position="fixed"
      bottom="0"
      variant="elevated"
      right="35px"
      width="-webkit-fill-available"
      height="200px"
      variants={motionVariations}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      bgColor="transparent"
      zIndex={999}
    >
      <CardBody bgColor="blackAlpha.800">
        {isOpen && (
          <UnorderedList
            overflow="auto"
            position="absolute"
            width="-webkit-fill-available"
            height="-webkit-fill-available"
            marginInlineStart={0}
            // @ts-ignore
            ref={logReference}
          >
            {(log as unknown as LogItem[]).map((logItem) => (
              <ListItem
                key={logItem?.body?.id}
                color="white"
                my={2}
                fontSize="xs"
              >
                <Badge
                  variant="solid"
                  fontSize="2xs"
                  colorScheme={statusToColor(logItem?.body?.type)}
                >
                  {logItem?.body?.type}
                </Badge>
                <Badge mx={2} colorScheme="primary" fontSize="2xs">
                  {logItem.body?.ts && (
                    <ReactTimeAgo date={logItem.body?.ts} timeStyle="twitter" />
                  )}
                </Badge>
                <Text as="span">
                  {logItem.body?.method}: {logItem.body?.message}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        )}
      </CardBody>
    </Card>
  );
};
