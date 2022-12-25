import {
  Badge,
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
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { O } from 'ts-toolbelt';

export type ElectroCRUDTabProperties = O.Either<
  {
    name: string;
    component: FC<any>;
    element: ReactNode;
    icon: IconType;
  },
  'component' | 'element'
>;

export type ElectroCRUDTabsProperties = Omit<TabsProps, 'children'> & {
  tabsList: ElectroCRUDTabProperties[];
  iconSize?: ResponsiveValue<CSS.Property.Width | number>;
  iconGap?: number;
  isFitted?: boolean;
  variant?: string;
  isBoxed?: boolean;
  fontSize?: string;
};

export const ElectroCRUDTabs: FC<ElectroCRUDTabsProperties> = ({
  tabsList,
  iconSize = 4,
  iconGap = 3,
  isFitted = true,
  isBoxed = false,
  fontSize = 'lg',
  variant,
  ...rest
}) => {
  const [tabsState, setTabsState] = useState(tabsList);
  const [selectedTab, setSelectedTab] = useState(tabsList[0]);
  const tabIndex = useMemo(
    () => tabsState.indexOf(selectedTab),
    [tabsState, selectedTab]
  );
  const RenderComponent = useCallback(
    (properties: any) =>
      tabsList[tabIndex].component ? (
        tabsList[tabIndex].component(properties)
      ) : (
        <></>
      ),
    [selectedTab, tabsState]
  );

  return (
    <>
      <Tabs
        isFitted={isFitted}
        isLazy
        lazyBehavior="keepMounted"
        variant={variant}
        {...rest}
        index={tabIndex}
        onChange={(value) => setSelectedTab(tabsState[value])}
        overflow="unset"
      >
        <TabList>
          <Reorder.Group
            as="ul"
            axis="x"
            onReorder={setTabsState}
            className="tabs"
            values={tabsState}
            style={{ display: 'flex', listStyle: 'none', flex: 1 }}
          >
            <AnimatePresence initial={false}>
              {tabsState.map((tab) => (
                <Reorder.Item
                  key={tab.name}
                  value={tab}
                  id={tab.name}
                  initial={{ opacity: 0, y: 30 }}
                  style={{ width: isFitted ? '100%' : 'auto' }}
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
                    width={isFitted ? '100%' : 'auto'}
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
                          <Text fontSize={fontSize} fontWeight="500">
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
              key={`tab-content-${tab.name}`}
              id={tab.name}
              tabIndex={tabsState.indexOf(tab)}
              px={0}
              pb={0}
              borderWidth={isBoxed ? '1px' : 0}
              borderTopWidth={isBoxed ? '1px' : 0}
              overflowX="hidden"
            >
              <motion.div
                key={tabIndex ? tab.name : 'empty'}
                animate={{ opacity: 1, x: 0, filter: `blur(0px)` }}
                initial={{ opacity: 0.2, x: 200, filter: `blur(5px)` }}
                exit={{ opacity: 0.2, x: -200 }}
                transition={{
                  duration: 1,
                  bounce: 0.3,
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                }}
              >
                {tabsList[tabIndex].element ? (
                  <>{tabsList[tabIndex].element}</>
                ) : (
                  <RenderComponent />
                )}
              </motion.div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
