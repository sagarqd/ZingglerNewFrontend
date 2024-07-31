// assets
import { IconKey, IconUsers, IconUser, IconBook, IconChalkboard, IconBuilding, IconCash, IconCalendar, IconListDetails } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconUsers,
  IconUser,
  IconBook,
  IconChalkboard,  // Placeholder for teachers
  IconUser,        // Placeholder for students
  IconCash,        // Placeholder for payments
  IconCalendar,    // Placeholder for attendance
  IconBuilding     // Placeholder for departments
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
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
          url: '/users/list',
        },
        {
          id: 'user-group',
          title: 'User Group',
          type: 'item',
          url: '/users/group',
        }
      ]
    },

    {
      id: 'courses',
      title: 'Courses',
      type: 'collapse',
      icon: icons.IconBook,
      children: [
        ,
        {
          id: 'new-course',
          title: 'Add New Course',
          type: 'item',
          url: '/courses/new-course',
        },
        {
          id: 'course-list',
          title: 'Course List',
          type: 'item',
          url: '/courses/course-list',
        },
        {
          id: 'course-grid',
          title: 'Course Grid',
          type: 'item',
          url: '/courses/course-grid',
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
          url: '/teachers/teacher-list',
        },
        {
          id: 'teacher-profile',
          title: 'Teacher Profile',
          type: 'item',
          url: '/teachers/teacher-profile',
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
          id: 'student-list',
          title: 'Student List',
          type: 'item',
          url: '/students/student-list',
        },
        {
          id: 'student-profile',
          title: 'Student Profile',
          type: 'item',
          url: '/students/student-profile',
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
          url: '/payments/payment-history',
        },
        {
          id: 'payment-summary',
          title: 'Payment Summary',
          type: 'item',
          url: '/payments/payment-summary',
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
          url: '/attendance/attendance-list',
        },
        {
          id: 'attendance-report',
          title: 'Attendance Report',
          type: 'item',
          url: '/attendance/attendance-report',
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
          url: '/departments/department-list',
        },
        {
          id: 'department-profile',
          title: 'Department Profile',
          type: 'item',
          url: '/departments/department-profile',
        }
      ]
    }
  ]
};

export default pages;
