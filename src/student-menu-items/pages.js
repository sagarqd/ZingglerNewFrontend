// assets
import { IconBook } from '@tabler/icons-react'; // Import the icon for courses

// constant
const icons = {
  IconBook, // Only include the icon used for courses
};

// ==============================|| MY COURSES MENU ITEMS ||============================== //

const pages = {
  id: 'courses',
  type: 'group',
  children: [
    {
      id: 'my-courses',
      title: 'My Courses',
      type: 'item',
      icon: icons.IconBook,
      url: '/courses/my-courses', // Update the URL as needed
    }
  ]
};

export default pages;
