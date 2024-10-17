import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import { element } from 'prop-types';
import { BasicTabs } from 'views/pages/courses/forms/NewCourse';

// Import all components directly
import DashboardDefault from 'views/dashboard';
import StudentDashboardOverview from 'views/student-dashboard/Overview';
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
import AddNewStudents from 'views/pages/student/AddNewStudents';
import CourseEnroll from 'views/pages/courses/CourseEnroll';
import TeacherProfile from 'views/pages/teacher/TeacherProfile';
import TeacherList from 'views/pages/teacher/TeacherList';
import AddNewTeacher from 'views/pages/teacher/AddNewTeacher';


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
            path: 'teachers',
            element: <MainLayout />,
            children: [
               
                {
                    path: 'teacher-Profile',
                    element: <TeacherProfile />
                },
                 {
                    path: 'teacher-list',
                    element: <TeacherList />
                },
                {
                    path: 'add-new-teacher',
                    element: <AddNewTeacher />
                }
                
               
            ]
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
                    path: 'new-course/:tab?',
                    element: <NewCourse />
                },
                {
                    path: 'new-course/general',
                    element: <NewCourse initialTab="general" />
                },
                {
                    path: 'new-course/description',
                    element: <NewCourse initialTab="description" />
                },
                {
                    path: 'new-course/course-format',
                    element: <NewCourse initialTab="course-format" />
                },
                {
                    path: 'new-course/section',
                    element: <NewCourse initialTab="section" />
                },
                {
                    path: 'new-course/appearance',
                    element: <NewCourse initialTab="appearance" />
                },
                {
                    path: 'new-course/completion',
                    element: <NewCourse initialTab="completion" />
                },
                {
                    path: 'new-course/groups',
                    element: <NewCourse initialTab="groups" />
                },
                {
                    path: ':slug/general',
                    element: <NewCourse />
                },
                {
                    path: ':slug/description',
                    element: <NewCourse />
                },
                {
                    path: ':slug/course-format',
                    element: <NewCourse />
                },
                {
                    path: ':slug/section',
                    element: <NewCourse />
                },
                {
                    path: ':slug/appearance',
                    element: <NewCourse />
                },
                {
                    path: ':slug/completion',
                    element: <NewCourse />
                },
                {
                    path: ':slug/groups',
                    element: <NewCourse />
                },
                {
                    path: '/courses/:slug/:_id',
                    element: <CourseDetails />
                },
                {
                    path: 'enroll',
                    element: <CourseEnroll />
                }

            ]
        },
        {
            path: 'students',
            element: <MainLayout />,
            children: [
                {
                    path: 'add-new',
                    element: <AddNewStudents />
                }
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
            element: <Homepage />
        },
      
    ]
};

export default MainRoutes;
