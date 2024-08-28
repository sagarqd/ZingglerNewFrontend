import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    MenuItem,
    Button,
    Grid,
    Stack,
    InputLabel,
    Select,
    FormControl,
    FormControlLabel,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Checkbox,
    Snackbar,
    Alert
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CourseSectionForm = ({ goToNextTab, goToPreviousTab, courseId, noOfSection }) => {
    const [sections, setSections] = useState([]);
    const [blogCategory, setBlogCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [interactiveVideoFile, setInteractiveVideoFile] = useState(null);
    const [showQuestionFields, setShowQuestionFields] = useState(false);
    const [showVideoUploadFields, setShowVideoUploadFields] = useState(false);
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [answers, setAnswers] = useState([]);
    const [allDay, setAllDay] = useState(false);
    const [videoFile, setVideoFile] = useState(null); // State for video file
    const [videoTitle, setVideoTitle] = useState(''); // State for video title
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [sectionNumber, setSectionNumber] = useState('');``
    const [videoId, setvideoId] = useState('');
    const [videoPreview, setVideoPreview] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [questionFields, setQuestionFields] = useState({
        questionText: '',
        options: ['', ''],
        correctAnswer: ''
    });
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        questionText: '',
        options: ['', ''],
        correctAnswer: [],
        startTime: '',
        endTime: '',
        type: '',   
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/coursesById/${courseId}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json();
                    const fetchedNoOfSection = data.format?.noOfSection || 0;
                    setSections(
                        Array.from({ length: fetchedNoOfSection }, () => ({
                            sectionTitle: '',
                            contentType: '',
                            contentUrl: '',
                            youtubeUrl: '',
                            uploadedFile: null,
                            gameLink: '',
                            imageFile: null,
                            editorState: EditorState.createEmpty()
                        }))
                    );
                } else {
                    console.error('Failed to fetch course data');
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

    const handleSectionChange = (index, field, value) => {
        setSections((prevSections) => {
            const newSections = [...prevSections];
            newSections[index] = { ...newSections[index], [field]: value };
            return newSections;
        });
    };

    const handleContentTypeChange = (index, event) => {
        const value = event.target.value;
        handleSectionChange(index, 'contentType', value);
        handleSectionChange(index, 'contentUrl', '');
        handleSectionChange(index, 'youtubeUrl', '');
        handleSectionChange(index, 'uploadedFile', null);
        handleSectionChange(index, 'gameLink', '');
        handleSectionChange(index, 'imageFile', null);
        handleSectionChange(index, 'editorState', EditorState.createEmpty());
        if (value === 'Blog') {
            setBlogCategory(''); // Reset blog category if switching content type
        }
    };

    const handleBlogCategoryChange = (event) => {
        setBlogCategory(event.target.value);
    };

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (type === 'video') {
            setVideoFile(file);
        } else if (type === 'interactive') {
            setInteractiveVideoFile(file);
        }
    };

    const handleImageChange = (index, event) => {
        handleSectionChange(index, 'imageFile', event.target.files[0]);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        // Reset all fields
        setQuestions([]);
        setCurrentQuestion({
            questionText: '',
            options: ['', ''],
            correctAnswer: '',
            startTime: '',
            endTime: ''
        });
        setVideoFile(null);
        setVideoTitle('');
        setVideoPreview(null);
        setShowPreview(false);
    };

    const handleVideoFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
    };

    const handleVideoUpload = async () => {
        if (!videoFile || !videoTitle) {
            setSnackbarMessage('Video file or title is missing');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const videoFormData = new FormData();
        videoFormData.append('file', videoFile);
        videoFormData.append('title', videoTitle);
        videoFormData.append('sectionNumber', noOfSection);
        videoFormData.append('courseId', courseId);

        try {
            const videoResponse = await fetch('http://localhost:8080/api/video/upload', {
                method: 'POST',
                body: videoFormData,
            });
        
            if (!videoResponse.ok) {
                throw new Error('Network response was not ok for video upload');
            }
        
            const videoData = await videoResponse.json(); // Parse the response as JSON
            console.log('Parsed Video Data:', videoData);
        
            const videoId = videoData.file._id || videoData.file.videoId || videoData.file.id; // Extract the video ID
            console.log('Video ID:', videoId);
        
            if (videoId) {
                setvideoId(videoId); // Store the video ID in the state
                const videoUrl = `http://localhost:8080/uploads/${videoData.file.filename}`;
                setVideoPreview(videoUrl);
                setShowPreview(true);
            } else {
                throw new Error('Video ID not found in response');
            }
        
        } catch (error) {
            setSnackbarMessage('Error saving video and question data');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Error saving video and question data:', error);
        }
    };


    const handleAddQuestion = () => {
        // Add the current question to the questions array
        setQuestions([...questions, currentQuestion]);
        // Reset the current question fields
        setCurrentQuestion({
            questionText: '',
            options: ['', ''],
            correctAnswer: '',
            startTime: '',
            endTime: '',
            type: '', 
        });
        setSelectedQuestionType('');
    };

    const handleSubmit = async() => {
        console.log('Video Title:', videoTitle);
        console.log('Video File:', videoFile);
        console.log('Questions:', questions);
        console.log(videoId)
        try {
            
            if(videoId==''){
                console.log("Video is not found for uploading question")
                return;
            }
            const videoQuestions = await fetch(`http://localhost:8080/api/video//questions/${videoId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ questions }) 
            })
            if(videoQuestions.ok){
                console.log("Questions uploaded",videoQuestions);
            }
        } catch (error) {
            console.log("Error in uploading Quesion",error)
        } 
    };

    const handleSnackClose = () => {
        setSnackbarOpen(false);
    };

    const handleNext = async () => {
        if (!courseId) {
            console.error('Course ID is not defined');
            return;
        }

        try {
            for (let i = 0; i < sections.length; i++) {
                const formData = new FormData();
                const section = sections[i];

                formData.append('sectionTitle', section.sectionTitle);
                formData.append('contentType', section.contentType);

                if (section.contentType === 'Blog') {
                    const content = JSON.stringify(convertToRaw(section.editorState.getCurrentContent()));
                    formData.append('blogContent', content);
                    formData.append('blogCategory', blogCategory); // Include blog category
                } else if (section.contentType === 'URL') {
                    formData.append('contentUrl', section.contentUrl);
                } else if (section.contentType === 'YouTube Video') {
                    formData.append('youtubeUrl', section.youtubeUrl);
                } else if (section.contentType === 'Uploaded Video') {
                    if (section.uploadedFile) {
                        formData.append('uploadedFile', section.uploadedFile);
                    }
                } else if (section.contentType === 'Image') {
                    if (section.imageFile) {
                        formData.append('imageFile', section.imageFile);
                    }
                } else if (section.contentType === 'Games') {
                    formData.append('gameLink', section.gameLink);
                } else if (section.contentType === 'Interactive Video') {
                    if (interactiveVideoFile) {
                        formData.append('interactiveVideoFile', interactiveVideoFile); // Append uploaded interactive video file
                    }
                }

                const response = await fetch(`http://localhost:8080/api/courses/${courseId}/sections`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Section data:', data);
            }

            goToNextTab();
        } catch (error) {
            console.error('Error saving course sections:', error);
        }
    };

    const handlePrevious = () => {
        goToPreviousTab();
    };

    const handleAddAnswer = () => {
        setAnswers((prevAnswers) => [...prevAnswers, { text: '', isCorrect: false }]);
    };

    const handleAnswerChange = (index, checked) => {
        const newAnswers = [...answers];
        if (checked) {
            newAnswers.push(index);
        } else {
            const answerIndex = newAnswers.indexOf(index);
            if (answerIndex > -1) {
                newAnswers.splice(answerIndex, 1);
            }
        }
        setAnswers(newAnswers);
    };

    const handleQuestionTypeChange = (event) => {
        const selectedType = event.target.value;
        setCurrentQuestion((prev) => ({
            ...prev,
            type: selectedType
        }));
        setSelectedQuestionType(selectedType);  // If you need to update any other UI elements based on type
};

    const handleQuestionTextChange = (event) => {
        setCurrentQuestion({ ...currentQuestion, questionText: event.target.value });
    };
    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = event.target.value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleCorrectAnswerChange = (event) => {
        const value = event.target.value;
        setCurrentQuestion((prev) => {
            let updatedAnswers;
            if (prev.correctAnswer.includes(value)) {
                // If already selected, remove it from the array
                updatedAnswers = prev.correctAnswer.filter(answer => answer !== value);
            } else {
                // Otherwise, add it to the array
                updatedAnswers = [...prev.correctAnswer, value];
            }
            return { ...prev, correctAnswer: updatedAnswers };
        });
    };

    const handleTimeChange = (event) => {
        const { name, value } = event.target;
        setCurrentQuestion({ ...currentQuestion, [name]: value });
    };


    return (
        <>
            {sections.length === 0 ? (
                <p>No sections available</p>
            ) : (
                sections.map((section, index) => (
                    <Card variant="outlined" sx={{ width: '100%', mb: 3 }} key={index}>
                        <CardHeader title={`Section ${index + 1}`} />
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Section Title"
                                            variant="outlined"
                                            value={section.sectionTitle}
                                            onChange={(e) => handleSectionChange(index, 'sectionTitle', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Content Type</InputLabel>
                                            <Select
                                                value={section.contentType}
                                                onChange={(e) => handleContentTypeChange(index, e)}
                                                label="Content Type"
                                            >
                                                <MenuItem value="">Select Content Type</MenuItem>
                                                <MenuItem value="Blog">Blog</MenuItem>
                                                <MenuItem value="URL">URL</MenuItem>
                                                <MenuItem value="YouTube Video">YouTube Video</MenuItem>
                                                <MenuItem value="Uploaded Video">Uploaded Video</MenuItem>
                                                <MenuItem value="Games">Games</MenuItem>
                                                <MenuItem value="Image">Image</MenuItem>
                                                <MenuItem value="Interactive Video">Interactive Video</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {section.contentType === 'Blog' && (
                                        <>
                                            <Grid item xs={12}>
                                                <Editor
                                                    editorState={section.editorState}
                                                    onEditorStateChange={(editorState) =>
                                                        handleSectionChange(index, 'editorState', editorState)
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Blog Category</InputLabel>
                                                    <Select value={blogCategory} onChange={handleBlogCategoryChange} label="Blog Category">
                                                        <MenuItem value="">Select Blog Category</MenuItem>
                                                        <MenuItem value="Technology">Technology</MenuItem>
                                                        <MenuItem value="Education">Education</MenuItem>
                                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </>
                                    )}
                                    {section.contentType === 'URL' && (
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Content URL"
                                                variant="outlined"
                                                value={section.contentUrl}
                                                onChange={(e) => handleSectionChange(index, 'contentUrl', e.target.value)}
                                            />
                                        </Grid>
                                    )}
                                    {section.contentType === 'YouTube Video' && (
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="YouTube URL"
                                                variant="outlined"
                                                value={section.youtubeUrl}
                                                onChange={(e) => handleSectionChange(index, 'youtubeUrl', e.target.value)}
                                            />
                                        </Grid>
                                    )}
                                    {section.contentType === 'Uploaded Video' && (
                                        <Grid item xs={12} md={6}>
                                            <input
                                                accept="video/*"
                                                id={`upload-video-${index}`}
                                                type="file"
                                                onChange={(e) => handleFileChange(index, e)}
                                            />
                                        </Grid>
                                    )}
                                    {section.contentType === 'Image' && (
                                        <Grid item xs={12} md={6}>
                                            <input
                                                accept="image/*"
                                                id={`upload-image-${index}`}
                                                type="file"
                                                onChange={(e) => handleImageChange(index, e)}
                                            />
                                        </Grid>
                                    )}
                                    {section.contentType === 'Games' && (
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Game Link"
                                                variant="outlined"
                                                value={section.gameLink}
                                                onChange={(e) => handleSectionChange(index, 'gameLink', e.target.value)}
                                            />
                                        </Grid>
                                    )}
                                    {section.contentType === 'Interactive Video' && (
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<UploadIcon />}
                                                onClick={handleModalOpen}
                                            >
                                                Upload
                                            </Button>
                                            {interactiveVideoFile && <p>Selected file: {interactiveVideoFile.name}</p>}
                                        </Grid>
                                    )}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                ))
            )}
            <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handlePrevious}>
                    Prev
                </Button>
                <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleNext}>
                    Next
                </Button>
            </Stack>

            <Dialog open={modalOpen} onClose={handleModalClose}>
            <DialogTitle>Upload Video and Add Questions</DialogTitle>
            <DialogContent>
                {!showPreview ? (
                    <>
                        <TextField
                            label="Video Title"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<UploadIcon />}
                            sx={{ mt: 2 }}
                        >
                            Upload Video
                            <input
                                type="file"
                                hidden
                                onChange={handleVideoFileChange}
                            />
                        </Button>
                        {videoFile && !showPreview && (
                            <Button
                                variant="contained"
                                onClick={handleVideoUpload}
                                sx={{ mt: 2 }}
                            >
                                Upload and Show Preview
                            </Button>
                        )}
                    </>
                ) : (
                    <Box>
                        <Typography variant="h6">Video Preview:</Typography>
                        {videoPreview && (
                            <video width="100%" controls>
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <Button
                            variant="contained"
                            onClick={() => setCurrentQuestion({
                                questionText: '',
                                options: ['', ''],
                                correctAnswer: '',
                                startTime: '',
                                endTime: ''
                            })}
                            sx={{ mt: 2 }}
                        >
                            Add More Questions
                        </Button>
                        {currentQuestion && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Question Type</InputLabel>
                                    <Select value={currentQuestion.type} onChange={handleQuestionTypeChange}>
                                        <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                                        <MenuItem value="singleChoice">Single Choice</MenuItem>
                                        <MenuItem value="trueFalse">True/False</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Question Text"
                                    value={currentQuestion.questionText}
                                    onChange={handleQuestionTextChange}
                                    fullWidth
                                    margin="normal"
                                />
                                {selectedQuestionType !== 'trueFalse' && (
                                    <>
                                        {currentQuestion.options.map((option, index) => (
                                            <TextField
                                                key={index}
                                                label={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e)}
                                                fullWidth
                                                margin="normal"
                                            />
                                        ))}
                                        <FormControl component="fieldset">
                                            {currentQuestion.options.map((option, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            checked={currentQuestion.correctAnswer.includes(option)}
                                                            onChange={(e) => handleCorrectAnswerChange({ target: { value: option } })}
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            ))}
                                        </FormControl>
                                    </>
                                )}
                                {selectedQuestionType === 'trueFalse' && (
                                    <FormControl component="fieldset">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentQuestion.correctAnswer === 'true'}
                                                    onChange={(e) => handleCorrectAnswerChange({ target: { value: 'true' } })}
                                                />
                                            }
                                            label="True"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currentQuestion.correctAnswer === 'false'}
                                                    onChange={(e) => handleCorrectAnswerChange({ target: { value: 'false' } })}
                                                />
                                            }
                                            label="False"
                                        />
                                    </FormControl>
                                )}
                                <TextField
                                    label="Start Time (seconds)"
                                    type="number"
                                    name="startTime"
                                    value={currentQuestion.startTime}
                                    onChange={handleTimeChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="End Time (seconds)"
                                    type="number"
                                    name="endTime"
                                    value={currentQuestion.endTime}
                                    onChange={handleTimeChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAddQuestion}
                                    sx={{ mt: 2 }}
                                >
                                    Save Question
                                </Button>
                            </>
                        )}
                        {questions.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                {questions.map((q, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                         <Typography variant="body2">Type: {q.type}</Typography>
                                        <Typography variant="subtitle1">Question {index + 1}:</Typography>
                                        <Typography variant="body2">Text: {q.questionText}</Typography>
                                        <Typography variant="body2">Options: {q.options.join(', ')}</Typography>
                                        <Typography variant="body2">Correct Answer(s): {q.correctAnswer.join(', ')}</Typography>  {/* Updated to handle array */}
                                        <Typography variant="body2">Start Time: {q.startTime}</Typography>
                                        <Typography variant="body2">End Time: {q.endTime}</Typography>
                                    </Box>
                                ))}
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{ mt: 2 }}
                                >
                                    Submit All Data
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Close</Button>
            </DialogActions>
        </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CourseSectionForm;
