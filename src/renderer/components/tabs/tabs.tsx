import {
  Box,
  Center,
  Flex,
  Icon,
  ResponsiveValue,
  Tab,
  TabList,
  TabPanel,
  TabPanelProps,
  TabPanels,
  Tabs,
  TabsProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import * as CSS from 'csstype';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import {
  FC,
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { MdClose } from 'react-icons/md';
import { ObjectID } from 'renderer/helpers';
import { O } from 'ts-toolbelt';

export type ElectroCRUDTabProperties = O.Either<
  {
    name: string;
    component: FC<any>;
    element: ReactNode;
    icon: IconType;
    closeable?: boolean;
  },
  'component' | 'element'
>;

export type ElectroCRUDTabsAPI = {
  addTab: (tab: ElectroCRUDTabProperties) => void;
};

export type ElectroCRUDTabsProperties = Omit<TabsProps, 'children'> & {
  tabsList: ElectroCRUDTabProperties[];
  iconSize?: ResponsiveValue<CSS.Property.Width | number>;
  iconGap?: number;
  isFitted?: boolean;
  variant?: string;
  isBoxed?: boolean;
  fontSize?: string;
  fillAvailable?: boolean;
  hasScrollbar?: boolean;
  marginTop?: ResponsiveValue<number>;
  tabPanelProps?: TabPanelProps;
};

export const ElectroCRUDTabs = forwardRef<
  ElectroCRUDTabsAPI,
  ElectroCRUDTabsProperties
>(
  (
    {
      tabsList,
      iconSize = 4,
      iconGap = 3,
      isFitted = true,
      isBoxed = false,
      fontSize = 'lg',
      fillAvailable = false,
      hasScrollbar = false,
      variant,
      marginTop = 0,
      tabPanelProps,
      ...rest
    },
    reference
  ) => {
    const [tabsState, setTabsState] = useState(tabsList);
    const [selectedTab, setSelectedTab] = useState(tabsState[0]);
    const tabIndex = useMemo(
      () => tabsState.indexOf(selectedTab),
      [tabsState, selectedTab]
    );
    const RenderComponent = useCallback(
      (properties: any) =>
        tabsState[tabIndex].component ? (
          tabsState[tabIndex].component(properties)
        ) : (
          <></>
        ),
      [selectedTab, tabsState]
    );

    useImperativeHandle(
      reference,
      () => {
        return {
          addTab: (tab: ElectroCRUDTabProperties) => {
            const nextIndex = tabsState.length;
            setTabsState((previous) => [...previous, tab]);
            setSelectedTab(tab);
          },
        };
      },
      [setTabsState, tabsState]
    );

    return (
      <>
        <Tabs
          as={Flex}
          isFitted={isFitted}
          isLazy
          lazyBehavior="unmount"
          variant={variant}
          {...rest}
          index={tabIndex}
          onChange={(value) => setSelectedTab(tabsState[value])}
          overflow="unset"
          flex={1}
          display="flex"
          flexDirection="column"
          height="100%"
          style={{
            height: '100%',
          }}
          position="relative"
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
                    key={ObjectID.id(
                      _.omit(tab, ['element', 'component', 'icon'])
                    )}
                    value={tab}
                    initial={{ opacity: 0, y: 30 }}
                    style={{ width: isFitted ? '100%' : 'auto' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                    whileDrag={{ backgroundColor: '#e3e3e3' }}
                  >
                    <Tab
                      isSelected={tab === selectedTab}
                      width={isFitted ? '100%' : 'auto'}
                      minWidth="150px"
                    >
                      <motion.span layout="position">
                        <Tooltip
                          hasArrow
                          label="Drag to change tabs order"
                          variant="solid"
                          bg="secondary.100"
                          openDelay={500}
                          rounded="lg"
                        >
                          <Center gap={iconGap} justifyContent="space-between">
                            <Flex
                              gap={2}
                              alignItems="center"
                              onPointerDown={() => setSelectedTab(tab)}
                            >
                              <Icon as={tab.icon} boxSize={4} />
                              <Text fontSize={fontSize} fontWeight="500">
                                {tab.name}
                              </Text>
                            </Flex>
                            {tab?.closeable && (
                              <Box
                                display="flex"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTab(
                                    tabsState[tabsState.length - 2]
                                  );
                                  setTabsState((previous) =>
                                    previous.filter((value) => value !== tab)
                                  );
                                }}
                                color="red.500"
                              >
                                <Icon as={MdClose} boxSize={4} />
                              </Box>
                            )}
                          </Center>
                        </Tooltip>
                      </motion.span>
                    </Tab>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </TabList>
          <TabPanels
            flex={1}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            height="100%"
          >
            {tabsState.map((tab, index) => (
              <TabPanel
                key={`tab-content-${tab.name}`}
                tabIndex={tabsState.indexOf(tab)}
                p={0}
                borderWidth={isBoxed ? '1px' : 0}
                borderTopWidth={isBoxed ? '1px' : 0}
                overflowX="hidden"
                height="100%"
                width="auto"
                position="initial"
                flex={1}
                display="flex"
                flexDirection="column"
                marginTop={marginTop}
                marginBottom={4}
                {...tabPanelProps}
              >
                <motion.div
                  key={tabIndex ? tab.name : 'empty'}
                  animate={{ opacity: 1, x: 0, filter: 'none' }}
                  initial={{ opacity: 0.2, x: 200, filter: `blur(5px)` }}
                  exit={{ opacity: 0.2, x: -200 }}
                  transition={{
                    duration: 1,
                    bounce: 0.3,
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                  }}
                  style={{
                    height: fillAvailable ? '-webkit-fill-available' : '100%',
                    display: 'block',
                    flexDirection: 'column',
                    width: '-webkit-fill-available',
                    overflow: 'scroll',
                    overscrollBehavior: 'contain',
                    position: fillAvailable ? 'absolute' : 'static',
                  }}
                  className={hasScrollbar ? 'tabScroller' : 'NoTabScroller'}
                >
                  {tabsState[tabIndex].element ? (
                    <>{tabsState[tabIndex].element}</>
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
  }
);
