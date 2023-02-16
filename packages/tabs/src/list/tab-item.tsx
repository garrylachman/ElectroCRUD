import { motion, Reorder } from 'framer-motion';
import { FC } from 'react';
import { TabProperties, TabsProperties } from '../tabs';
import { Center, Flex, Icon, Tab as OriginalTab, Text } from '@chakra-ui/react';
import { Tooltip } from '@electrocrud/feedback';
import { TabClose } from './tab-close';

export type TabItemProperties = {
  tab: TabProperties;
  isSelected: boolean;
  onSelected: () => void;
  onClose: () => void;
} & Pick<TabsProperties, 'isFitted' | 'iconGap' | 'fontSize'>;

export const TabItem: FC<TabItemProperties> = ({
  tab,
  isFitted,
  iconGap,
  isSelected,
  onSelected,
  onClose,
  fontSize,
}) => (
  <Reorder.Item
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
    <OriginalTab
      isSelected={isSelected}
      width={isFitted ? '100%' : 'auto'}
      minWidth="150px"
    >
      <motion.span layout="position">
        <Tooltip label="Drag to change tabs order" openDelay={500}>
          <Center gap={iconGap} justifyContent="space-between">
            <Flex gap={2} alignItems="center" onPointerDown={onSelected}>
              <Icon as={tab.icon} boxSize={4} />
              <Text fontSize={fontSize} fontWeight="500">
                {tab.name}
              </Text>
            </Flex>
            {tab?.closeable && <TabClose onClose={onClose} />}
          </Center>
        </Tooltip>
      </motion.span>
    </OriginalTab>
  </Reorder.Item>
);
