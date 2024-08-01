import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Container, Grid, Stack, Typography, TextField, Button, InputAdornment, IconButton, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';

const ReserPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const email = localStorage.getItem('email');
      const otp = localStorage.getItem('otp'); // Assuming you stored OTP in localStorage

      if (!email || !otp) {
        throw new Error('Email or OTP not found in localStorage');
      }

      const response = await axios.post(
        'http://localhost:8080/api/auth/reset-password',
        { email, otp, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        console.log('Password reset successfully');
        navigate('/login'); // Redirect to login page
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', // Ensure vertical centering
        '@media (max-width: 600px)': {
          justifyContent: 'center' // Center vertically on mobile devices
        }
      }}
    >
      <Link aria-label="theme logo" href="/pages/forgot-password" sx={{ mb: 4 }}>
        <Logo />
      </Link>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} lg={7}>
          <Card elevation={3} sx={{ p: 4, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container >
                    <Grid item sx={{ mt: 4 }}>
                      <Stack spacing={2}>
                        <Typography variant="h2" gutterBottom>
                          Reset Password
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Enter New Password to Update Your Password
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    Enter New Password:
                  </Typography>
                  <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    Confirm New Password:
                  </Typography>
                  <TextField
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 4, mt: 2 }}>
                  <Button variant="contained" color="secondary" fullWidth size="large" onClick={handleVerify}>
                    Continue
                  </Button>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReserPassword;
