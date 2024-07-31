import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  OutlinedInput,
  InputAdornment,
  Button,
  Modal,
  Divider,
  Fade,
  Backdrop,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ChatBubbleTwoTone as ChatBubbleTwoToneIcon,
  BlockTwoTone as BlockTwoToneIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  DeleteRounded as DeleteRoundedIcon,
  DriveFileRenameOutlineRounded as DriveFileRenameOutlineRoundedIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import { borderRadius } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UserList = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    mobileNo: '',
    password: '',
    avatar: '',
    status: true,
    gender: 'male',
    group: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profiles');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/groups'); // Replace with your API endpoint for groups
      setGroups(response.data); // Assuming data is an array of group objects
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      mobileNo: '',
      password: '',
      avatar: '',
      status: true,
      gender: 'male',
      group: '',
    });
    setFormErrors({});
    setServerError('');
  };

  const handleAddUser = () => {
    resetForm();
    handleOpen();
  };

  const saveUser = async () => {
    try {
      const validationResult = validateForm(formData);
      if (Object.keys(validationResult.errors).length > 0) {
        setFormErrors(validationResult.errors);
        return;
      }

      const postData = { ...formData };

      if (formData._id) {
        const response = await axios.put(`http://localhost:8080/api/profiles/${formData._id}`, postData);
        if (response.status === 200) {
          fetchUsers();
          handleClose();
        }
      } else {
        delete postData._id;
        const response = await axios.post('http://localhost:8080/api/profiles', postData);
        if (response.status === 201) {
          fetchUsers();
          handleClose();
        }
      }

    } catch (error) {
      console.error('Error saving user:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        setServerError('Failed to save user. Please try again later.');
      }
    }
  };

  const handleEditUser = (user) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      country,
      mobileNo,
      password,
      avatar,
      status,
      gender,
      group,
    } = user;

    setFormData({
      _id,
      firstName,
      lastName,
      email,
      country,
      mobileNo,
      password,
      avatar,
      status,
      gender,
      group,
    });

    handleOpen();
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/profiles/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.country.trim()) {
      errors.country = 'Country is required';
    }

    if (!data.mobileNo.trim()) {
      errors.mobileNo = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(data.mobileNo)) {
      errors.mobileNo = 'Mobile No must be 10 digits';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    return { errors };
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const columns = [
    { field: 'id', headerName: 'Sl No', width: 90 },
    {
      field: 'userProfile',
      headerName: 'User Profile',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="start" sx={{ height: '100%' }}>
          <Typography variant="body1">{`${params.row.firstName} ${params.row.lastName}`}</Typography>
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    {
      field: 'password',
      headerName: 'Password',
      width: 150,
      renderCell: (params) =>
        params.row._id === formData._id ? (showPassword ? params.row.password : '••••••••••') : '••••••••••',
    },
    { field: 'gender', headerName: 'Gender', width: 120 },
    {
      field: 'group',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => {
        const group = groups.find((grp) => grp._id === params.row.group);
        return group ? group.groupName : 'Unknown';
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEditUser(params.row)} aria-label="edit" sx={{ mr: 1 }}>
            <DriveFileRenameOutlineRoundedIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDeleteUser(params.row._id)} aria-label="delete">
            <DeleteRoundedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    ...user,
  }));

  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />

        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3 }}>
        <Card>
          <CardHeader sx={{ p: 0 }}
            title={
              <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h3">List</Typography>
                </Grid>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddIcon />}
                      onClick={handleAddUser}
                      sx={{ display: 'flex', alignItems: 'center', mr: 2, width: '100%' }}
                    >
                      Add New User
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
                  </Box>
                </Grid>
              </Grid>
            }
          />
        </Card>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h3" component="h2" gutterBottom>
            {formData._id ? 'Edit User' : 'Add User'}
          </Typography>
          {serverError && <Typography color="error">{serverError}</Typography>}
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                fullWidth
                margin="normal"
                name="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                error={!!formErrors.country}
                helperText={formErrors.country}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile No"
                fullWidth
                margin="normal"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                error={!!formErrors.mobileNo}
                helperText={formErrors.mobileNo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  label="Role"
                  select
                  fullWidth
                  margin="normal"
                  name="group"
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  error={!!formErrors.group}
                  helperText={formErrors.group}
                >
                  {groups.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      {group.groupName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'row',  // Ensure flexDirection is 'row'
                  justifyContent: 'flex-end',  // Align children to the right
                }}
              >
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="secondary" onClick={saveUser}>
                  {formData._id ? 'Update' : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
    </Container>
  );
};

export default UserList;
