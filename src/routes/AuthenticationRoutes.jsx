import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication3/Register')));
const Verification = Loadable(lazy(() => import('views/pages/verification/Verification')));
const ForgotPassword = Loadable(lazy(() => import('views/pages/verification/ForgotPassword')));
const RecoveryEmail = Loadable(lazy(() => import('views/pages/verification/RecoveryEmail')));
const RecoveryEmailVerification = Loadable(lazy(() => import('views/pages/verification/RecoveryEmailVerification')));
const ResetPassword = Loadable(lazy(() => import('views/pages/verification/ResetPassword')));




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
      element: <Verification />
    },
    {
      path: 'email-recovery',
      element: <RecoveryEmail />
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />
    },
    {
      path: 'recovery-email-verify',
      element: <RecoveryEmailVerification />
    },
    {
      path: 'reset-password',
      element: <ResetPassword />
    },
    
    
  ]
};

export default AuthenticationRoutes;
