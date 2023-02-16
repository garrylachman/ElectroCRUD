import * as react from 'react';
import { ReactNode } from 'react';
import { TabsProps, ResponsiveValue, FlexProps, TabPanelProps } from '@chakra-ui/react';
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
    marginBottom?: ResponsiveValue<number>;
    height?: FlexProps['height'];
    tabPanelProps?: TabPanelProps;
    isSticky?: boolean;
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
    marginBottom?: ResponsiveValue<number>;
    height?: FlexProps['height'];
    tabPanelProps?: TabPanelProps;
    isSticky?: boolean;
} & react.RefAttributes<TabsAPI>>;

export { TabProperties, Tabs, TabsAPI, TabsProperties };
