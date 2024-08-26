import React, { useState, useEffect, useRef } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Card, CardContent, CardHeader, Divider, Typography, Grid, Button, Stack, Box, CardMedia, MenuItem } from '@mui/material';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';

const staticThumbnailUrl = 'https://via.placeholder.com/140'; // Replace with actual thumbnail URL
const staticVideoUrl = 'https://via.placeholder.com/140';

const DescriptionInformationForm = ({ goToNextTab, goToPreviousTab, courseId, courseData }) => {
    // Ensure initialDescription is always a string
    const initialDescription = typeof courseData?.description === 'string' ? courseData.description : '';

    let contentState;
    try {
        // Convert HTML to DraftJS content state
        const blocksFromHtml = htmlToDraft(initialDescription);
        const { contentBlocks, entityMap } = blocksFromHtml;
        contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    } catch (error) {
        console.error('Error converting HTML to DraftJS:', error);
        contentState = ContentState.createFromText('');
    }

    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [thumbnailUrl, setThumbnailUrl] = useState(courseData ? courseData.thumbnail : staticThumbnailUrl);
    const [videoUrl, setVideoUrl] = useState(courseData ? courseData.video : staticVideoUrl);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleFileChange = (event, type) => {
        const files = event.target.files;
        const formData = new FormData();

        // Append files to FormData object with the correct field name
        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                formData.append(type, file); // Use 'thumbnail' or 'video' based on the type
            });
        }

        axios
            .put(`http://localhost:8080/api/courses/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log('File uploaded successfully', response.data);
                if (type === 'thumbnail') {
                    setThumbnailUrl(response.data.thumbnailUrl); // Update thumbnail URL if applicable
                } else if (type === 'video') {
                    setVideoUrl(response.data.videoUrl); // Update video URL if applicable
                }
            })
            .catch((error) => {
                console.error('File upload error:', error);
            });
    };

    const handleSubmit = async () => {
        if (!courseId) {
            console.error('Course ID is not defined');
            return;
        }

        const formData = new FormData();

        // Append file fields
        if (thumbnailUrl) {
            formData.append('thumbnail', thumbnailUrl);
        }
        if (videoUrl) {
            formData.append('video', videoUrl);
        }

        // Append additional data
        formData.append(
            'description',
            JSON.stringify({
                courseDescription: description,
                thumbnail: {
                    courseThumbnail: thumbnailUrl,
                    courseVideo: videoUrl
                }
            })
        );

        try {
            const response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Data successfully updated:', response.data);
            // Reset fields or handle success
            setDescription('');
            setThumbnailUrl(thumbnailUrl);
            setVideoUrl(videoUrl);
            goToNextTab(response.data.slug); // Pass the slug to goToNextTab
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    // Handle navigation to the previous tab
    const handlePrevious = () => {
        goToPreviousTab();
    };

    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'history'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true }
    };
    return (
        <>
            <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardHeader
                        title={<Typography variant="h5">Course Description</Typography>}
                        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                    />
                    <Divider />
                    <CardContent>
                    <Editor
                      editorState={editorState}
                      toolbar={toolbarOptions}
                      onEditorStateChange={onEditorStateChange}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                    />
                    </CardContent>
                </Box>
            </Card>

            <Card variant="outlined" sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardHeader
                        title={<Typography variant="h5">Course Media</Typography>}
                        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        padding: 2,
                                        marginBottom: 4,
                                        marginTop: 4,
                                        backgroundColor: '#f4f4f8',
                                        flexDirection: { xs: 'column', md: 'row' }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', md: 140 },
                                            height: { xs: 'auto', md: 140 },
                                            borderRadius: 2,
                                            marginBottom: { xs: 2, md: 0 }
                                        }}
                                        image={thumbnailUrl || 'default-thumbnail-url'}
                                        alt="Course Thumbnail"
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            justifyContent: 'center',
                                            marginLeft: { md: 3 }
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
                                            Course thumbnail image. Accepted formats: JPG, PNG.
                                        </Typography>
                                        <Stack sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<UploadIcon />}
                                                sx={{ maxWidth: '170px' }}
                                                onClick={() => document.getElementById('thumbnail-upload').click()}
                                            >
                                                Upload Thumbnail
                                            </Button>
                                            <input
                                                type="file"
                                                id="thumbnail-upload"
                                                style={{ display: 'none' }}
                                                accept=".jpg, .png" // Specify accepted file formats
                                                onChange={(e) => handleFileChange(e, 'thumbnail')}
                                            />
                                        </Stack>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        padding: 2,
                                        marginBottom: 4,
                                        marginTop: 4,
                                        backgroundColor: '#f4f4f8',
                                        flexDirection: { xs: 'column', md: 'row' }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', md: 140 },
                                            height: { xs: 'auto', md: 140 },
                                            borderRadius: 2,
                                            marginBottom: { xs: 2, md: 0 }
                                        }}
                                        image={videoUrl || 'default-video-url'}
                                        alt="Course Video"
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            justifyContent: 'center',
                                            marginLeft: { md: 3 }
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: 2 }}>
                                            Course video. Accepted formats: MP4, AVI.
                                        </Typography>
                                        <Stack sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<UploadIcon />}
                                                sx={{ maxWidth: '170px' }}
                                                onClick={() => document.getElementById('video-upload').click()}
                                            >
                                                Upload Video
                                            </Button>
                                            <input
                                                type="file"
                                                id="video-upload"
                                                style={{ display: 'none' }}
                                                accept=".mp4, .avi" // Specify accepted file formats
                                                onChange={(e) => handleFileChange(e, 'video')}
                                            />
                                        </Stack>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
            </Card>

            <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="error" sx={{ px: 4 }} onClick={handlePrevious}>
                    prev
                </Button>
                <Button variant="contained" color="secondary" sx={{ px: 4 }} onClick={handleSubmit}>
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default DescriptionInformationForm;
