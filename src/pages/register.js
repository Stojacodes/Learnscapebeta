import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { navigate } from 'gatsby';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUser } = useAuth(); // Corrected to use setCurrentUser

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user); // Correctly setting the current user
      navigate('/'); // Navigate back to the homepage
    } catch (error) {
      console.error("Error registering user", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        {/* Learnscape Logo and Text */}
        <Box display="flex" alignItems="center" mb={2}>
        <img src="/images/logos/Vector.svg"  alt="Learnscape Logo" height="50" />
          <Typography variant="h1" marginLeft={2}>
            Learnscape
          </Typography>
        </Box>
        <Typography component="h1" variant="h5" marginBottom={2}>
          Register to save your course
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
            Register
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Button color="primary" onClick={() => navigate('/login')}>
              Log in
            </Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;

