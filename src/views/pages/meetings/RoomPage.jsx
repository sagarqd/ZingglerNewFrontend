import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, IconButton, Typography, Paper, Grid, Divider, Button, Menu, MenuItem, TextField } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import peer from '../../../context/Peer';
import { useSocket } from '../../../context/SocketProvider';

import {
    Mic,
    MicOff,
    Videocam,
    VideocamOff,
    MoreVert,
    CallEnd,
    ArrowBackIos,
    ArrowForwardIos,
    PanTool,
    Chat,
    FiberManualRecord
} from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ParticipantsSection from './ParticipantsSection';
import ChatInterface from './ChatInterface';

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                zIndex: 1,
                transform: 'translateY(-50%)',
                backgroundColor: 'secondary.main',
                color: 'white',
                borderRadius: '50%',
                width: 30, // Adjust size here
                height: 30, // Adjust size here
                '&:hover': {
                    backgroundColor: 'secondary.dark'
                },
                transition: 'background-color 0.3s ease'
            }}
            onClick={onClick}
        >
            <ArrowBackIos sx={{ fontSize: 14 }} /> {/* Adjust icon size here */}
        </IconButton>
    );
};

// Custom Next Arrow Component
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                zIndex: 1,
                transform: 'translateY(-50%)',
                backgroundColor: 'secondary.main',
                color: 'white',
                borderRadius: '50%',
                width: 30, // Adjust size here
                height: 30, // Adjust size here
                '&:hover': {
                    backgroundColor: 'secondary.dark'
                },
                transition: 'background-color 0.3s ease'
            }}
            onClick={onClick}
        >
            <ArrowForwardIos sx={{ fontSize: 14 }} /> {/* Adjust icon size here */}
        </IconButton>
    );
};

const imageUrls = [
    'https://images.pexels.com/photos/938639/pexels-photo-938639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://static.vecteezy.com/system/resources/thumbnails/006/859/348/small_2x/young-boy-indian-student-portrait-photo.jpg',
    'https://www.shutterstock.com/image-photo/portrait-cheerful-bearded-arabic-guy-260nw-2337924713.jpg',
    'https://www.shutterstock.com/image-photo/cheerful-handsome-young-indian-guy-260nw-2360183549.jpg',
    'https://t4.ftcdn.net/jpg/06/36/46/45/360_F_636464567_rTteiuRZHlq92RvbV25PmqAWwqHxb1Yb.jpg',
    'https://media.istockphoto.com/id/1193690070/photo/trendy-handsome-gen-z-indian-arabic-man-working-on-laptop-in-waiting-area-smiling-and-staring.jpg?s=612x612&w=0&k=20&c=p-bZ8vGJKoJbiY0Kedook6aASQG2G8EEoSBnfApts7E=',
    'https://media.istockphoto.com/id/1626847905/photo/a-happy-businessman-looking-at-camera-while-working-on-his-computer.webp?b=1&s=170667a&w=0&k=20&c=ngkRyEArmiLyrWFvRPR0O-0E8rQ-HKq6tL09QmYaa44='
];

