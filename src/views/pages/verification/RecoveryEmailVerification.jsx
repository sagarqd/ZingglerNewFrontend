import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Container, Divider, Grid, Stack, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';


const RecoveryEmailVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
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
        'http://localhost:8080/api/auth/verify',
        { email, otp: otp.join('') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        console.log('Email verified successfully');
        navigate('/dashboard/default/');
      } else {
        throw new Error('Failed to verify email');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setError('Failed to verify email. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem('email');

      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      const response = await axios.post('http://localhost:8080/api/auth/resend-otp', { email });

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
<Link aria-label="theme logo" href="/pages/code-verification/code-verification1" sx={{ mb: 4 }}>
                        <Logo />
                      </Link>
  <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} lg={7}>
          <Card elevation={3} sx={{ p: 4, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Stack spacing={2}>
                        <Typography variant="h2" gutterBottom>
                        Recovery Email verification code
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                          Enter OTP
                        </Typography>
                        <Typography variant="caption">
                          We’ve sent you a code on jone.****@company.com
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {otp.map((value, index) => (
                      <Grid item xs={2} key={index}>
                        <TextField
                          aria-label={`Character ${index + 1}`}
                          type="text"
                          autoComplete="off"
                          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                          value={value}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              inputRefs.current[index - 1].focus();
                            }
                          }}
                          inputRef={(el) => (inputRefs.current[index] = el)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" fullWidth size="large" onClick={handleVerify}>
                    Verify Email Address
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="center">
                    <Typography variant="h5">
                      Did not receive the email? Check your spam folder
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" color="secondary" textAlign="center">
                    Code will be Resent in 00:{countdown.toString().padStart(2, '0')}s
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" fullWidth size="large" onClick={handleResend} disabled={countdown > 0}>
                    Resend Code
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="text" color="secondary" fullWidth size="large">
                    Try Another Way
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

export default RecoveryEmailVerification;
