import { FlexProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type LayoutSectionProperties = {
    name: string;
    sectionProperties?: FlexProps;
};
declare const LayoutSection: FC<PropsWithChildren<LayoutSectionProperties>>;

export { LayoutSection, LayoutSectionProperties };
