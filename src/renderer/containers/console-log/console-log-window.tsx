import { FC, useEffect, useRef } from 'react';
import { Card, CardBody } from '@chakra-ui/card';
import { motion } from 'framer-motion';
import { useIPCLogs } from 'renderer/ipc/use-ipc-log';
import { ListItem, UnorderedList, Badge, Text } from '@chakra-ui/react';
import ReactTimeAgo from 'react-time-ago';
import { statusToColor } from 'renderer/helpers';

const motionVariations = {
  hidden: {
    y: 500,
    opacity: 0.5,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: 500,
    opacity: 0.5,
    transition: {
      duration: 0.3,
    },
  },
};

export type ConsoleLogWindowProperties = {
  isOpen: boolean;
};

export const ConsoleLogWindow: FC<ConsoleLogWindowProperties> = ({
  isOpen,
}) => {
  const [log, clear] = useIPCLogs();
  const logReference = useRef();
  useEffect(() => {
    if (logReference.current) {
      logReference.current?.scrollTo(0, 10000000);
    }
  }, [log]);

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
        <UnorderedList
          overflow="auto"
          position="absolute"
          width="-webkit-fill-available"
          height="-webkit-fill-available"
          marginInlineStart={0}
          ref={logReference}
        >
          {log.map((logItem, logIndex) => (
            <ListItem key={`log-item-${logIndex}`} color="white" my={2} fontSize="xs">
              <Badge variant="solid" fontSize="2xs" colorScheme={statusToColor(logItem.body.type)}>{logItem.body.type}</Badge>
              <Badge mx={2} colorScheme="primary" fontSize="2xs">
                <ReactTimeAgo date={logItem.body.ts} timeStyle="twitter" />
              </Badge>
              <Text as="span">{logItem.body.method}: {logItem.body.message}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};
