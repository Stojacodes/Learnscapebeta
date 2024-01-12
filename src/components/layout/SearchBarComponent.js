import React, { useState } from "react";
import { navigate } from "gatsby";
import axios from 'axios';
import { Box, TextField, Button, Paper } from '@mui/material';

// Define your API base URL
const API_BASE_URL = process.env.NODE_ENV === 'production' ? 
                     'https://learnscapebeta.vercel.app' : 
                     'http://localhost:3000';

function SearchBarComponent() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // Function to generate the ChatGPT query structure
  const generateQuery = (topic, level = "beginner") => {
    const instruction = `Create a list of 6 concise step-by-step headings for a beginner course in ${topic}. Please only list the course headings and avoid additional explanations or details.`;
    const examples = [
      {
        instruction: "Create a list of 6 concise step-by-step headings for a beginner course in wildlife photography. Please only list the course headings and avoid additional explanations or details.`;",
        response: [
          "Introduction to Wildlife Photography",
          "Essential Camera Gear and Settings",
          "Field Techniques and Composition",
          "Understanding Wildlife Behavior",
          "Post-Processing and Editing",
          "Ethics and Conservation in Wildlife Photography"
        ]
      }
    ];

    return {
      instruction: instruction,
      examples: examples,
      level: level
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the query is not empty
    if (query) {
      // Generate the ChatGPT query
      const chatGPTQuery = generateQuery(query);
      console.log('Query:', query); // Log the query
  
      try {
        // Send a POST request to the serverless function with the query
        const response = await axios.post(`/api/getCourseStructure`, { query: chatGPTQuery });
        const { courseOutline, videos } = response.data;
  
        // Navigate to the course page and pass the course outline and videos in the location state
        navigate("/course", { state: { courseOutline, videos } });
  
      } catch (error) {
        console.error("Error fetching course structure:", error);
        setError("Error fetching course structure. Please try again later."); // Setting the error state
        // Handle the error as needed
      }
    } else {
      console.error("Query is empty");
      setError("Please enter a valid query."); // Setting the error state for an empty query
      // Handle the error as needed
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      mt: 2,
    }}>
      <Paper elevation={10} sx={{ borderRadius: '20px', display: 'flex' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: 'fit-content' }}>
          {error && <p>{error}</p>}
          <TextField
            type="text"
            placeholder="e.g. Fermat's Last Theorem, Skateboarding, Jazz Guitar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
            sx={{ 
              width: '600px', 
              height: '56px',
              mr: 1,
              borderRadius: '20px 0 0 20px', 
              '& .MuiOutlinedInput-root': {
                height: '56px',
                borderRadius: '20px 0 0 20px',
                alignItems: 'center',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,0,0,0.3)',
              },
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ 
              borderRadius: '0 20px 20px 0', 
              height: '56px',
              boxShadow: '0px 4px 6px rgba(255, 255, 255, 0.1)',
              '&:hover': {
                boxShadow: '0px 4px 6px rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Create Course
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default SearchBarComponent;