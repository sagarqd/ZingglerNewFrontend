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

const staticThumbnailUrl = 'https://via.placeholder.com/140';

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

const CourseInformationForm = ({ formData, errors, handleInputChange, handleDateChange, handleFileChange, educationFields, handleAddField, handleEducationFieldChange }) => (
    <>
        {/* Course Information Card */}
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardHeader
                title={<Typography variant="h5">Course Information</Typography>}
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    {/* Full Name */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            id="fullName"
                            variant="outlined"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                    </Grid>
                    {/* Gender */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Gender"
                            id="gender"
                            variant="outlined"
                            select
                            value={formData.gender}
                            onChange={handleInputChange}
                            error={!!errors.gender}
                            helperText={errors.gender}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                    </Grid>
                    {/* User Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="User Name"
                            id="userName"
                            variant="outlined"
                            value={formData.userName}
                            onChange={handleInputChange}
                            error={!!errors.userName}
                            helperText={errors.userName}
                        />
                    </Grid>
                    {/* Date of Birth */}
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={(date) => handleDateChange('dateOfBirth')(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        error: !!errors.dateOfBirth,
                                        helperText: errors.dateOfBirth
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* Password */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            id="password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
            <CardHeader
                title={<Typography variant="h5">Contact Information</Typography>}
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    {/* Contact Number */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            id="contactNumber"
                            variant="outlined"
                            type="tel"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            error={!!errors.contactNumber}
                            helperText={errors.contactNumber}
                        />
                    </Grid>
                    {/* Email Address */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            id="email"
                            variant="outlined"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    {/* Emergency Contact Number */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Emergency Contact Number"
                            id="emergencyContact"
                            variant="outlined"
                            type="tel"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            error={!!errors.emergencyContact}
                            helperText={errors.emergencyContact}
                        />
                    </Grid>
                    {/* Address */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            id="address"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.address}
                            onChange={handleInputChange}
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        {/* Education Information Card */}
        <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
            <CardHeader
                title={<Typography variant="h5">Education Information</Typography>}
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    {educationFields.map((field, index) => (
                        <Grid item xs={12} key={index}>
                            <TextField
                                fullWidth
                                label={field}
                                id={`education-${index}`}
                                variant="outlined"
                                value={formData[`education-${index}`] || ''}
                                onChange={handleEducationFieldChange(index)}
                                error={!!errors[`education-${index}`]}
                                helperText={errors[`education-${index}`]}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" color="secondary" onClick={handleAddField}>
                            Add Education
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        {/* Academic Information Card */}
        <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
            <CardHeader
                title={<Typography variant="h5">Academic Information</Typography>}
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    {/* Student ID */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Student ID"
                            id="studentId"
                            variant="outlined"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            error={!!errors.studentId}
                            helperText={errors.studentId}
                        />
                    </Grid>
                    {/* Enrollment Date */}
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Enrollment Date"
                                value={formData.enrollmentDate}
                                onChange={(date) => handleDateChange('enrollmentDate')(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        error: !!errors.enrollmentDate,
                                        helperText: errors.enrollmentDate
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* Course Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Course Name"
                            id="courseName"
                            variant="outlined"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            error={!!errors.courseName}
                            helperText={errors.courseName}
                        />
                    </Grid>
                    {/* Academic Level */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Academic Level"
                            id="academicLevel"
                            variant="outlined"
                            select
                            value={formData.academicLevel}
                            onChange={handleInputChange}
                            error={!!errors.academicLevel}
                            helperText={errors.academicLevel}
                        >
                            <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                            <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                            <MenuItem value="PhD">PhD</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        {/* Profile Picture Upload */}
        <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
            <CardHeader
                title={<Typography variant="h5">Profile Picture</Typography>}
                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <Divider />
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <CardMedia
                        component="img"
                        image={formData.profilePicture || staticThumbnailUrl}
                        alt="Profile Picture"
                        sx={{ width: 140, height: 140, objectFit: 'cover' }}
                    />
                    <Stack>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload
                            <VisuallyHiddenInput
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange('profilePicture')}
                            />
                        </Button>
                        <Typography variant="caption" color="textSecondary">
                            Accepted formats: JPG, PNG
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </>
);

const AddNewStudents = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        userName: '',
        dateOfBirth: null,
        password: '',
        contactNumber: '',
        email: '',
        emergencyContact: '',
        address: '',
        studentId: '',
        enrollmentDate: null,
        courseName: '',
        academicLevel: '',
        profilePicture: '',
        // Dynamic education fields
    });
    const [errors, setErrors] = useState({});
    const [educationFields, setEducationFields] = useState(['Degree', 'University', 'Year']);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (field) => (date) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleFileChange = (field) => (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, [field]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddField = () => {
        setEducationFields([...educationFields, `Field ${educationFields.length + 1}`]);
    };

    const handleEducationFieldChange = (index) => (event) => {
        const { value } = event.target;
        setFormData({ ...formData, [`education-${index}`]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/add-student', formData);
            // Handle successful submission
        } catch (error) {
            // Handle error
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={0}>
                <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
                <Breadcrumbs separator={IconChevronRight} icon title rightAlign />
                </Box>
            </Paper>
            <Paper sx={{ p: 3, mt: 2 }}>
                <CourseInformationForm
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                    handleFileChange={handleFileChange}
                    educationFields={educationFields}
                    handleAddField={handleAddField}
                    handleEducationFieldChange={handleEducationFieldChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddNewStudents;
