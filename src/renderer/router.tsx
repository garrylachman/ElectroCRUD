import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import AdminLayout from 'renderer/layouts/admin';
import Accounts from 'renderer/views/admin/accounts';
import { AddNew as AddView, Edit as EditView} from 'renderer/views/admin/views/add';
import { useAppSelector } from './store/hooks';
import { ViewsReducer } from './store/reducers';

export const router = (store) =>
  createBrowserRouter([
    {
      path: '/admin/*',
      element: <AdminLayout />,
      children: [
        {
          path: 'accounts',
          element: <Accounts />,
          handle: { title: 'Accounts' },
        },
        {
          path: 'views',
          handle: { title: 'Views' },
          children: [
            {
              path: ':viewId',
              handle: { title: 'View' },
              element: <EditView />,
              loader: ({ params }) => {
                console.log(store)
                const { viewId } = params;
                const view = ViewsReducer.getSelectors().selectById(
                  store.getState().views,
                  viewId
                );
                console.log("loader view", view);
                if (view === undefined || view.id === undefined) {
                  console.log("loader state", getState(), "view id", viewId);
                  return redirect('../add');
                }
                return view;
              },
            },
            {
              path: 'add',
              handle: { title: 'Add View' },
              element: <AddView />,
            },
            {
              path: '',
              element: <Navigate to="add" />,
            },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/admin" />,
    },
  ]);
