import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
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
  OutlinedInput,
  InputAdornment,
  Badge,
  Avatar,
  AvatarGroup
} from '@mui/material';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SortIcon from '@mui/icons-material/Sort';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';

const GridView = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [formValues, setFormValues] = useState({ title: '', description: '', thumbnail: '', videoUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false); // Define loading and error state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        console.log('Fetching courses...');
        const response = await axios.get('http://localhost:8080/api/courses/');
        // Filter out courses with status 'draft'
        const validCourses = response.data.filter((course) => course.status !== 'draft');

        setCourses(validCourses);
        console.log('Courses fetched:', validCourses);
      } catch (err) {
        setError(err);
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourseClick = () => {
    navigate('/courses/new-course')
    setOpen(true);
    setFormValues({ title: '', description: '', thumbnail: '', videoUrl: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode && selectedCourse) {
        await axios.put(`http://localhost:8080/api/courses/${selectedCourse._id}`, formValues);
        setCourses(courses.map(course => course._id === selectedCourse._id ? { ...course, ...formValues } : course));
      } else {
        const response = await axios.post('http://localhost:8080/api/courses', formValues);
        setCourses([...courses, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const filteredCourses = (courses || []).filter(
    (course) =>
      course.status !== 'draft' && course.general?.advanceSettings?.downloadCourse?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

 const handleEditClick = (course) => {
    setEditMode(true);
    setSelectedCourse(course);
    setFormValues({
      title: course.title || '',
      description: course.description || '',
      thumbnail: course.thumbnail || '',
      videoUrl: course.videoUrl || ''
    });
    setOpen(true);
  };

  const handleDeleteClick = async () => {
    if (!selectedCourse) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${selectedCourse._id}`);
      setCourses(courses.filter(course => course._id !== selectedCourse._id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
    handleCloseMenu();
  };


  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          <Breadcrumbs separator={IconChevronRight} icon title rightAlign />
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
            All Courses
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
              Add New Course
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
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setViewMode('grid')}>
                <ViewModuleIcon />
              </IconButton>
              <IconButton onClick={() => setViewMode('list')}>
                <SortIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => {
          // Extract and validate `updatedAt` field
          const updatedAt = course.updatedAt; // Assuming `updatedAt` is a direct field in course
          const formattedUpdatedAt = moment(updatedAt).isValid() ? moment(updatedAt).fromNow() : 'Invalid date';
          const numStudents = course.numStudents || 0; // Set default value if numStudents is not defined

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
              <Card>
                <Box position="relative">
                  <CardMedia component="img" height="200" image={course.description.courseThumbnail} alt={course.title} />
                  <Box
                    position="absolute"
                    top={12}
                    left={20}
                    right={20}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="4px"
                    padding="2px 4px"
                  >
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{
                        padding: '6px 16px',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '4px'
                      }}
                    >
                      3 Hours
                    </Typography>

                    <IconButton onClick={(event) => handleClick(event, course)} sx={{ color: 'secondary' }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        sx: {
                          width: '200px',
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <MenuItem onClick={handleEditClick}>
                        <EditIcon sx={{ marginRight: 1 }} />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteClick}>
                        <DeleteIcon sx={{ marginRight: 1 }} />
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
                <Box position="relative" display="flex" alignItems="center" justifyContent="center" mt={-4} mb={1} sx={{ height: 56 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<CheckCircleIcon sx={{ fontSize: 14, color: '#fff' }} />}
                    sx={{
                      position: 'absolute',
                      right: 40,
                      bottom: 0,
                      '& .MuiBadge-badge': {
                        padding: '0',
                        border: '1px solid #fff',
                        backgroundColor: '#44b700',
                        borderRadius: '50%'
                      }
                    }}
                  >
                    <Avatar alt="User 1" src="/assets/profile-CXNf4CWk.png" sx={{ width: 56, height: 56 }} />
                  </Badge>
                </Box>

                <CardContent sx={{ paddingTop: 0 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: '14px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {course.general.courseInformation.teacherName}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '16px',
                      fontFamily: 'Poppins, sans-serif',
                      mt: 1
                    }}
                  >
                    {course.general.courseInformation.courseFullName}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1, fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
                      <span style={{ fontWeight: 'bold' }}>{numStudents}</span>+ Enrolled
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {formattedUpdatedAt}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent={'space-between'} sx={{ mt: 2 }}>
                    <AvatarGroup
                      max={4}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 24,
                          height: 24,
                          fontSize: '0.75rem'
                        }
                      }}
                    >
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                    <Button variant="contained" color="secondary" href={course.videoUrl} target="_blank">
                      View Course
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Add New Course
            </Typography>
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                variant="outlined"
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                variant="outlined"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Thumbnail URL"
                margin="normal"
                variant="outlined"
                name="thumbnail"
                value={formValues.thumbnail}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Video URL"
                margin="normal"
                variant="outlined"
                name="videoUrl"
                value={formValues.videoUrl}
                onChange={handleChange}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default GridView;
