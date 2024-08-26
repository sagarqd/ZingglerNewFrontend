import React from 'react';
import { Box, Grid, Paper, Typography, IconButton, Avatar, Divider, Stack } from '@mui/material';
import { MenuRounded, CallTwoTone, VideoCallTwoTone, ErrorTwoTone, MoreHorizTwoTone, AttachFile } from '@mui/icons-material';

const ChatInterface = () => {
  return (
    <Grid container spacing={3} p={2}>
      {/* Sidebar */}
      <Grid item xs={12} sm={3}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <IconButton aria-label="menu">
            <MenuRounded />
          </IconButton>
          <Avatar alt="Alene" src="https://berrydashboard.io/assets/avatar-1-Dja0YEDP.png" />
          <Typography variant="h6">Alene</Typography>
          <Typography variant="subtitle2">Last seen 2h ago</Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <IconButton aria-label="call">
              <CallTwoTone />
            </IconButton>
            <IconButton aria-label="video call">
              <VideoCallTwoTone />
            </IconButton>
            <IconButton aria-label="info">
              <ErrorTwoTone />
            </IconButton>
            <IconButton aria-label="more options">
              <MoreHorizTwoTone />
            </IconButton>
          </Stack>
        </Paper>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={12} sm={9}>
        <Paper elevation={0} sx={{ p: 2, height: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
          <Grid container spacing={2}>
            {/* Chat messages */}
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Paper elevation={0} sx={{ p: 1, alignSelf: 'flex-start' }}>
                  <Typography variant="body2">Hi Good Morning!</Typography>
                  <Typography variant="subtitle2" align="right">11:23 AM</Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 1, alignSelf: 'flex-end', bgcolor: 'grey.300' }}>
                  <Typography variant="body2">Hey. Very Good morning. How are you?</Typography>
                  <Typography variant="subtitle2" align="right">11:23 AM</Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 1, alignSelf: 'flex-start' }}>
                  <Typography variant="body2">Good. Thank you</Typography>
                  <Typography variant="subtitle2" align="right">11:23 AM</Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 1, alignSelf: 'flex-end', bgcolor: 'grey.300' }}>
                  <Typography variant="body2">I need your minute, are you available?</Typography>
                  <Typography variant="subtitle2" align="right">11:23 AM</Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Message Input Area */}
        <Paper elevation={0} sx={{ p: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="attachment">
            <AttachFile />
          </IconButton>
          <input
            type="text"
            placeholder="Type a message..."
            style={{ flex: 1, marginLeft: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatInterface;
