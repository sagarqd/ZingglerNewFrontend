// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png'; // Adjust the path as needed

// ==============================|| LOGO ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={logo} alt="Zingerr LMS" width="150" height="48" />
  );
};

export default Logo;
