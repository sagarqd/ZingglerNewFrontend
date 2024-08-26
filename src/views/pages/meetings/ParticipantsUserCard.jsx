import React, { useState } from 'react';
import { Grid, Paper, Card, CardContent, Avatar, Typography, IconButton, Box } from '@mui/material';
import VideoCameraOffIcon from '@mui/icons-material/VideocamOff';
import VideoCameraIcon from '@mui/icons-material/Videocam';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';

const ParticipantsUserCard = ({ email = 'Unknown Participant' }) => {
    const [videoOn, setVideoOn] = useState(true); // Video is on by default
    const [audioOn, setAudioOn] = useState(true); // Audio is on by default

    const handleVideoToggle = () => {
        setVideoOn((prev) => !prev);
    };

    const handleAudioToggle = () => {
        setAudioOn((prev) => !prev);
    };

    return (
        <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <Paper elevation={0} sx={{ backgroundColor: '#f5f5f5' }}>
                    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', p: 0 }}>
                        <CardContent>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar alt={email} src="https://berrydashboard.io/assets/avatar-4-DbzFqBg_.png" />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" sx={{ marginBottom: 0 }}>
                                                {email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={handleAudioToggle}
                                            aria-label={audioOn ? 'Turn audio off' : 'Turn audio on'}
                                            aria-pressed={audioOn}
                                        >
                                            {audioOn ? <MicIcon /> : <MicOffIcon />}
                                        </IconButton>
                                        <IconButton
                                            onClick={handleVideoToggle}
                                            aria-label={videoOn ? 'Turn video off' : 'Turn video on'}
                                            aria-pressed={videoOn}
                                        >
                                            {videoOn ? <VideoCameraIcon /> : <VideoCameraOffIcon />}
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ParticipantsUserCard;
