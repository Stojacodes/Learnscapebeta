import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  CardMedia,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,  // Import IconButton
  Box,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';  // Import PlayArrowIcon
import SkipNextIcon from '@mui/icons-material/SkipNext';  // Import SkipNextIcon
import SEO from "../components/layout/seo";
import Layout from '../components/layout/layout';

const TestCoursePage = () => {
  const theme = useTheme ();
  const [currentVideo, setCurrentVideo] = useState({
    title: "Introduction to Wildlife Photography",
    url: "https://www.youtube.com/embed/KvIfXkZyPGQ?si=UgPpWSH8RaL2a4qr", // Replace with actual video link or static image for now
  });

   // Static data for accordion steps
   const courseSteps = [
    // Add synopsis for each step
    {
      title: '1. Understanding Wildlife Behaviour and Habitats',
    },
    {
      title: '2. Mastering Camera Settings and Equipment',
    },
    {
      title: '3. Composition and Framing Techniques',
    },
    {
      title: '4. Patience, Observation, and Fieldcraft',
    },
    {
      title: '5. Post-processing Techniques',
    },
    {
      title: '6. Ethical Practices in Wildlife Photography',
    },
  ];

  const handleVideoChange = (title) => {
    // Update video based on title clicked
    setCurrentVideo({ title: title, url: currentVideo.url });
  };

  const handleNextVideo = () => {
    console.log('Switch to next video');
  };

  return (
    <Layout variant="course">
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `240px` }}>
          <SEO title="Course" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', marginRight: '8px' }}>
                <CardMedia
                  component="iframe"
                  src={currentVideo.url}
                  alt={currentVideo.title}
                  title={currentVideo.title}
                  sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {currentVideo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    4.1K views • 2 years ago
                  </Typography>
                  <Tabs value={0} aria-label="course details tabs">
                    <Tab label="About" />
                    <Tab label="Resources" />
                  </Tabs>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>
                Course Outline
              </Typography>
              {courseSteps.map((step, index) => (
                <Accordion key={index} sx={{ bgcolor: theme.palette.background.default }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{step.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <IconButton onClick={() => handleVideoChange(step.title)}>
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton onClick={handleNextVideo}>
                        <SkipNextIcon />
                      </IconButton>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default TestCoursePage;