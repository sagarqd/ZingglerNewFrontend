// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//     Container,
//     Paper,
//     Box,
//     Typography,
//     Button,
//     OutlinedInput,
//     InputAdornment,
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Avatar
// } from '@mui/material';
// import axios from 'axios';
// import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
// import IconChevronRight from '@mui/icons-material/ChevronRight';
// import SearchIcon from '@mui/icons-material/Search';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ViewModuleIcon from '@mui/icons-material/ViewModule';
// import SortIcon from '@mui/icons-material/Sort';
// import { isEmpty } from 'lodash';
// import AddNewTeacher from './AddNewTeacher';
// import { Fab } from '@mui/material';


// const ListView = () => {
//     const [open, setOpen] = useState(false);
//     const [courses, setCourses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const userId = localStorage.getItem('userId'); // Get user ID from local storage
//             if (!userId) return; // Ensure userId is available before making the request
//             setLoading(true);
//             try {
//                 console.log('Fetching courses...');
//                 const response = await axios.get(`http://localhost:8080/api/courses/`, {
//                     userId: userId
//                 });

//                 // Filter out courses with 'draft' status
//                 const validCourses = response.data.filter((course) => course.status !== 'draft');

//                 setCourses(validCourses);
//                 console.log('Courses fetched:', validCourses);
//             } catch (err) {
//                 setError(err);
//                 console.error('Error fetching courses:', err);
//             } finally {
//                 setLoading(false); // Always set loading to false after fetching
//             }
//         };

//         fetchCourses();
//     }, []);

//     const handleAddCourseClick = () => {
//         navigate('/teachers/add-new-teacher');
//         setOpen(true);
//     };

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredCourses = courses.filter(
//         (course) =>
//             course.general &&
//             course.general.advanceSettings &&
//             course.general.advanceSettings.downloadCourse &&
//             course.general.advanceSettings.downloadCourse.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <Container maxWidth="xl">
//             <Paper elevation={0}>
//                 <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
//                     <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
//                 </Box>
//             </Paper>
//             <Paper elevation={0} sx={{ backgroundColor: 'transparent', marginBottom: 3 }}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}
//                 >
//                     <Typography
//                         variant="h2"
//                         sx={{
//                             mb: { xs: 2, sm: 0 } // Margin bottom for mobile
//                         }}
//                     >
//                         All Teachers
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
//                             gap: { xs: 1, sm: 2 } // Adjust gap for small screens
//                         }}
//                     >
//                         <Button
//                             size="medium"
//                             variant="outlined"
//                             startIcon={<AddCircleOutlineIcon />}
//                             sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
//                             onClick={handleAddCourseClick}
//                         >
//                             Add New Teacher
//                         </Button>

//                         <OutlinedInput
//                             fullWidth
//                             variant="outlined"
//                             placeholder="Search"
//                             size="small"
//                             startAdornment={
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             }
//                             sx={{ marginTop: { xs: 1, sm: 0 }, marginLeft: { xs: 0, sm: 2 }, maxWidth: { xs: '100%', sm: 300 } }} // Adjust margin and width for mobile
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                             <IconButton>
//                                 <ViewModuleIcon />
//                             </IconButton>
//                             <IconButton>
//                                 <SortIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Paper>

//             {!isEmpty(filteredCourses) ? (
//                 filteredCourses.map((course) => (
//                     <CourseCard key={course._id} course={course} setLoading={setLoading} setCourses={setCourses} courses={courses} />
//                 ))
//             ) : (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Profile</TableCell>
//                                 <TableCell>Teacher Name</TableCell>
//                                 <TableCell>Subject</TableCell>
//                                 <TableCell>Expertise</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell>Gender</TableCell>
//                                 <TableCell>Joining Date</TableCell>
//                                 <TableCell>Added By</TableCell>
//                                 <TableCell>Enrolled Courses</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             <TableRow>
//                                 <TableCell colSpan={5}>
//                                     <Typography variant="h6" sx={{ textAlign: 'right', marginTop: 4, ml: 'auto' }}>
//                                         No teacher found
//                                     </Typography>
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Container>
//     );
// };

// export default ListView;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Table,
    TableBody,
    TableCell,
    ToggleButton,
    ToggleButtonGroup,
    FormGroup,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Avatar,
    Grid
} from '@mui/material';

import axios from 'axios';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SortIcon from '@mui/icons-material/Sort';
import { isEmpty } from 'lodash';

