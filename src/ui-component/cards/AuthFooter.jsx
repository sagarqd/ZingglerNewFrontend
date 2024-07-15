// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://infutech.in" target="_blank" underline="hover">
    infutech.in
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://infutech.in" target="_blank" underline="hover">
      &copy; infutech.in
    </Typography>
  </Stack>
);

export default AuthFooter;
