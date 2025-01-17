import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';

const CoursegroupForm = ({ courseId, goToPreviousTab }) => {
  // State management for form fields
  const [groupMode, setGroupMode] = useState('No Group');
  const [forcedGroupMode, setForcedGroupMode] = useState('Yes');
  const [tags, setTags] = useState('Basic');
  const [numberOfAnnouncement, setNumberOfAnnouncement] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleUpload = async () => {
    // Prepare form data
    const formData = {
      groupMode,
      forcedGroupMode,
      tags,
      numberOfAnnouncement,
      isFinal: 'true', // Indicate that this is the final submission
    };

    try {
      // Replace `apiEndpoint` with your actual API URL
      const updateResponse = await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData);
      console.log('Form data submitted:', updateResponse.data);

      // Redirect or perform other actions after successful save
      navigate('/dashboard/default');
    } catch (error) {
      console.error('Error saving group settings or updating status:', error);
    }
  };

  // Handle navigation to the previous tab
  const handlePrevious = () => {
    goToPreviousTab();
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardHeader title={<Typography variant="h5">Groups</Typography>} sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />
        <Divider />
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Group mode"
                  id="groupMode"
                  variant="outlined"
                  select
                  value={groupMode}
                  onChange={(e) => setGroupMode(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="No Group">No Group</MenuItem>
                  <MenuItem value="Separate Group">Separate Group</MenuItem>
                  <MenuItem value="Visible Group">Visible Group</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Forced Group Mode"
                  id="forcedGroupMode"
                  variant="outlined"
                  select
                  value={forcedGroupMode}
                  onChange={(e) => setForcedGroupMode(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tags"
                  id="tags"
                  variant="outlined"
                  select
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advance">Advance</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Number of Announcement"
                  id="numberOfAnnouncement"
                  variant="outlined"
                  value={numberOfAnnouncement}
                  onChange={(e) => setNumberOfAnnouncement(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <FormHelperText sx={{ mt: 1 }}>The number of announcements for this group.</FormHelperText>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handlePrevious}>
          Prev
        </Button>
        <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleUpload}>
          Upload
        </Button>
      </Stack>
    </>
  );
};

export default CoursegroupForm;
