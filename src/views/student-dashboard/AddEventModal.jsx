import * as React from 'react';
import { useEffect, useState } from 'react';

// material-ui
import { Card, CardContent, Grid, Box, Divider, Typography, Button } from '@mui/material';

// project imports
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import CoursesSection from './CoursesSection';
import AddEventModal from './AddEventModal';

// FullCalendar and plugins
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// dayjs
import dayjs from 'dayjs';

// constants
import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| STUDENT DASHBOARD ||============================== //

const StudentDashboardOverview = () => {
    const [isLoading, setLoading] = useState(true);
    const today = dayjs();
    const [selectedDate, setSelectedDate] = useState(today);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [events, setEvents] = useState([
        // Your initial events here if any
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
                                                <Button variant="contained" color="primary" onClick={() => setIsAddEventModalOpen(true)}>
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
                                                events={events}
                                            />
                                            <AddEventModal
                                                open={isAddEventModalOpen}
                                                onClose={() => setIsAddEventModalOpen(false)}
                                                onAdd={handleAddEvent}
                                            />
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
                                        </Box>
                                    </CardContent>
                                </Card>
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
                                    isLoading={isLoading}
                                    total={203}
                                    label='Total Income'
                                    icon={<StorefrontTwoToneIcon fontSize="inherit" />}
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
