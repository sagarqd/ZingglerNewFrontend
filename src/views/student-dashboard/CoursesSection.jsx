import { Card, CardContent, Divider, Typography, Box, CardActions, Button } from '@mui/material';
import SmallCourseCard from './SmallCourseCard';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const CoursesSection = ({ isLoading }) => (
  <Card elevation={0} sx={{ borderRadius: '8px' }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Courses
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SmallCourseCard isLoading={isLoading} sx={{ width: '100%' }} />
        <SmallCourseCard isLoading={isLoading} sx={{ width: '100%' }} />
        <SmallCourseCard isLoading={isLoading} sx={{ width: '100%' }} />
      </Box>
    </CardContent>
    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
      <Button size="small" disableElevation>
        View All
        <ChevronRightOutlinedIcon />
      </Button>
    </CardActions>
  </Card>
);

export default CoursesSection;
