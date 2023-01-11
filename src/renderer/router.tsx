import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';


const AdminLayout = lazy(() => import('renderer/layouts/admin'));
const ManageAccounts = lazy(() => import('renderer/views/admin/accounts'));
const EditTabs = lazy(() => import('renderer/views/admin/views/add/edit-tabs'));
const DashboardWithContext = lazy(
  () => import('renderer/views/admin/views/data')
);
const ManageViews = lazy(
  () => import('renderer/views/admin/views/add/manage-views')
);
const Settings = lazy(() => import('renderer/views/admin/settings'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route
          path="accounts"
          handle={{ title: 'Accounts' }}
          element={<ManageAccounts />}
        />
        <Route
          path="settings"
          handle={{ title: 'Settings' }}
          element={<Settings />}
        />
        <Route path="views" handle={{ title: 'Views' }}>
          <Route path=":viewId" handle={{ title: 'View Details' }}>
            <Route
              path="edit"
              handle={{ title: 'Edit' }}
              element={<EditTabs />}
            />
            <Route
              path="dashboard"
              handle={{ title: 'Dashboard' }}
              element={<DashboardWithContext />}
            />
            <Route path="" element={<Navigate to="dashboard" />} />
          </Route>
          <Route
            path="add"
            handle={{ title: 'Manage Views' }}
            element={<ManageViews />}
          />
          <Route path="" element={<Navigate to="add" />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/admin/" />} />
    </>
  )
);
