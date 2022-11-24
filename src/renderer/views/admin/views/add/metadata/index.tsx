import { FC } from 'react';
import {
  ViewRO,
} from 'renderer/defenitions/record-object';
import { Icon, Tabs, Tab, TabList, TabPanel, Flex, Text, TabPanels } from '@chakra-ui/react';
import { MdBook, MdCode, MdTag } from 'react-icons/md';
import { NestedPartial } from 'shared';
import { Metadata } from './Metadata';
import Card from 'renderer/components/card/Card';
import { CodeExamples } from './CodeExamples';

type MetaDataIndexProps = {
  viewState: NestedPartial<ViewRO>;
};

export const MetaDataIndex:FC<MetaDataIndexProps> = ({
  viewState
}) => {
  return (
    <Card px={0}>
      <Tabs isLazy isFitted colorScheme="brandTabs" pt="0px">
        <TabList>
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
                Tags
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Metadata viewState={viewState} />
          </TabPanel>
          <TabPanel px={0}>
            <CodeExamples viewState={viewState} />
          </TabPanel>
          <TabPanel px={0}>
            <Text>Soon</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export * from './Metadata';
