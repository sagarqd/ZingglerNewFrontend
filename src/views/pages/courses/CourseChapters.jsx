import React from 'react';
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demoCourse = {
    courseFullName: 'Flutter Development from Beginner to Advanced',
    chapters: [
        {
            title: 'Chapter 1: Getting Started',
            lessons: [
                {
                    title: 'Introduction to Flutter Development',
                    type: 'blog',
                    content: `Flutter is an open-source UI software development toolkit created by Google...`
                },
                {
                    title: 'Setting Up Your Development Environment',
                    type: 'youtube',
                    url: 'https://www.youtube.com/watch?v=_h7Pc1woq-I&t=781s'
                }
            ]
        },
        {
            title: 'Chapter 2: HTML Basics',
            lessons: [
                { title: 'Understanding HTML Structure', type: 'blog', content: 'HTML structure content...' },
                { title: 'Common HTML Elements', type: 'youtube', url: 'https://www.youtube.com/watch?v=abc456' }
            ]
        },
        {
            title: 'Chapter 3: CSS Basics',
            lessons: [{ title: 'Introduction to CSS' }, { title: 'Styling Text and Layouts' }]
        },
        {
            title: 'Chapter 4: JavaScript Fundamentals',
            lessons: [{ title: 'Introduction to JavaScript' }, { title: 'Working with Variables and Data Types' }]
        },
        {
            title: 'Chapter 5: Building Your First Website',
            lessons: [{ title: 'Project Setup' }, { title: 'Creating the Home Page' }]
        }
    ]
};

const CustomAccordion = ({ onLessonSelect }) => {
    const { chapters } = demoCourse;

    const handleLessonClick = (lesson) => {
        onLessonSelect({
            title: lesson.title,
            type: lesson.type,
            content: lesson.content,
            url: lesson.url
        });
    };

    return (
        <Grid item xs={12} sm={12}>
            <Card elevation={0}>
                <CardHeader title="Course Chapters" />
                <Divider />
                <CardContent>
                    <Box>
                        {chapters.map((chapter, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">{chapter.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                            <ListItem
                                                button
                                                key={lessonIndex}
                                                onClick={() => handleLessonClick(lesson)}
                                            >
                                                <ListItemText
                                                    primary={lesson.title}
                                                    secondary={lesson.type === 'blog' ? 'Blog Article' : 'YouTube Video'}
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
    );
};

const CourseChapters = ({ onLessonSelect }) => {
    const { courseFullName } = demoCourse;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {courseFullName}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Course Chapters
            </Typography>
            <Grid container spacing={2}>
                <CustomAccordion onLessonSelect={onLessonSelect} />
            </Grid>
        </Container>
    );
};

export default CourseChapters;
