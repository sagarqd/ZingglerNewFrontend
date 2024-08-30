import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const CourseEnroll = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  // Simulating data fetch with hardcoded values
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Simulate API response
        const response = {
          data: [
            { _id: '1', fullName: 'John Doe', email: 'john.doe@example.com', enrolled: false },
            { _id: '2', fullName: 'Jane Smith', email: 'jane.smith@example.com', enrolled: true }
          ]
        };
        console.log('Fetched students data:', response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEnroll = async () => {
    try {
      await axios.post('/api/enroll', {
        studentId: selectedStudent,
        courseId: 'YOUR_COURSE_ID_HERE' // Replace with your course ID variable or value
      });
      alert('Student enrolled successfully');
      // Update student status locally
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === selectedStudent ? { ...student, enrolled: true } : student
        )
      );
      navigate('/student-dashboard/overview'); // Redirect after successful enrollment
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Error enrolling student');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card elevation={0} sx={{ borderRadius: '8px', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Enroll Students
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Divider sx={{ mb: 2 }} />
            {students && students.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Enrolled Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          {student.enrolled ? 'Enrolled' : 'Not Enrolled'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setSelectedStudent(student._id);
                              handleOpenDialog();
                            }}
                            disabled={student.enrolled} // Disable button if already enrolled
                          >
                            Enroll Student
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No students available.</Typography>
            )}
          </>
        )}
      </CardContent>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to enroll this student in the course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleEnroll();
              handleCloseDialog();
            }}
            color="secondary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CourseEnroll;
