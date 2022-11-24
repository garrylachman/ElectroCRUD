import { Icon } from '@chakra-ui/react';
import {
  MdDashboard,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import DashboardsDefault from 'renderer/views/admin/dashboards/default';
import DashboardsCarInterface from 'renderer/views/admin/dashboards/carInterface';
import DashboardsSmartHome from 'renderer/views/admin/dashboards/smartHome';

// // NFT Imports
import NFTMarketplace from 'renderer/views/admin/nfts/marketplace';
import NFTPage from 'renderer/views/admin/nfts/page';
import NFTCollection from 'renderer/views/admin/nfts/collection';
import NFTProfile from 'renderer/views/admin/nfts/profile';

// Main Imports
import AccountBilling from 'renderer/views/admin/main/account/billing';
import AccountApplications from 'renderer/views/admin/main/account/application';
import AccountInvoice from 'renderer/views/admin/main/account/invoice';
import AccountSettings from 'renderer/views/admin/main/account/settings';
import AccountAllCourses from 'renderer/views/admin/main/account/courses';
import AccountCoursePage from 'renderer/views/admin/main/account/coursePage';

import UserNew from 'renderer/views/admin/main/users/newUser';
import UsersOverview from 'renderer/views/admin/main/users/overview';
import UsersReports from 'renderer/views/admin/main/users/reports';

import ProfileSettings from 'renderer/views/admin/main/profile/settings';
import ProfileOverview from 'renderer/views/admin/main/profile/overview';
import ProfileNewsfeed from 'renderer/views/admin/main/profile/newsfeed';

import ApplicationsDataTables from 'renderer/views/admin/main/applications/dataTables';
import ApplicationsCalendar from 'renderer/views/admin/main/applications/calendar';

import EcommerceNewProduct from 'renderer/views/admin/main/ecommerce/newProduct';
import EcommerceProductSettings from 'renderer/views/admin/main/ecommerce/settingsProduct';
import EcommerceProductPage from 'renderer/views/admin/main/ecommerce/pageProduct';
import EcommerceOrderList from 'renderer/views/admin/main/ecommerce/orderList';
import EcommerceOrderDetails from 'renderer/views/admin/main/ecommerce/orderDetails';
import EcommerceReferrals from 'renderer/views/admin/main/ecommerce/referrals';

// Others
import OthersNotifications from 'renderer/views/admin/main/others/notifications';
import OthersPricing from 'renderer/views/admin/main/others/pricing';
import OthersError from 'renderer/views/admin/main/others/404';

const routes = [
  // --- Dashboards ---
  {
    name: 'Dashboards',
    path: '/dashboards',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Main Dashboard',
        layout: '',
        path: 'default',
        component: <DashboardsDefault />,
      },
      {
        name: 'Car Interface',
        layout: '',
        path: 'car-interface',
        component: <DashboardsCarInterface />,
      },
      {
        name: 'Smart Home',
        layout: '',
        path: 'smart-home',
        component: <DashboardsSmartHome />,
      },
    ],
  },
  // // --- NFTs ---
  {
    name: 'NFTs',
    path: '/nfts',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: true,
    items: [
      {
        name: 'Marketplace',
        layout: '',
        path: 'marketplace',
        component: <NFTMarketplace />,
        secondary: true,
      },
      {
        name: 'Collection',
        layout: '',
        path: 'collection',
        component: <NFTCollection />,
        secondary: true,
      },
      {
        name: 'NFT Page',
        layout: '',
        path: 'page',
        component: <NFTPage />,
        secondary: true,
      },
      {
        name: 'Profile',
        layout: '',
        path: 'profile',
        component: <NFTProfile />,
        secondary: true,
      },
    ],
  },
  // // --- Main pages ---
  {
    name: 'Main Pages',
    path: '/main',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Account',
        path: 'account',
        collapse: true,
        items: [
          {
            name: 'Billing',
            layout: '',
            path: 'billing',
            exact: false,
            component: <AccountBilling />,
          },
          {
            name: 'Application',
            layout: '',
            path: 'application',
            exact: false,
            component: <AccountApplications />,
          },
          {
            name: 'Invoice',
            layout: '',
            path: 'invoice',
            exact: false,
            component: <AccountInvoice />,
          },
          {
            name: 'Settings',
            layout: '',
            path: 'settings',
            exact: false,
            component: <AccountSettings />,
          },
          {
            name: 'All Courses',
            layout: '',
            path: 'all-courses',
            exact: false,
            component: <AccountAllCourses />,
          },
          {
            name: 'Course Page',
            layout: '',
            path: 'course-page',
            exact: false,
            component: <AccountCoursePage />,
          },
        ],
      },
      {
        name: 'Ecommerce',
        path: 'users',
        collapse: true,
        items: [
          {
            name: 'New Product',
            layout: '',
            path: 'new-prodcut',
            exact: false,
            component: <EcommerceNewProduct />,
          },
          {
            name: 'Product Settings',
            layout: '',
            path: 'settings',
            exact: false,
            component: <EcommerceProductSettings />,
          },
          {
            name: 'Product Page',
            layout: '',
            path: 'page-example',
            exact: false,
            component: <EcommerceProductPage />,
          },
          {
            name: 'Order List',
            layout: '',
            path: 'order-list',
            exact: false,
            component: <EcommerceOrderList />,
          },
          {
            name: 'Order Details',
            layout: '',
            path: 'order-details',
            exact: false,
            component: <EcommerceOrderDetails />,
          },
          {
            name: 'Referrals',
            layout: '',
            path: 'referrals',
            exact: false,
            component: <EcommerceReferrals />,
          },
        ],
      },
      {
        name: 'Users',
        path: 'users',
        collapse: true,
        items: [
          {
            name: 'New User',
            layout: '',
            path: 'new-user',
            exact: false,
            component: <UserNew />,
          },
          {
            name: 'Users Overview',
            layout: '',
            path: 'users-overview',
            exact: false,
            component: <UsersOverview />,
          },
          {
            name: 'Users Reports',
            layout: '',
            path: 'users-reports',
            exact: false,
            component: <UsersReports />,
          },
        ],
      },
      {
        name: 'Applications',
        path: 'applications',
        collapse: true,
        items: [
          {
            name: 'Data Tables',
            layout: '',
            path: 'data-tables',
            exact: false,
            component: <ApplicationsDataTables />,
          },
          {
            name: 'Calendar',
            layout: '',
            path: 'calendar',
            exact: false,
            component: <ApplicationsCalendar />,
          },
        ],
      },
      {
        name: 'Profile',
        path: 'profile',
        collapse: true,
        items: [
          {
            name: 'Profile Overview',
            layout: '',
            path: 'overview',
            exact: false,
            component: <ProfileOverview />,
          },
          {
            name: 'Profile Settings',
            layout: '',
            path: 'settings',
            exact: false,
            component: <ProfileSettings />,
          },
          {
            name: 'News Feed',
            layout: '',
            path: 'newsfeed',
            exact: false,
            component: <ProfileNewsfeed />,
          },
        ],
      },
      {
        name: 'Others',
        path: 'others',
        collapse: true,
        items: [
          {
            name: 'Notifications',
            layout: '',
            path: 'notifications',
            exact: false,
            component: <OthersNotifications />,
          },
          {
            name: '404',
            layout: '',
            path: '404',
            exact: false,
            component: <OthersError />,
          },
        ],
      },
    ],
  },
];

export default routes;