const ListView = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        profilePic: '',
        name: '',
        expertise: '',
        subject: '',
        email: '',
        contactNo: '',
        gender: '',
        joiningDate: '',
        addedBy: ''
    });
    const [imagePreview, setImagePreview] = useState(null); // Initialize image preview state
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/courses/`, {
                    userId: userId
                });
                const validCourses = response.data.filter((course) => course.status !== 'draft');
                setCourses(validCourses);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

     const handleGenderChange = (event, newGender) => {
        if (newGender !== null) {
            setFormData({ ...formData, gender: newGender });
        }
    };


    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFormData({
            profilePic: '',
            name: '',
            expertise: '',
            subject: '',
            email: '',
            contactNo: '',
            gender: '',
            joiningDate: '',
            addedBy: ''
        });
        setImagePreview(null); // Reset image preview when closing the dialog
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
                setFormData({ ...formData, profilePic: file }); // Store the file object for later use
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleSave = async () => {
        const formDataWithFile = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataWithFile.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:8080/api/teachers', formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Teacher added:', response.data);
            handleCloseDialog();
            // Optionally refresh the list of teachers or update state
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };

    const handleAddCourseClick = () => {
        navigate('/teachers/add-new-teacher');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCourses = courses.filter(
        (course) =>
            course.general &&
            course.general.advanceSettings &&
            course.general.advanceSettings.downloadCourse &&
            course.general.advanceSettings.downloadCourse.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container maxWidth="xl">
            <Paper elevation={0}>
                <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
                    <Breadcrumbs separator={IconChevronRight} navigation={[]} icon title rightAlign />
                </Box>
            </Paper>
            <Paper elevation={0} sx={{ backgroundColor: 'transparent', marginBottom: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            mb: { xs: 2, sm: 0 }
                        }}
                    >
                        All Teachers
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 2 }
                        }}
                    >
                        <Button
                            size="medium"
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                            onClick={handleAddCourseClick}
                        >
                            Add New Teacher
                        </Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={handleOpenDialog}
                            sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                        >
                            Add New Teacher (Popup)
                        </Button>
                        <OutlinedInput
                            fullWidth
                            variant="outlined"
                            placeholder="Search"
                            size="small"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            sx={{ marginTop: { xs: 1, sm: 0 }, marginLeft: { xs: 0, sm: 2 }, maxWidth: { xs: '100%', sm: 300 } }}
                            onChange={handleSearch}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton>
                                <ViewModuleIcon />
                            </IconButton>
                            <IconButton>
                                <SortIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {!isEmpty(filteredCourses) ? (
                filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} setLoading={setLoading} setCourses={setCourses} courses={courses} />
                ))
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile</TableCell>
                                <TableCell>Teacher Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Expertise</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Joining Date</TableCell>
                                <TableCell>Added By</TableCell>
                                <TableCell>Enrolled Courses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography variant="h6" sx={{ textAlign: 'right', marginTop: 4, ml: 'auto' }}>
                                        No teacher found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for adding new teacher */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            <Avatar
                                src={imagePreview} // Display the uploaded image
                                alt="Profile Picture"
                                style={{ width: 100, height: 100, borderRadius: '50%', marginRight: '16px' }}
                            />
                        </div>
                        <Button variant="contained" component="label" style={{ marginBottom: '16px' }}>
                            Upload Picture
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange} // Call the function on file selection
                            />
                        </Button>
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                style: { textAlign: 'left', color: '#2196f3' },
                            }}
                            placeholder="Enter teacher's name"
                        />
                        <TextField
                            name="expertise"
                            label="Expertise"
                            fullWidth
                            margin="normal"
                            value={formData.expertise}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                style: { textAlign: 'left', color: '#2196f3' },
                            }}
                            placeholder="Enter expertise"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                style: { textAlign: 'left', color: '#2196f3' },
                            }}
                            placeholder="Enter email"
                        />
                        <TextField
                            name="contactNo"
                            label="Contact Number"
                            fullWidth
                            margin="normal"
                            value={formData.contactNo}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                style: { textAlign: 'left', color: '#2196f3' },
                            }}
                            placeholder="Enter contact number"
                        />
                        <FormGroup>
                            <ToggleButtonGroup
                                value={formData.gender}
                                exclusive
                                onChange={handleGenderChange}
                                aria-label="Gender"
                                style={{ marginTop: '16px' }}
                            >
                                <ToggleButton value="male" aria-label="Male" style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                                    Male
                                </ToggleButton>
                                <ToggleButton value="female" aria-label="Female" style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                                    Female
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </FormGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>

        </Container>
    );
};

export default ListView;
