import React from 'react';
import { Card, CardContent, Grid, Box, Typography } from '@mui/material';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';

const SmallCourseCard = () => {
  return (
    <Grid lg={12} md={12} sm={12} xs={12}>
      <Card elevation={0} sx={{ borderRadius: '8px', backgroundColor: 'grey.300' }}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h4" sx={{ mb: 1 }}>Rust Programming</Typography>
              <Typography variant="h5">6 Modules</Typography>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MonetizationOnTwoToneIcon fontSize="medium" sx={{ fontSize: 60, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SmallCourseCard;
