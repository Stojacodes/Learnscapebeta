import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Link as MuiLink } from '@mui/material';
import { navigate } from 'gatsby';
import { useAuth } from '../contexts/authContext';
import { doSignInWithEmailAndPassword, doPasswordReset } from '../firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserLoggedIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      setUserLoggedIn(true);
      navigate('/'); // Navigate back to the homepage
    } catch (error) {
      console.error("Error logging in user", error);
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address to reset your password.");
      return;
    }
    try {
      await doPasswordReset(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        {/* Learnscape Logo and Text */}
        <Box display="flex" alignItems="center" mb={2}>
          <img src="/images/logos/Vector.svg" alt="Learnscape Logo" height="50" />
          <Typography variant="h6" marginLeft={2}>
            Learnscape
          </Typography>
        </Box>
        <Typography component="h1" variant="h5" marginBottom={2}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography color="error" variant="body2" marginBottom={2}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" align="center" marginBottom={2}>
            Forgot your password?{' '}
            <MuiLink href="#" onClick={handleForgotPassword} color="primary">
              Reset it
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <MuiLink href="/register" color="primary">
              Sign up
            </MuiLink>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
