import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import navigationItems from 'path/to/navigationItems';

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
    Avatar,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    TablePagination,
    TableSortLabel,
    Checkbox
} from '@mui/material';

import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone'; // New icon
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone'; // New icon
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { Visibility, VisibilityOff, Search as SearchIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import { isEmpty } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const ListView = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
    const [formData, setFormData] = useState({
        profilePic: 'profilePic',
        firstName: 'firstName',
        lastName: 'lastName',
        expertise: 'lastName',
        subject: 'lastName',
        email: 'lastName',
        mobileNo: 'mobileNo',
        gender: 'gender',
        password: '', // Add password to form data
        country: 'india',
        role: 'teacher'
    });

    //edit//
    const [formDataEdit, setFormDataEdit] = useState({
        profilePic: '',
        firstName: '',
        lastName: '',
        expertise: '',
        subject: '',
        email: '',
        mobileNo: '',
        gender: '',
        password: '', // Add password to form data
        country: 'india',
        role: 'teacher'
    });
    useEffect(()=>{
        
    })
    const [imagePreview, setImagePreview] = useState("https://st4.depositphotos.com/13194036/22902/i/450/depositphotos_229023724-stock-photo-female-teacher-pointing-finger-mathematical.jpg");
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [open, setOpen] = useState(false); // Dialog state
    const [blockReason, setBlockReason] = useState(""); // State for text input
    const [orderDirection, setOrderDirection] = useState('asc'); // Sorting direction
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination
    const [selectedTeachers, setSelectedTeachers] = useState([]); // Selected checkbox teachers
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('firstName')
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State to handle password visibility
    const navigate = useNavigate();

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/teacher/teachers'); // API se teachers ka data lein
            setTeachers(response.data); // Data ko teachers state mein set karein
            setFilteredTeachers(response.data); // Filtered teachers ko bhi set karein
        } catch (error) {
            console.error('Error fetching teachers:', error); // Agar error aaye to console mein dikhayein
        }
    };

    useEffect(() => {
        fetchTeachers(); // Fetch function ko call karein
    }, []);


    // Open dialog handler//block icon
    const handleOpenBlockDialog = () => {
        setOpen(true);
    };

    // Close dialog handler
    const handleCloseBlockDialog = () => {
        setOpen(false);
    };

    // Handle Block function (You can add your block logic here)
    const handleBlock = (teacherId) => {
        console.log("Blocking teacher:", teacherId, "for reason:", blockReason);
        handleCloseBlockDialog();
    };

    // Checkbox selection handler
    const handleSelect = (teacherId) => {
        setSelectedTeachers((prevSelected) =>
            prevSelected.includes(teacherId)
                ? prevSelected.filter((id) => id !== teacherId)
                : [...prevSelected, teacherId]
        );
    };

    // Sorting handler
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Pagination handler
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const navigationItems = [
        { title: 'Home', href: '/' },
        { title: 'Staff', href: '/staff' },
        { title: 'Show Staff', href: '/staff/show-staff' }, // Updated route
    ];




    // Function to sort the data
    const sortData = (data, comparator) => {
        return data.sort(comparator);
    };

    // Comparator function for sorting
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
            : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    };

    const handleGenderChange = (event, newGender) => {
        if (newGender !== null) {
            setFormData({ ...formData, gender: newGender });
        }
    };
    const handleLinkProfile = () => {
        // Logic for handling link profile action
        console.log('Link Profile action triggered');
        // You can add your logic here, such as linking to a profile or performing some operation
    };
    const handleLink = () => {
        // Logic for handling link action
        console.log('Link action triggered');
        // You can add your logic here, such as opening a link or performing some operation
    };

    const handleDelete = async (teacherId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/teacher/${teacherId}`); // Assuming teacherId is available
            console.log('Teacher deleted:', response.data);
            handleCloseDialog();
            fetchTeachers()
            // Optionally refresh the list of teachers or update state after deletion
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
// edit
    const handleOpenDialogEdit = () => {
        setDialogOpenEdit(true);
    };

     const handleCloseDialogEdit = () => {
        setDialogOpenEdit(false);
        setFormData({
            profilePic: '', // Ensure to keep this field for the profile picture
            firstName: '',  // Reset first name
            lastName: '',   // Reset last name
            subject: '',    // Reset subject
            email: '',      // Reset email
            mobileNo: '',  // Reset contact number
            gender: '',     // Reset gender
            password: '',   // Reset password field
            addedBy: ''     // Reset addedBy field
        });
        setImagePreview(null); // Reset image preview when closing the dialog
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFormData({
            profilePic: '', // Ensure to keep this field for the profile picture
            firstName: '',  // Reset first name
            lastName: '',   // Reset last name
            subject: '',    // Reset subject
            email: '',      // Reset email
            mobileNo: '',  // Reset contact number
            gender: '',     // Reset gender
            password: '',   // Reset password field
            addedBy: ''     // Reset addedBy field
        });
        setImagePreview(null); // Reset image preview when closing the dialog
    };


   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("this is file", file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
                setFormData({ ...formData, profilePic: file }); // Store the file object for later use
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };


    const handleSave = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        console.log(formData)
        const data = new FormData();
        data.append('profilePic', formData.profilePic);
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('country', formData.country);
        data.append('role', formData.role);
        data.append('expertise', formData.expertise);
        data.append('subject', formData.subject);
        data.append('email', formData.email);
        data.append('mobileNo', formData.mobileNo);
        data.append('gender', formData.gender);
        data.append('password', formData.password);
        data.append('addedBy', formData.addedBy);
        console.log(data)

        try {
            const response = await axios.post('http://localhost:8080/api/teacher/register', data

            );
            console.log('Teacher added:', response.data);
            handleCloseDialog();
            fetchTeachers()
            // Optionally refresh the list of teachers or update state
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };

    // edit

    const handleSaveEdit = async (teacherId) => {
        e.preventDefault(); // Prevents the default form submission behavior

        console.log(formData)
        const data = new FormData();
        data.append('profilePic', formData.profilePic);
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('country', formData.country);
        data.append('role', formData.role);
        data.append('expertise', formData.expertise);
        data.append('subject', formData.subject);
        data.append('email', formData.email);
        data.append('mobileNo', formData.mobileNo);
        data.append('gender', formData.gender);
        data.append('password', formData.password);
        data.append('addedBy', formData.addedBy);
        console.log(data)

        try {
            const response = await axios.put(`http://localhost:8080/api/teacher/update/${teacherId}`, data

            );
            console.log('Teacher updated:', response.data);
            handleCloseDialogEdit();
            fetchTeachers()
            // Optionally refresh the list of teachers or update state
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const filteredteachers = teachers.filter(
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
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            mb: { xs: 2, sm: 0 },
                        }}
                    >
                        All Teachers
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 2 },
                        }}
                    >
                      
                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={handleOpenDialog}
                            sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                        >
                            Add New Teacher
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
                            sx={{
                                marginTop: { xs: 1, sm: 0 },
                                marginLeft: { xs: 0, sm: 2 },
                                maxWidth: { xs: '100%', sm: 300 },
                            }}
                            onChange={handleSearch}
                        />
                    </Box>
                </Box>
            </Paper>

            {!isEmpty(filteredTeachers) ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'firstName'}
                                        direction={orderBy === 'firstName' ? orderDirection : 'asc'}
                                        onClick={() => handleRequestSort('firstName')}
                                        sx={{ textAlign: 'center' }}
                                    >
                                        Teacher
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'subject'}
                                        direction={orderBy === 'subject' ? orderDirection : 'asc'}
                                        onClick={() => handleRequestSort('subject')}
                                    >
                                        Contact No
                                    </TableSortLabel>
                                </TableCell>


                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Courses</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortData(
                                filteredTeachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                                getComparator(orderDirection, orderBy)
                            ).map((teacher) => (
                                <TableRow key={teacher.teacher_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedTeachers.includes(teacher.teacher_id)}
                                            onChange={() => handleSelect(teacher.teacher_id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="MuiStack-root css-1x4jos1" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="MuiAvatar-root MuiAvatar-circular css-1gutkz">
                                                {console.log("teacher pic", teacher.profilePic)}
                                                {teacher.profilePic ? (
                                                    <img
                                                        alt={`${teacher.firstName} ${teacher.lastName}`}
                                                        src={`http://localhost:8080/uploads/${teacher.profilePic.split('\\').pop()}`}
                                                        className="MuiAvatar-img css-1hy9t21"
                                                        style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} // 
                                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50'; }} // Fallback image
                                                    />
                                                ) : (
                                                    <div style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: '#ccc' }} /> // Placeholder if no image
                                                )}
                                            </div>
                                            <h6 className="MuiTypography-root MuiTypography-subtitle1 css-10qvlxs" style={{
                                                marginLeft: 8, fontSize: '14px'
                                            }}>
                                                {teacher.firstName} {teacher.lastName} {/* Display full name */}
                                            </h6>
                                        </div>
                                    </TableCell>
                                    <TableCell>{teacher.mobileNo}</TableCell>
                                    {/* <TableCell>
                                        {teacher.profilePic ? (
                                            <img src={teacher.profilePic} alt="Profile" width="50" height="50" />
                                        ) : (
                                            <Typography>No Image</Typography>
                                        )}
                                    </TableCell> */}

                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{teacher.gender}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{teacher.enrolledCourses || 'N/A'}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            {/* Active Chip with custom text and background color */}
                                            <Chip
                                                label="Active"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#b9f6ca99',  // Apply background color
                                                    color: '#0oc853',              // Apply text color
                                                }}
                                            />

                                            {/* Rejected Chip (Red) */}
                                            {/* <Chip
                                                label="Rejected"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '##d84315',   // Standard red background
                                                    color: '#d84315',                // White text
                                                }}
                                            /> */}

                                            {/* Pending Chip (Yellow) */}
                                            {/* <Chip
                                                label="Pending"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#fff8e1',   // Yellow background
                                                    color: '#ffc107',                // Black text
                                                }}
                                            /> */}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}> {/* Reduced gap for closer spacing */}
                                            {/* <IconButton
                                                aria-label="chat"
                                                size="small" 
                                                sx={{ color: '#ABABF8', border: '#45A6F3' }}
                                                onClick={() => handleChat(teacher.teacher_id)} 
                                            >
                                                <ChatBubbleTwoToneIcon sx={{ fontSize: 18 }} />
                                            </IconButton> */}

                                            {/* block icon */}

                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                                {/* Block Icon */}
                                                <IconButton
                                                    aria-label="block"
                                                    size="small"
                                                    sx={{ color: 'red' }}
                                                    onClick={handleOpenBlockDialog} // Open the block dialog
                                                >
                                                    <BlockTwoToneIcon sx={{ fontSize: 18 }} />
                                                </IconButton>

                                                {/* Dialog for blocking */}
                                                <Dialog
                                                    open={open}
                                                    onClose={handleCloseBlockDialog}
                                                    BackdropProps={{
                                                        sx: {
                                                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white backdrop
                                                        }
                                                    }}
                                                    PaperProps={{
                                                        sx: {
                                                            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly opaque white background for the dialog content
                                                            backdropFilter: 'blur(8px)', // Optional blur effect
                                                            color: 'black', // Ensure text is visible (black text on light background)
                                                            boxShadow: 3, // Adding some shadow to make the dialog box pop up clearly
                                                        },
                                                    }}
                                                >
                                                    <DialogTitle>Block Teacher</DialogTitle>
                                                    <DialogContent>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            label="Reason for Blocking"
                                                            type="text"
                                                            fullWidth
                                                            multiline // Make it a textarea
                                                            rows={4} // Increase the number of rows
                                                            variant="outlined"
                                                            value={blockReason}
                                                            onChange={(e) => setBlockReason(e.target.value)} // Handle text input change
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleCloseBlockDialog} color="primary"
                                                            sx={{
                                                                mr: 1,
                                                                backgroundColor: '#90caf9', // Set the background to purple
                                                                color: 'white', // Set text color to white for contrast
                                                                height: '30px', // Adjusts height
                                                                minWidth: '100px', // Adjusts width as needed
                                                                '&:hover': {
                                                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                                                },
                                                            }}>
                                                            Cancel 
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleBlock(teacher.teacher_id)} // Perform block action
                                                            color="secondary"
                                                            sx={{
                                                                mr: 1,
                                                                backgroundColor: '#90caf9', // Set the background to purple
                                                                color: 'white', // Set text color to white for contrast
                                                                height: '30px', // Adjusts height
                                                                minWidth: '100px', // Adjusts width as needed
                                                                '&:hover': {
                                                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                                                },
                                                            }}
                                                        >
                                                            Block
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Box>
                                            {/* Edit Icon */}
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                sx={{ color: '#1976d2' }}
                                                onClick={handleOpenDialogEdit}
                                            // onClick={() => handleEdit(teacher.teacher_id)} // Add your edit functionality here
                                            >
                                                <EditIcon sx={{ fontSize: 18 }} /> {/* Reduced font size */}
                                            </IconButton>

                                            {/* Delete Icon */}
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                sx={{ color: '#f44336' }}
                                                onClick={() => handleDelete(teacher._id)} // Add your delete functionality here
                                            >
                                                <DeleteIcon sx={{ fontSize: 18 }} /> {/* Reduced font size */}
                                            </IconButton>

                                            {/* Unblock Icon */}
                                            <IconButton
                                                aria-label="unblock"
                                                size="small"
                                                sx={{ color: 'green' }}
                                                onClick={() => handleUnblock(teacher.teacher_id)} // Add your unblock functionality here
                                            >
                                                <BlockTwoToneIcon sx={{ fontSize: 18, transform: 'rotate(45deg)' }} /> {/* Reduced size and rotation for unblock */}
                                            </IconButton>
                                        </Box>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filteredTeachers.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={8}>
                                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
                                        No teacher found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            )}


            {/* Dialog for adding new teacher */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogContent >
                    <Box sx={{
                        m: 0,
                        p: 2,
                        backgroundColor: '#F5F5F5', // Header color
                        height: '100px', // Increased header height
                        minWidth: '100%',
                        borderRadius: '10px'

                    }}>
                        <Box >
                            <Avatar
                                src={imagePreview} // Display the uploaded image
                                alt="Profile Picture"
                                sx={{ width: 100, height: 100, borderRadius: '50%', marginRight: '16px', color: '#f0f0f0' }}
                            />

                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                        <Box>
                            <Typography variant="h6">Amélie Laurent</Typography>
                            <Typography variant="body2" color="text.secondary">amelie@untitledui.com</Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained" // Change to filled button
                                size="small" // Keeps the button small
                                sx={{
                                    mr: 1,
                                    backgroundColor: '#452780', // Set the background to purple
                                    color: 'white', // Set text color to white for contrast
                                    height: '30px', // Adjusts height
                                    minWidth: '100px', // Adjusts width as needed
                                    '&:hover': {
                                        backgroundColor: '#6A0FAD', // Darker purple on hover
                                    },
                                }}
                            >
                                Copy link
                            </Button>
                            <Button
                                variant="contained" // Change to filled button
                                size="small" // Keeps the button small
                                sx={{
                                    backgroundColor: '#452780', // Set the background to purple
                                    color: 'white', // Set text color to white for contrast
                                    height: '30px', // Adjusts height
                                    minWidth: '100px', // Adjusts width as needed
                                    '&:hover': {
                                        backgroundColor: '#6A0FAD', // Darker purple on hover
                                    },
                                }}
                            >
                                View profile
                            </Button>

                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        </Grid>

                        <Grid item xs={12} sm={6}>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teacher Name"
                                variant="outlined"
                                name="name"
                                fullWidth
                                
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                // onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc', // Border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5', // Border color when focused
                                        },
                                    },
                                    '& label': {
                                        color: 'black', // Label color
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5', // Label color when focused
                                    },
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                fullWidth
                               
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc', // Border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5', // Border color when focused
                                        },
                                    },
                                    '& label': {
                                        color: 'black', // Label color
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5', // Label color when focused
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contact No."
                                variant="outlined"
                                name="contactNo"
                                fullWidth
                               
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                               
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                // onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth // Ensure it uses the full width of the grid item
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Expertise"
                                variant="outlined"
                                name="expertise"
                                fullWidth
                               
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Subject"
                                variant="outlined"
                                name="subject"
                                fullWidth
                             
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset" fullWidth sx={{ marginBottom: '16px' }}>
                                <Typography component="legend" color="black">Gender</Typography>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    
                                    // onChange={handleInputChange}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                            <Box>
                                <Avatar
                                    src={imagePreview} // Display the uploaded image
                                    alt="Profile Picture"
                                    sx={{ width: 50, height: 50, borderRadius: '50%', marginRight: '16px', color: '#f0f0f0' }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{

                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    height: '36px', // Set the desired height here
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0' // Slight gray on hover 
                                    },
                                    padding: '0 16px', // Adjust horizontal padding if needed
                                }}
                            >
                                Upload Profile Picture
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#d32f2f', // Darker red on hover
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#f0f0f0', // Light gray when disabled
                            },
                            textTransform: 'none', // Keep the text case as written
                        }}
                        onClick={handleDelete} // Add the delete function here
                    >
                        Delete
                    </Button>



                    <div>
                        <Button
                            onClick={handleCloseDialog}
                            variant="outlined" // Make the Cancel button outlined
                            sx={{
                                mr: 1,
                                backgroundColor: '#90caf9', // Set the background to purple
                                color: 'white', // Set text color to white for contrast
                                height: '30px', // Adjusts height
                                minWidth: '100px', // Adjusts width as needed
                                '&:hover': {
                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}

                            sx={{
                                mr: 1,
                                backgroundColor: '#90caf9', // Set the background to purple
                                color: 'white', // Set text color to white for contrast
                                height: '30px', // Adjusts height
                                minWidth: '100px', // Adjusts width as needed
                                '&:hover': {
                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                },
                            }}
                        >
                            Save
                        </Button>


                    </div>

                </DialogActions>
            </Dialog>

               {/* edit */}

            <Dialog open={dialogOpenEdit} onClose={handleCloseDialogEdit}>
                <DialogContent >
                    <Box sx={{
                        m: 0,
                        p: 2,
                        backgroundColor: '#F5F5F5', // Header color
                        height: '100px', // Increased header height
                        minWidth: '100%',
                        borderRadius: '10px'

                    }}>
                        <Box >
                            <Avatar
                                src={imagePreview} // Display the uploaded image
                                alt="Profile Picture"
                                sx={{ width: 100, height: 100, borderRadius: '50%', marginRight: '16px', color: '#f0f0f0' }}
                            />

                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                        <Box>
                            <Typography variant="h6">Amélie Laurent</Typography>
                            <Typography variant="body2" color="text.secondary">amelie@untitledui.com</Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained" // Change to filled button
                                size="small" // Keeps the button small
                                sx={{
                                    mr: 1,
                                    backgroundColor: '#452780', // Set the background to purple
                                    color: 'white', // Set text color to white for contrast
                                    height: '30px', // Adjusts height
                                    minWidth: '100px', // Adjusts width as needed
                                    '&:hover': {
                                        backgroundColor: '#6A0FAD', // Darker purple on hover
                                    },
                                }}
                            >
                                Copy link
                            </Button>
                            <Button
                                variant="contained" // Change to filled button
                                size="small" // Keeps the button small
                                sx={{
                                    backgroundColor: '#452780', // Set the background to purple
                                    color: 'white', // Set text color to white for contrast
                                    height: '30px', // Adjusts height
                                    minWidth: '100px', // Adjusts width as needed
                                    '&:hover': {
                                        backgroundColor: '#6A0FAD', // Darker purple on hover
                                    },
                                }}
                            >
                                View profile
                            </Button>

                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        </Grid>

                        <Grid item xs={12} sm={6}>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teacher Name"
                                variant="outlined"
                                name="name"
                                fullWidth
                                value={formData.name}
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                // onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc', // Border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5', // Border color when focused
                                        },
                                    },
                                    '& label': {
                                        color: 'black', // Label color
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5', // Label color when focused
                                    },
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                value={formDataEdit.email}
                onChange={(e) => setFormDataEdit({ ...formDataEdit, email: e.target.value })}
                sx={{
                    marginBottom: '16px',
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        color: 'black',
                        '& fieldset': {
                            borderColor: '#ccc', // Border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#aaa', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3f51b5', // Border color when focused
                        },
                    },
                    '& label': {
                        color: 'black', // Label color
                    },
                    '& label.Mui-focused': {
                        color: '#3f51b5', // Label color when focused
                    },
                }}
            />
        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contact No."
                                variant="outlined"
                                name="contactNo"
                                fullWidth
                                value={formData.contactNo}
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                // onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth // Ensure it uses the full width of the grid item
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Expertise"
                                variant="outlined"
                                name="expertise"
                                fullWidth
                                value={formData.expertise}
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Subject"
                                variant="outlined"
                                name="subject"
                                fullWidth
                                value={formData.subject}
                                // onChange={handleInputChange}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                sx={{
                                    marginBottom: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#aaa',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3f51b5',
                                        },
                                    },
                                    '& label': {
                                        color: 'black',
                                    },
                                    '& label.Mui-focused': {
                                        color: '#3f51b5',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset" fullWidth sx={{ marginBottom: '16px' }}>
                                <Typography component="legend" color="black">Gender</Typography>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={formData.gender}
                                    // onChange={handleInputChange}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                            <Box>
                                <Avatar
                                    src={imagePreview} // Display the uploaded image
                                    alt="Profile Picture"
                                    sx={{ width: 50, height: 50, borderRadius: '50%', marginRight: '16px', color: '#f0f0f0' }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{

                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    height: '36px', // Set the desired height here
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0' // Slight gray on hover 
                                    },
                                    padding: '0 16px', // Adjust horizontal padding if needed
                                }}
                            >
                                Upload Profie Picture
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#d32f2f', // Darker red on hover
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#f0f0f0', // Light gray when disabled
                            },
                            textTransform: 'none', // Keep the text case as written
                        }}
                        onClick={handleDelete} // Add the delete function here
                    >
                        Delete 
                    </Button>



                    <div>
                        <Button
                            onClick={handleCloseDialogEdit}
                            variant="outlined" // Make the Cancel button outlined
                            sx={{
                                mr: 1,
                                backgroundColor: '#90caf9', // Set the background to purple
                                color: 'white', // Set text color to white for contrast
                                height: '30px', // Adjusts height
                                minWidth: '100px', // Adjusts width as needed
                                '&:hover': {
                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveEdit}

                            sx={{
                                mr: 1,
                                backgroundColor: '#90caf9', // Set the background to purple
                                color: 'white', // Set text color to white for contrast
                                height: '30px', // Adjusts height
                                minWidth: '100px', // Adjusts width as needed
                                '&:hover': {
                                    backgroundColor: '#6A0FAD', // Darker purple on hover
                                },
                            }}
                        >
                            Save  
                        </Button>


                    </div>

                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListView;




