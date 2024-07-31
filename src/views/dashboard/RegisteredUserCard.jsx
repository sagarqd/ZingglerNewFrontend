import React from 'react';
import { Grid, Paper, Card, CardContent, Avatar, Typography, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RegisteredUserCard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ backgroundColor: '#f5f5f5' }}>
          <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <CardContent>
              <Paper elevation={0} sx={{ backgroundColor: '#f5f5f5' }}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar
                      alt="User 1"
                      src="https://berrydashboard.io/assets/avatar-4-DbzFqBg_.png"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5" sx={{ marginBottom: 0 }}>Henderson</Typography>
                    <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                      South Antonina
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="more-options">
                      <MoreHorizIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisteredUserCard;
