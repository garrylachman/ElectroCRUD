import { FlexProps, CardProps, CardBodyProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { LayoutContentProperties } from './layout-content.js';

type LayoutCardContentProperties = LayoutContentProperties & {
    containerProperties?: FlexProps;
    cardProperties?: CardProps;
    cardBodyProperties?: CardBodyProps;
};
declare const LayoutCardContent: FC<PropsWithChildren<LayoutCardContentProperties>>;

export { LayoutCardContent, LayoutCardContentProperties };
