import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SearchBarComponent from '../layout/SearchBarComponent';

function HeroSection() {
  return (
    <Paper sx={{ 
      minHeight: '40vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      bgcolor: 'background.paper'  // This uses the 'paper' color from your theme
    }}>
      <Typography variant="h2" gutterBottom>
        Learnscape
      </Typography>
      <Typography variant="h5" gutterBottom>
        Generate a video course on anything in just one click...
      </Typography>
      <SearchBarComponent />
    </Paper>
  );
}

export default HeroSection;
