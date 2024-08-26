import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';
import { BasicTabs } from 'views/pages/courses/forms/NewCourse';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const StudentDashboardOverview  = Loadable(lazy(() => import('views/student-dashboard/Overview')));

const AuthRegister = Loadable(lazy(() => import('views/pages/authentication3/Register')));


// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// users routing
const Profile = Loadable(lazy(() => import('views/pages/users/Profile')));
const UserList = Loadable(lazy(() => import('views/pages/users/UserList')));
const UserGroup = Loadable(lazy(() => import('views/pages/users/UserGroup')));
const UserPermissions = Loadable(lazy(() => import('views/pages/users/UserPermissions')));
const ProfileEdit = Loadable(lazy(() => import('views/pages/users/ProfileEdit')));


const ListView = Loadable(lazy(() => import('views/pages/courses/ListView')));
const GridView = Loadable(lazy(() => import('views/pages/courses/GridView')));
const CourseDetails = Loadable(lazy(() => import('views/pages/courses/CourseDetails')));

const AddInteractives = Loadable(lazy(() => import('views/pages/courses/AddInteractives')));
const InteractiveQuestions = Loadable(lazy(() => import('views/pages/courses/InteractiveQuestions')));
const CourseView = Loadable(lazy(() => import('views/pages/courses/CourseView')));
const NewCourse = Loadable(lazy(() => import('views/pages/courses/forms/NewCourse')));
const CourseInformationForm=Loadable(lazy(() => import('views/pages/courses/forms/CourseInformationForm')));
const DescriptionInformationForm=Loadable(lazy(() => import('views/pages/courses/forms/DescriptionInformationForm')));
const CourseFormatForm=Loadable(lazy(() => import('views/pages/courses/forms/CourseFormatForm')));
const CourseCompletionForm=Loadable(lazy(() => import('views/pages/courses/forms/CourseCompletionForm')));
const CoursegroupForm=Loadable(lazy(() => import('views/pages/courses/forms/CoursegroupForm')));
const CourseAppearanceForm = Loadable(lazy(() => import('views/pages/courses/forms/CourseAppearanceForm')));

// meetings routing
const NewMeeting = Loadable(lazy(() => import('views/pages/meetings/NewMeeting')));
const MeetingHistory = Loadable(lazy(() => import('views/pages/meetings/MeetingHistory')));
const RoomPage = Loadable(lazy(() => import('views/pages/meetings/RoomPage')));
const MeetingLayout = Loadable(lazy(() => import('views/pages/meetings/MeetingLayout')));

const ColorTablet = Loadable(lazy(() => import('webgl/index')));





// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

// ==============================|| MAIN ROUTING ||============================== //

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
      path: 'student-dashboard',
      element: <MainLayout />,
      children: [
        {
          path: 'overview',
          element: <StudentDashboardOverview />
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
          element: <ProfileEdit /> // Add this route
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
          path: '/courses/:slug',
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
          path: 'add-interactives',
          element: <AddInteractives />
        },
        {
          path: 'interactive-questions',
          element: <InteractiveQuestions />
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
              path: ':roomId', // new route
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
    }
  ]
};

export default MainRoutes;


