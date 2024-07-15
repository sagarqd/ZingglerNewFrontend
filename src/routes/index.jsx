import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AuthenticationRoutes], {
  basename: '/', 
  defaultPath: '/register'
});

export default router;