const Roompage = ({ room })=> {
    const userFeeds = [1, 2, 3, 4, 5, 6, 7, 8];
    const [muted, setMuted] = useState({});
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [newUserEmail, setNewUserEmail] = useState('');


    const localVideoRef = useRef(null);
    const remoteVideoRefs = useRef([]);

    const [isLoading, setIsLoading] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [numberOfUsers, setNumberOfUsers] = useState(0);



    useEffect(() => {
        // Get local stream
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch((error) => console.error('Error accessing media devices.', error));

        // TODO: Set up WebRTC peer connections and handle remote streams
        // Example:
        // const peerConnection = new RTCPeerConnection();
        // peerConnection.ontrack = (event) => {
        //     const remoteStream = event.streams[0];
        //     if (remoteVideoRefs.current[0]) {
        //         remoteVideoRefs.current[0].srcObject = remoteStream;
        //     }
        // };
    }, []);

    const handleMuteToggle = (index) => {
        setMuted((prevMuted) => ({
            ...prevMuted,
            [index]: !prevMuted[index]
        }));
    };

    const handleMicToggle = () => setMicOn(!micOn);
    const handleVideoToggle = () => setVideoOn(!videoOn);
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleAddParticipant = () => {
        if (newParticipant.trim()) {
            setParticipants([...participants, newParticipant.trim()]);
            setNewParticipant('');
        }
    };

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setNewUserEmail(email);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        const offer = await peer.getOffer();
        socket.emit('user:call', { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            const ans = await peer.getAnswer(offer);
            socket.emit('call:accepted', { to: from, ans });
        },
        [socket]
    );

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log('Call Accepted!');
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit('peer:nego:done', { to: from, ans });
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev) => {
            const remoteStream = ev.streams;
            console.log('GOT TRACKS!!');
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        const email = "user@example.com"; // Replace with actual user email or fetch from context/auth

        // Emit room join event
        socket.emit("room:join", { email, room });

        // Listen for updates to participants
        socket.on("update:participants", (updatedParticipants) => {
            setParticipants(updatedParticipants);
            setNumberOfUsers(updatedParticipants.length);
            setIsLoading(false); // Update loading state when data is received
        });

        // Fetch participants initially if needed
        socket.emit("request:participants", { room });

        return () => {
            // Cleanup listeners on component unmount
            socket.off("update:participants");
        };
    }, [room]);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncomming);
        socket.on('peer:nego:final', handleNegoNeedFinal);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncomming);
            socket.off('peer:nego:final', handleNegoNeedFinal);
        };
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => {
            console.log('before change', current, next);
        },
        afterChange: (current) => {
            console.log('after change', current);
        },
        cssEase: 'ease' // Smooth transition
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh'
            }}
        >
            {/* Main Layout Grid */}
            <Grid container sx={{ height: '100%' }}>
                {/* Left Section: Video Feeds */}
                <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }}>
                    {/* Host Video */}
                    <Box
                        sx={{
                            flex: '1 0 auto',
                            position: 'relative',
                            bgcolor: 'background.paper',
                            mb: 2,
                            overflow: 'hidden',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ position: 'absolute', top: 10, left: 10, color: '#000' }}>
                            Host Video
                        </Typography>
                        <Box
                            component="video"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            autoPlay
                            muted
                            // muted={videoOn ? false : true}
                            ref={localVideoRef}
                        />
                    </Box>

                    {/* User Video Feeds */}
                    <Box
                        sx={{
                            flex: '0 1 auto',
                            my: 3,
                            position: 'relative'
                        }}
                    >
                        <Slider {...sliderSettings}>
                            {imageUrls.map((url, index) => (
                                <div key={index} style={{ padding: '0 2px' }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            width: 240,
                                            height: 120,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            borderRadius: 3,
                                            ml: 3,
                                            mr: 0
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                justifyContent: 'space-between',
                                                position: 'absolute',
                                                bottom: 10,
                                                left: 0,
                                                right: 0,
                                                p: 1
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                    borderRadius: '50px',
                                                    px: 4,
                                                    py: 1,
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                                    backdropFilter: 'blur(3.5px)',
                                                    WebkitBackdropFilter: 'blur(3.5px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                                    }
                                                }}
                                                variant="caption"
                                            >
                                                User {index + 1}
                                            </Typography>
                                            <IconButton
                                                onClick={() => handleMuteToggle(index)}
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                    borderRadius: '50%',
                                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                                    backdropFilter: 'blur(3.5px)',
                                                    WebkitBackdropFilter: 'blur(3.5px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                                    }
                                                }}
                                            >
                                                {muted[index] ? <MicOffIcon /> : <MicIcon />}
                                            </IconButton>
                                        </Box>
                                        <Box
                                            component="img"
                                            src={url}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                                        />
                                    </Paper>
                                </div>
                            ))}
                        </Slider>
                    </Box>
                    {/* Control Icons and End Call Button */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            bgcolor: 'background.paper',
                            p: 1,
                            borderRadius: 2
                        }}
                    >
                        <IconButton
                            onClick={handleMicToggle}
                            sx={{
                                bgcolor: micOn ? 'primary.main' : 'lightcoral',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            {micOn ? <Mic /> : <MicOff />}
                        </IconButton>
                        <IconButton
                            onClick={handleVideoToggle}
                            sx={{
                                bgcolor: videoOn ? 'primary.main' : 'lightblue',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            {videoOn ? <Videocam /> : <VideocamOff />}
                        </IconButton>
                        <IconButton
                            sx={{
                                bgcolor: 'lightblue',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            <PanTool />
                        </IconButton>
                        <IconButton
                            sx={{
                                bgcolor: 'lightblue',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            <Chat />
                        </IconButton>
                        <IconButton
                            onClick={handleMenuClick}
                            sx={{
                                bgcolor: 'lightblue',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>Share Whiteboard</MenuItem>
                        </Menu>
                        <IconButton
                            sx={{
                                bgcolor: 'lightblue',
                                color: 'white',
                                borderRadius: '50%',
                                '&:hover': { bgcolor: 'orange' }
                            }}
                        >
                            <FiberManualRecord sx={{ animation: 'blinking 1s infinite' }} />
                        </IconButton>
                        <Button variant="contained" color="error" startIcon={<CallEnd />}>
                            End Call
                        </Button>
                        <style>
                            {`
                    @keyframes blinking {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                `}
                        </style>
                    </Box>
                </Grid>

                {/* Right Section: Chat Boxes */}
                <Grid item xs={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper
                        elevation={3}
                        sx={{ p: 2, height: '50%', overflowY: 'auto', display: 'flex', flexDirection: 'column', borderRadius: 2 }}
                    >
                         <ParticipantsSection
                        isLoading={isLoading}
                        numberOfUsers={numberOfUsers}
                        participants={participants}
                        />
                    </Paper>
                    <Paper
                        elevation={3}
                        sx={{ p: 2, height: '50%', overflowY: 'auto', display: 'flex', flexDirection: 'column', borderRadius: 2 }}
                    >
                        <ChatInterface />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Roompage;
