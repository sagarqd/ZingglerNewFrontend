import React, { useState } from 'react';
import { Box, Card, Container, Divider, Grid, Stack, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';


const VerificationCode = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      // Handle success scenario (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
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
    '@media (max-width: 600px)': {
      alignItems: 'flex-start' // Changed from 'flex-center' to 'flex-start' for better alignment
    }
  }}
>
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
                      Verification Code
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      We sent you an email.
                    </Typography>
                    <Typography variant="caption">
                      We’ve sent you a code on jone.****@company.com
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <Link aria-label="theme logo" href="/pages/code-verification/code-verification1">
                  <Logo />
                  </Link>
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
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[index] = e.target.value;
                        setOtp(newOtp);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth size="large" onClick={handleVerify}>
                Continue
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center">
                <Typography variant="body1">
                  Did not receive the email? Check your spam folder
                </Typography>
                <Link component="button" variant="body1" onClick={handleResend}>
                  Resend code
                </Link>
              </Stack>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary" fullWidth size="large" onClick={handleResend}>
                Resend Code
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  </Grid>
</Container>

  );
};

export default VerificationCode;
