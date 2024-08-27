import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  MenuItem,
  Button,
  Grid,
  Stack
} from '@mui/material';

const CourseSectionForm = ({
  courseId,
  sectionId,
  handleSave,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [contentType, setContentType] = useState('Blog');
  const [contentUrl, setContentUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
    setContentUrl('');
    setUploadedFile(null);
  };

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('sectionTitle', sectionTitle);
    formData.append('contentType', contentType);
    if (contentType === 'Uploaded Video' && uploadedFile) {
      formData.append('uploadedFile', uploadedFile);
    } else {
      formData.append('contentUrl', contentUrl);
    }

    try {
      const response = await fetch(`http://localhost:8080/api/courses/${courseId}/sections/${sectionId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      handleSave(data); // Handle post-save logic
    } catch (error) {
      console.error('Error saving section details:', error);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardHeader
        title="Section Details"
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Section Title"
              variant="outlined"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content Type"
              variant="outlined"
              select
              value={contentType}
              onChange={handleContentTypeChange}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="Blog">Blog</MenuItem>
              <MenuItem value="YouTube Video">YouTube Video</MenuItem>
              <MenuItem value="Uploaded Video">Uploaded Video</MenuItem>
              <MenuItem value="Interactive Video">Interactive Video</MenuItem>
            </TextField>
          </Grid>

          {contentType === 'YouTube Video' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="YouTube URL"
                variant="outlined"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          )}

          {contentType === 'Blog' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog URL"
                variant="outlined"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          )}

          {contentType === 'Uploaded Video' && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Video
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="video/*"
                />
              </Button>
              {uploadedFile && <p>{uploadedFile.name}</p>}
            </Grid>
          )}

          {contentType === 'Interactive Video' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interactive Video URL"
                variant="outlined"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>

      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end', p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onPrev}
          disabled={isPrevDisabled}
        >
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </Stack>
    </Card>
  );
};

export default CourseSectionForm;
