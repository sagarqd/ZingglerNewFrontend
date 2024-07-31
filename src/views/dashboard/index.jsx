import * as React from 'react';
import { useEffect, useState } from 'react';

// material-ui
import { Card, CardContent, Grid, Box, Divider, Typography, CardActions, Button  } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import CoursesSection from './CoursesSection';
import NewUsersSection from './NewUsersSection';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const today = dayjs(); // Get today's date
  const [selectedDate, setSelectedDate] = useState(today); // Initialize with today's date

  const handlePrevious = () => {
    setSelectedDate(prevDate => prevDate.subtract(1, 'month'));
  };

  const handleNext = () => {
    setSelectedDate(prevDate => prevDate.add(1, 'month'));
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={6} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <EarningCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <TotalOrderLineChartCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <CoursesSection isLoading={isLoading} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <NewUsersSection isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Grid container spacing={gridSpacing} direction="column">
              <Grid item xs={12}>
                <Card elevation={0} sx={{ width: '100%', borderRadius: '8px' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Calendar
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateCalendar']}>
                        <DateCalendar
                          date={today}
                          onChange={setSelectedDate}
                          views={['year', 'month', 'day']}
                          sx={{
                            width: '100%',
                            '.MuiDayPickerDay-dayToday': {
                              borderRadius: '8px', // Rounded rectangle
                              backgroundColor: 'secondary.main', // Secondary color
                              color: 'white', // Text color
                              '&:hover': {
                                backgroundColor: 'secondary.dark', // Darker shade on hover
                              },
                            },
                            '.MuiDayPickerDay-day': {
                              borderRadius: '4px', // Default rounded corners
                              backgroundColor: 'transparent', // Default background // Default background
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                      <Grid item xs={6} sx={{ textAlign: 'left' }}>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          onClick={handlePrevious}
                        >
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: 'right' }}>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeLightCard
                    {...{
                      isLoading: isLoading,
                      total: 203,
                      label: 'Total Income',
                      icon: <StorefrontTwoToneIcon fontSize="inherit" />
                    }}
                  />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
