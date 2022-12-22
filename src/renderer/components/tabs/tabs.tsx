import {
  Center,
  Icon,
  ResponsiveValue,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import * as CSS from 'csstype';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
import { IconType } from 'react-icons';

export type ElectroCRUDTabProperties = {
  name: string;
  component: FC<any>;
  icon: IconType;
};

export type ElectroCRUDTabsProperties = Omit<TabsProps, 'children'> & {
  tabsList: ElectroCRUDTabProperties[];
  iconSize?: ResponsiveValue<CSS.Property.Width | number>;
  iconGap?: number;
};

export const ElectroCRUDTabs: FC<ElectroCRUDTabsProperties> = ({
  tabsList,
  iconSize = 4,
  iconGap = 3,
  ...rest
}) => {
  const [tabsState, setTabsState] = useState(tabsList);
  const [selectedTab, setSelectedTab] = useState(tabsList[0]);
  const tabIndex = useMemo(
    () => tabsState.indexOf(selectedTab),
    [tabsState, selectedTab]
  );
  const RenderComponent = useCallback(
    (properties: any) => selectedTab.component(properties),
    [selectedTab, tabsState]
  );

  return (
    <>
      <Tabs
        isFitted
        {...rest}
        isLazy
        lazyBehavior="keepMounted"
        index={tabIndex}
        onChange={(value) => setSelectedTab(tabsState[value])}
      >
        <TabList>
          <Reorder.Group
            as="ul"
            axis="x"
            onReorder={setTabsState}
            className="tabs"
            values={tabsState}
            style={{ display: 'flex', listStyle: 'none' }}
          >
            <AnimatePresence initial={false}>
              {tabsState.map((tab) => (
                <Reorder.Item
                  key={tab.name}
                  value={tab}
                  id={tab.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                  whileDrag={{ backgroundColor: '#e3e3e3' }}
                  onPointerDown={() => setSelectedTab(tab)}
                >
                  <Tab
                    key={`tab-${tab.name}`}
                    panelId={tab.name}
                    isSelected={tab === selectedTab}
                  >
                    <motion.span layout="position">
                      <Tooltip
                        hasArrow
                        label="Drag to change tabs order"
                        bg="brand.600"
                        openDelay={500}
                        rounded="lg"
                      >
                        <Center gap={iconGap}>
                          <Icon as={tab.icon} boxSize={iconSize} />
                          <Text fontSize="lg" fontWeight="500">
                            {tab.name}
                          </Text>
                        </Center>
                      </Tooltip>
                    </motion.span>
                  </Tab>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </TabList>
        <TabPanels>
          {tabsState.map((tab, index) => (
            <TabPanel
              id={tab.name}
              tabIndex={tabsState.indexOf(tab)}
              px={0}
              pb={0}
            >
              <AnimatePresence mode="wait" key={`tab-content-${tab.name}`}>
                <motion.div
                  key={tabIndex ? tab.name : 'empty'}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: '100vw' }}
                  exit={{ opacity: 0, x: '100vw' }}
                  transition={{ duration: 0.5, bounce: 0.5, type: 'spring' }}
                >
                  {tabIndex === undefined ? (
                    <Center>
                      <Spinner size="xl" />
                    </Center>
                  ) : (
                    <RenderComponent />
                  )}
                </motion.div>
              </AnimatePresence>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
