import React from 'react'
import { useTheme } from '@mui/material/styles';

import hero from 'assets/images/hero.png'
const Hero = () => {
    const theme = useTheme();
  return (
    <img src={hero} alt="" />
  )
}

export default Hero