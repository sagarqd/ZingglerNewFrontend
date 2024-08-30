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
    Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const CourseEnroll = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract courseId from state
    const courseId = location.state?.courseId; // Use optional chaining to handle cases where state might be undefined

    console.log('Course ID from state:', courseId);

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (courseId) {
            const fetchData = async () => {
                try {
                    // Fetch students
                    const studentsResponse = await axios.get('http://localhost:8080/api/student/student-list');
                    console.log('Fetched students data:', studentsResponse.data);
                    setStudents(studentsResponse.data);

                    // Fetch specific course by ID
                    const coursesResponse = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
                    console.log('Fetched course data:', coursesResponse.data);
                    setCourses(coursesResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            console.error('No course ID provided');
        }
    }, [courseId]);

    const handleEnroll = async () => {
        try {
            await axios.post('http://localhost:8080/api/student/enroll', {
                studentId: selectedStudent,
                courseId: courseId
            });
            alert('Student enrolled successfully');
            // Update student status locally
            setStudents((prevStudents) =>
                prevStudents.map((student) => (student._id === selectedStudent ? { ...student, enrolled: true } : student))
            );
            navigate('/student-dashboard/overview');
        } catch (error) {
            console.error('Error enrolling student:', error);
            alert('Error enrolling student');
        }
    };

    const handleOpenDialog = (studentId) => {
        setSelectedStudent(studentId);
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
                        {students.length > 0 ? (
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
                                                <TableCell>{student.enrolled ? 'Enrolled' : 'Not Enrolled'}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleOpenDialog(student._id)}
                                                        disabled={student.enrolled}
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
