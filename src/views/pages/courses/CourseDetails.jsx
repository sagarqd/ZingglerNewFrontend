import React, { useState, useEffect, useRef } from 'react';
import {
    Grid,
    Container,
    Typography,
    Card,
    CardContent,
    Snackbar,
    IconButton,
    Slider,
    Box,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    CardActions,
    TextField,
    DialogActions,
    Button,
    Select,
    CardHeader,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List, ListItem, ListItemText,
    FormControl, FormGroup, FormControlLabel, Radio, RadioGroup, Checkbox
} from '@mui/material';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const CourseDetails = () => {
    const [videoSrc, setVideoSrc] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    const [course, setCourse] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [quality, setQuality] = useState('720p');
    const [anchorEl, setAnchorEl] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState([]);
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const [videoData, setVideoData] = useState([]);
    const [courseSection, setCourseSection] = useState([])
    const [questions, setQuestions] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedback, setFeedback] = useState('');

    const { slug } = useParams();
    const { _id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch course data
                const courseResponse = await fetch(`http://localhost:8080/api/courses/slug/${slug}`);
                if (!courseResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const courseContentType = courseResponse.headers.get('Content-Type');
                if (!courseContentType || !courseContentType.includes('application/json')) {
                    throw new Error('Expected JSON response');
                }
                const courseData = await courseResponse.json();
                setCourse(courseData);
                setCourseSection(courseData.courseSections);

                // Fetch video data
                const videoResponse = await fetch(`http://localhost:8080/api/video/fetchByCourseId/${courseData._id}`);
                if (!videoResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const videoContentType = videoResponse.headers.get('Content-Type');
                if (!videoContentType || !videoContentType.includes('application/json')) {
                    throw new Error('Expected JSON response');
                }
                const videoDetailsofArray = await videoResponse.json();
                setVideoData(videoDetailsofArray.video);

                // Set video source if available
                if (courseData.courseVideo && courseData.courseVideo !== 'Not available') {
                    const videoUrl = `http://localhost:8080${courseData.courseVideo}`;
                    setVideoSrc(videoUrl);
                } else {
                    setError('Invalid video path in course data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data.');
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleQualityChange = (event) => {
        const newQuality = event.target.getAttribute('data-quality');
        setQuality(newQuality);
        setAnchorEl(null);
    };

    const handleCloseSettingsMenu = () => {
        setAnchorEl(null);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleTimeUpdate = (state) => {
        setCurrentTime(state.playedSeconds);
    };
    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(window.controlHideTimeout);
        window.controlHideTimeout = setTimeout(() => setShowControls(false), 5000);
    };

    const handleVideoClick = () => {
        handlePlayPause();
    };

    const qualityOptions = ['144p', '360p', '480p', '720p', '1080p'];


    const handleLessonClick = async (_id, sectionNumber, type) => {
        const videoDetails = await fetch(`http://localhost:8080/api/video/fetchVideoBySection/${_id}/${sectionNumber}`);
        if (!videoDetails.ok) {
            throw new Error('Network response was not ok');
        }
        const videoByLesson = await videoDetails.json();
        setSelectedLesson(videoByLesson.video)
        setQuestions(videoByLesson.video.questions)
        if (type === 'Interactive Video') {
            setVideoSrc(`http://localhost:8080/uploads/${selectedLesson.filename}`);
        } else {
            setVideoSrc(null);
        }
    }
    useEffect(() => {
        const activePopup = questions.find(({ startTime, endTime }) => {
            return currentTime >= startTime && currentTime <= endTime;
        });
        if (activePopup) {
            setShowButton(true);
            setCurrentQuestion(activePopup.question);
        } else {
            setShowButton(false);
            setCurrentQuestion(null);
        }
    }, [currentTime, questions]);

    const handleClick = () => {
        const player = playerRef.current.getInternalPlayer(); // Access the internal player
        if (player) {
            player.pause(); // Pause the video
        }
        setShowPopUp(false); // Hide the popup button
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowButton(false)
        setCurrentQuestion(null);
        setSelectedAnswers([]);
    };

    const handleOptionChange = (event) => {
        setSelectedAnswers(event.target.value);
    };
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedAnswers(prev =>
            checked ? [...prev, value] : prev.filter(answer => answer !== value)
        );
    };
    const handleSubmit = () => {
        // Helper function to compare single value or arrays
        const isCorrectAnswer = (selected, correct) => {
            if (Array.isArray(correct)) {
                // Convert single selectedAnswer to array for comparison
                const selectedArray = Array.isArray(selected) ? selected : [selected];
                return arraysEqual(selectedArray, correct);
            }
            return selected === correct;
        };

        // Helper function to check if two arrays contain the same elements
        const arraysEqual = (arr1, arr2) => {
            if (arr1.length !== arr2.length) return false;
            arr1 = [...arr1].sort();
            arr2 = [...arr2].sort();
            return arr1.every((value, index) => value === arr2[index]);
        };

        // Check the answer based on question type
        if (currentQuestion) {
            let isCorrect = false;
            if (currentQuestion.type === 'true/false') {
                isCorrect = isCorrectAnswer(selectedAnswers, currentQuestion.correctAnswer);
            } else if (currentQuestion.type === 'multipleChoice') {
                isCorrect = isCorrectAnswer(selectedAnswers, currentQuestion.correctAnswer);
            } else if (currentQuestion.type === 'singleChoice') {
                isCorrectAnswer(selectedAnswers, currentQuestion.correctAnswer);
            }

            setFeedback(isCorrect ? 'You are right' : 'Try again');
        }
    };



    return (
        <Container maxWidth="xl">
            {course ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        {course.general.courseInformation.courseFullName || 'Course Name Not Available'}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ mt: 2 }}>
                                <CardContent sx={{ padding: 0 }}>
                                    <div
                                        ref={playerContainerRef}
                                        onMouseMove={handleMouseMove}
                                        onClick={handleVideoClick} // Pause video on click
                                        style={{ position: 'relative', width: '100%', height: '500px', backgroundColor: 'black' }}
                                    >
                                        {selectedLesson ? (
                                            videoSrc ? (
                                                <>
                                                    <ReactPlayer
                                                        url={videoSrc}
                                                        playing={!showModal}
                                                        width="100%"
                                                        height="100%"
                                                        controls
                                                        onDuration={handleDuration}
                                                        ref={playerRef}
                                                        onError={(e) => {
                                                            console.error('Error loading video:', e.message);
                                                            setError('Error loading video: ' + e.message);
                                                        }}
                                                        onProgress={handleTimeUpdate}
                                                    />{showButton && (
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform: 'translate(-50%, -50%)',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                                padding: '10px',
                                                                borderRadius: '4px',
                                                                zIndex: 10,
                                                            }}
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    opacity: 0.7,
                                                                }}
                                                                onClick={handleClick}
                                                            >
                                                                Answer Question
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </>
                                            ) : (
                                                <div
                                                    style={{
                                                        padding: '20px',
                                                        maxHeight: '500px',
                                                        overflow: 'auto',
                                                        backgroundColor: 'white'
                                                    }}
                                                >
                                                    <Typography variant="h5" gutterBottom>
                                                        {selectedLesson.title}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {selectedLesson.content || selectedLesson.blogContent}
                                                    </Typography>
                                                </div>
                                            )
                                        ) : (
                                            <Typography variant="body1" color="textSecondary" align="center">
                                                Select a lesson to view content
                                            </Typography>
                                        )}
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseSettingsMenu}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 48 * 4.5,
                                                    width: '20ch'
                                                }
                                            }}
                                        >
                                            {qualityOptions.map((option) => (
                                                <MenuItem key={option} data-quality={option} onClick={handleQualityChange}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            {/* <CourseChapters onLessonSelect={handleLessonSelect} /> */}


                            <Container>
                                <Typography variant="h4" gutterBottom>
                                    {/* {courseFullName} */}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Course Chapters
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Card elevation={0}>
                                            <CardHeader title="Course Chapters" />
                                            <Divider />
                                            <CardContent>
                                                <Box>
                                                    {courseSection.map((section, index) => (
                                                        <Accordion key={index}>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                                <Typography variant="h6">{section.sectionTitle}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <List>
                                                                    {videoData
                                                                        .filter(video => video.sectionNumber === index + 1) // Adjust this according to your data structure
                                                                        .map((video, videoIndex) => (
                                                                            <ListItem
                                                                                button
                                                                                key={video.sectionNumber}
                                                                                onClick={() => handleLessonClick(_id, video.sectionNumber, section.contentType)}
                                                                            >
                                                                                <ListItemText
                                                                                    primary={video.title}
                                                                                    secondary={section.contentType === 'Interactive Video' ? 'Interactive Video' : 'YouTube Video'} // Adjust as needed
                                                                                />
                                                                            </ListItem>
                                                                        ))}
                                                                </List>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Container>


                            <Dialog open={showModal} onClose={handleCloseModal}>
                                <DialogTitle>Question</DialogTitle>
                                <DialogContent>
                                    {currentQuestion && (
                                        <Typography variant="h6" gutterBottom>
                                            {currentQuestion.questionText}
                                        </Typography>
                                    )}
                                    {currentQuestion && currentQuestion.type === 'true/false' && (

                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="true-false"
                                                name="trueFalse"
                                                value={selectedAnswers}
                                                onChange={handleOptionChange}
                                            >
                                                <FormControlLabel value="true" control={<Radio />} label="True" />
                                                <FormControlLabel value="false" control={<Radio />} label="False" />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    {currentQuestion && currentQuestion.type === 'multipleChoice' && (
                                        <FormControl component="fieldset">
                                            <FormGroup>
                                                {currentQuestion.options.map((option, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        control={<Checkbox value={option} onChange={handleCheckboxChange} />}
                                                        label={option}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>
                                    )}
                                    {currentQuestion && currentQuestion.type === 'singleChoice' && (
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="single-choice"
                                                name="singleChoice"
                                                value={selectedAnswers}
                                                onChange={handleOptionChange}
                                            >
                                                {currentQuestion.options.map((option, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        value={option}
                                                        control={<Radio />}
                                                        label={option}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    {feedback && (
                                        <Typography variant="body1" color={feedback === 'You are right' ? 'green' : 'red'}>
                                            {feedback}
                                        </Typography>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleSubmit} color="primary">
                                        Submit
                                    </Button>
                                    <Button onClick={handleCloseModal} color="secondary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>




                            {/* Remove Below Code */}
                            {selectedLesson ? (
                                <div>
                                    <Typography variant="h5" gutterBottom>
                                        {selectedLesson.title}
                                    </Typography>
                                    <Typography variant="body1">{selectedLesson.blogContent}</Typography>
                                </div>
                            ) : (
                                <Typography variant="body1">Select a lesson to view the content.</Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message="Video uploaded successfully"
                    />
                    {/* Question Popup */}
                    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                        <DialogTitle>Question</DialogTitle>
                        <DialogContent>
                            {currentQuestion && (
                                <div>
                                    <Typography>{currentQuestion.question}</Typography>
                                    <ul>
                                        {currentQuestion.options.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </DialogContent>
                        <Button onClick={() => setShowDialog(false)}>Close</Button>
                    </Dialog>
                </>
            ) : (
                <Typography variant="h6" align="center">
                    Loading course details...
                </Typography>
            )}
        </Container>
    );
};

export default CourseDetails;
