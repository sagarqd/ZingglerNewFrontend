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
        setCountdown(prevCountdown => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      if (!email) {
        throw new Error('Please enter a valid email address.');
      }

      const response = await axios.post('http://localhost:8080/api/forgot-password', { email });

      if (response.status === 200) {
        console.log('OTP sent successfully');
        setCountdown(10); // Set countdown to 10 seconds
        localStorage.setItem('email', email);
        navigate('/recovery-email-verify'); // Redirect to OTP verification page
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
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
                  <Button variant="contained" color="secondary" fullWidth size="large" onClick={handleSendOtp}>
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
