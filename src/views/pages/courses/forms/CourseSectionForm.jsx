import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, TextField, MenuItem, Button, Grid, Stack, InputLabel, Select, FormControl } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Import the Draft editor stylesheet

const CourseSectionForm = ({ goToNextTab, goToPreviousTab, courseId }) => {
    const [sections, setSections] = useState([]);
    const [blogCategory, setBlogCategory] = useState('');

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
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setSections(newSections);
    };

    const handleContentTypeChange = (index, event) => {
        const value = event.target.value;
        // Reset fields based on selected content type
        handleSectionChange(index, 'contentType', value);
        handleSectionChange(index, 'contentUrl', '');
        handleSectionChange(index, 'youtubeUrl', '');
        handleSectionChange(index, 'uploadedFile', null);
        handleSectionChange(index, 'gameLink', '');
        handleSectionChange(index, 'imageFile', null);
        handleSectionChange(index, 'editorState', EditorState.createEmpty());
        if (value === 'Blog') {
            // Optionally reset or set blog-specific fields here
            setBlogCategory('');
        }
    };

    const handleBlogCategoryChange = (event) => {
        setBlogCategory(event.target.value);
    };

    const handleFileChange = (index, event) => {
        handleSectionChange(index, 'uploadedFile', event.target.files[0]);
    };

    const handleImageChange = (index, event) => {
        handleSectionChange(index, 'imageFile', event.target.files[0]);
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
                                                    <Select
                                                        value={blogCategory}
                                                        onChange={handleBlogCategoryChange}
                                                        label="Blog Category"
                                                    >
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
        </>
    );
};

export default CourseSectionForm;
