import React from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard';

const CourseVideos = ({ videos = [] }) => {
  return (
    <VideosWrapper>
      {videos.map((video, index) => (
        <>
          <VideosTitle>{video.title}</VideosTitle>
          <VideoCard key={index} video={video} />
          {index < videos.length - 1 && <HorizontalLine />} {/* Add a horizontal line between videos */}
        </>
      ))}
    </VideosWrapper>
  );
};


export default CourseVideos;

const VideosWrapper = styled.div`
  margin: 20px 0;
`;

const VideosTitle = styled.h2`
  color: #FFFFFF; // Change color to white
  font-family: Inter;
  font-size: 24px; // Increase font size
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);// You can adjust the color and thickness as needed
  margin: 20px 0; // Add some space around the line
`;

