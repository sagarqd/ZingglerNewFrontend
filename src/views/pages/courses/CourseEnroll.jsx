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
import { useNavigate } from 'react-router-dom';

const CourseEnroll = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch students
                const studentsResponse = await axios.get('http://localhost:8080/api/students');
                console.log('Fetched students data:', studentsResponse.data);
                setStudents(studentsResponse.data);

                // Fetch courses
                const coursesResponse = await axios.get('http://localhost:8080/api/courses');
                console.log('Fetched courses data:', coursesResponse.data);
                setCourses(coursesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleEnroll = async () => {
        if (!selectedCourse) {
            alert('Please select a course');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/enroll', {
                studentId: selectedStudent,
                courseId: selectedCourse
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
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body2">Select Course:</Typography>
                        <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                            <option value="" disabled>Select a course</option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>{course.name}</option>
                            ))}
                        </select>
                    </Box>
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
