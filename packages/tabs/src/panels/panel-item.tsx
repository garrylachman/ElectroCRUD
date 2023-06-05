import { motion } from 'framer-motion';
import { FC } from 'react';
import { TabProperties, TabsProperties } from '../tabs';
import { TabPanel as OriginalTabPanel } from '@chakra-ui/react';

export type PanelItemProperties = {
  tab: TabProperties;
  tabIndex: number;
} & Pick<
  TabsProperties,
  | 'isBoxed'
  | 'variant'
  | 'marginTop'
  | 'marginBottom'
  | 'tabPanelProps'
  | 'fillAvailable'
  | 'hasScrollbar'
>;

export const PanelItem: FC<PanelItemProperties> = ({
  tab,
  tabIndex,
  isBoxed,
  variant,
  marginTop,
  marginBottom,
  tabPanelProps,
  fillAvailable,
  hasScrollbar,
}) => (
  <OriginalTabPanel
    tabIndex={tabIndex}
    p={0}
    borderWidth={isBoxed ? '1px' : 0}
    borderTopWidth={isBoxed && variant !== undefined ? '1px' : '0px'}
    overflowX="hidden"
    height="100%"
    width="auto"
    position="initial"
    flex={1}
    display="flex"
    flexDirection="column"
    marginTop={marginTop}
    marginBottom={marginBottom}
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
        display: 'flex',
        flexDirection: 'column',
        width: '-webkit-fill-available',
        overflow: 'scroll',
        overscrollBehavior: 'contain',
        position: fillAvailable ? 'absolute' : 'static',
      }}
      className={hasScrollbar ? 'tabScroller' : 'NoTabScroller'}
    >
      {tab.element ?? <></>}
    </motion.div>
  </OriginalTabPanel>
);
