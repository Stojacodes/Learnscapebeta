// src/components/layout/Layout.js
import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout;
