import getDashboardForUserType from './dashboard';
import getPagesForUserType from './pages';

// ==============================|| MENU ITEMS ||============================== //

const getMenuItemsForUserType = (userType) => {
  const dashboard = getDashboardForUserType(userType);
  const pages = getPagesForUserType(userType);

  return {
    items: [dashboard, pages]
  };
};

// Example function to get the user type from local storage
const getUserType = () => {
  return localStorage.getItem('userType') || 'admin'; // Default to 'admin' if not found
};

// Get the current user's type
const userType = getUserType();

// Get the menu items based on the user type
const menuItems = getMenuItemsForUserType(userType);

export default menuItems;
