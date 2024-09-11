import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, CardHeader, CardContent, Divider, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../context/SocketProvider';

const NewMeeting = () => {
  const socket = useSocket();
  const [email, setEmail] = useState('');
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (event) => {
      event.preventDefault();
      if (socket) {
        socket.emit('room:join', { email, roomID });
      }
    },
    [email, roomID, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, roomID } = data;
      navigate(`/meetings/${roomID}`, { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    // Ensure socket is available before adding event listeners
    if (!socket) return;

    socket.on('room:join', handleJoinRoom);

    return () => {
      if (socket) {
        socket.off('room:join', handleJoinRoom);
      }
    };
  }, [socket, handleJoinRoom]);

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardHeader title="Join a Meeting" />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmitForm}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="roomID"
                    label="Room Code"
                    variant="outlined"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      Join Room
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewMeeting;
