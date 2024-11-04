import React, { useState } from 'react';
import { Breadcrumbs, Typography, Link, Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { NavigateNext, UploadFile } from '@mui/icons-material';

function StaffDashboard() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const newData = [
        { id: data.length + 1, name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` }
      ];
      setData([...data, ...newData]);
      setFile(null);
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/dashboard/default">
          Home
        </Link>
        <Typography color="textPrimary">Staff Dashboard</Typography>
        <Typography color="textPrimary">Staff</Typography>
      </Breadcrumbs>

      {/* Welcome Section */}
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            mt: 4,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome Alok!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We're excited to have you here.
          </Typography>
        
          {/* File Upload Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 4,
              mb: 4,
              bgcolor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Button
              variant="contained"
              component="label"
              color="secondary"
              startIcon={<UploadFile />}
              sx={{ mb: 2 }}
            >
              Choose File
              <input hidden type="file" onChange={handleFileChange} />
            </Button>
            {file && (
              <Box>
                <Typography variant="body1">Selected File: {file.name}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpload}>
                  Upload
                </Button>
              </Box>
            )}
          </Box>

          {/* Data Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, bgcolor: '#F5F5F5', color:"#121926" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">Filename</Typography></TableCell>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">MIME Type</Typography></TableCell>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">User ID</Typography></TableCell>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">URL</Typography></TableCell>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">Uploaded By</Typography></TableCell>
                  <TableCell><Typography  sx={{color:"#362154", fontWeight: "bold"}} color="primary">Uploaded At</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={item.filename}>
                      <TableCell>{item.mimetype}</TableCell>
                      <TableCell>{item.userid}</TableCell>
                      <TableCell>{item.url}</TableCell>
                      <TableCell>{item.uploadedby}</TableCell>
                      <TableCell>{item.uploadedat}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No data available. Please upload a file.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>




      </Container>
    </div>
  );
}

export default StaffDashboard;
