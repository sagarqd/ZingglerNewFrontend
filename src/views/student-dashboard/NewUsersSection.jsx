import React from 'react';
import { Card, CardContent, Divider, Typography, Box, CardActions, Button } from '@mui/material';
import RegisteredUserCard from './RegisteredUserCard';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const NewUsersSection = ({ isLoading }) => (
  <Card elevation={0} sx={{ borderRadius: '8px' }}>
    <CardContent sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Newly Registered Users
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <RegisteredUserCard isLoading={isLoading} />
        <RegisteredUserCard isLoading={isLoading} />
        <RegisteredUserCard isLoading={isLoading} />
      </Box>
    </CardContent>
    <CardActions sx={{ px: 2, py: 1, justifyContent: 'center' }}>
      <Button size="small" disableElevation>
        View All
        <ChevronRightOutlinedIcon />
      </Button>
    </CardActions>
  </Card>
);

export default NewUsersSection;
