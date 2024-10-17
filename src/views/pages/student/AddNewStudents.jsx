import React, { useState } from 'react';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import dayjs from 'dayjs';
import {
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Stack,
  styled,
  CardMedia
} from '@mui/material';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const staticThumbnailUrl = 'https://via.placeholder.com/140'; // Replace with actual thumbnail URL

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const CourseInformationForm = ({ selectedDate, setSelectedDate, educationFields, handleAddField, handleInputChange, formData }) => (
  <>
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardHeader
        title={<Typography variant="h5">Course Information</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off"> 
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                id="fullName"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Gender"
                id="gender" // Ensure this is correct
                name="gender" // Optional: ensure this is correct
                variant="outlined"
                select
                InputLabelProps={{ shrink: true }}
                value={formData.gender}
                onChange={handleInputChange} // Ensure this is correctly linked to the handler
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User Name"
                id="userName"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.userName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(newValue) => handleInputChange({ target: { id: 'dateOfBirth', value: newValue } })}
                  renderInput={(params) => <TextField {...params} fullWidth variant="outlined" InputLabelProps={{ shrink: true }} />}
                  inputFormat="MM/DD/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                id="password"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
      <CardHeader
        title={<Typography variant="h5">Contact Information</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                id="contactNumber"
                variant="outlined"
                type="tel"
                InputLabelProps={{ shrink: true }}
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                id="email"
                variant="outlined"
                type="email"
                InputLabelProps={{ shrink: true }}
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Emergency Contact Number"
                id="emergencyNumber"
                variant="outlined"
                type="tel"
                InputLabelProps={{ shrink: true }}
                value={formData.emergencyNumber}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                id="address"
                variant="outlined"
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
      <CardHeader
        title={<Typography variant="h5">Education Information</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Matriculation"
                id="matriculation"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.matriculation}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Intermediate"
                id="intermediate"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.intermediate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bachelor's Degree"
                id="bachelorDegree"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.bachelorDegree}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
      <CardHeader
        title={<Typography variant="h5">Academic Information</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student ID"
                id="studentId"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.studentId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enrollment Date"
                  value={formData.enrollmentDate} // Ensure this points to the correct formData field
                  onChange={(newValue) => handleInputChange({ target: { id: 'enrollmentDate', value: newValue } })}
                  renderInput={(params) => <TextField {...params} fullWidth variant="outlined" InputLabelProps={{ shrink: true }} />}
                  inputFormat="MM/DD/yyyy"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Name"
                id="courseName"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.courseName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Academic Level"
                id="academicLevel"
                name='academicLevel'
                variant="outlined"
                select
                InputLabelProps={{ shrink: true }}
                value={formData.academicLevel}
                onChange={handleInputChange}
              >
                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
      <CardHeader
        title={<Typography variant="h5">Profile Picture</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', md: 140 }, height: { xs: 'auto', md: 140 }, borderRadius: 2 }}
              image={staticThumbnailUrl} // Replace with dynamic image if needed
              alt="Upload Image"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Upload Image. Accepted formats: JPG, PNG.
              </Typography>
              <Stack sx={{ mt: 2 }}>
                <Button component="label" variant="contained" color="secondary" startIcon={<CloudUploadIcon />} sx={{ maxWidth: '170px' }}>
                  Upload file
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleInputChange({
                          target: {
                            id: 'studentAvatar',
                            value: file
                          }
                        });
                      }
                    }}
                  />
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
);

const AddNewStudents = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [educationFields, setEducationFields] = useState(['Matriculation', 'Intermediate', 'Bachelor Degree']);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dateOfBirth: null,
    userName: '',
    password: '',
    contactNumber: '',
    email: '',
    emergencyNumber: '',
    address: '',
    studentId: '',
    courseName: '',
    matriculation: '',
    intermediate: '',
    bachelorDegree: '',
    academicLevel: 'Undergraduate',
    enrollmentDate: null, // This will hold the enrollment date
    studentAvatar: null
  });

  const steps = ['Course Information', 'Course Format'];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleAddField = () => {
    setEducationFields([...educationFields, 'Additional Degree']);
  };
  const handleInputChange = (event) => {
    const { id, name, value, type, files } = event.target;
    const key = id || name;
  
    if (!key) {
      console.error('Input has no id or name:', event.target);
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [key]: type === 'file' ? files[0] : value
    }));
  };
  
  const handleAddStudent = async () => {
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8080/api/student/add-student', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Student added successfully!');
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        </Box>
      </Paper>
      <Paper sx={{ p: 4 }}>
        <Box>
          {steps[activeStep] === 'Course Information' && (
            <CourseInformationForm
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              educationFields={educationFields}
              handleAddField={handleAddField}
              handleInputChange={handleInputChange}
              formData={formData}
            />
          )}
          {steps[activeStep] === 'Course Format' && (
            <Box>
              <Typography variant="h5">Course Format</Typography>
              {/* Course Format Form goes here */}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddNewStudents;
