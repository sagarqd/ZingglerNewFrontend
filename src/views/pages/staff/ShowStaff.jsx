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

import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { Visibility, VisibilityOff, Search as SearchIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import { isEmpty } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowStaff = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false)
  const [formData, setFormData] = useState({
    staff: '',
    contact: '',
    email: '',
    gender: '',
  });
  const [id, setid] = useState()
  const [imagePreview, setImagePreview] = useState("https://st4.depositphotos.com/13194036/22902/i/450/depositphotos_229023724-stock-photo-female-teacher-pointing-finger-mathematical.jpg");
  const [staff, setStaff] = useState([]); // Updated to 'setStaff'
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [open, setOpen] = useState(false); // Dialog state
  const [orderDirection, setOrderDirection] = useState('asc'); // Sorting direction
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination
  const [selectedStaff, setSelectedStaff] = useState([]); // Updated to 'selectedStaff'
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('staff'); // Updated to 'staff'
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchStaff = async () => {
    console.log('Fetching staff data...'); // Debug message
    try {
      const response = await axios.get('http://localhost:8080/api/staff/list'); // API call
      console.log('Staff data received:', response.data); // Debugging the response
      setStaff(response.data); // Set the staff data
      setFilteredStaff(response.data); // Also set filtered staff
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError(error); // Set error if there's an issue
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value); // Update the search term state
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file, // Store the file in formData state
      });
    }
  };

  // Filtering based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredStaff(
        staff.filter((item) =>
          item.staff.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredStaff(staff);
    }
  }, [searchTerm, staff]);

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
//edit modal//
  const modelOpenEdit = ()=>{
    setDialogOpenEdit(true);
  }

  const modelCloseEdit = () =>{
    setDialogOpenEdit(false);
  }
  //////edit modal///

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      staff: '',
      contact: '',
      email: '',
      gender: '',
    });
    setImagePreview(null); // Reset image preview when closing the dialog
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // const data = {
    //   staff: formData.staff,
    //   contact: formData.contact,
    //   email: formData.email,
    //   gender: formData.gender
    // };

    try {
      const response = await axios.post('http://localhost:8080/api/staff/create', formData);
      console.log('Staff added:', response.data);
      setStaff((prev) => [...prev, response.data]); // Add new staff to the list
      handleCloseDialog();
      fetchStaff()
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const update = async (staff,email,contact,gender,_id)=>{
    setFormData({
      ...formData,
      staff: staff,
      email: email,
      contact: contact,
      gender: gender
    })
    setid(_id)
    modelOpenEdit();
  }

  const handleEdit = async (staffId) =>{
    console.log(staffId)
    console.log('staff update:', staffId)
    if(!staffId){
      console.log('no staff update')
      return;
    }
    try {
      let response = await axios.put(`http://localhost:8080/api/staff/update/${staffId}`,formData)
      console.log("staff update:", response)
      fetchStaff()
      modelCloseEdit()

    } catch (error) {
      console.error('Error updateing staff:', error);
    }
  };

  const handleDelete = async (staffId) => {
    console.log(staffId)
    console.log('Staff ID to delete:', staffId); // Debugging line
    if (!staffId) {
      console.error('No staff ID provided!');
      return;
    }
    try {
      let response = await axios.delete(`http://localhost:8080/api/staff/delete/${staffId}`);
      // setStaff((prev) => prev.filter((staffMember) => staffMember.staff_id !== staffId));
      console.log('Staff deleted:', response);
      fetchStaff()

    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

   
    <Container maxWidth="xl">
      
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          {/* Breadcrumbs Component Here */}
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
          <Typography variant="h2" sx={{ mb: { xs: 2, sm: 0 } }}>
            All Staff
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 } }}>
            <Button
              size="medium"
              variant="outlined"
              onClick={handleOpenDialog}
              sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              Add New Staff
            
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
          </Box>
        </Box>
      </Paper>
      

      {!isEmpty(filteredStaff) ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'staff'}
                    direction={orderBy === 'staff' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('staff')}
                    sx={{ textAlign: 'center' }}
                  >
                    Staff
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'contact'}
                    direction={orderBy === 'contact' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('contact')}
                  >
                    Contact No
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
        {/* //table// */}
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staff) => (
                  <TableRow key={staff.staff_id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedStaff.includes(staff.staff_id)}
                        onChange={() => handleSelect(staff.staff_id)}
                      />
                    </TableCell>
                    <TableCell>{staff.staff}</TableCell>
                    <TableCell>{staff.contact}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.gender}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton
                        aria-label="edit"
                        // onClick={dialogOpenEdit}
                        size="small"
                        sx={{ color: '#1976d2', fontSize: '18' }}

                        onClick={()=>{update(staff.staff,staff.email,staff.contact,staff.gender,staff._id)}}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        sx={{ color: '#f44336', fontSize: '18' }}
                        onClick={() => handleDelete(staff._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    No staff found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
          No staff found
        </Typography>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStaff.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for adding new staff */}
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
                alt="Staff Picture"
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
                View staff
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
                label="Staff Name"
                variant="outlined"
                name="staff name"
                fullWidth
                value={formData.staff}
                // onChange={handleInputChange}
                onChange={(e) => setFormData({ ...formData, staff: e.target.value })}

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
                value={formData.email}
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
                value={formData.contact}
                // onChange={handleInputChange}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, gender:e.target.value })}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
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
            </Grid> */}


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



       {/* //edit// */}
      <Dialog open={dialogOpenEdit} onClose={modelCloseEdit}>

        <DialogContent >
          <Box sx={{
            m: 0,
            p: 2,
            backgroundColor: '#F5F5F5', // Header color
            height: '100px', // Increased header height
            minWidth: '100%',
            borderRadius: '10px'

          }}>
            {/* <Box >
              <Avatar
                src={imagePreview} // Display the uploaded image
                alt="Staff Picture"
                sx={{ width: 100, height: 100, borderRadius: '50%', marginRight: '16px', color: '#f0f0f0' }}
              />

            </Box> */}
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
                View staff
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
                label="Staff Name"
                variant="outlined"
                name="staff name"
                fullWidth
                value={formData.staff}
                // onChange={handleInputChange}
                onChange={(e) => setFormData({ ...formData,staff: e.target.value })}

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
                value={formData.email}
                // onChange={handleInputChange}
                onChange={(e) => setFormData({ ...formData,email: e.target.value })}
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
                value={formData.contact}
                // onChange={handleInputChange}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, gender:e.target.value })}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
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
            </Grid> */}


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
              onClick={modelCloseEdit}
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
              onClick={() => handleEdit(id)}
              
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

export default ShowStaff;




