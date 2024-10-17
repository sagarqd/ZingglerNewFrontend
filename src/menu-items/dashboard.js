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
      url: '/dashboard/default',
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

// ==============================|| TEACHER DASHBOARD MENU ITEMS ||============================== //

const teacherDashboard = {
  id: 'teacher-dashboard',
  title: 'Teacher Dashboard',
  type: 'group',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/teacher-dashboard/overview', 
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
    
  ]
};

// ==============================|| EXPORT DASHBOARD ITEMS ||============================== //

// const getDashboardForUserType = (userType) => {
//   return userType === 'student' ? studentDashboard : adminDashboard;
// };

// export default getDashboardForUserType;



const getDashboardForUserType = (userType) => {
  if (userType === 'student') {
    return studentDashboard; 
  } else if (userType === 'teacher') {
    return teacherDashboard; 
  } else {
    return adminDashboard; 
  }
};

export default getDashboardForUserType;