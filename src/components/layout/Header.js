import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Link } from "gatsby";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <img src="/images/logos/Vector.svg" alt="Learnscape Logo" />
        </IconButton>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Learnscape
        </Typography>
        <Typography variant="hyperlink" component={Link} to="/login" sx={{ mr: theme.spacing(2) }}>
          Log In
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/join"
          sx={{
            borderRadius: '50px', // This gives you rounded edges
            ml: theme.spacing(2), // Adds spacing to the left of the button
          }}
        >
          Join For Free
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

