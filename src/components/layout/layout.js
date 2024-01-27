// src/components/layout/Layout.js
import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import MyAppBar from './MyAppBar';


function Layout({ children, variant }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderHeader = () => {
    if (variant === 'course') {
      return (
        <>
          <MyAppBar handleDrawerToggle={handleDrawerToggle} />
          
        </>
      );
    }
    // Default to standard header for all other pages
    return <Header />;
  };

  return (
    <>
      {renderHeader()}
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <main>{children}</main>
      </Box>
    </>
  );
}

export default Layout;
