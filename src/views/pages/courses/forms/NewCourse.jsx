import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 


import {
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Divider,
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
  FormHelperText
} from '@mui/material';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Home, Description, FormatListBulleted, ColorLens, CheckCircle, Group } from '@mui/icons-material';

import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import UploadIcon from '@mui/icons-material/Upload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeIcon from '@mui/icons-material/Home'; // Icon for Item One
import InfoIcon from '@mui/icons-material/Info'; // Icon for Item Two
import SettingsIcon from '@mui/icons-material/Settings'; // Icon for Item Three
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
import { padding } from '@mui/system';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const staticThumbnailUrl = 'https://via.placeholder.com/140'; // Replace with actual thumbnail URL
const staticVideoUrl = 'https://via.placeholder.com/560x140';

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ list: 'ordered' }, { list: 'bullet' }], // Ensure 'list' module is included
    ['clean']
  ],
};

const editorFormats = [
  'header', 'bold', 'italic', 'underline', 'link', 'list', 'bullet', 'clean'
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


// Custom Tab Panel
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const CourseInformationForm = () => (
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
                label="Course Full Name"
                id="fullname"
                variant="outlined"
                defaultValue="Enter Course Full Name"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Short Name"
                id="shortname"
                variant="outlined"
                defaultValue="Enter Course Short Name"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course ID Number"
                id="name"
                variant="outlined"
                defaultValue="Enter Course ID Number"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Card variant="outlined" sx={{ width: '100%', mt: 4 }}>
      <CardHeader
        title={<Typography variant="h5">Advance Settings</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Download Course"
                id="downloadcourse"
                variant="outlined"
                select
                defaultValue="No"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Course Visibility"
                id="coursevisibility"
                variant="outlined"
                select
                defaultValue="show"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="show">Show</MenuItem>
                <MenuItem value="hide">Hide</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Select Course"
                id="selectcourse"
                variant="outlined"
                select
                defaultValue="Web Development"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                <MenuItem value="Application Development">Application Development</MenuItem>
                <MenuItem value="Graphic Design">Graphic Design</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
      <Button variant="outlined" color="error" sx={{ px: 4 }}>
        Clear
      </Button>
      <Button variant="contained" color="secondary" sx={{ px: 4 }}>
        Next
      </Button>
    </Stack>
  </>
);

const DescriptionInformationForm = () => {
  const [description, setDescription] = useState('');
  const quillRef = useRef(null); // Ref for Quill container

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
        modules: editorModules,
        formats: editorFormats
      });

      quill.on('text-change', () => {
        setDescription(quill.root.innerHTML);
      });
    }
  }, []);

  return (
    <>
    <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardHeader
            title={<Typography variant="h5">Course Description</Typography>}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          />
          <Divider />
          <CardContent>
            <div ref={quillRef} style={{ height: 150 }}></div>
            {/* Optionally, display the description for debugging */}
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </CardContent>
        </Box>
      </Card>
      <Card variant="outlined" sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardHeader
            title={<Typography variant="h5">Course Information</Typography>}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex', width: '100%', padding: 2, marginBottom: 4, marginTop: 4, backgroundColor: '#f4f4f8', flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: 140 }, height: { xs: 'auto', md: 140 }, borderRadius: 2, marginBottom: { xs: 2, md: 0 } }}
                    image={staticThumbnailUrl}
                    alt="Course Thumbnail"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginLeft: { md: 3 } }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
                      Course thumbnail image. Accepted formats: JPG, PNG.
                    </Typography>
                    <Stack sx={{ mt: 2 }}>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        color="secondary"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ maxWidth: '170px' }}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex', width: '100%', padding: 2, marginBottom: 4, marginTop: 4, backgroundColor: '#f4f4f8', flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: 140 }, height: { xs: 'auto', md: 140 }, borderRadius: 2, marginBottom: { xs: 2, md: 0 } }}
                    image={staticThumbnailUrl}
                    alt="Course Thumbnail"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginLeft: { md: 3 } }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
                    Course video. Accepted formats: MP4, AVI.
                    </Typography>
                    <Stack sx={{ mt: 2 }}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      color="secondary"
                      tabIndex={-1}
                      startIcon={<UploadIcon />}
                      sx={{ maxWidth: '170px' }}
                    >
                      Upload Video
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
              
            </Grid>
          </CardContent>
        </Box>
      </Card>

      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="error" sx={{ px: 4 }}>
          Clear
        </Button>
        <Button variant="contained" color="secondary" sx={{ px: 4 }}>
          Next
        </Button>
      </Stack>
    </>
  );
};

