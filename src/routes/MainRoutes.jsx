import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import { element } from 'prop-types';
import { BasicTabs } from 'views/pages/courses/forms/NewCourse';

// Import all components directly
import DashboardDefault from 'views/dashboard';
import AuthRegister from 'views/pages/authentication3/Register';
import UtilsTypography from 'views/utilities/Typography';
import UtilsColor from 'views/utilities/Color';
import UtilsShadow from 'views/utilities/Shadow';
import Profile from 'views/pages/users/Profile';
import UserList from 'views/pages/users/UserList';
import UserGroup from 'views/pages/users/UserGroup';
import UserPermissions from 'views/pages/users/UserPermissions';
import ProfileEdit from 'views/pages/users/ProfileEdit';
import ListView from 'views/pages/courses/ListView';
import GridView from 'views/pages/courses/GridView';
import CourseDetails from 'views/pages/courses/CourseDetails';
import CourseView from 'views/pages/courses/CourseView';
import NewCourse from 'views/pages/courses/forms/NewCourse';
import CourseInformationForm from 'views/pages/courses/forms/CourseInformationForm';
import DescriptionInformationForm from 'views/pages/courses/forms/DescriptionInformationForm';
import CourseFormatForm from 'views/pages/courses/forms/CourseFormatForm';
import CourseCompletionForm from 'views/pages/courses/forms/CourseCompletionForm';
import CoursegroupForm from 'views/pages/courses/forms/CoursegroupForm';
import CourseAppearanceForm from 'views/pages/courses/forms/CourseAppearanceForm';
import NewMeeting from 'views/pages/meetings/NewMeeting';
import MeetingHistory from 'views/pages/meetings/MeetingHistory';
import RoomPage from 'views/pages/meetings/RoomPage';
import MeetingLayout from 'views/pages/meetings/MeetingLayout';
import ColorTablet from 'webgl/index';
import Whiteboard from 'views/pages/whiteboard/Whiteboard';
import SamplePage from 'views/sample-page';
import Homepage from 'views/pages/Homepage/Homepage';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthRegister />
    },
    {
      path: 'dashboard',
      element: <MainLayout />,
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        },
        {
          path: 'util-color',
          element: <UtilsColor />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'users',
      element: <MainLayout />,
      children: [
        {
          path: 'list',
          element: <UserList />
        },
        {
          path: 'group',
          element: <UserGroup />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'profile/edit',
          element: <ProfileEdit />
        },
        {
          path: 'user-permissions',
          element: <UserPermissions />
        }
      ]
    },
    {
      path: 'courses',
      element: <MainLayout />,
      children: [
        {
          path: 'course-list',
          element: <ListView />
        },
        {
          path: 'course-grid',
          element: <GridView />
        },
        {
          path: '/courses/:slug/:_id',
          element: <CourseDetails />
        },
        {
          path: 'new-course/:tab?',
          element: <NewCourse />
        },
        {
          path: ':slug/:tab',
          element: <NewCourse />
        },
        {
          path: 'view-course',
          element: <CourseView />
        },
      ]
    },
    {
      path: 'meetings',
      element: <MainLayout />,
      children: [
        {
          path: 'new-meeting',
          element: <NewMeeting />
        },
        {
          path: 'meeting-history',
          element: <MeetingHistory />
        },
        {
          path: ':roomId',
          element: <RoomPage />
        },
        {
          path: 'meeting-layout',
          element: <MeetingLayout />
        }
      ]
    },
    {
      path: 'games',
      element: <MainLayout />,
      children: [
        {
          path: 'color-tablet',
          element: <ColorTablet />
        }
      ]
    },
    {
      path: 'tools',
      element: <MainLayout />,
      children: [
        {
          path: 'whiteboard',
          element: <Whiteboard />
        }
      ]
    },
    {
      path: 'home',
      element:<Homepage/>
    }
  ]
};

export default MainRoutes;