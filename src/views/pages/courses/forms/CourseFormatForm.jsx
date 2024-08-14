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
import { Home, Description, FormatListBulleted, ColorLens, CheckCircle, Group } from '@mui/icons-material';

import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import UploadIcon from '@mui/icons-material/Upload';

import Stack from '@mui/material/Stack';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CourseFormatForm = ({ goToNextTab,goToPreviousTab, courseId }) => {
  const [hiddenSection, setHiddenSection] = useState('Hidden sections are not shown as not available');
  const [courseLayout, setCourseLayout] = useState('Show all sections on one page');
  const [courseSection, setCourseSection] = useState('Custom Section');
  const [noOfSection, setNoOfSection] = useState('');

  const handleNext = async () => {
    if (!courseId) {
      console.error('Course ID is not defined');
      return;
    }

    const formData = new FormData();
    formData.append('hiddenSection', hiddenSection);
    formData.append('courseLayout', courseLayout);
    formData.append('courseSection', courseSection);
    formData.append('noOfSection', noOfSection);

    try {
      const response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Form data:', response.data);
      goToNextTab(response.data.slug); // Pass the slug to goToNextTab
    } catch (error) {
      console.error('Error saving course format:', error.response ? error.response.data : error.message);
    }
  };


   // Handle navigation to the previous tab
   const handlePrevious = () => {
    goToPreviousTab();
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardHeader
          title={<Typography variant="h5">Course Format</Typography>}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <Divider />
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hidden Section"
                  id="hiddenSection"
                  variant="outlined"
                  select
                  value={hiddenSection}
                  onChange={(e) => setHiddenSection(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Hidden sections are not shown as not available">Hidden sections are not shown as not available</MenuItem>
                  <MenuItem value="Hidden sections are completely invisible">Hidden sections are completely invisible</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Course Layout"
                  id="courseLayout"
                  variant="outlined"
                  select
                  value={courseLayout}
                  onChange={(e) => setCourseLayout(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Show all sections on one page">Show all sections on one page</MenuItem>
                  <MenuItem value="Show one section per page">Show one section per page</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Course Section"
                  id="courseSection"
                  variant="outlined"
                  select
                  value={courseSection}
                  onChange={(e) => setCourseSection(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Custom Section">Custom Section</MenuItem>
                  <MenuItem value="Weekly Section">Weekly Section</MenuItem>
                  <MenuItem value="Single Activity">Single Activity</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Number of Section"
                  id="noOfSection"
                  variant="outlined"
                  value={noOfSection}
                  onChange={(e) => setNoOfSection(e.target.value)}
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

export default CourseFormatForm;
