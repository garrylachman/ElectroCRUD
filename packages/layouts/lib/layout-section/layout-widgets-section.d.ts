import { FlexProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type LayoutWidgetsSectionProperties = {
    name: string;
    sectionProperties?: FlexProps;
};
declare const LayoutWidgetsSection: FC<PropsWithChildren<LayoutWidgetsSectionProperties>>;

export { LayoutWidgetsSection, LayoutWidgetsSectionProperties };