const CourseFormatForm = ({ setTabValue }) => {
  const handleNext = () => {
    setTabValue((prevValue) => prevValue + 1);
  };

  const handleClear = () => {
    console.log("Clear button clicked. Implement clear functionality.");
  };
  return(
  <>

    <Card variant="outlined" sx={{ width: '100%'}}>
      <CardHeader
        title={<Typography variant="h5">Course Format</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hidden Section"
                id="hiddenSection"
                variant="outlined"
                select
                defaultValue="No"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Hidden sections are not shown as not available</MenuItem>
                <MenuItem value="No">Hidden sections are completely invisble</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Layout"
                id="courselayLayout"
                variant="outlined"
                select
                defaultValue="show"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="show">Show all sections on one page</MenuItem>
                <MenuItem value="hide">Show one section per page</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Section"
                id="courseSection"
                variant="outlined"
                select
                defaultValue="Web Development"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Web Development">Custom Section</MenuItem>
                <MenuItem value="Digital Marketing">Weekly Section</MenuItem>
                <MenuItem value="Application Development">Single Activity</MenuItem>
                <MenuItem value="Graphic Design">Social</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Section"
                id="noOfSection"
                variant="outlined"
                defaultValue="Enter Number of Section"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
      <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handleClear}>
        Clear
      </Button>
      <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleNext}>
        Next
      </Button>
    </Stack>
  </>
  )
};

const CourseAppearanceForm = () => (
  <>

    <Card variant="outlined" sx={{ width: '100%'}}>
      <CardHeader
        title={<Typography variant="h5">Appearance</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Theme"
                id="theme"
                variant="outlined"
                select
                defaultValue="None"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Classic">Classic</MenuItem>
                <MenuItem value="Boost">Boost</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Show Report Activity"
                id="showReportActivity"
                variant="outlined"
                select
                defaultValue="Yes"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Show Grade Book"
                id="showGradeBook"
                variant="outlined"
                select
                defaultValue="Yes"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Language"
                id="language"
                variant="outlined"
                select
                defaultValue="English"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="English (UK)">English (UK)</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Show Activity Dates"
                id="showActivityDates"
                variant="outlined"
                select
                defaultValue="Yes"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Number of Announcement"
                id="noOfAnnouncement"
                variant="outlined"
                defaultValue="Enter Number of Announcement"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
      <Button variant="outlined" color="error" sx={{ px: 4 }}>
        Clear
      </Button>
      <Button variant="contained" color="secondary" sx={{ px: 4 }}>
        Next
      </Button>
    </Stack>
  </>
);

const CourseCompletionForm = () => (
  <>

    <Card variant="outlined" sx={{ width: '100%'}}>
      <CardHeader
        title={<Typography variant="h5">Completion</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enable completion tracking"
                id="enableCompletionTracking"
                variant="outlined"
                select
                defaultValue="No"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Show Activity Completion Conditions"
                id="showActivityCompletionConditions"
                variant="outlined"
                select
                defaultValue="no"
                InputLabelProps={{ shrink: true }}
              >
                 <MenuItem value="Yes">Yes</MenuItem>
                 <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
      <Button variant="outlined" color="error" sx={{ px: 4 }}>
        Clear
      </Button>
      <Button variant="contained" color="secondary" sx={{ px: 4 }}>
        Next
      </Button>
    </Stack>
  </>
);

const CoursegroupForm = () => (
  <>

    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardHeader
        title={<Typography variant="h5">Groups</Typography>}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <Divider />
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Group mode"
                id="groupMode"
                variant="outlined"
                select
                defaultValue="No Group"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="No Group">No Group</MenuItem>
                <MenuItem value="Separate Group">Separate Group</MenuItem>
                <MenuItem value="Visible Group">Boost</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Forced Group Mode"
                id="forcedGroupMode"
                variant="outlined"
                select
                defaultValue="Yes"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tags"
                id="tags"
                variant="outlined"
                select
                defaultValue="Basic"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="Basic">Basic</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advance">Advance</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Number of Announcement"
                id="noOfAnnouncement"
                variant="outlined"
                defaultValue="Enter Number of Announcement"
                InputLabelProps={{ shrink: true }}
              />
              <FormHelperText sx={{ mt: 1 }}>
                The number of credits this course will give you towards your final grade.
              </FormHelperText>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
      <Button variant="outlined" color="error" sx={{ px: 4 }}>
        Clear
      </Button>
      <Button variant="contained" color="secondary" sx={{ px: 4 }}>
        Upload
      </Button>
    </Stack>
  </>
);




// Basic Tabs Component
function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="General" icon={<Home />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Description" icon={<Description />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Course Format" icon={<FormatListBulleted />} iconPosition="start" {...a11yProps(2)} />
          <Tab label="Appearance" icon={<ColorLens />} iconPosition="start" {...a11yProps(3)} />
          <Tab label="Completion" icon={<CheckCircle />} iconPosition="start" {...a11yProps(4)} />
          <Tab label="Groups" icon={<Group />} iconPosition="start" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CourseInformationForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <DescriptionInformationForm/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CourseFormatForm/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CourseAppearanceForm/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CourseCompletionForm/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <CoursegroupForm/>
      </CustomTabPanel>
    </Box>
  );
}


// Example alternative `navigation` object structure
const navigation = {
  home: { title: 'Home', path: '/' },
  courses: { title: 'Courses', path: '/courses' },
  newCourse: { title: 'New Course', path: '/courses/new' }
};

// New Course Component
const NewCourse = () => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        </Box>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: 'transparent', marginBottom: 3 }}>
        <BasicTabs />
      </Paper>
    </Container>
  );
};

export default NewCourse;
