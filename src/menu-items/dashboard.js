// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| ADMIN DASHBOARD MENU ITEMS ||============================== //

const adminDashboard = {
  id: 'admin-dashboard',
  title: 'Admin Dashboard',
  type: 'group',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/admin-dashboard/overview',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

// ==============================|| STUDENT DASHBOARD MENU ITEMS ||============================== //

const studentDashboard = {
  id: 'student-dashboard',
  title: 'Student Dashboard',
  type: 'group',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/student-dashboard/overview',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

// ==============================|| EXPORT DASHBOARD ITEMS ||============================== //

const getDashboardForUserType = (userType) => {
  return userType === 'student' ? studentDashboard : adminDashboard;
};

export default getDashboardForUserType;
