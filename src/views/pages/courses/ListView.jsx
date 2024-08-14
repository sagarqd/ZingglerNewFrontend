import React, { useState, useEffect, useRef } from 'react';
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
  Avatar,
  AvatarGroup,
  OutlinedInput,
  InputAdornment,
  ButtonGroup,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList
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
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { isEmpty } from 'lodash';
import moment from 'moment';

const options = [
  { text: 'View Course', icon: <VisibilityIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} fontSize="small" /> },
  { text: 'Edit Course', icon: <EditIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} fontSize="small" /> },
  { text: 'Delete Course', icon: <DeleteIcon sx={{ marginRight: 1, verticalAlign: 'middle' }} fontSize="small" /> }
];

const CourseCard = ({ course, handleClick }) => {
  const { general, createdAt, updatedAt, teacherName, thumbnail, numStudents, avatar } = course;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
   const navigate=useNavigate();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (index === 1) handleEdit();
    if (index === 2) handleDelete();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleEdit = () => {
    // Handle edit action
    handleCloseMenu();
  };

  const handleDelete = () => {
    // Handle delete action
    handleCloseMenu();
  };

  // Validate dates
  const createdAtValid = moment(createdAt).isValid() ? moment(createdAt).fromNow() : 'Invalid date';
  const updatedAtValid = moment(updatedAt).isValid() ? moment(updatedAt).fromNow() : 'Invalid date';

  return (
    <Card sx={{ display: 'flex', width: '100%', padding: 2, marginBottom: 4, marginTop: 4, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
            <CardMedia
              component="img"
              sx={{
                width: { xs: '100%', md: 140 },
                height: { xs: '100%', md: 140 },
                position: 'relative',
                borderRadius: 2,
                marginBottom: { xs: 2, md: 0 }
              }}
              image={course.description.courseThumbnail}
              alt={course.title}
            />

            <Box margin={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography
                component="div"
                variant="h5"
                sx={{ fontFamily: 'Poppins, sans-serif', width: { xs: '100%', md: '300px', sm: '100%' } }}
              >
                {course.general.courseInformation.courseFullName}
                <Box marginTop={3} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    marginRight={3}
                    component="div"
                    sx={{ fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' }}
                  >
                    {course.general.courseInformation.teacherName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    sx={{ fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' }}
                  >
                    {updatedAtValid}
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, marginTop: { xs: 2, md: 0 } }}>
            <AvatarGroup max={4} src={avatar} alt={teacherName} sx={{ marginRight: 2, marginBottom: { xs: 2, md: 0 } }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }}>
              <span style={{ fontWeight: 'bold' }}>{numStudents}</span>+ Enrolled
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 2,
              marginTop: { xs: 2, md: 0 }
            }}
          >
            <ButtonGroup
              variant="contained"
              color="secondary"
              ref={anchorRef}
              aria-label="split button"
              sx={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
              }}
            >
              <Button onClick={handleClick}>
                {options[selectedIndex].icon}
                {options[selectedIndex].text}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select action"
                aria-haspopup="menu"
                onClick={handleToggle}
                sx={{
                  boxShadow: 3 // Soft shadow
                }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option.text}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option.icon}
                            {option.text}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

const ListView = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState({ title: '', description: '', thumbnail: '', videoUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        console.log('Fetching courses...');
        const response = await axios.get('http://localhost:8080/api/courses/'); // Replace with your API endpoint

        // Filter out courses with 'draft' status
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => {
    setOpen(false); // Close the modal or form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the form and add a new course
    console.log('Form submitted with values:', formValues);
    // Reset form and close modal
    setFormValues({ title: '', description: '', thumbnail: '', videoUrl: '' });
    handleClose();
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.general &&
      course.general.advanceSettings &&
      course.general.advanceSettings.downloadCourse &&
      course.general.advanceSettings.downloadCourse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        </Box>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: 'transparent', marginBottom: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: { xs: 2, sm: 0 } // Margin bottom for mobile
            }}
          >
            All Courses
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
              gap: { xs: 1, sm: 2 } // Adjust gap for small screens
            }}
          >
            <Button size="medium" variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ flexShrink: 0, whiteSpace: 'nowrap' }} onClick={handleAddCourseClick}>
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
              sx={{ marginTop: { xs: 1, sm: 0 }, marginLeft: { xs: 0, sm: 2 }, maxWidth: { xs: '100%', sm: 300 } }} // Adjust margin and width for mobile
              onChange={(e) => setSearchTerm(e.target.value)}
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
        filteredCourses.map((course) => <CourseCard key={course._id} course={course} />)
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
          No courses found
        </Typography>
      )}
    </Container>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 }, // Adjust width for mobile
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

export default ListView;
