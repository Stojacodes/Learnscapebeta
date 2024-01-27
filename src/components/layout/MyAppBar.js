import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, TextField } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

const drawerWidth = 240;

const MyAppBar = () => {
  const drawer = (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          borderRight: '1px solid', // This adds the line
          borderColor: 'grey.400', // This is your greyscale line
          // Restoring the padding that was removed
          p: 2,
        },
      }}
    >
      <List>
        {/* List items */}
        <ListItem>
          <ListItemIcon>
            <img src="/images/logos/Vector.svg" alt="Learnscape Logo" width="24" height="24" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h6">
                Learnscape
              </Typography>
            }
          />
        </ListItem>
        {[['Dashboard', <DashboardIcon />], ['Schedule', <ScheduleIcon />], ['Settings', <SettingsIcon />], ['Help', <HelpIcon />]].map((item, index) => (
          <ListItem button key={item[0]}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {drawer}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.default', // Matched with default background color
          boxShadow: 'none', // Removes any shadow or line below the AppBar
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search for your courses..."
              sx={{
                mr: 2,
                bgcolor: 'background.paper',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
              size="small"
            />
            {/* Rest of the AppBar content */}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Rest of your page content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: '64px', bgcolor: 'background.default' }}>
        {/* Your page content here */}
      </Box>
    </Box>
  );
};

export default MyAppBar;
