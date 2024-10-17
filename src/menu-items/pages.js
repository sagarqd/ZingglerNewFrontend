// assets
import {
  IconUsers,
  IconUser,
  IconBook,
  IconChalkboard,
  IconBuilding,
  IconCash,
  IconCalendar,
  IconDeviceGamepad2,
  IconCalendarStats
} from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconUser,
  IconBook,
  IconChalkboard,
  IconCash,
  IconCalendar,
  IconBuilding,
  IconDeviceGamepad2,
  IconCalendarStats
};

// ==============================|| ADMIN PAGES MENU ITEMS ||============================== //

const adminPages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'user-list',
          title: 'User List',
          type: 'item',
          url: '/users/list'
        },
        {
          id: 'user-group',
          title: 'User Group',
          type: 'item',
          url: '/users/group'
        },
        {
          id: 'user-permissions',
          title: 'User Permissions',
          type: 'item',
          url: '/users/user-permissions'
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'collapse',
      icon: icons.IconBook,
      children: [
        {
          id: 'course-list',
          title: 'Course List',
          type: 'item',
          url: '/courses/course-list'
        },
        {
          id: 'course-grid',
          title: 'Course Grid',
          type: 'item',
          url: '/courses/course-grid'
        },
        {
          id: 'new-course',
          title: 'Add New Course',
          type: 'item',
          url: '/courses/new-course'
        }
      ]
    },
    {
      id: 'teachers',
      title: 'Teachers',
      type: 'collapse',
      icon: icons.IconChalkboard,
      children: [
        {
          id: 'teacher-list',
          title: 'Teacher List',
          type: 'item',
          url: '/teachers/teacher-list'
        },
        {
          id: 'teacher-profile',
          title: 'Teacher Profile',
          type: 'item',
          url: '/teachers/teacher-profile'
        },
        {
          id: 'add-new-teacher',
          title: 'Add New Teacher',
          type: 'item',
          url: '/teachers/add-new-teacher'
        }
      ]
    },
    {
      id: 'students',
      title: 'Students',
      type: 'collapse',
      icon: icons.IconUser,
      children: [
        {
          id: 'add-new-student',
          title: 'Add New Student',
          type: 'item',
          url: '/students/add-new'
        },
        {
          id: 'student-list',
          title: 'Student List',
          type: 'item',
          url: '/students/student-list'
        },
        {
          id: 'student-profile',
          title: 'Student Profile',
          type: 'item',
          url: '/students/student-profile'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments',
      type: 'collapse',
      icon: icons.IconCash,
      children: [
        {
          id: 'payment-history',
          title: 'Payment History',
          type: 'item',
          url: '/payments/payment-history'
        },
        {
          id: 'payment-summary',
          title: 'Payment Summary',
          type: 'item',
          url: '/payments/payment-summary'
        }
      ]
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'collapse',
      icon: icons.IconCalendar,
      children: [
        {
          id: 'attendance-list',
          title: 'Attendance List',
          type: 'item',
          url: '/attendance/attendance-list'
        },
        {
          id: 'attendance-report',
          title: 'Attendance Report',
          type: 'item',
          url: '/attendance/attendance-report'
        }
      ]
    },
    {
      id: 'departments',
      title: 'Departments',
      type: 'collapse',
      icon: icons.IconBuilding,
      children: [
        {
          id: 'department-list',
          title: 'Department List',
          type: 'item',
          url: '/departments/department-list'
        },
        {
          id: 'department-profile',
          title: 'Department Profile',
          type: 'item',
          url: '/departments/department-profile'
        }
      ]
    },
    {
      id: 'meetings',
      title: 'Meetings',
      type: 'collapse',
      icon: icons.IconCalendarStats,
      children: [
        {
          id: 'new-meeting',
          title: 'New Meeting',
          type: 'item',
          url: '/meetings/new-meeting'
        },
        {
          id: 'meeting-history',
          title: 'Meeting History',
          type: 'item',
          url: '/meetings/meeting-history'
        }
      ]
    },
    {
      id: 'games',
      title: 'Games',
      type: 'collapse',
      icon: icons.IconDeviceGamepad2,
      children: [
        {
          id: 'color-tablet',
          title: 'Color Tablet',
          type: 'item',
          url: '/games/color-tablet'
        }
      ]
    }
  ]
};

// ==============================|| STUDENT PAGES MENU ITEMS ||============================== //

const studentPages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'my-courses',
      title: 'My Courses',
      type: 'collapse',
      icon: icons.IconBook,
      children: [
        {
          id: 'my-course-list',
          title: 'My Course List',
          type: 'item',
          url: '/courses/my-course-list'
        }
      ]
    }
  ]
};

// ==============================|| EXPORT PAGES ITEMS ||============================== //

const getPagesForUserType = (userType) => {
  return userType === 'student' ? studentPages : adminPages;
};

export default getPagesForUserType;
