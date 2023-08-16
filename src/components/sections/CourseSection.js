import React, { Component } from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"; // Import useLocation
import styled from "styled-components"
//import SearchBarComponent from "../layout/SearchBarComponent"
//import CourseContents from "../CourseComponents/CourseContents";
//import CourseSummary from "../CourseComponents/CourseSummary";
import CourseVideos from "../CourseComponents/CourseVideos";
import SearchBarComponent from "../layout/SearchBarComponent";
//import MasteringCamera from '../MasteringCamera.svg';
//import FourRules from '../FourRules.svg';



function CourseSection() {
  const location = useLocation(); // Get the location object

    // Log the entire location state
    console.log('Location state:', location.state);

  const videosFromSearch = location.state?.videos || []; // Extract videos from the location state

  console.log(videosFromSearch);
  // Transform the videos to match the expected structure
  const videos = videosFromSearch.map((video) => ({
    title: video.snippet.title,
    synopsis: video.snippet.description,
    thumbnail: video.snippet.thumbnails.medium.url,
    id: video.id.videoId,// Include the video ID
  }));
  
  
  
  return (
    <Wrapper>
      <ContentWrapper>
        <SearchBarComponent />
        <TextWrapper>
          <h1>Title</h1>
          <ButtonWrapper>
            <CancelButton to="/page-2/"> Cancel </CancelButton>
          </ButtonWrapper>
        </TextWrapper>
        <HorizontalLine />
        <CourseVideos videos={videos} /> {/* Pass the transformed videos here */}
      </ContentWrapper>
    </Wrapper>
  );
}

  
export default CourseSection

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 54px;
  width: 1025px;
  height: 312px;
  margin-top: -350px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center; // this centers items vertically
  justify-content: flex-start; // this aligns items to the left
  gap: 10px; // this adds some space between the image and the text

`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  `;

const CancelButton = styled(Link)`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 0px 24px;
  background-color: #263238;
  border: 2px solid #1DE9B6; // Add border with color
  color: #1DE9B6; // Set the text color
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;

  width: 120px; // Decrease the button length
  height: 40px;

  border-radius: 150px;
`;

const HorizontalLine = styled.div`
  width: 116%; // full width
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); // white line
  margin-top: -35px; // some margin to space out the line from the text
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This makes the wrapper take the full height of the viewport
`;






  