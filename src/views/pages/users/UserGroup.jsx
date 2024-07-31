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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import IconChevronRight from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UserGroup = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ _id: '', groupName: '', groupDescription: '' });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({ groupName: '', groupDescription: '' });
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/groups');
      const sortedGroups = response.data.sort((a, b) => {
        const order = ['Admin', 'Educator', 'Student'];
        return order.indexOf(a.groupName) - order.indexOf(b.groupName);
      });
      setRows(sortedGroups);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };
  

  const handleNewGroupClick = () => {
    setOpen(true);
    setFormValues({ _id: '', groupName: '', groupDescription: '' });
    setFormErrors({ groupName: '', groupDescription: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formValues.groupName || !formValues.groupDescription) {
        console.error('Group Name and Description are required');
        return;
      }

      if (formValues._id) {
        await axios.put(`http://localhost:8080/api/groups/${formValues._id}`, {
          groupName: formValues.groupName,
          groupDescription: formValues.groupDescription
        });
        const updatedRows = rows.map((row) =>
          row._id === formValues._id
            ? {
                ...row,
                groupName: formValues.groupName,
                groupDescription: formValues.groupDescription
              }
            : row
        );
        setRows(updatedRows);
      } else {
        const response = await axios.post('http://localhost:8080/api/groups', {
          groupName: formValues.groupName,
          groupDescription: formValues.groupDescription
        });
        setRows([...rows, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving group:', error);
      if (error.response) {
        setServerError(error.response.data.message || 'Server Error');
      }
    }
  };

  const handleEditClick = (group) => {
    setFormValues({ ...group });
    setOpen(true);
    setFormErrors({ groupName: '', groupDescription: '' });
  };

  const handleDeleteClick = async (groupId) => {
    try {
      const groupToDelete = rows.find((group) => group._id === groupId);
      if (!groupToDelete) {
        console.error('Group not found');
        return;
      }

      // Assuming "teacher" was previously a special case. No longer need to handle separately.
      await axios.delete(`http://localhost:8080/api/groups/${groupId}`);
      const updatedGroups = rows.filter((group) => group._id !== groupId);
      setRows(updatedGroups);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="xl">
      <Paper elevation={0}>
        <Box sx={{ width: '100%', marginBottom: 3, textAlign: 'right' }}>
          <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        </Box>
      </Paper>

      <Paper elevation={0}>
        <Card>
          <CardHeader sx={{ py: 2 }}
            title={
              <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h3">Group</Typography>
                </Grid>
                <Grid item>
                  <Button size="medium"
                    variant="outlined"
                    color='secondary'
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ flexShrink: 0, whiteSpace: 'nowrap' }} onClick={handleNewGroupClick}>
                    Add New Group
                  </Button>
                </Grid>
              </Grid>
            }
          />
        </Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ paddingRight: '16px' }}>Group Name</TableCell>
                <TableCell style={{ paddingRight: '16px' }}>Description</TableCell>
                <TableCell style={{ paddingRight: '16px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell style={{ paddingRight: '16px' }}>{row.groupName}</TableCell>
                  <TableCell style={{ paddingRight: '16px' }}>{row.groupDescription}</TableCell>
                  <TableCell style={{ paddingRight: '16px' }}>
                    <IconButton color="primary" onClick={() => handleEditClick(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              {formValues._id ? 'Edit Group' : 'Add New Group'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Group Name"
                name="groupName"
                value={formValues.groupName}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(formErrors.groupName)}
                helperText={formErrors.groupName}
              />
              <TextField
                fullWidth
                label="Group Description"
                name="groupDescription"
                value={formValues.groupDescription}
                onChange={handleChange}
                margin="normal"
                required
                error={Boolean(formErrors.groupDescription)}
                helperText={formErrors.groupDescription}
              />
              {serverError && (
                <Typography color="error" variant="body2">
                  {serverError}
                </Typography>
              )}
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                  {formValues._id ? 'Update Group' : 'Add Group'}
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default UserGroup;
