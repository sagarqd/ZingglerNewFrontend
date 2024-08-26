import React from 'react';
import { Box, Typography, Paper, Tab, Tabs, Card, CardHeader, CardContent, Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

// Styled components
const OutlinedCard = styled(Card)({
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
});

const ProfileEdit = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 2 }}>
      <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          TabIndicatorProps={{ sx: { backgroundColor: '#5e35b1' } }} // Custom indicator color
        >
          <Tab
            icon={<PersonIcon />}
            label="Profile"
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': {
                color: '#5e35b1', // Color of selected tab
              },
              '& .MuiTab-icon': {
                color: 'text.secondary',
              },
              '&.Mui-selected .MuiTab-icon': {
                color: '#5e35b1', // Color of selected tab icon
              },
            }}
          />
          <Tab
            icon={<LockIcon />}
            label="Change Password"
            sx={{
              color: 'text.secondary',
              '&.Mui-selected': {
                color: '#5e35b1', // Color of selected tab
              },
              '& .MuiTab-icon': {
                color: 'text.secondary',
              },
              '&.Mui-selected .MuiTab-icon': {
                color: '#5e35b1', // Color of selected tab icon
              },
            }}
          />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            {/* Profile Information Card */}
            <OutlinedCard>
              <CardHeader
                title="Profile Information"
                sx={{ borderBottom: '1px solid #e0e0e0' }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Full name" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Profession" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="About" variant="outlined" multiline rows={4} />
                  </Grid>
                </Grid>
              </CardContent>
            </OutlinedCard>

            {/* Contact Information Card */}
            <OutlinedCard sx={{ mt: 4 }}>
              <CardHeader
                title="Contact Information"
                sx={{ borderBottom: '1px solid #e0e0e0' }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Contact Number" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Email Address" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        fullWidth
                        label="Recovery Email Address"
                        variant="outlined"
                        value="test123@gmail.com"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Button variant="text" color="secondary" sx={{ ml: 1 }}>
                        Verify
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Address" variant="outlined" multiline rows={4} />
                  </Grid>
                </Grid>
              </CardContent>
            </OutlinedCard>

            {/* Save Changes Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>
                Clear
              </Button>
              <Button variant="contained" color="secondary">
                Update Profile
              </Button>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            {/* Change Password Card */}
            <OutlinedCard sx={{ mt: 4 }}>
              <CardHeader
                title="Change Password"
                sx={{ borderBottom: '1px solid #e0e0e0' }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>
                        Cancel
                      </Button>
                      <Button variant="contained" color="secondary">
                        Change Password
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </OutlinedCard>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfileEdit;
