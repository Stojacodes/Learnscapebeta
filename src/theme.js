// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000', // Black background
      paper: '#2F353F', // For card-like surfaces
    },
    primary: {
      main: '#48CFEC', // For buttons and hyperlinks
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#495057', // Greyscale text
      hyperlink: '#48CFEC'
    },
    action: {
      hover: '#48CFEC1A', // For highlighting and hover
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 16,
    h1: {
      // Customize the h1 variant as needed
      fontSize: '2.5rem',
    },
    // Custom style for hyperlinks
    hyperlink: {
      textDecoration: 'none',
      color: '#48CFEC', // Use your actual color for hyperlinks
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer'
      },
    },
    // Add more customizations for other HTML elements as needed
  },
  // You can add other theme customizations here
});

export default theme;