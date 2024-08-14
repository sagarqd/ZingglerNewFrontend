import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

// Define validation schema using yup
const schema = yup.object().shape({
  fullname: yup.string().required('Course Full Name is required'),
  shortname: yup.string().required('Course Short Name is required'),
  courseId: yup.string().required('Course ID Number is required'),
});

const CourseInformationForm = ({ goToNextTab, onCourseIdGenerated, onCourseSlugGenerated, courseId, existingSlug, courseData }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      fullname: '',
      shortname: '',
      courseId: '',
      downloadCourse: 'No',
      courseVisibility: 'Show',
      selectCourse: 'Web Development',
      slug: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (courseData) {
      // Populate form with existing course data
      const { courseFullName, courseShortName, courseIdNumber, downloadCourse, courseVisibility, selectCourse, slug } = courseData.general.courseInformation;
      setValue('fullname', courseFullName);
      setValue('shortname', courseShortName);
      setValue('courseId', courseIdNumber);
      setValue('downloadCourse', downloadCourse);
      setValue('courseVisibility', courseVisibility);
      setValue('selectCourse', selectCourse);
      setValue('slug', slug); // Set slug if available
    } else if (courseId) {
      // Fetch existing course data by courseId if courseData is not provided
      axios.get(`http://localhost:8080/api/courses/${courseId}`)
        .then((response) => {
          const { courseFullName, courseShortName, courseIdNumber, downloadCourse, courseVisibility, selectCourse, slug } = response.data.general.courseInformation;
          setValue('fullname', courseFullName);
          setValue('shortname', courseShortName);
          setValue('courseId', courseIdNumber);
          setValue('downloadCourse', downloadCourse);
          setValue('courseVisibility', courseVisibility);
          setValue('selectCourse', selectCourse);
          setValue('slug', slug); // Set slug
        })
        .catch((error) => {
          console.error('Error fetching course data:', error);
        });
    } else if (existingSlug) {
      // Fetch existing course data by slug if courseId is not available
      axios.get(`http://localhost:8080/api/courses/slug/${existingSlug}`)
        .then((response) => {
          const { courseFullName, courseShortName, courseIdNumber, downloadCourse, courseVisibility, selectCourse, slug } = response.data.general.courseInformation;
          setValue('fullname', courseFullName);
          setValue('shortname', courseShortName);
          setValue('courseId', courseIdNumber);
          setValue('downloadCourse', downloadCourse);
          setValue('courseVisibility', courseVisibility);
          setValue('selectCourse', selectCourse);
          setValue('slug', slug); // Set slug
        })
        .catch((error) => {
          console.error('Error fetching course data by slug:', error);
        });
    }
  }, [courseData, courseId, existingSlug, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        general: {
          courseInformation: {
            courseFullName: data.fullname,
            courseShortName: data.shortname,
            courseIdNumber: data.courseId,
          },
          advanceSettings: {
            downloadCourse: data.downloadCourse,
            courseVisibility: data.courseVisibility,
            selectCourse: data.selectCourse,
          },
        },
      };

      let response;

      if (courseId) {
        // Update existing course
        response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, payload);
      } else {
        // Create new course
        response = await axios.post('http://localhost:8080/api/courses/', payload);
      }

      console.log('API Response:', response);

      if (response && response.data) {
        const { _id, slug } = response.data;

        if (_id) {
          onCourseIdGenerated(_id); // Pass the ID to the parent component
          onCourseSlugGenerated(slug); // Pass the slug to the parent component
          console.log("slug:", slug);
          
          goToNextTab(slug); // Move to the next tab
        } else {
          console.error('Course ID not found in response data');
        }
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardHeader
          title={<Typography variant="h5">Course Information</Typography>}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <Divider />
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Course Full Name"
                      variant="outlined"
                      {...field}
                      error={!!errors.fullname}
                      helperText={errors.fullname?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="shortname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Course Short Name"
                      variant="outlined"
                      {...field}
                      error={!!errors.shortname}
                      helperText={errors.shortname?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Course ID Number"
                      variant="outlined"
                      {...field}
                      error={!!errors.courseId}
                      helperText={errors.courseId?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
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
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="downloadCourse"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Download Course"
                      variant="outlined"
                      select
                      {...field}
                      error={!!errors.downloadCourse}
                      helperText={errors.downloadCourse?.message}
                      InputLabelProps={{ shrink: true }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="courseVisibility"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Course Visibility"
                      variant="outlined"
                      select
                      {...field}
                      error={!!errors.courseVisibility}
                      helperText={errors.courseVisibility?.message}
                      InputLabelProps={{ shrink: true }}
                    >
                      <MenuItem value="Show">Show</MenuItem>
                      <MenuItem value="Hide">Hide</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="selectCourse"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Select Course"
                      variant="outlined"
                      select
                      {...field}
                      error={!!errors.selectCourse}
                      helperText={errors.selectCourse?.message}
                      InputLabelProps={{ shrink: true }}
                    >
                      <MenuItem value="Web Development">Web Development</MenuItem>
                      <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                      <MenuItem value="Application Development">Application Development</MenuItem>
                      <MenuItem value="Graphic Design">Graphic Design</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={() => setValue('fullname', '')}>
          Clear
        </Button>
        <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleSubmit(onSubmit)}>
          Next
        </Button>
      </Stack>
    </>
  );
};

export default CourseInformationForm;
