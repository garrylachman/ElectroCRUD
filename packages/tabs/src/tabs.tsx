import './tabs.css';
import {
  Flex,
  FlexProps,
  ResponsiveValue,
  TabList,
  TabPanelProps,
  TabPanels,
  Tabs as OriginalTabs,
  TabsProps,
} from '@chakra-ui/react';
import * as CSS from 'csstype';
import { AnimatePresence, Reorder } from 'framer-motion';
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { ObjectID } from '@electrocrud/utils';
import { omit } from 'underscore';
import { TabItem } from './list';
import { PanelItem } from './panels';

export type TabProperties = {
  name: string;
  element: ReactNode;
  icon: IconType;
  closeable?: boolean;
};

export type TabsAPI = {
  addTab: (tab: TabProperties) => void;
};

export type TabsProperties = Omit<TabsProps, 'children'> & {
  tabsList: TabProperties[];
  iconSize?: ResponsiveValue<CSS.Property.Width | number>;
  iconGap?: number;
  isFitted?: boolean;
  variant?: string;
  isBoxed?: boolean;
  fontSize?: string;
  fillAvailable?: boolean;
  hasScrollbar?: boolean;
  marginTop?: ResponsiveValue<number>;
  marginBottom?: ResponsiveValue<number>;
  height?: FlexProps['height'];
  tabPanelProps?: TabPanelProps;
  isSticky?: boolean;
};

export const Tabs = forwardRef<TabsAPI, TabsProperties>(
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
      marginBottom = 0,
      tabPanelProps,
      isSticky = false,
      height = '100%',
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

    const tabListSticky = useMemo(() => {
      if (isSticky) {
        return {
          position: 'sticky' as ResponsiveValue<CSS.Property.Position>,
          top: '0px',
          zIndex: 99,
          background: 'white',
          borderTopRadius: 'lg',
          marginTop: '-12px',
        };
      }
      return {};
    }, [isSticky]);

    useImperativeHandle(
      reference,
      () => {
        return {
          addTab: (tab: TabProperties) => {
            setTabsState((previous) => [...previous, tab]);
            setSelectedTab(tab);
          },
        };
      },
      [setTabsState, tabsState]
    );

    return (
      <>
        <OriginalTabs
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
          height={height}
          position="relative"
        >
          <TabList {...tabListSticky}>
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
                  <TabItem
                    key={ObjectID.id(
                      omit(tab, ['element', 'component', 'icon'])
                    )}
                    tab={tab}
                    isSelected={tab === selectedTab}
                    isFitted={isFitted}
                    iconGap={iconGap}
                    fontSize={fontSize}
                    onSelected={() => {
                      setSelectedTab(tab);
                    }}
                    onClose={() => {
                      setSelectedTab(tabsState[tabsState.length - 2]);
                      setTabsState((previous) =>
                        previous.filter((value) => value !== tab)
                      );
                    }}
                  />
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
              <PanelItem
                key={ObjectID.id(
                  omit(tab, ['name', 'element', 'component', 'icon'])
                )}
                tab={tab}
                tabIndex={index}
                isBoxed={isBoxed}
                marginTop={marginTop}
                tabPanelProps={tabPanelProps}
                fillAvailable={fillAvailable}
                hasScrollbar={hasScrollbar}
                variant={variant}
              />
            ))}
          </TabPanels>
        </OriginalTabs>
      </>
    );
  }
);
