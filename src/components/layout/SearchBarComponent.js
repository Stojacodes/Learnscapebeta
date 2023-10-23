import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import axios from 'axios';

function SearchBarComponent() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // Function to generate the ChatGPT query structure
  const generateQuery = (topic, level = "beginner") => {
    const instruction = `Create a 6-step beginner course outline for learning ${topic}.`;
    const examples = [
      {
        instruction: "Create a 6-step beginner course outline for learning wildlife photography.",
        response: [
          "Understanding Wildlife Behavior and Habitats",
          "Mastering Camera Settings and Equipment",
          "Composition and Framing Techniques",
          "Patience, Observation, and Fieldcraft",
          "Post-processing and Editing Techniques",
          "Sharing and Marketing Your Wildlife Photographs"
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
        const response = await axios.post("http://localhost:3000/api/getCourseStructure", { query: chatGPTQuery });
        const { courseOutline, videos } = response.data;
  
        // Navigate to the course page and pass the course outline and videos in the location state
        navigate("/course", { state: { courseOutline, videos } });
  
      } catch (error) {
        console.error("Error fetching course structure:", error);
        // Handle the error as needed
      }
    } else {
      console.error("Query is empty");
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