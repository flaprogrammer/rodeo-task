import { Button as MuiButton, ButtonProps } from '@mui/material';

const Button = (props: ButtonProps) => {
  return <MuiButton variant="outlined" {...props} />;
};

export default Button;
