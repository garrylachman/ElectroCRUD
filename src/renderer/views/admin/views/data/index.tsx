import { useParams } from 'react-router-dom';
import { WithErrorComponent } from 'renderer/containers/error';
import { ViewScopedContextProvider } from 'renderer/contexts';

import { Dashboard } from './dashboard';
import { DashboardContextProvider } from './dashboard-context';

export * from './dashboard-context';
export * from './dashboard';

export default function DashboardWithContext() {
  const { viewId } = useParams();

  return (
    <WithErrorComponent>
      <ViewScopedContextProvider viewId={viewId}>
        <DashboardContextProvider viewId={viewId}>
          <Dashboard />
        </DashboardContextProvider>
      </ViewScopedContextProvider>
    </WithErrorComponent>
  );
}
