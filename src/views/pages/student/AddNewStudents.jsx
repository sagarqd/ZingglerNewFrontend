import React, { useState } from 'react';
import Quill from 'quill';
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

const CourseInformationForm = ({ selectedDate, setSelectedDate, educationFields, handleAddField }) => (
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
                            <TextField fullWidth label="Full Name" id="fullname" variant="outlined" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Gender"
                                id="gender"
                                variant="outlined"
                                select
                                defaultValue="male"
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="User Name" id="username" variant="outlined" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%'}}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth variant="outlined" InputLabelProps={{ shrink: true }} sx={{ width: '100%' }} />
                                    )}
                                    inputFormat="MM/DD/yyyy" // Adjust the format as needed
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
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                id="contactnumber"
                                variant="outlined"
                                type="tel"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    id="emailaddress"
                                    variant="outlined"
                                    type="email"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Emergency Contact Number"
                                    id="emergencycontact"
                                    variant="outlined"
                                    type="tel"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
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
                        {educationFields.map((field, index) => (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    fullWidth
                                    label={field}
                                    variant="outlined"
                                    defaultValue={`Enter ${field}`}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="outlined" color="secondary" onClick={handleAddField}>
                                Add Education
                            </Button>
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
                            <TextField fullWidth label="Student ID" id="studentid" variant="outlined" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Enrollment Date"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                    inputFormat="MM/DD/yyyy" // Adjust the format as needed
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Course Name"
                                id="coursename"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Academic Level"
                                id="academiclevel"
                                variant="outlined"
                                select
                                defaultValue="Undergraduate"
                                InputLabelProps={{ shrink: true }}
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
        <Card variant="outlined" sx={{ width: '100%', marginTop: 4 }}>
        <CardHeader
            title={<Typography variant="h5">Academic Information</Typography>}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <Divider />
        <CardContent>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <CardMedia
                        component="img"
                        sx={{ width: { xs: '100%', md: 140 }, height: { xs: 'auto', md: 140 }, borderRadius: 2 }}
                        image={staticThumbnailUrl}
                        alt="Upload Image"
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
                            Upload Image. Accepted formats: JPG, PNG.
                        </Typography>
                        <Stack sx={{ mt: 2 }}>
                            <Button
                                component="label"
                                variant="contained"
                                color="secondary"
                                startIcon={<CloudUploadIcon />}
                                sx={{ maxWidth: '170px' }}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
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

    const steps = ['Course Information', 'Course Format'];

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleAddField = () => {
        setEducationFields([...educationFields, 'Additional Degree']);
    };

    const handleAddStudent = () => {
      // Gather all form data and send it to the backend
      // For example, using fetch or axios
      // const formData = new FormData();
      // formData.append('fullname', ...);
      // formData.append('dateOfBirth', selectedDate);
      // Add other form fields similarly
      //
      // fetch('/api/add-student', {
      //     method: 'POST',
      //     body: formData,
      // })
      // .then(response => response.json())
      // .then(data => {
      //     console.log('Success:', data);
      // })
      // .catch((error) => {
      //     console.error('Error:', error);
      // });

      alert('Student added successfully!'); // Placeholder
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
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddStudent}
              >
                  Add Student
              </Button>
          </Box>
      </Paper>
  </Container>
    );
};

export default AddNewStudents;
