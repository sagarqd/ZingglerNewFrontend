import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Snackbar, IconButton, Slider, Box, Menu, MenuItem } from '@mui/material';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Fullscreen, FullscreenExit, Replay10, Forward10, PictureInPictureAlt, Settings } from '@mui/icons-material';

const CourseDetails = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const [course, setCourse] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const [quality, setQuality] = useState('720p');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0); // For smooth seeking
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const { slug } = useParams();
  const { _id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${slug}`);
        if (!response.ok) {

          throw new Error('Network response was not ok');
        }
        console.log(_id);
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON response');
        }
        const data = await response.json();
        setCourse(data);

        if (data.courseVideo && data.courseVideo !== 'Not available') {
          const videoUrl = `http://localhost:8080${data.courseVideo}`;
          setVideoSrc(videoUrl);
        } else {
          setError('Invalid video path in course data');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data.');
      }
    };

    fetchCourse();
  }, [slug]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (seconds) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds, 'seconds');
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
    setIsMuted(newValue === 0);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      playerContainerRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTogglePip = () => {
    setPip(!pip);
  };

  const handleQualityChange = (event) => {
    const newQuality = event.target.getAttribute('data-quality');
    setQuality(newQuality);
    setAnchorEl(null);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    setDuration(state.loadedSeconds);
    setSeekValue(state.played * 100); // Update seek slider position
  };

  const handleSeekChange = (event, newValue) => {
    setSeekValue(newValue);
    const newTime = (newValue / 100) * duration;
    playerRef.current.seekTo(newTime, 'seconds');
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(window.controlHideTimeout);
    window.controlHideTimeout = setTimeout(() => setShowControls(false), 5000);
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const qualityOptions = ['144p', '360p', '480p', '720p', '1080p'];

  return (
    <Container maxWidth="xl">
      {course ? (
        <>
          <Typography variant="h4" gutterBottom>
            {course.courseFullName || 'Course Name Not Available'}
          </Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent sx={{ padding: 0 }}>
              <div
                ref={playerContainerRef}
                onMouseMove={handleMouseMove}
                onClick={handleVideoClick} // Pause video on click
                style={{ position: 'relative', width: '100%', height: '500px', backgroundColor: 'black' }}
              >
                {videoSrc ? (
                  <>
                    <ReactPlayer
                      ref={playerRef}
                      url={videoSrc}
                      playing={playing}
                      volume={volume}
                      muted={isMuted}
                      pip={pip}
                      width="100%"
                      height="auto"
                      controls={false}
                      onError={(e) => {
                        console.error('Error loading video:', e.message);
                        setError('Error loading video: ' + e.message);
                      }}
                      onProgress={handleProgress}
                    />
                    {error && (
                      <Typography variant="body1" color="error" align="center">
                        {error}
                      </Typography>
                    )}
                    {showControls && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          padding: '10px',
                          display: 'flex',
                          justifyContent: 'space-between', // Space between left and right controls
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={() => handleSeek(-10)} color="inherit">
                            <Replay10 sx={{ color: 'white' }} />
                          </IconButton>
                          <IconButton onClick={() => handlePlayPause()} color="inherit">
                            {playing ? <Pause sx={{ color: 'white' }} /> : <PlayArrow sx={{ color: 'white' }} />}
                          </IconButton>
                          <IconButton onClick={() => handleSeek(10)} color="inherit">
                            <Forward10 sx={{ color: 'white' }} />
                          </IconButton>
                          <Slider
                            value={seekValue}
                            onChange={handleSeekChange}
                            aria-labelledby="continuous-slider"
                            sx={{ width: 300, margin: '0 10px', color: 'white' }}
                          />
                          <Typography variant="body2" color="white">
                            {formatTime(played * duration)} / {formatTime(duration)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton onClick={handleToggleMute} color="inherit">
                            {isMuted ? <VolumeOff sx={{ color: 'white' }} /> : <VolumeUp sx={{ color: 'white' }} />}
                          </IconButton>
                          <Slider
                            value={volume * 100}
                            onChange={handleVolumeChange}
                            aria-labelledby="continuous-slider"
                            sx={{ width: 100, margin: '0 10px', color: 'white' }}
                          />
                          <IconButton onClick={handleTogglePip} color="inherit">
                            <PictureInPictureAlt sx={{ color: 'white' }} />
                          </IconButton>
                          <IconButton onClick={handleSettingsClick} color="inherit">
                            <Settings sx={{ color: 'white' }} />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseSettingsMenu}
                          >
                            {qualityOptions.map((option) => (
                              <MenuItem
                                key={option}
                                data-quality={option}
                                selected={option === quality}
                                onClick={handleQualityChange}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Menu>
                          <IconButton onClick={handleToggleFullscreen} color="inherit">
                            {isFullscreen ? <FullscreenExit sx={{ color: 'white' }} /> : <Fullscreen sx={{ color: 'white' }} />}
                          </IconButton>
                        </Box>
                      </div>
                    )}
                  </>
                ) : (
                  <Typography variant="h6" align="center" color="textSecondary">
                    No video available.
                  </Typography>
                )}
              </div>
            </CardContent>
            <CardActions>
              {/* Add additional CardActions content if needed */}
            </CardActions>
          </Card>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="File uploaded successfully"
          />
        </>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          Loading course details...
        </Typography>
      )}
    </Container>
  );
};

export default CourseDetails;
