import { FlexProps, CardProps, CardBodyProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type LayoutCardSectionProperties = {
    name: string;
    sectionProperties?: FlexProps;
    cardProperties?: CardProps;
    cardBodyProperties?: CardBodyProps;
};
declare const LayoutCardSection: FC<PropsWithChildren<LayoutCardSectionProperties>>;

export { LayoutCardSection, LayoutCardSectionProperties };
