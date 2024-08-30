import dashboard from './dashboard';
import getMenuItems from './pages'; // Import the function for conditional menu items
import utilities from './utilities';
import other from './other';

// Example function to determine the user type (you might replace this with actual logic)
const getUserType = () => {
  // This should return the current user's type, e.g., 'student' or 'admin'
  // Replace with your actual user type retrieval logic
  return 'student'; // Change to 'admin' as needed for testing
};

// Get the current user's type
const userType = getUserType();

// Get the menu items based on the user type
const pages = getMenuItems(userType);

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, pages, utilities, other]
};

export default menuItems;
