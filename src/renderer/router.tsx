import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import AdminLayout from 'renderer/layouts/admin';
import Accounts from 'renderer/views/admin/accounts';
import { AddNew as AddView, EditView } from 'renderer/views/admin/views/add';
import { DashboardWithContext } from 'renderer/views/admin/views/data';

import { Settings } from './views/admin/settings';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route
          path="accounts"
          handle={{ title: 'Accounts' }}
          element={<Accounts />}
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
              element={<EditView />}
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
            handle={{ title: 'Add View' }}
            element={<AddView />}
          />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/admin/" />} />
    </>
  )
);
