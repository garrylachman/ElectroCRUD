import * as react from 'react';
import { ReactNode } from 'react';
import { TabsProps, ResponsiveValue, TabPanelProps } from '@chakra-ui/react';
import * as CSS from 'csstype';
import { IconType } from 'react-icons';

type TabProperties = {
    name: string;
    element: ReactNode;
    icon: IconType;
    closeable?: boolean;
};
type TabsAPI = {
    addTab: (tab: TabProperties) => void;
};
type TabsProperties = Omit<TabsProps, 'children'> & {
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
    tabPanelProps?: TabPanelProps;
};
declare const Tabs: react.ForwardRefExoticComponent<Omit<TabsProps, "children"> & {
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
    tabPanelProps?: TabPanelProps;
} & react.RefAttributes<TabsAPI>>;

export { TabProperties, Tabs, TabsAPI, TabsProperties };
