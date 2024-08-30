// assets
import { IconDashboard } from '@tabler/icons-react'; // Import the icon used for the dashboard

// constant
const icons = { IconDashboard };

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
            url: '/student-dashboard/overview', // Update the URL to match the route for the StudentDashboardOverview
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default studentDashboard;
