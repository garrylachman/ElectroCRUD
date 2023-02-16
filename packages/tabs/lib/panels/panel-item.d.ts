import { FC } from 'react';
import { TabProperties, TabsProperties } from '../tabs.js';
import '@chakra-ui/react';
import 'csstype';
import 'react-icons';

type PanelItemProperties = {
    tab: TabProperties;
    tabIndex: number;
} & Pick<TabsProperties, 'isBoxed' | 'variant' | 'marginTop' | 'marginBottom' | 'tabPanelProps' | 'fillAvailable' | 'hasScrollbar'>;
declare const PanelItem: FC<PanelItemProperties>;

export { PanelItem, PanelItemProperties };
