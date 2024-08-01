import React, { useState } from 'react';
import { Box, Card, Container, Grid, Stack, Typography, TextField, Button, Link, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';

const RecoveryEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSendRecoveryEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/send-recovery-email', { email });

      if (response.status === 200) {
        setSuccess('Recovery email sent successfully. Please check your inbox.');
        setTimeout(() => navigate('/forgot-password-verification'), 3000); // Redirect to verification page after 3 seconds
      } else {
        throw new Error('Failed to send recovery email');
      }
    } catch (error) {
      setError('Failed to send recovery email. Please try again.');
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
                    <Grid item sx={{ mt: 4 }}>
                      <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography variant="h2" gutterBottom>
                            Try another way!
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Your Recovery Email Account is te****23@gmail.com
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 4 }}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  Enter Your Recovery Email Account :
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
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Button variant="contained" color="secondary" fullWidth size="large" onClick={handleSendRecoveryEmail}>
                  Send OTP
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, mb: 4 }}>
                  <Button variant="outlined" color="secondary" fullWidth size="large">
                    Go Back
                  </Button>
                </Grid>
                {success && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="success.main">
                      {success}
                    </Typography>
                  </Grid>
                )}
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

export default RecoveryEmail;

