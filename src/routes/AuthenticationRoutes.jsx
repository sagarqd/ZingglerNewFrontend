import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication3/Register')));
const Verification = Loadable(lazy(() => import('views/pages/verification/Verification')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'verify',
      element: (
        <ProtectedRoute>
          <Verification />
        </ProtectedRoute>
      )
    },
  ]
};

export default AuthenticationRoutes;
