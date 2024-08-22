import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert, Button, Box } from '@mui/material';

const VideoUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(response.data.filePath); // Updated to use the path returned by the server
      setMessage('File uploaded successfully!');
      setSeverity('success');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
      setSeverity('error');
    } finally {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <Button onClick={handleUpload} variant="contained" color="primary">
        Upload Video
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <Button color="inherit" onClick={handleClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VideoUpload;
