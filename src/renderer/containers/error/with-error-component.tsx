import { ErrorBoundary } from '@saas-ui/react';
import { FC, PropsWithChildren } from 'react';

import { ErrorComponent } from './error-component';

export const WithErrorComponent: FC<PropsWithChildren<any>> = ({
  children,
}) => (
  <ErrorBoundary errorComponent={<ErrorComponent />}>{children}</ErrorBoundary>
);
