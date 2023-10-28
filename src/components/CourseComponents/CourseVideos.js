import React from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard';

const CourseVideos = ({ videos = [] }) => {
  console.log("CourseVideos - Received videos prop:", videos);
  if (!videos.length) return <p>No videos found.</p>; // Return a message if there are no videos

  return (
    <VideosWrapper>
      {videos.map((video, index) => (
        <React.Fragment key={video.id || index}>
          <VideoCard video={video} />
          {index < videos.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </VideosWrapper>
  );
};

export default CourseVideos;

const VideosWrapper = styled.div`
  margin: 20px 0;
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); // You can adjust the color and thickness as needed
  margin: 20px 0; // Add some space around the line
`;


