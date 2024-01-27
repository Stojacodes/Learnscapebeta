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
  Box,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SEO from "../components/layout/seo"; // Update this path to where your SEO component is located
import Layout from '../components/layout/layout';

const TestCoursePage = () => {
  const theme = useTheme ();
  const [currentVideo, setCurrentVideo] = useState({
    title: "Introduction to Wildlife Photography",
    url: "https://www.youtube.com/embed/KvIfXkZyPGQ?si=UgPpWSH8RaL2a4qr", // Replace with actual video link or static image for now
  });

   // Static data for accordion steps
   const courseSteps = [
    {
      title: '1. Understanding Wildlife Behaviour and Habitats',
      content: 'Learn about the habitats and behaviors of wildlife you want to photograph.',
    },
    {
      title: '2. Mastering Camera Settings and Equipment',
      content: 'Get to know your camera and the equipment needed for wildlife photography.',
    },
    {
      title: '3. Composition and Framing Techniques',
      content: 'Discover the rules of composition and framing to capture compelling images.',
    },
    {
      title: '4. Patience, Observation, and Fieldcraft',
      content: 'Develop the skills of patience and observation to anticipate the perfect shot.',
    },
    {
      title: '5. Post-processing Techniques',
      content: 'Enhance your photographs in post-processing with various software tools.',
    },
    {
      title: '6. Ethical Practices in Wildlife Photography',
      content: 'Understand the importance of ethics in wildlife photography.',
    },
  ];

  const handleAccordionChange = (index) => {
    // This will be the function to handle changing the video based on the accordion that is open
    console.log('Selected course step:', courseSteps[index].title);
    // For now, it's just logging. You'll need to update this to actually change the videos.
  };

  return (
    <Layout variant="course">
      <Box sx={{ display: 'flex' }}>
        {/* Add a marginLeft to the main content that equals the drawerWidth */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `240px` }}>
          <SEO title="Course" />
          <Grid container spacing={2}>  {/* Decrease spacing between grid items */}
            <Grid item xs={12} md={8}>   {/* Video takes 8 columns on medium and larger screens */}
              <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', marginRight: '8px' }}> {/* Decrease right margin */}
                <CardMedia
                  component="iframe"
                  src="https://www.youtube.com/embed/KvIfXkZyPGQ?si=UgPpWSH8RaL2a4qr"
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
                    {/* ... other tabs */}
                  </Tabs>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>   {/* Accordion takes 4 columns on medium and larger screens */}
              <Typography variant="h4" gutterBottom>
                Course Outline
              </Typography>
              {courseSteps.map((step, index) => (
                <Accordion 
                key={index} 
                onChange={() => handleAccordionChange(index)}
                sx={{
                  bgcolor: theme.palette.background.default, // Use the default background color
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover, // Apply the hover color
                  },
                }}
              >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{step.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {step.content}
                    </Typography>
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


  