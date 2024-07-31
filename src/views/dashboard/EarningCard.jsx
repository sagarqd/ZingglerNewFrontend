import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
          
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: '1.4rem',
                            fontWeight: 900,
                            color: 'secondary.200',
                            mr: 3
                          }}
                        >
                          Total Courses
                        </Typography>
                      </Grid>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mb: 0.75 }}>30+</Typography>
                          </Grid>
                        </Grid>
                  </Grid>
                  <Grid item marginRight="20px">
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        bgcolor: 'secondary.dark',
                        color: 'secondary.200',
                        zIndex: 1
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" sx={{ zIndex: 2 }}>
                <Grid>
                  <Grid item>
                    <Grid container alignItems="flex-end">
                      <Grid item>
                        <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: 'secondary.200',
                          marginTop: 4,
                          marginBottom: 0,
                          marginRight: 1
                        }}
                      >
                        Today
                      </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 2, pr: 2}}>10</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item>
                    <Grid container alignItems="flex-end">
                      <Grid item>
                        <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: 'secondary.200',
                          marginTop: 4,
                          marginBottom: 0,
                          marginRight: 3
                        }}
                      >
                        Last Month
                      </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 1.25 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 2, pr: 2 }}>20</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
