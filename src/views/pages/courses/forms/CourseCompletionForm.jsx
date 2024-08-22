import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
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



const CourseCompletionForm = ({ goToNextTab,goToPreviousTab,courseId }) => {
    const [enableCompletionTracking, setEnableCompletionTracking] = useState('No');
    const [showActivityCompletionConditions, setShowActivityCompletionConditions] = useState('No');
    const navigate=useNavigate();
    const handleNext = async () => {
      if (!courseId) {
        console.error('Course ID is not defined');
        return;
      }
      // Prepare form data
      const formData = {
        enableCompletionTracking,
        showActivityCompletionConditions
      };
  
      
      try {
        // Replace `apiEndpoint` with your actual API URL
       const response= await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData);
  
        console.log('Form data submitted:', response.data);
        goToNextTab(response.data.slug);
      } catch (error) {
        console.error('Error saving completion settings:', error);
      }
    };
  
    const handleSubmit=async () => {
      if (!courseId) {
        console.error('Course ID is not defined');
        return;
      }
      // Prepare form data
      const formData = {
        enableCompletionTracking,
        showActivityCompletionConditions
      };
  
      
      try {
        // Replace `apiEndpoint` with your actual API URL
       const response= await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData);
  
        console.log('Form data submitted:', response.data);
        navigate('/dashboard/default');
      } catch (error) {
        console.error('Error saving completion settings:', error);
      }

    };

     // Handle navigation to the previous tab
     const handlePrevious = () => {
      goToPreviousTab();
    };
  
    return (
      <>
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardHeader title={<Typography variant="h5">Completion</Typography>} sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />
          <Divider />
          <CardContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Enable completion tracking"
                    id="enableCompletionTracking"
                    variant="outlined"
                    select
                    value={enableCompletionTracking}
                    onChange={(e) => setEnableCompletionTracking(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Show Activity Completion Conditions"
                    id="showActivityCompletionConditions"
                    variant="outlined"
                    select
                    value={showActivityCompletionConditions}
                    onChange={(e) => setShowActivityCompletionConditions(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
  
        <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handlePrevious}>
           prev
          </Button>
          <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handleSubmit}>
            save as draft
          </Button>
          <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleNext}>
            next
          </Button>
        </Stack>
      </>
    );
  };

  export default CourseCompletionForm;