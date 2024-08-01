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
  IconButton,
  Chip,
  Autocomplete
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
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const dummyPermissions = [
  'Read', 'Write', 'Edit', 'Delete', 'View', 'Manage', 'Create', 'Update', 
  'Archive', 'Publish', 'Unpublish', 'Approve', 'Reject', 'Submit', 'Review',
  'Assign', 'Unassign', 'Schedule', 'Reschedule', 'Export', 'Import', 'Upload',
  'Download', 'Synchronize', 'Analyze', 'Monitor', 'Configure', 'Customize',
  'Audit', 'Debug', 'Optimize', 'Backup', 'Restore', 'Reset', 'Test', 'Deploy'
];

const UserPermissions = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ _id: '', groupName: '', permissions: [] });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({ groupName: '' });
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
    setFormValues({ _id: '', groupName: '', permissions: [] });
    setFormErrors({ groupName: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePermissionChange = (event, newValue) => {
    setFormValues({ ...formValues, permissions: newValue });
  };

  // Ensure formValues.permissions is always an array
  const permissionsList = Array.isArray(formValues.permissions) ? formValues.permissions : [];

  // Sort options to show selected items at the top
  const sortedOptions = dummyPermissions.sort((a, b) => {
    const isASelected = permissionsList.includes(a);
    const isBSelected = permissionsList.includes(b);
    if (isASelected && !isBSelected) return -1;
    if (!isASelected && isBSelected) return 1;
    return 0;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formValues.groupName) {
        console.error('Group Name is required');
        return;
      }

      if (formValues._id) {
        await axios.put(`http://localhost:8080/api/groups/${formValues._id}`, {
          groupName: formValues.groupName,
          permissions: formValues.permissions
        });
        const updatedRows = rows.map((row) =>
          row._id === formValues._id
            ? { ...row, groupName: formValues.groupName, permissions: formValues.permissions }
            : row
        );
        setRows(updatedRows);
      } else {
        const response = await axios.post('http://localhost:8080/api/groups', {
          groupName: formValues.groupName,
          permissions: formValues.permissions
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
    setFormValues({ ...group, permissions: group.permissions || [] });
    setOpen(true);
    setFormErrors({ groupName: '' });
  };

  const handleDeleteClick = async (groupId) => {
    try {
      const groupToDelete = rows.find((group) => group._id === groupId);
      if (!groupToDelete) {
        console.error('Group not found');
        return;
      }

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
          <CardHeader sx={{ px: 5 }}
            title={
              <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h3">User Permissions Management </Typography>
                </Grid>
                <Grid item>
                  <Button size="medium"
                    variant="outlined"
                    color='secondary'
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ flexShrink: 0, whiteSpace: 'nowrap' }} onClick={handleNewGroupClick}>
                    Add New Role
                  </Button>
                </Grid>
              </Grid>
            }
          />
        </Card>
        <Divider />
        <TableContainer >
          <Table>
            <TableHead >
              <TableRow >
                <TableCell sx={{ px: 5 }}> User Permissions</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell sx={{ px: 5, display: 'flex', justifyContent: 'flex-end' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell sx={{ px: 5 }}>{row.groupName}</TableCell>
                    <TableCell>
                        {Array.isArray(row.permissions) ? (
                        row.permissions.map((permission, index) => (
                            <Chip
                            key={index}
                            label={permission}
                            sx={{ margin: '2px', fontSize: '0.75rem' }}
                            />
                        ))
                        ) : typeof row.permissions === 'string' ? (
                        row.permissions.split(',').map((permission, index) => (
                            <Chip
                            key={index}
                            label={permission.trim()}
                            sx={{ margin: '2px', fontSize: '0.75rem' }}
                            />
                        ))
                        ) : (
                        'No permissions'
                        )}
                    </TableCell>
                    <TableCell sx={{
                        px: 5,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        minHeight: '64px', // Ensure consistency
                        alignItems: 'center'
                        }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleEditClick(row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteClick(row._id)}>
                            <DeleteIcon />
                        </IconButton>
                        </Box>
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
                margin="normal"
                required
                fullWidth
                id="groupName"
                label="Group Name"
                name="groupName"
                value={formValues.groupName}
                onChange={handleChange}
                autoComplete="off"
                error={Boolean(formErrors.groupName)}
                helperText={formErrors.groupName}
              />
              <Autocomplete
                multiple
                options={sortedOptions}
                value={permissionsList}
                onChange={handlePermissionChange}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Permissions" 
                sx={{ mt:2 }}/>}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {formValues._id ? 'Update' : 'Add'}
              </Button>
              {serverError && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {serverError}
                </Typography>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default UserPermissions;
