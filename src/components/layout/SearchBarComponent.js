import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import axios from 'axios';

// Commented out the environment-based API_BASE_URL approach
// const API_BASE_URL = process.env.NODE_ENV === 'production' 
//                      ? 'https://learnscapebeta.vercel.app' 
//                      : 'http://localhost:3000';

// Manual URL approach
const API_BASE_URL = 'https://learnscapebeta.vercel.app';

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
    <SearchWrapper>
      <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
        <SearchInput
          type="text"
          placeholder="e.g. Fermat's Last Theorem, Skateboarding, Jazz Guitar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="submit">
          <img
            src="/images/logos/auto_awesome.svg"
            alt="Awesome Icon"
            style={{ marginRight: "8px" }} 
          />
          Create New Course
        </SearchButton>
      </form>
    </SearchWrapper>
  );
}

export default SearchBarComponent;


const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 500px;
  height: 35px; // Same height as the button
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 20px 0 0 20px;
  outline: none;
  color: white; // White text color
  background: rgba(0, 0, 0, 0.3); // Background color
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1); // White halo (box shadow)
`;

const SearchButton = styled.button`
  height: 50px; // Same height as the input
  padding: 8px 16px;
  background: #1DE9B6;
  border: none;
  border-radius: 0 20px 20px 0;
  color: black;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
`;