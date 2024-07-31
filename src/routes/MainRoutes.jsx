import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const AuthRegister = Loadable(lazy(() => import('views/pages/authentication3/Register')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// users routing
const Profile = Loadable(lazy(() => import('views/pages/users/Profile')));
const UserList = Loadable(lazy(() => import('views/pages/users/UserList')));
const UserGroup = Loadable(lazy(() => import('views/pages/users/UserGroup')));

const ListView = Loadable(lazy(() => import('views/pages/courses/ListView')));
const GridView = Loadable(lazy(() => import('views/pages/courses/GridView')));
const NewCourse = Loadable(lazy(() => import('views/pages/courses/forms/NewCourse')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthRegister />
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'default',
          element: <ProtectedRoute element={<DashboardDefault />} />
        }
      ]
    },
    {
      path: 'utils',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'util-typography',
          element: <ProtectedRoute element={<UtilsTypography />} />
        },
        {
          path: 'util-color',
          element: <ProtectedRoute element={<UtilsColor />} />
        },
        {
          path: 'util-shadow',
          element: <ProtectedRoute element={<UtilsShadow />} />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <ProtectedRoute element={<SamplePage />} />
    },
    {
      path: 'users',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'list',
          element: <ProtectedRoute element={<UserList />} />
        },
        {
          path: 'group',
          element: <ProtectedRoute element={<UserGroup />} />
        },
        {
          path: 'profile',
          element: <ProtectedRoute element={<Profile />} />
        }
      ]
    },
    {
      path: 'courses',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'course-list',
          element: <ProtectedRoute element={<ListView />} />
        },
        {
          path: 'course-grid',
          element: <ProtectedRoute element={<GridView />} />
        },
        {
          path: 'new-course',
          element: <ProtectedRoute element={<NewCourse />} />
        }
      ]
    }
  ]
};

export default MainRoutes;
