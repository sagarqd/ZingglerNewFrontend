import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Dialog,
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
import {DialogTitle, DialogContent, DialogActions} from '@mui/material';


const ShowAssets = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [formValues, setFormValues] = useState({ title: '', description: '', thumbnail: '', videoUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false); // Define loading and error state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState(null);
  
  const handleOpenDialog = () => {
    setDialogOpen(true);
};

const handleCloseDialog = () => {
  setDialogOpen(false);
  setFile(null); // Reset file
};

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
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
            All Assets
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
                onClick={handleOpenDialog}
            >
                Add New Assets
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

      {/* // dailog button */}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} PaperProps={{
                sx: {
                    backgroundColor: '#EEF2F6',
                    borderRadius: 2,
                    minWidth: 400,
                    padding: 2,
                }
            }}>
                <DialogTitle sx={{ color: '#5E35B1' }}>Upload New Asset</DialogTitle>
                <DialogContent>
                    <TextField
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            backgroundColor: '#FFF',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#A1D2FA',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1E88E5',
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        sx={{
                            color: '#5E35B1',
                            '&:hover': {
                                backgroundColor: '#A1D2FA',
                                color: '#FFF',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1E88E5',
                            '&:hover': {
                                backgroundColor: '#5E35B1',
                            },
                        }}
                        onClick={() => {
                            console.log(file);
                            handleCloseDialog();
                        }}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
</Container>
  );
};

export default ShowAssets;
