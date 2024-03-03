// gatsby-browser.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './src/theme'; // Correct relative path to theme.js
import { AuthProvider } from './src/contexts/authContext';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Material-UI's CSS baseline component */}
      <AuthProvider>
      {element} {/* The rest of your application */}
      </AuthProvider>
    </ThemeProvider>
  );
};

