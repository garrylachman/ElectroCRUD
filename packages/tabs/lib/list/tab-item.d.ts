import { FC } from 'react';
import { TabProperties, TabsProperties } from '../tabs.js';
import '@chakra-ui/react';
import 'csstype';
import 'react-icons';

type TabItemProperties = {
    tab: TabProperties;
    isSelected: boolean;
    onSelected: () => void;
    onClose: () => void;
} & Pick<TabsProperties, 'isFitted' | 'iconGap' | 'fontSize'>;
declare const TabItem: FC<TabItemProperties>;

export { TabItem, TabItemProperties };
