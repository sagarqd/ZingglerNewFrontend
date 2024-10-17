import React, { useState } from 'react';
import {
  Grid,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  SvgIcon,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Breadcrumbs,
  Link,
  Box
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function TeacherProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // For handling dropdown
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  // Handle dropdown open/close
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Edit action logic here
    handleMenuClose();
  };

  const handleDelete = () => {
    // Delete action logic here
    handleMenuClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/profile">
          Profile
        </Link>
        <Typography color="text.primary">User Details</Typography>
      </Breadcrumbs>

      {/* Profile Card */}
      <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 2, mt: 2 }}>
        <CardContent>
          <Grid container spacing={3}>

            {/* Avatar Section */}
            <Grid item xs={12} container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  alt="Alok"
                  src={selectedFile ? selectedFile : 'https://www.google.com/search?sca_esv=cec43c19c37f118e&sxsrf=ADLYWIKf2D4Kzf4Y_js70tGvVKY7opyhlg:1729143342418&q=shahrukh+khan&udm=2&fbs=AEQNm0DPvcmG_nCbmwtBO9j6YBzM68ZanC7g01Skprhw5JoufeOS3s50R2UVAdFKPiGec2s70dsafSzt3Srk8zYXgpdFG5FfofmzpwxUIJ5f2iIJrHTRoaSC7aulU2uwrHgJk4UGo5WLBV4m1G0HdtrY_kzqlNtPVe2l0044_OEmMZwujHb4tcBPX0LWuL1RlDJAQhZEFDHvVLHiGyUetf8GOS69ajMlXQ&sa=X&ved=2ahUKEwjF4sL12JSJAxWyXmwGHVtsFSYQtKgLegQIEBAB&biw=1536&bih=730&dpr=1.25#vhid=qPQbfyJR-hRqzM&vssid=mosaic'}
                  sx={{ width: 60, height: 60 }}
                />
              </Grid>
              <Grid item>
                {/* Dropdown menu for More Options */}
                <IconButton size="small" aria-label="more-options" onClick={handleMenuClick}>
                  <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'more-options',
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </Grid>
            </Grid>

            {/* User Details */}
            <Grid item xs={12}>
              <Typography variant="h5">Alok</Typography>
              <Typography variant="caption" color="textSecondary">
                Mern Full Stack Developer
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Mern Stack Developer having skills like React.js, Next.js, Node.js and many more.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">Email</Typography>
              <Typography variant="h6">sharmalok04041993@gmail.com</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary">Phone</Typography>
              <Typography variant="h6">380-293-0177</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary">Location</Typography>
              <Typography variant="h6">America</Typography>
            </Grid>

            {/* Form Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                defaultValue="Alok"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                defaultValue="Sharma"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordToggle}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                variant="outlined"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

          </Grid>
        </CardContent>

        {/* Action Buttons */}
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ChatBubbleTwoToneIcon />}
              >
                Message
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<NotInterestedTwoToneIcon />}
              >
                Block
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

export default TeacherProfile;
