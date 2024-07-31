import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  AvatarGroup
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';

const GridCourseCard = ({
  course,
  onClick,
  handleEdit,
  handleDelete,
  anchorEl,
  handleCloseMenu,
  setSelectedCourse
}) => {
  const handleMenuClick = (event) => {
    onClick(event, course);
    setSelectedCourse(course);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={course.thumbnail}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moment(course.updatedAt).fromNow()}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <AvatarGroup max={4}>
            <Avatar alt="User 1" src="/static/images/avatar/1.jpg" />
            <Avatar alt="User 2" src="/static/images/avatar/2.jpg" />
            <Avatar alt="User 3" src="/static/images/avatar/3.jpg" />
            <Avatar alt="User 4" src="/static/images/avatar/4.jpg" />
          </AvatarGroup>
          <Box>
            <IconButton
              aria-controls="course-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="course-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleEdit(course)}>
                <EditIcon sx={{ mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(course)}>
                <DeleteIcon sx={{ mr: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GridCourseCard;
