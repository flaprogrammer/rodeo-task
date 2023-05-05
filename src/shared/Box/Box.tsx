import { Box as MuiBox, BoxProps } from '@mui/material';

const Box = (props: BoxProps) => {
  return <MuiBox mt={2} sx={{ p: 2, boxShadow: '0 0 2px 1px rgba(176,176,176,0.6);', borderRadius: '5px' }} {...props}/>;
};

export default Box;
