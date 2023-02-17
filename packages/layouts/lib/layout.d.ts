import { ReactElement, FC } from 'react';

type LayoutProperties = {
    sections?: ReactElement[];
};
declare const Layout: FC<LayoutProperties>;

export { Layout, LayoutProperties };
