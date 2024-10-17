// import { useState, useEffect } from 'react';
// import * as React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { LoadingButton } from '@mui/lab';
// // Material-UI components
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// // Project-specific components and utilities
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// const AuthRegister = ({ ...others }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
//   const customization = useSelector((state) => state.customization);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State variables
//   const [showPassword, setShowPassword] = useState(false);
//   const [checked, setChecked] = useState(true);
//   const [apiError, setApiError] = useState(null);
//   const [strength, setStrength] = useState(0);
//   const [level, setLevel] = useState(null); // Initialize level state with null

//   // Function to handle click on show/hide password button
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
   
//   };

//   const handleClick = async () => {
//     setIsSubmitting(true);

//     try {
//       // Perform your action here (e.g., form submission)
//       await someAsyncOperation(); // Replace with your actual async operation

//       // Reset the form or handle success state here
//     } catch (error) {
//       // Handle any errors here
//       console.error('Error:', error);
//     } finally {
//       // Stop the loading state
//       setIsSubmitting(false);
//     }
//   };


//   // Function to handle mouse down event on password input
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   // Function to calculate password strength and level
//   const changePassword = (value) => {
//     const temp = strengthIndicator(value);
//     setStrength(temp);
//     setLevel(strengthColor(temp));
//   };

//   // Calculate initial password strength on component mount
//   useEffect(() => {
//     changePassword('123456'); // Calculate initial password strength
//   }, []);

//   // Function to handle form submission
//   const fetchData = async (formData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/register', formData);
//       console.log('Registration successful:', response.data); // Log successful registration response

//       // Example: Storing email in localStorage
//       localStorage.setItem('email', formData.email); // Store email from formData
//       localStorage.setItem('accessToken', response.data.token);
//       navigate('/verify'); // Navigate to verify page after successful registration
//     } catch (error) {
//       if (error.response) {
//         // Handle server response error
//         console.error('Server responded with an error:', error.response.data);
//         setApiError(error.response.data.message); // Set API error message in state
//       } else if (error.request) {
//         // Handle request error
//         console.error('Request was made but no response was received:', error.request);
//         setApiError('No response from server'); // Set generic error message
//       } else {
//         // Handle other errors
//         console.error('Error setting up the request:', error.message);
//         setApiError('Request error'); // Set generic error message
//       }
//       console.error('Registration error:', error);
//     }
//   };

//   return (
//     <>
//       <Grid container direction="column" justifyContent="center" spacing={2}>
//         <Grid item xs={12}>
//           <Box sx={{ alignItems: 'center', display: 'flex' }}>{/* Any header content */}</Box>
//         </Grid>
//         <Grid item xs={12} container alignItems="center" justifyContent="center">
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">Sign up with Email address</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Formik
//         initialValues={{
//           fname: '',
//           lname: '',
//           email: '',
//           password: ''
//         }}
//         validationSchema={Yup.object().shape({
//           fname: Yup.string().required('First Name is required'),
//           lname: Yup.string().required('Last Name is required'),
//           email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           // Example of form data to send to server
//           const formData = {
//             email: values.email,
//             password: values.password,
//             firstName: values.fname,
//             lastName: values.lname
//           };
//           fetchData(formData); // Call fetchData function with form data
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} {...others}>
//             <Grid container spacing={matchDownSM ? 0 : 2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   margin="normal"
//                   name="fname"
//                   type="text"
//                   value={values.fname}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   error={touched.fname && Boolean(errors.fname)}
//                   helperText={touched.fname && errors.fname}
//                   sx={{ ...theme.typography.customInput }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   margin="normal"
//                   name="lname"
//                   type="text"
//                   value={values.lname}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   error={touched.lname && Boolean(errors.lname)}
//                   helperText={touched.lname && errors.lname}
//                   sx={{ ...theme.typography.customInput }}
//                 />
//               </Grid>
//             </Grid>
//             <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-email-register"
//                 type="email"
//                 value={values.email}
//                 name="email"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 inputProps={{}}
//               />
//               {touched.email && errors.email && (
//                 <FormHelperText error id="standard-weight-helper-text--register">
//                   {errors.email}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password-register"
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 label="Password"
//                 onBlur={handleBlur}
//                 onChange={(e) => {
//                   handleChange(e);
//                   changePassword(e.target.value);
//                 }}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                       size="large"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 inputProps={{}}
//               />
//               {touched.password && errors.password && (
//                 <FormHelperText error id="standard-weight-helper-text-password-register">
//                   {errors.password}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             {strength !== 0 && (
//               <FormControl fullWidth>
//                 <Box sx={{ mb: 2 }}>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                       <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
//                     </Grid>
//                     <Grid item>
//                       <Typography variant="subtitle1" fontSize="0.75rem">
//                         {level?.label}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </FormControl>
//             )}

//             <Grid container alignItems="center" justifyContent="space-between">
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
//                   }
//                   label={
//                     <Typography variant="subtitle1">
//                       Agree with &nbsp;
//                       <Typography variant="subtitle1" component={Link} to="#">
//                         Terms & Condition.
//                       </Typography>
//                     </Typography>
//                   }
//                 />
//               </Grid>
//             </Grid>
//             {errors.submit && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText error>{errors.submit}</FormHelperText>
//               </Box>
//             )}

//             {apiError && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText error>{apiError}</FormHelperText>
//               </Box>
//             )}

//             <Box sx={{ mt: 2 }}>
//               <AnimateButton>
//                 <LoadingButton
//                   onClick={handleClick}
//                   loading={isSubmitting}
//                   disableElevation
//                   disabled={isSubmitting}
//                   fullWidth
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                   color="secondary"
//                 >
//                   Sign up
//                 </LoadingButton>
//               </AnimateButton>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default AuthRegister;


import { useState, useEffect } from 'react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LoadingButton } from '@mui/lab';

// Material-UI components
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Project-specific components and utilities
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

const AuthRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState(null); // Initialize level state with null

  // Function to handle click on show/hide password button
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle mouse down event on password input
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to calculate password strength and level
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  // Calculate initial password strength on component mount
  useEffect(() => {
    changePassword('123456'); // Example initial password to calculate strength
  }, []);

  // Function to handle form submission
  const fetchData = async (formData, setSubmitting) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log('Registration successful:', response.data);

      // Example: Storing email in localStorage
      localStorage.setItem('email', formData.email);
      localStorage.setItem('accessToken', response.data.token);
      navigate('/verify'); // Navigate to verify page after successful registration
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setApiError(error.response.data.message);
      } else if (error.request) {
        console.error('Request was made but no response was received:', error.request);
        setApiError('No response from server');
      } else {
        console.error('Error setting up the request:', error.message);
        setApiError('Request error');
      }
    } finally {
      setSubmitting(false); // Stop loading state after API call completes
    }
  };



  

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>{/* Any header content */}</Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          fname: '',
          lname: '',
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().required('First Name is required'),
          lname: Yup.string().required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = {
            email: values.email,
            password: values.password,
            firstName: values.fname,
            lastName: values.lname
          };
          fetchData(formData, setSubmitting); // Pass formData and setSubmitting to fetchData
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.fname && Boolean(errors.fname)}
                  helperText={touched.fname && errors.fname}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={values.lname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.lname && Boolean(errors.lname)}
                  helperText={touched.lname && errors.lname}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {apiError && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{apiError}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <LoadingButton
                  loading={isSubmitting}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign up
                </LoadingButton>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;

