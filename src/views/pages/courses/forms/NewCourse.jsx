import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Container, Paper, Box, Stack, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { Home, Description, FormatListBulleted, ColorLens, CheckCircle, Group } from '@mui/icons-material';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import CourseInformationForm from './CourseInformationForm';
import DescriptionInformationForm from './DescriptionInformationForm';
import CourseFormatForm from './CourseFormatForm';
import CourseAppearanceForm from './CourseAppearanceForm';
import CourseCompletionForm from './CourseCompletionForm';
import CoursegroupForm from './CoursegroupForm';

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ list: 'ordered' }, { list: 'bullet' }], // Ensure 'list' module is included
    ['clean'],
  ],
};

const editorFormats = ['header', 'bold', 'italic', 'underline', 'link', 'list', 'bullet', 'clean'];

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
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export function BasicTabs() {
  const navigate = useNavigate();
  const params = useParams();
  const { tab, slug } = params;
  const [value, setValue] = useState(tab ? ['general', 'description', 'course-format', 'appearance', 'completion', 'groups'].indexOf(tab) : 0);
  const [courseId, setCourseId] = useState('');
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (tab) {
      const tabMap = ['general', 'description', 'course-format', 'appearance', 'completion', 'groups'];
      const currentTabIndex = tabMap.indexOf(tab);
      if (currentTabIndex !== -1) {
        setValue(currentTabIndex);
      }
    }
  }, [tab]);

  useEffect(() => {
    if (slug) {
      // Fetch course data based on the slug
      axios.get(`http://localhost:8080/api/courses/slug/${slug}`)
        .then((response) => {
          setCourseData(response.data);
          setCourseId(response.data._id);
        })
        .catch((error) => {
          console.error('Error fetching course data:', error);
        });
    }
  }, [slug]);

  const handleSlugGenerated = (newSlug) => {
    setCourseData(null); // Clear course data if slug changes
    navigate(`/courses/${newSlug}`);
  };

  const handleCourseIdGenerated = (id) => {
    setCourseId(id);
  };

  const handleChange = (event, newValue) => {
    const newTab = ['general', 'description', 'course-format', 'appearance', 'completion', 'groups'][newValue];
    setValue(newValue);
    navigate(`/courses/${slug || 'new-course'}/${newTab}`);
  };

  const goToNextTab = (slug) => {
    console.log("generated slug in goToNextTab: " + slug);
    
    const nextIndex = Math.min(value + 1, 5);
    const newTab = ['general', 'description', 'course-format', 'appearance', 'completion', 'groups'][nextIndex];
    setValue(nextIndex);
    navigate(`/courses/${slug || 'new-course'}/${newTab}`);
  };

  const goToPreviousTab = () => {
    console.log("generated slug in goToPreviousTab: " + slug);
    const prevIndex = Math.max(value - 1, 0);
    const newTab = ['general', 'description', 'course-format', 'appearance', 'completion', 'groups'][prevIndex];
    setValue(prevIndex);
    navigate(`/courses/${slug || 'new-course'}/${newTab}`);

    const [formData, setFormData] = useState({
      general: {},
      description: {},
      courseFormat: {},
      appearance: {},
      completion: {},
      groups: {}
    });
  
    const updateFormData = (section, data) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: data
      }));
    };
  
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
        <CourseInformationForm
          goToNextTab={goToNextTab}
          onCourseIdGenerated={handleCourseIdGenerated}
          onCourseSlugGenerated={handleSlugGenerated}
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('general', data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DescriptionInformationForm
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('description', data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CourseFormatForm
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('courseFormat', data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CourseAppearanceForm
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('appearance', data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CourseCompletionForm
          goToNextTab={goToNextTab}
          goToPreviousTab={goToPreviousTab}
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('completion', data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <CoursegroupForm
          courseId={courseId}
          courseData={courseData}
          updateFormData={(data) => updateFormData('groups', data)}
          goToPreviousTab={goToPreviousTab}
        />
      </CustomTabPanel>
    </Box>
  );
}

const navigation = {
  home: { title: 'Home', path: '/' },
  courses: { title: 'Courses', path: '/courses' },
  newCourse: { title: 'New Course', path: '/courses/new' },
};

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
