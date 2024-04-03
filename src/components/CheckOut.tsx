import * as React from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { Box } from '@mui/material';

interface ICheckOutProps {
}

const CheckOut: React.FunctionComponent<ICheckOutProps> = (props) => {
  return (
    <Box sx={{marginTop: 15}} >
      <HorizontalLinearStepper/>
    </Box>
  ) ;
};

export default CheckOut;
