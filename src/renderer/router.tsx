import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  Routes,
} from 'react-router-dom';
import AdminLayout from 'renderer/layouts/admin';
import Accounts from 'renderer/views/admin/accounts';
import { EditView, AddNew as AddView } from 'renderer/views/admin/views/add';
import { useAppSelector } from './store/hooks';
import { ViewsReducer } from './store/reducers';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="accounts" handle={{title: 'Accounts'}} element={<Accounts />} />
        <Route path="views" handle={{title: 'Views'}} >
          <Route path=":viewId" handle={{title: 'Edit View'}}  element={<EditView />} />
          <Route path="add" handle={{title: 'Add View'}}  element={<AddView />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/admin/" />} />
    </>
  )
);
