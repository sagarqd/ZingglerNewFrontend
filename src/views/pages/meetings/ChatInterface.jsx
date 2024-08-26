import React from 'react';
import { Box, Grid, Paper, Typography, IconButton, Avatar, InputAdornment, Stack, TextField } from '@mui/material';
import { MenuRounded, CallTwoTone, VideoCallTwoTone, ErrorTwoTone, MoreHorizTwoTone } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import SendIcon from '@mui/icons-material/Send';

const ChatInterface = () => {
  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} md={12} sm={12}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
            <Avatar alt="Alene" src="https://berrydashboard.io/assets/avatar-1-Dja0YEDP.png" />
        </Box>
        <Box>
            <Typography variant="h6">Alene</Typography>
            <Typography variant="subtitle2">Last seen 2h ago</Typography>
        </Box>
        </Paper>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={12} sm={12}>
        <Paper elevation={0} sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
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
        <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={1} alignItems="center">
        {/* Container for icons and text field */}
        <Grid item xs={12} container alignItems="center">
          {/* Icon Button for Attachment */}
          <Grid item>
            <IconButton aria-label="attachment file">
              <AttachFileIcon />
            </IconButton>
          </Grid>
          {/* Icon Button for Emoji */}
          <Grid item>
            <IconButton aria-label="emoji">
              <MoodIcon />
            </IconButton>
          </Grid>
          {/* TextField for message input */}
          <Grid item xs>
            <TextField
              id="message-send"
              placeholder="Type a Message"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="send message">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginLeft: 1 }} // Adds space between the TextField and the icons
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatInterface;
