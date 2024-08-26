import React, { useEffect, useState } from 'react';
import { Card, CardContent, Divider, Box, CardActions, Button, IconButton, Badge } from '@mui/material';
import ParticipantsUserCard from './ParticipantsUserCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8080"); // Connect to your server

const ParticipantsSection = ({ room }) => {
    const [participants, setParticipants] = useState([]);
    const [numberOfUsers, setNumberOfUsers] = useState(0);

    useEffect(() => {
        const email = "user@example.com"; // Replace with actual user email or fetch from context/auth

        socket.emit("room:join", { email, room });

        socket.on("update:participants", (updatedParticipants) => {
            setParticipants(updatedParticipants);
            setNumberOfUsers(updatedParticipants.length);
        });

        return () => {
            socket.off("update:participants");
        };
    }, [room]);

    return (
        <Card elevation={0} sx={{ borderRadius: '8px' }}>
            <CardContent sx={{ padding: 1 }}>
                <CardActions sx={{ justifyContent: 'space-between', mb: 2, p: 0 }}>
                    <IconButton aria-label="users-only">
                        <Badge badgeContent={numberOfUsers} color="primary">
                            <PeopleAltIcon />
                        </Badge>
                    </IconButton>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color="secondary"
                        endIcon={<PersonAddAltIcon />}
                        sx={{ px: 2, py: 1, borderRadius: 8 }}
                    >
                        Add Participants
                    </Button>
                </CardActions>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {participants.map((participant, index) => (
                        <ParticipantsUserCard key={index} email={participant} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ParticipantsSection;
