import React, { useState } from 'react';
import { Container, Paper, Box, Grid, Typography, Breadcrumbs, Link, Tabs, Tab, Card, CardHeader, CardContent, Divider, TextField, Button, Avatar, IconButton  } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab index

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
        <Paper elevation={0} sx={{ borderRadius: '8px' }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Left-aligned content */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h3">Profile 03</Typography>
              </Box>
              {/* Right-aligned content */}
              <Box>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<ChevronRightIcon fontSize="small" />}
                >
                  <Link underline="hover" color="inherit" href="/">
                    <HomeIcon sx={{ mr: 0, mt: '-2px', width: '1rem', height: '1rem', color: 'rgb(103, 58, 183)' }} />
                  </Link>
                  <Typography variant="subtitle1">Account Profile</Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>Profile 03</Typography>
                </Breadcrumbs>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Tabbed Content */}
      <Grid container spacing={3} sx={{ width: '100%', marginBottom: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ marginBottom: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="simple tabs example">
              <Tab label="Profile" />
              <Tab label="Billing" />
              <Tab label="Security" />
              <Tab label="Notifications" />
            </Tabs>
          </Paper>

          {/* Tab Content */}
          <Paper elevation={0}>
            {activeTab === 0 && <ProfileContent />}
            {activeTab === 1 && <BillingContent />}
            {activeTab === 2 && <SecurityContent />}
            {activeTab === 3 && <NotificationsContent />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Profile tab content
const ProfileContent = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <ProfileCard />
    </Grid>
    <Grid item xs={12} md={8}>
      <ProfileForm />
    </Grid>
  </Grid>
);

// Sample Profile card component
const ProfileCard = () => (
    <Grid item xs={12} /* Full width on extra small screens */ md={12} /* Full width on medium screens and up */>
      <Paper elevation={0} sx={{ borderRadius: 8 }}>
        <Card>
          <CardHeader title="Profile Picture" sx={{ borderBottom: '1px solid #f0f0f0' }} />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Avatar alt="User 1" src="/assets/avatar-1-Dja0YEDP.png" sx={{ width: 100, height: 100, margin: 'auto' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  Upload/Change Your Profile Image
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" size="small">
                  Upload Avatar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );

  const SecurityCard = () => (
    <Grid item xs={12} md={8}>
      <Paper elevation={0} sx={{ borderRadius: 8 }}>
      <Card sx={{ borderRadius: '8px' }}>
    <CardHeader title="Change Password" sx={{ borderBottom: '1px solid #f0f0f0' }} />
    <hr className="MuiDivider-root MuiDivider-fullWidth css-xv3ynj" />
    <CardContent className="MuiCardContent-root css-fekdlw">
      <Grid container spacing={3}>
        {/* Current Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-basic9"
            label="Current Password"
            variant="outlined"
            type="password"
          />
        </Grid>
        {/* New Password */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic10"
            label="New Password"
            variant="outlined"
            type="password"
          />
        </Grid>
        {/* Re-enter New Password */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic11"
            label="Re-enter New Password"
            variant="outlined"
            type="password"
          />
        </Grid>
        {/* Change Password Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            className="css-1yc8pbx"
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
      </Paper>
    </Grid>
  );

  const DeleteAccount = () => (
      <Grid item xs={12} md={12}>
        <Paper elevation={0} sx={{ borderRadius: 8 }}>
          <Card>
            <CardHeader title="Delete Account" sx={{ borderBottom: '1px solid #f0f0f0' }} />
            <CardContent>
              <Typography variant="body1">
                To deactivate your account, first delete its resources. If you are the only owner of
                any teams, either assign another owner or deactivate the team.
              </Typography>
              <Button variant="outlined" color="error" size="small" sx={{ mt: 2 }}>
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );

// Sample Profile form component
const ProfileForm = () => (
  <Card elevation={0}>
    <CardHeader title="Edit Profile" />
    <Divider />
    <CardContent>
      <TextField fullWidth margin="normal" id="name" label="Name" defaultValue="John Doe" />
      <TextField fullWidth margin="normal" id="email" label="Email" defaultValue="john.doe@example.com" />
      <TextField fullWidth margin="normal" id="phone" label="Phone" defaultValue="+1234567890" />
      {/* Add more form fields as needed */}
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
    </CardContent>
  </Card>
);


// Billing tab content
const BillingContent = () => (
  <Card elevation={0}>
    <CardHeader title="Billing" />
    <Divider />
    <CardContent>
      <Typography>This is the billing tab content.</Typography>
    </CardContent>
  </Card>
);

// Security tab content
const SecurityContent = () => (
    <Grid container spacing={3}>
      {/* Security Card (Change Password) */}
      <Grid item xs={12} md={8}>
        <SecurityCard />
      </Grid>
  
      {/* Delete Account Section */}
      <Grid item xs={12} md={4}>
        <DeleteAccount />
      </Grid>
    </Grid>
  );


// Notifications tab content
const NotificationsContent = () => (
  <Card elevation={0}>
    <CardHeader title="Notifications" />
    <Divider />
    <CardContent>
      <Typography>This is the notifications tab content.</Typography>
    </CardContent>
  </Card>
);

export default UserProfile;
