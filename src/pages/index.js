// IndexPage.js
import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import HeroSection from '../components/sections/HeroSection';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

function IndexPage() {
  return (
    <>
      <Layout>
        <HeroSection />

        {/* Integrating PreviewSection content directly */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Popular Courses
          </Typography>
          <Grid container spacing={4}>
            {Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    {/* Content of the card; left blank for now */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <SEO title="Home" />
      </Layout>
    </>
  )
}

export default IndexPage;


