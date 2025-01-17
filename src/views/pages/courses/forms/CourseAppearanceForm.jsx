import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import {
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  FormHelperText
} from '@mui/material';
import axios from 'axios';

import Stack from '@mui/material/Stack';



const CourseAppearanceForm = ({ goToNextTab,goToPreviousTab,courseId }) => {
  const [theme, setTheme] = useState('None');
  const [showReportActivity, setShowReportActivity] = useState('Yes');
  const [showGradeBook, setShowGradeBook] = useState('Yes');
  const [language, setLanguage] = useState('English');
  const [showActivityDates, setShowActivityDates] = useState('Yes');
  const [noOfAnnouncement, setNoOfAnnouncement] = useState('');

  const handleNext = async () => {
    if (!courseId) {
      console.error('Course ID is not defined');
      return;
    }

    // Prepare form data
    const formData = {
      theme,
      showReportActivity,
      showGradeBook,
      language,
      showActivityDates,
      noOfAnnouncement
    };

    try {
      // Send data to the backend with the courseId
      const response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData);
      console.log('Form data submitted:', response.data);
      goToNextTab(response.data.slug); // Pass the slug to goToNextTab
    } catch (error) {
      console.error('Error saving appearance settings:', error);
    }
  };
   // Handle navigation to the previous tab
   const handlePrevious = () => {
    goToPreviousTab();
  };
  
    return (
      <>
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardHeader title={<Typography variant="h5">Appearance</Typography>} sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />
          <Divider />
          <CardContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Theme"
                    id="theme"
                    variant="outlined"
                    select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Classic">Classic</MenuItem>
                    <MenuItem value="Boost">Boost</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Show Report Activity"
                    id="showReportActivity"
                    variant="outlined"
                    select
                    value={showReportActivity}
                    onChange={(e) => setShowReportActivity(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Show Grade Book"
                    id="showGradeBook"
                    variant="outlined"
                    select
                    value={showGradeBook}
                    onChange={(e) => setShowGradeBook(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Language"
                    id="language"
                    variant="outlined"
                    select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="English (UK)">English (UK)</MenuItem>
                    <MenuItem value="German">German</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Show Activity Dates"
                    id="showActivityDates"
                    variant="outlined"
                    select
                    value={showActivityDates}
                    onChange={(e) => setShowActivityDates(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Number of Announcement"
                    id="noOfAnnouncement"
                    variant="outlined"
                    value={noOfAnnouncement}
                    onChange={(e) => setNoOfAnnouncement(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
  
        <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handlePrevious}>
            prev
          </Button>
          <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleNext}>
            Next
          </Button>
        </Stack>
      </>
    );
  };

export default CourseAppearanceForm;