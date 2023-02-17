import { ReactElement, FC } from 'react';
import { IconType } from 'react-icons';

type TabLayoutContentProperties = {
    element: ReactElement;
    label: string;
    isCloseable?: boolean;
    icon: IconType;
};
type TabLayoutProperties = {
    content: TabLayoutContentProperties[];
    isFitted?: boolean;
    hasScrollbar?: boolean;
};
declare const TabLayout: FC<TabLayoutProperties>;

export { TabLayout, TabLayoutContentProperties, TabLayoutProperties };
