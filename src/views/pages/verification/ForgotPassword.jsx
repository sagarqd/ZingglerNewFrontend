import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Container, Divider, Grid, Stack, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';

const ForgotPassword = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(10); // Set to 10 seconds
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000); // Update every 1 second

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    try {
      const email = localStorage.getItem('email');

      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      const response = await axios.post(
        'http://localhost:8080/api/auth/verify-reset-password',
        { email, otp: otp.join('') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        console.log('OTP verified successfully');
        navigate('/reset-password'); // Redirect to password reset page
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem('email');

      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      const response = await axios.post('http://localhost:8080/api/auth/resend-reset-otp', { email });

      console.log('OTP resent successfully:', response.data);
      setCountdown(10); // Reset countdown to 10 seconds
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
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
                  <Grid container direction="column" alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ mt:4 }}>
                      <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography variant="h2" gutterBottom>
                          Forgot Password
                        </Typography>
                        <Typography variant="h5" gutterBottom >
                        Always keep your account secure and don’t forget to update it 
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                Enter Your Registered Email Account :
              </Typography>
                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb:4 }}>
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

export default ForgotPassword;
