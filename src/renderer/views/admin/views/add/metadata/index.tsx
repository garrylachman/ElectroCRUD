import {
  Card,
  CardBody,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { MdBook, MdCode, MdTag } from 'react-icons/md';
import { ViewRO } from 'renderer/defenitions/record-object';

import { CodeExamples } from './code-examples';
import { ColumnsMetadata } from './columns-metadata';
import { TablesMetadata } from './tables-metadata';

type MetadataIndexProperties = {};

export const MetadataIndex: FC<MetadataIndexProperties> = () => {
  return (
    <Card px={0} overflow="unset">
      <CardBody px={0}>
        <Tabs isLazy isFitted colorScheme="brandTabs" pt="0px">
          <TabList>
            <AnimatePresence initial={false}>
              <Tab>
                <Flex align="center">
                  <Icon as={MdBook} w="15px" h="15px" me="8px" />
                  <Text fontSize="sm" fontWeight="500">
                    Table Documentation
                  </Text>
                </Flex>
              </Tab>
              <Tab>
                <Flex align="center">
                  <Icon as={MdCode} w="15px" h="15px" me="8px" />
                  <Text fontSize="sm" fontWeight="500">
                    Code & Queries
                  </Text>
                </Flex>
              </Tab>
              <Tab>
                <Flex align="center">
                  <Icon as={MdTag} w="15px" h="15px" me="8px" />
                  <Text fontSize="sm" fontWeight="500">
                    Columns
                  </Text>
                </Flex>
              </Tab>
            </AnimatePresence>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 200 }}
                  exit={{ opacity: 0, y: -200 }}
                  transition={{ duration: 0.3 }}
                >
                  <TablesMetadata />
                </motion.div>
              </AnimatePresence>
            </TabPanel>
            <TabPanel px={0}>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 200 }}
                  exit={{ opacity: 0, y: -200 }}
                  transition={{ duration: 0.3 }}
                >
                  <CodeExamples />
                </motion.div>
              </AnimatePresence>
            </TabPanel>
            <TabPanel px={0}>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 200 }}
                  exit={{ opacity: 0, y: -200 }}
                  transition={{ duration: 0.3 }}
                >
                  <ColumnsMetadata />
                </motion.div>
              </AnimatePresence>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export * from './tables-metadata';
