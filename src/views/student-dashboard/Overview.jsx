import * as React from 'react';
import { useEffect, useState } from 'react';

// material-ui
import { Card, CardContent, Grid, Box, Divider, Typography, CardActions, Button } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import CoursesSection from './CoursesSection';
import NewUsersSection from './NewUsersSection';
import AddEventModal from './AddEventModal';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const StudentDashboardOverview = () => {
    const [isLoading, setLoading] = useState(true);
    const today = dayjs(); // Get today's date
    const [selectedDate, setSelectedDate] = useState(today); // Initialize with today's date
    const [events, setEvents] = useState([
        // Your initial events here
    ]);

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const handlePrevious = () => {
        setSelectedDate((prevDate) => prevDate.subtract(1, 'month'));
    };

    const handleNext = () => {
        setSelectedDate((prevDate) => prevDate.add(1, 'month'));
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
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Grid container spacing={gridSpacing} direction="column">
                                    <Grid item xs={12}>
                                        <Card elevation={0} sx={{ width: '100%', borderRadius: '8px' }}>
                                            <CardContent>
                                                <Typography variant="h5" gutterBottom>
                                                    Calendar
                                                </Typography>
                                                <Divider sx={{ mb: 2 }} />
                                                <Box sx={{ p: 3 }}>
                                                    <Typography variant="h4" gutterBottom>
                                                        Calendar
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Event Calendar
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => setIsAddEventModalOpen(true)}
                                                        >
                                                            Add New Event
                                                        </Button>
                                                    </Box>
                                                    <FullCalendar
                                                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                                                        initialView="dayGridMonth"
                                                        headerToolbar={{
                                                            left: 'prev,next today',
                                                            center: 'title',
                                                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                                        }}
                                                        events={[
                                                            { title: 'Repeating Event', date: '2024-08-17', color: 'red' },
                                                            { title: 'Conference', date: '2024-08-14', color: 'orange' },
                                                            { title: 'Long Event', start: '2024-08-18', end: '2024-08-21', color: 'grey' },
                                                            { title: 'Opening Ceremony', date: '2024-08-21', color: 'green' },
                                                            { title: 'Breakfast', date: '2024-08-22', color: 'blue' },
                                                            { title: 'Repeating Event', date: '2024-08-23', color: 'red' },
                                                            { title: 'Anniversary Celebr', date: '2024-08-23', color: 'red' },
                                                            { title: 'Birthday Party', date: '2024-08-23', color: 'orange' },
                                                            { title: 'Meeting', date: '2024-08-23', color: 'yellow' },
                                                            { title: 'Long Event', start: '2024-08-27', end: '2024-08-29', color: 'blue' },
                                                            { title: 'Meeting', date: '2024-08-28', color: 'blue' },
                                                            { title: 'Happy Hour', date: '2024-08-29', color: 'green' }
                                                        ]}
                                                    />
                                                </Box>
                                                <Grid container spacing={1} sx={{ mt: 2 }}>
                                                    <Grid item xs={6} sx={{ textAlign: 'left' }}>
                                                        <Button variant="outlined" color="secondary" onClick={handlePrevious}>
                                                            Previous
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                                        <Button variant="contained" color="secondary" onClick={handleNext}>
                                                            Next
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing} direction="column">
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
                            <Grid item xs={12}>
                                <CoursesSection isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StudentDashboardOverview;
