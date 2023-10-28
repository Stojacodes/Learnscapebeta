import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router";
import styled from "styled-components"
import CourseVideos from "../CourseComponents/CourseVideos";
import SearchBarComponent from "../layout/SearchBarComponent";

function CourseSection() {
  const location = useLocation();

  console.log('Location state:', location.state);

  const videosFromSearch = location.state?.videos || [];
  console.log("CourseSection - Extracted videosFromSearch:", videosFromSearch);

  const videos = videosFromSearch.length > 0 ? videosFromSearch.map((video) => ({
    title: video.title, // Use ChatGPT's title, not YouTube's snippet title
    synopsis: video.video.snippet.description,
    thumbnail: video.video.snippet.thumbnails.medium.url,
    id: video.video.id.videoId,
})) : [];
  console.log("CourseSection - Transformed videos:", videos);

  return (
    <Wrapper>
      <ContentWrapper>
        <SearchBarComponent />
        <TextWrapper>
          <h1>{videos.length > 0 ? 'Course Videos' : 'No Videos Found'}</h1>
          <ButtonWrapper>
            <CancelButton to="/page-2/"> Cancel </CancelButton>
          </ButtonWrapper>
        </TextWrapper>
        <HorizontalLine />
        <CourseVideos videos={videos} />
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






  