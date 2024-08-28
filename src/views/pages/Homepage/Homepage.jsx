import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, Stack, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import { margin, padding, styled, textAlign, useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from 'ui-component/Logo';
import Hero from '../../../assets/images/hero.png';

// Custom styled components
const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '60px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginTop:'30px',
    textAlign: 'center',
    fontSize: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: '16px',
      marginTop: theme.spacing(3),
    },
    '& .mobile-hide': {
      [theme.breakpoints.down('sm')]: {
        display: 'none', 
      },
    },
  }));

const PurpleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7352C7',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5F3EB0',
  },
}));
const BlueButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#2196F3',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1976D2',
    },
  }));

const NavbarContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'auto',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
  },
}));

const HeroImage = styled(Box)(({ theme }) => ({
  width: '200%', // Increased width
  maxWidth: 900, // Adjusted max-width to account for the increased width
  height: 'auto',
  display: 'block',
  marginLeft: '-5%', // Offset the increased width
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hide on mobile views
  },
}));

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin=()=>{
    navigate('/login');
  };
  const handleRegister=()=>{
    navigate('/register');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <NavbarContent>
            <Link to="#" aria-label="logo">
              <Logo />
            </Link>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                  <MenuItem onClick={handleClose}>About</MenuItem>
                  <MenuItem onClick={handleClose}>Documentation</MenuItem>
                  <MenuItem onClick={handleClose}>Register Now</MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Documentation</Button>
                <PurpleButton variant="contained" onClick={handleRegister}>Register Now</PurpleButton>
                <BlueButton variant="contained" onClick={handleLogin}>Login Now</BlueButton>
              </Stack>
            )}
          </NavbarContent>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 12 }} sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid item xs={12} md={6}>
            <HeroTitle variant="h1">
              Empower Your
              <br />
              Learning Journey with
              <span style={{ color: '#2196F3', marginLeft:'10px', display: 'inline-block' }}>Zinggerr</span>
            </HeroTitle>
            <HeroSubtitle variant="subtitle1">
              Zinggerr is a powerful system for learning success
              <br className="mobile-hide" />
              create, manage, and deliver engaging online courses.
            </HeroSubtitle>
          </Grid>
          <Grid item xs={12} md={6}>
            <HeroImage
              component="img"
              alt="Dashboard preview"
              src={Hero}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Homepage;